$( document ).ready(function() {
	
	// Start Game
	if ( $("table#bingoScoreboard").length ) { // on the bingo screen
		if (!bingo) {
			var bingo = new Bingo;
			startBingoGame(bingo,($('#gameSpeed').val() * 1000));
			console.log(" game speed is: " + bingo.gameSpeed);
		}

		// Game Button Functionality
		
		$("#resumeGame").on('click', function() {
			bingo.runGame();
			bingo.toggleGameButtons();
		});

		$('#stopGame').on('click',function () {
			bingo.stopGame();
		});			
	} // if #bingoScoreboard

	if ( $('#player_select') ) { 
		$('#player_select').on('change', function() {
			$('.playerRow').addClass('hide');
			displayPlayerCard($('#player_select').val());
		});
	} // if #player_select
});

var startBingoGame = function (bingo,gameSpeed) {
		bingo.gameSpeed = gameSpeed || 5000;
		bingo.runGame();
	};

var displayPlayerCard = function(playerNum) {
		$("#" + playerNum).removeClass('hide');
};



