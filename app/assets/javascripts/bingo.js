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
	this.game_loaded = false;
	this.game_running = true;
	this.selectors = {
		calledNumbers: $("#called_numbers"),
		currentNumber: $('#currentNumber'),
		saveButton: $("#saveGameBtn"),
		resumeGameButton: $("#resumeGame"),
		stopGameButton: $("#stopGame"),
		scoreboard: "#scoreboard",
		gameSpeed: $('#gameSpeed')
	}
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

	"runGame": function() {
		var currGame = this;
		if ( this.isNewGame() ) {
			this.gameSpeed = this.selectors.gameSpeed.val() * 1000;
			this.toggleGameButtons();
			this.callNextNumber();
			this.continueGame(this);
		} 
		else if ( this.game_loaded == false && !this.isNewGame()) {
			this.game_running = false;
			this.loadGame();
			this.removeCalledNumbersFromAvailableNumbers();
			this.highlightPreviouslyCalledNumbers();
			this.callNextNumber();
			this.toggleGameButtons();
			this.game_loaded = true;
			return
		} else {
			this.game_running = true;
			this.continueGame(this);
		}
	},
	// check if this is the beginning of a game
	"isNewGame": function() {
		if ( this.selectors.calledNumbers.val() == "" ) {
			// no numbers have been called
			return true;
		} else {
			// numbers have been called
			return false;
		}
	},
	// update called numbers array
	"updateCalledNumbersFormField" : function() {
		this.selectors.calledNumbers.val(this.usedNumbers);
	},
	"removeCalledNumbersFromAvailableNumbers" : function() {
		for ( var i = 0; i < this.usedNumbers.length; i++ ) {
			var index = $.inArray(this.usedNumbers[i], this.availableNumbers );
			if (index > -1) {
			    this.availableNumbers.splice(index, 1);
			}

		}
	},
	"highlightPreviouslyCalledNumbers" : function() {
		for ( var i = 0; i < this.usedNumbers.length; i++ ) {
			this.highlightNumber(this.usedNumbers[i]);
		}
	},
	"loadGame" : function() {
		// add previously called numbers to usedNumbers
		this.usedNumbers = this.selectors.calledNumbers.val().split(",");
	},
	"continueGame" : function(currGame) {
		currGame.gameInterval = setInterval(function () {
	        if (currGame.usedNumbers.length > 0 ) {
				currGame.highlightNumber(currGame.currentNumber, currGame.selectors.scoreboard);
			}
			var currentNumber = currGame.getNextNumber();
			currGame.selectors.currentNumber.text(currentNumber);
			currGame.selectors.calledNumbers.val(currGame.usedNumbers);
			currGame.currentNumber = currentNumber;
	    },currGame.gameSpeed);
	},
	"callNextNumber" : function() {
		var nextNumber = this.getNextNumber();
		this.selectors.currentNumber.text(nextNumber);
		this.currentNumber = nextNumber;
		this.updateCalledNumbersFormField();
	},
	"toggleGameButtons" : function() {
		if ( this.game_running ) {
			if ( this.selectors.saveButton.length ) {
				this.selectors.saveButton.prop("disabled", true).val("Pause to Save Game")
			}
			this.selectors.resumeGameButton.hide();
			this.selectors.stopGameButton.show();
			
		} else {
			if ( this.selectors.saveButton.length ) {
				this.selectors.saveButton.prop("disabled", false).val("Save Game");
			}
			this.selectors.stopGameButton.hide();
			this.selectors.resumeGameButton.show();
		}
	},
	// stop calling numbers
	"stopGame": function() {
		clearInterval(this.gameInterval);
		this.game_running = false;
		this.toggleGameButtons();
	}
};
