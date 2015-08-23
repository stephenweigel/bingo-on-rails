function Player(number) {
	this.name = "Player " + number;
	this.id = number;
	this.cards = [];
}

Player.prototype = {
	"displayCards": function() {
		console.log("Displaying Player #" + this.playerNumber + "'s Cards");
	}
};