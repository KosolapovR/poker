"use strict";
exports.__esModule = true;
var player_1 = require("./player");
var hand_1 = require("./hand");
var types_1 = require("./types");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.subscribe = function (callback) {
            _this.observableCallback = callback;
        };
        this.getFirstPlayer = function () {
            var player = _this.players.find(function (p) {
                return p.getPosition() === _this.positionsInGame[_this.positionsInGame.length - 1];
            });
            return player;
        };
        this.setActivePlayer = function (player) {
            player.isActive = true;
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
            if (_this.players && _this.players.length > 1 && _this.observableCallback) {
                //раздача карт
                _this.setCurrentHand(new hand_1.Hand(_this.players));
                //установка активного игрока
                var firstPlayer = _this.getFirstPlayer();
                _this.setActivePlayer(firstPlayer);
                _this.observableCallback({ type: types_1.DEAL_HAND, data: _this.players });
                //запуск таймера
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
                var timeBank = player.getTimeBank();
                _this.timerId = setTimeout(function () {
                    _this.stopPlayerTimeBank();
                }, timeBank);
                if (_this.observableCallback) {
                    var time = Date.now() + timeBank;
                    _this.observableCallback({ type: types_1.START_TIMER, data: { player: player, time: time } });
                }
            }
        };
        this.stopPlayerTimeBank = function () {
            //осановка таймера
            clearTimeout(_this.timerId);
            //уведомление подписчика
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.STOP_TIMER, data: { player: _this.activePlayer } });
            var nextPlayer = _this.getNextPlayer();
            if (nextPlayer) {
                _this.setActivePlayer(nextPlayer);
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
