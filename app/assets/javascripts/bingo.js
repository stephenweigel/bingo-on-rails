function Bingo() {
	this.bingoNumbers = {
		B: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		I: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
		N: [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
		G: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
		O: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
	};

	// stores the numbers that have not been called yet
	this.availableNumbers = this.getNumberPairs(this.bingoNumbers); 

	this.usedNumbers = []; // stores the numbers that have already been called
	this.currentNumber; // stores the current number being called
	this.gameInterval; // stores the interval for calling new number
	this.gameSpeed = 5000; // get new number every 5 seconds

	// Players
	this.players = [];
	this.cardsPerPlayer = 9;
}

Bingo.prototype = {

	"getNumberPairs": function(numSet) {
		var numbers = [];
		$.each(numSet,function (index, value) {
			$.each(value, function(i,v) {
				numbers.push(index + v);
			});
		});
		return numbers;
	},

	"getNumbers": function() {
		var numbers = [];
		$.each(this.bingoNumbers, function( index, value) {
			$.each(value, function(i,v) {
				numbers.push(v);
			});
		});
		return numbers;
	},

	// get the next number to be called
	"getNextNumber": function() {
		// shuffle available numbers
		var shuffledNumbers = this.shuffle(this.availableNumbers);

		// remove a number from the now shuffled availableNumbers
		var nextNumber = shuffledNumbers.pop();

		// update availableNumbers
		this.availableNumbers = shuffledNumbers;

		// add chosen numbers to usedNumbers array
		this.usedNumbers.push(nextNumber);

		return nextNumber;
	},

	// use to randomize the numbers called
	shuffle: function (array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	},

	// highlight the given number on the scoreboard
	"highlightNumber": function(number) {
		var num = number.slice(1);
		var cell = $("#bingoScoreboard td").filter(function() {
			return $(this).text() == num;
		});
		$(cell).css("background-color","green");
	},

	// highlight the bingo card on squares that match the given value
	"highlightPlayerCard": function(val) {
		$(".playerCard td").filter(function() { 
			return $(this).text() == val; })
		.css("background-color", "green");
	},

	// highlight free spaces on the bingo card
	"highlightFreeSpaces": function() {
		this.highlightPlayerCard('Free');
	},

	// highlight the called numbers on a player's card
	"highlightCalledNumbers": function() {
		var calledNumbers = this.usedNumbers;
		for ( var x = 0; x < calledNumbers.length; x++ ) {
			var num = calledNumbers[x].slice(1);
			this.highlightPlayerCard(num);
		}
	},

	// Players
	"setNumberOfPlayers": function(num) {
		this.players = [];
		for ( var x = 0; x < num; x++ ) {
			this.players.push(new Player(x + 1));
		}
	},

	"runGame": function() {
		var currGame = this;
		// check if it is the start of a game
		if ( $("#called_numbers").val() == "" ) {
			var firstNumber = currGame.getNextNumber();
			$('#currentNumber').text(firstNumber);
			// add chosen number to the called_numbers array
			$("#called_numbers").val(currGame.usedNumbers);
			currGame.currentNumber = firstNumber;
		} else {
			// add previously called numbers to usedNumbers
			currGame.usedNumbers = $("#called_numbers").val().split(",");
			// remove the usedNumbers from available numbers
			for ( var i = 0; i < currGame.usedNumbers.length; i++ ) {
				// highlight previous called numbers on the scoreboard
				currGame.highlightNumber(currGame.usedNumbers[i]);
				var index = $.inArray(currGame.usedNumbers[i], currGame.availableNumbers );
				if (index > -1) {
				    currGame.availableNumbers.splice(index, 1);
				}
			}
		

			var nextNumber = currGame.getNextNumber();
			$('#currentNumber').text(nextNumber);
			currGame.currentNumber = nextNumber;
			$("#called_numbers").val(currGame.usedNumbers);
		}
		// get next number every 5 seconds
		currGame.gameInterval = setInterval(function () {
	        if (currGame.usedNumbers.length > 0 ) {
				currGame.highlightNumber(currGame.currentNumber, "#bingoScoreboard");
			}
			var currentNumber = currGame.getNextNumber();
			$('#currentNumber').text(currentNumber);
			// add chosen number to the called_numbers array
			$("#called_numbers").val(currGame.usedNumbers);
			currGame.currentNumber = currentNumber;
	    },currGame.gameSpeed);
	},

	// stop calling numbers
	"stopGame": function() {
		clearInterval(this.gameInterval);
	}
};
	
