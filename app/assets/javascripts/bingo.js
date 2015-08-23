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

	"generateBingoCardNumbers": function() {
		var shuffled = {
			B: this.shuffle(this.bingoNumbers.B),
			I: this.shuffle(this.bingoNumbers.I),
			N: this.shuffle(this.bingoNumbers.N),
			G: this.shuffle(this.bingoNumbers.G),
			O: this.shuffle(this.bingoNumbers.O),
		};

		var cardNumbers = {
			B: shuffled.B.slice(0,5),
			I: shuffled.I.slice(0,5),
			N: shuffled.N.slice(0,5),
			G: shuffled.G.slice(0,5),
			O: shuffled.O.slice(0,5)
		};

		cardNumbers.N[2] = "Free";
		return cardNumbers;
	},

	// assign bingo cards to each of the players
	"distributeCards": function() {
		for ( var i = 0; i < this.players.length; i++ ) {
			for ( var x = 0; x < this.cardsPerPlayer; x++ ) {
				this.players[i].cards.push(this.generateBingoCardNumbers());
			}
		}
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

		// get first number if at the start of a game
		if ( currGame.usedNumbers.length == 0 ) {
			var firstNumber = currGame.getNextNumber();
			$('#currentNumber').text(firstNumber);
			currGame.currentNumber = firstNumber;
		}
		// get next number every 5 seconds
		currGame.gameInterval = setInterval(function () {
	        if (currGame.usedNumbers.length > 0 ) {
				currGame.highlightNumber(currGame.currentNumber, "#bingoScoreboard");
			}
			var currentNumber = currGame.getNextNumber();
			$('#currentNumber').text(currentNumber);
			currGame.currentNumber = currentNumber;
	    },currGame.gameSpeed);
	},

	// stop calling numbers
	"stopGame": function() {
		clearInterval(this.gameInterval);
	}
};
	
