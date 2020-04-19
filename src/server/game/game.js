module.exports = function Game() {
    this.players = [];
    this.emptyPlaces = [6, 5, 4, 3, 2, 1];
    this.availablePositions = ['sb', 'bb', 'utg', 'mp', 'cut', 'but'];
    this.positionsInGame = [];
    this.statuses = ['inGame', 'wait', 'fold', 'show'];

    this.getPlayers = function () {
        return this.players
    };

    this.addPlayer = function (user) {
        const place = this.emptyPlaces.pop();

        const player = {
            id: place,
            name: user.name,
            cash: 200,
            place: place,
            position: this.availablePositions[place - 1],
            status: this.statuses[1],
            timeBank: 30
        };

        this.players.push(player);

        this.positionsInGame[this.positionsInGame.length] = this.availablePositions[this.positionsInGame.length];

        return player;
    };

    this.removePlayer = function (player) {
        this.positionsInGame.pop();
        this.updatePlayers(this.players.filter(p => p.id !== player.id));
    };

    this.updatePlayers = function (players) {
        this.players = players
    };

    this.getPositionsInGame = function () {
        return this.positionsInGame
    }
};