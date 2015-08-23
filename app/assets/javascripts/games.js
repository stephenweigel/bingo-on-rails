$( document ).ready(function() {
	
	// Start Game
	var numPlayers = $('#players').val();
	if ( numPlayers ) { // on the bingo screen
		
		startBingoGame(numPlayers);


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

		$('#playerSelect').on('change', function() {
			displayPlayerCard($('#playerSelect').val());
		});
	}
});

var bingo = new Bingo;

var startBingoGame = function (numPlayers) {
		bingo.setNumberOfPlayers(numPlayers);
		bingo.gameSpeed = Number($('#gameSpeed').val()) * 1000;
		bingo.distributeCards();
		bingo.runGame();
};

var displayPlayerCard = function(playerNum) {
	$('#playerName').text("Player " + (Number(playerNum) + 1));

	for ( var c = 0; c <= bingo.players[playerNum].cards.length; c++ ) {
		var html = "";
		$("#card" + c).html(html);
		html  = "<tr><th class='text-center'>B</th><th class='text-center'>I</th>";
		html += "<th class='text-center'>N</th><th class='text-center'>G</th>";
		html += "<th class='text-center'>O</th></tr>";

		var playerCard = bingo.players[playerNum].cards[c];
		for ( b in playerCard ) { 
			var row = playerCard[b];
			html += "<tr>";
			for ( var i = 0; i < row.length; i++ ) {
				html  += "<td>" + row[i] + "</td>";
			}
			html += "</tr>"
		}
		$("#card" + c).append(html);
	}

};
