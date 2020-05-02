"use strict";
exports.__esModule = true;
var player_1 = require("./player");
var hand_1 = require("./hand");
var types_1 = require("./types");
var Bank_1 = require("./Bank");
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
        this.getPlayersInRound = function () {
            return _this.players.filter(function (p) { return p.getStatus() === types_1.GAME_STATUS_IN_GAME; });
        };
        this.getPlayers = function () {
            return _this.players;
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
            var _a;
            if (_this.players && _this.players.length > 1 && _this.observableCallback) {
                _this.refreshPlayers();
                _this.postBlinds();
                _this.round = types_1.PREFLOP;
                _this.players.forEach(function (p) { return p.setStatus(types_1.GAME_STATUS_IN_GAME); });
                //раздача карт
                _this.setCurrentHand(new hand_1.Hand(_this.players));
                //установка активного игрока
                var firstPlayer = _this.getFirstPlayer();
                _this.setActivePlayer(firstPlayer);
                _this.observableCallback({ type: types_1.DEAL_HAND, data: { players: _this.players, bank: (_a = _this.bank) === null || _a === void 0 ? void 0 : _a.getCash() } });
                //запуск таймера
                _this.startPlayerTimeBank(firstPlayer);
            }
        };
        this.changePlayersPositions = function () {
            _this.players.forEach(function (p) {
                var positionIndex = _this.positionsInGame.indexOf(p.getPosition());
                console.log('this pos = ', p.getPosition(), 'new posIndex', positionIndex + 1, 'pos in game = ', _this.positionsInGame);
                if (positionIndex + 1 < _this.positionsInGame.length) {
                    p.setPosition(_this.positionsInGame[++positionIndex]);
                }
                else {
                    p.setPosition(_this.positionsInGame[0]);
                }
            });
        };
        this.getNextPlayer = function () {
            if (_this.activePlayer) {
                var place_1 = _this.positionsInGame.indexOf(_this.activePlayer.getPosition());
                if (place_1) {
                    return _this.players.find(function (p) { return p.getPosition() === _this.positionsInGame[place_1 - 1]; });
                }
            }
        };
        this.startPlayerTimeBank = function (player) {
            if (_this.players && _this.players.length > 1) {
                var timeBank = player.getTimeBank();
                _this.timerId = setTimeout(function () {
                    _this.stopPlayerTimeBank();
                }, timeBank);
                if (_this.observableCallback) {
                    _this.observableCallback({ type: types_1.START_TIMER, data: _this.players });
                }
            }
        };
        this.stopPlayerTimeBank = function () {
            //остановка таймера
            clearTimeout(_this.timerId);
            _this.players.forEach(function (p) { return p.isActive = false; });
            //уведомление подписчика
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.STOP_TIMER, data: { player: _this.activePlayer } });
            var nextPlayer = _this.getNextPlayer();
            if (nextPlayer) {
                //фолд на ставку
                if (_this.bank && _this.activePlayer)
                    if (_this.bank.getBetValue()) {
                        _this.activePlayer.fold = true;
                        _this.activePlayer.setStatus(types_1.GAME_STATUS_WAIT);
                    }
                _this.setActivePlayer(nextPlayer);
                _this.startPlayerTimeBank(nextPlayer);
            }
            else {
                //обработка выигрыша без вскрытия
                if (_this.getPlayersInRound().length < 2) {
                    var winner = _this.getPlayersInRound()[0];
                    _this.playerWinWithoutShowDown(winner);
                    _this.changePlayersPositions();
                    _this.dealCards();
                }
                else {
                    _this.nextRound();
                }
            }
        };
        this.playerBet = function (betValue) {
            if (_this.activePlayer && _this.bank) {
                var isBetSuccess = _this.activePlayer.decreaseCash(betValue);
                if (isBetSuccess) {
                    _this.activePlayer.bet = betValue;
                    _this.bank.addCash(betValue);
                    _this.stopPlayerTimeBank();
                }
            }
        };
        this.playerCall = function () {
            if (_this.activePlayer && _this.bank) {
                var callValue = _this.bank.getBetValue();
                var isCallSuccess = _this.activePlayer.decreaseCash(callValue);
                if (isCallSuccess) {
                    _this.activePlayer.call = callValue;
                    _this.bank.addCash(callValue);
                    _this.stopPlayerTimeBank();
                }
            }
        };
        this.playerFold = function () {
            if (_this.activePlayer) {
                _this.activePlayer.fold = true;
                _this.activePlayer.setStatus(types_1.GAME_STATUS_WAIT);
                _this.stopPlayerTimeBank();
            }
        };
        this.playerCheck = function () {
            if (_this.activePlayer) {
                _this.activePlayer.check = true;
                _this.stopPlayerTimeBank();
            }
        };
        this.refreshPlayers = function () {
            _this.players.forEach(function (p) {
                p.check = false;
                p.call = null;
                p.bet = null;
                p.fold = false;
            });
        };
        this.postBlinds = function () {
            var playerOnBB = _this.players.find(function (p) { return p.getPosition() === 'bb'; });
            var playerOnSB = _this.players.find(function (p) { return p.getPosition() === 'sb'; });
            var smallBlind = 0;
            var bigBlind = 0;
            if (playerOnBB) {
                bigBlind = playerOnBB.postBigBlind(2);
            }
            if (playerOnSB) {
                smallBlind = playerOnSB.postSmallBlind(1);
            }
            _this.bank = new Bank_1["default"](smallBlind + bigBlind);
            console.log('post blinds: ', _this.bank.getCash());
            _this.bank.setBetValue(bigBlind > smallBlind ? bigBlind : smallBlind);
        };
        this.dealFlop = function () {
            var _a;
            var flop = (_a = _this.currentHand) === null || _a === void 0 ? void 0 : _a.generateFlop();
            //установка активного игрока
            var firstPlayer = _this.getFirstPlayer();
            _this.setActivePlayer(firstPlayer);
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.FLOP, data: flop });
            //запуск таймера
            _this.startPlayerTimeBank(firstPlayer);
        };
        this.dealTurn = function () {
            var _a;
            var turn = (_a = _this.currentHand) === null || _a === void 0 ? void 0 : _a.generateTurn();
            //установка активного игрока
            var firstPlayer = _this.getFirstPlayer();
            _this.setActivePlayer(firstPlayer);
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.TURN, data: turn });
            //запуск таймера
            _this.startPlayerTimeBank(firstPlayer);
        };
        this.dealRiver = function () {
            var _a;
            var river = (_a = _this.currentHand) === null || _a === void 0 ? void 0 : _a.generateRiver();
            //установка активного игрока
            var firstPlayer = _this.getFirstPlayer();
            _this.setActivePlayer(firstPlayer);
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.RIVER, data: river });
            //запуск таймера
            _this.startPlayerTimeBank(firstPlayer);
        };
        this.showdown = function () {
        };
        this.playerWinWithoutShowDown = function (winner) {
            if (_this.bank) {
                winner.increaseCash(_this.bank.getCash());
            }
        };
        this.nextRound = function () {
            _this.refreshPlayers();
            switch (_this.round) {
                case types_1.PREFLOP: {
                    _this.dealFlop();
                    break;
                }
                case types_1.FLOP: {
                    _this.dealTurn();
                    break;
                }
                case types_1.TURN: {
                    _this.dealRiver();
                    break;
                }
                case types_1.RIVER: {
                    _this.showdown();
                    break;
                }
                case types_1.SHOWDOWN: {
                    _this.dealCards();
                }
                default:
                    break;
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
module.exports = Game;
