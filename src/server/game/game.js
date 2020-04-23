var Player = require('player');
module.exports = function Game() {
    this.players = [];
    this.emptyPlaces = [6, 5, 4, 3, 2, 1];
    this.availablePositions = ['sb', 'bb', 'utg', 'mp', 'cut', 'but'];
    this.positionsInGame = [];
    this.statuses = ['inGame', 'wait', 'fold', 'show'];
    this.getPlayers = function () {
        return this.players;
    };
    this.addPlayer = function (user) {
        var place = this.emptyPlaces.pop();
        var player = new Player(user.name, 200, place, this.availablePositions[place - 1], this.statuses[1]);
        this.players.push(player);
        this.positionsInGame[this.positionsInGame.length] = this.availablePositions[this.positionsInGame.length];
        return player;
    };
    this.removePlayer = function (player) {
        this.positionsInGame.pop();
        this.emptyPlaces.push(player.getPositions());
        this.players = this.players.filter(function (p) { return p.id !== player.id; });
    };
    this.getPositionsInGame = function () {
        return this.positionsInGame;
    };
};
