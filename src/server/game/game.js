"use strict";
exports.__esModule = true;
var player_1 = require("./player");
var hand_1 = require("./hand");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.getPlayers = function () {
            return _this.players;
        };
        this.hasEmptyPlaces = function () {
            return Boolean(_this.emptyPlaces.length);
        };
        this.addPlayer = function (_a) {
            var user = _a.user;
            var place = _this.emptyPlaces.pop();
            var player = new player_1.Player(user.name, 200, place, _this.availablePositions[place - 1], _this.statuses[1]);
            _this.players.push(player);
            _this.positionsInGame[_this.positionsInGame.length] = _this.availablePositions[_this.positionsInGame.length];
            return player;
        };
        this.removePlayer = function (player) {
            _this.positionsInGame.pop();
            _this.emptyPlaces.push(player.getPlace());
            _this.players = _this.players.filter(function (p) { return p.getId() !== player.getId(); });
        };
        this.getPositionsInGame = function () {
            return _this.positionsInGame;
        };
        this.dealCards = function () {
            _this.setCurrentHand(new hand_1.Hand(_this.players));
        };
        this.players = [];
        this.emptyPlaces = [6, 5, 4, 3, 2, 1];
        this.availablePositions = ['bb', 'sb', 'but', 'cut', 'mp', 'utg'];
        this.positionsInGame = [];
        this.statuses = ['inGame', 'wait', 'fold', 'show'];
    }
    Game.prototype.getCurrentHand = function () {
        return this.currentHand;
    };
    Game.prototype.setCurrentHand = function (value) {
        this.currentHand = value;
    };
    return Game;
}());
;
module.exports = Game;
