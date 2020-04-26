"use strict";
exports.__esModule = true;
var player_1 = require("./player");
var hand_1 = require("./hand");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.getFirstPlayer = function () {
            var player = _this.players.find(function (p) {
                return p.getPosition() === _this.positionsInGame[_this.positionsInGame.length - 1];
            });
            return player;
        };
        this.setActivePlayer = function (player) {
            _this.activePlayer = player;
        };
        this.getActivePlayer = function () {
            return _this.activePlayer;
        };
        this.getPlayers = function () {
            return _this.players;
        };
        this.hasEmptyPlaces = function () {
            return Boolean(_this.emptyPlaces.length);
        };
        this.addPlayer = function (_a) {
            var user = _a.user;
            var place = _this.emptyPlaces.pop();
            if (place && _this.placesInGame)
                _this.placesInGame.push(place);
            var player = new player_1.Player(user.name, 200, place, _this.availablePositions[place - 1], _this.statuses[1]);
            if (player)
                _this.players.push(player);
            _this.positionsInGame[_this.positionsInGame.length] = _this.availablePositions[_this.positionsInGame.length];
            return player;
        };
        this.removePlayer = function (player) {
            _this.positionsInGame.pop();
            _this.emptyPlaces.push(player.getPlace());
            if (_this.placesInGame)
                _this.placesInGame.filter(function (place) { return place !== player.getPlace(); });
            _this.players = _this.players.filter(function (p) { return p.getId() !== player.getId(); });
        };
        this.getPositionsInGame = function () {
            return _this.positionsInGame;
        };
        this.dealCards = function () {
            if (_this.players && _this.players.length > 1) {
                console.log('Dealing cards');
                _this.setCurrentHand(new hand_1.Hand(_this.players));
                var firstPlayer = _this.getFirstPlayer();
                _this.setActivePlayer(firstPlayer);
                _this.startPlayerTimeBank(firstPlayer);
            }
        };
        this.getNextPlayer = function () {
            var _a;
            var place = (_a = _this.activePlayer) === null || _a === void 0 ? void 0 : _a.getPlace();
            console.log('active player place = ', place);
            if (place) {
                return _this.players.find(function (p) { return p.getPlace() === place - 1; });
            }
        };
        this.startPlayerTimeBank = function (player) {
            if (_this.players && _this.players.length > 1) {
                console.log('Player on position: ', player.getPosition(), 'startTimeBank');
                _this.timerId = setTimeout(function () {
                    _this.stopPlayerTimeBank();
                }, player.getTimeBank());
            }
        };
        this.stopPlayerTimeBank = function () {
            var _a;
            console.log('Player on position: ', (_a = _this.activePlayer) === null || _a === void 0 ? void 0 : _a.getPosition(), 'endTimeBank');
            clearTimeout(_this.timerId);
            var nextPlayer = _this.getNextPlayer();
            console.log('nextPlayer = ', nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getPosition());
            if (nextPlayer) {
                _this.setActivePlayer(nextPlayer);
                console.log('смена активного игрока');
                _this.startPlayerTimeBank(nextPlayer);
            }
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
