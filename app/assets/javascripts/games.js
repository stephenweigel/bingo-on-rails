$( document ).ready(function() {
	
	// Start Game
	if ( $("table#bingoScoreboard").length ) { // on the bingo screen
		var bingo = new Bingo;
		startBingoGame(bingo,($('#gameSpeed').val() * 1000));
		console.log(bingo.gameSpeed);

		// Game Button Functionality

		if ( bingo.game_running == true ) {
			$("#resumeGame").hide();
		}
		
		$("#resumeGame").on('click', function() {
			bingo.runGame();
			$(this).hide();
			$("#saveGameBtn").prop("disabled", true).val("Pause to Save Game");

			$('#stopGame').show();
		});

		$('#stopGame').on('click',function () {
			bingo.stopGame();
			$(this).hide();
			$("#saveGameBtn").prop("disabled", false).val("Save Game");

			$("#resumeGame").show();
		});	

		if ( $("#saveGameBtn").length ) {
			if ( bingo.game_running == false ) {
				$("#saveGameBtn").prop("disabled", false);
			}
		}

		
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



