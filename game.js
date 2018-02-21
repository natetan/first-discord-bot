const fs = require('fs');

function getPlayers() {
	fs.readFile('players.json', function(err, data) {
		var json = JSON.parse(data);
		var result = 'Players:';
		for (var i = 0; i < json.players.length; i++) {
			result += '\n' + json.players[i].name;
		}
		console.log('Result: ' + result);
		return result;
	});
}

function Player(name, isModerator) {
	this.name = name;
	this.isModerator = isModerator;
}

function createNewPlayer(name, isModerator) {
	return new Player(name, isModerator);
}

module.exports = {
	getPlayers: getPlayers,
	createNewPlayer: Player
}