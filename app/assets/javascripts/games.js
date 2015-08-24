$( document ).ready(function() {
	
	// Start Game
	if ( $("table#bingoScoreboard").length ) { // on the bingo screen
		var bingo = new Bingo;
		startBingoGame(bingo,$('#gameSpeed').val());

		// Game Button Functionality

		$("#resumeGame").hide();
		$("#resumeGame").on('click', function() {
			bingo.runGame();
			$(this).hide();
			$('#stopGame').show();
		});

		$('#stopGame').on('click',function () {
			bingo.stopGame();
			$(this).hide();
			$("#resumeGame").show();
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



