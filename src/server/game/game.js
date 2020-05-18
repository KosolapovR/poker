"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
            var lastPostitionIndex = _this.positionsInGame.length - 1;
            var player = _this.players.find(function (p) {
                return p.getPosition() === _this.positionsInGame[lastPostitionIndex];
            });
            while ((player === null || player === void 0 ? void 0 : player.getStatus()) !== types_1.GAME_STATUS_IN_GAME) {
                lastPostitionIndex--;
                player = _this.players.find(function (p) {
                    return p.getPosition() === _this.positionsInGame[lastPostitionIndex];
                });
            }
            return player;
        };
        this.setActivePlayer = function (player) {
            player.isActive = true;
            _this.activePlayer = player;
        };
        this.getActivePlayer = function () {
            return _this.activePlayer;
        };
        this.getPlayersInRound = function () {
            return _this.players.filter(function (p) { return p.getStatus() === types_1.GAME_STATUS_IN_GAME; });
        };
        this.getPlayersAllIn = function () {
            return _this.players.filter(function (p) { return p.getStatus() === types_1.GAME_STATUS_ALL_IN; });
        };
        this.getPlayers = function () {
            return _this.players;
        };
        this.addPlayer = function (_a) {
            var user = _a.user;
            if (_this.getPlayers().length < 6) {
                var place = _this.emptyPlaces.pop();
                if (place && _this.placesInGame)
                    _this.placesInGame.push(place);
                var player = new player_1.Player(user.name, /*Math.floor(Math.random() * 200) + 1*/ 200, place, _this.availablePositions[place - 1], types_1.GAME_STATUS_IN_GAME);
                if (player)
                    _this.players.push(player);
                _this.positionsInGame[_this.positionsInGame.length] = _this.availablePositions[_this.positionsInGame.length];
                return player;
            }
        };
        this.removePlayer = function (player) {
            _this.positionsInGame.pop();
            _this.emptyPlaces.push(player.getPlace());
            if (_this.placesInGame)
                _this.placesInGame.filter(function (place) { return place !== player.getPlace(); });
            _this.players = _this.players.filter(function (p) { return p.getId() !== player.getId(); });
            player.setPlace(0);
        };
        this.dealCards = function () {
            var _a, _b;
            if (_this.players && _this.players.length > 1 && _this.observableCallback) {
                _this.players.forEach(function (p) { return p.getCash() > 0 ? p.setStatus(types_1.GAME_STATUS_IN_GAME) : p.setStatus(types_1.GAME_STATUS_SIT_OUT); });
                _this.firstCircle = true;
                _this.refreshPlayers();
                _this.postBlinds();
                _this.round = types_1.PREFLOP;
                //раздача карт
                _this.setCurrentHand(new hand_1.CurrentHand(_this.players));
                //установка активного игрока
                var firstPlayer = _this.getFirstPlayer();
                // console.log("устанока активного игрока: ", firstPlayer);
                _this.setActivePlayer(firstPlayer);
                _this.observableCallback({
                    type: types_1.DEAL_HAND,
                    data: { players: _this.players, bank: (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.getCash(), betValue: (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getBetValue() }
                });
                // console.log("Раздача карт");
                //запуск таймера
                _this.startPlayerTimeBank(firstPlayer);
            }
        };
        this.changePlayersPositions = function () {
            _this.players.forEach(function (p) {
                var positionIndex = _this.positionsInGame.indexOf(p.getPosition());
                // console.log('this pos = ', p.getPosition(), 'new posIndex', positionIndex + 1, 'pos in game = ', this.positionsInGame);
                if (positionIndex + 1 < _this.positionsInGame.length) {
                    p.setPosition(_this.positionsInGame[++positionIndex]);
                }
                else {
                    p.setPosition(_this.positionsInGame[0]);
                }
            });
        };
        this.getNextPlayer = function (currentPlayer) {
            var _a, _b;
            if (currentPlayer) {
                var place_1 = _this.positionsInGame.indexOf(currentPlayer.getPosition());
                var nextPlayer = void 0;
                if (place_1 === 0) {
                    if (_this.firstCircle)
                        _this.firstCircle = false;
                    nextPlayer = _this.players.find(function (p) {
                        return p.getPosition() === _this.positionsInGame[_this.positionsInGame.length - 1];
                    });
                    while ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()) !== types_1.GAME_STATUS_IN_GAME) {
                        nextPlayer = _this.getNextPlayer(nextPlayer);
                        if (!(nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()))
                            break;
                    }
                }
                else {
                    nextPlayer = _this.players.find(function (p) {
                        return p.getPosition() === _this.positionsInGame[place_1 - 1];
                    });
                    while ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()) !== types_1.GAME_STATUS_IN_GAME) {
                        nextPlayer = _this.getNextPlayer(nextPlayer);
                        if (!(nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()))
                            break;
                    }
                }
                if (nextPlayer && _this._bank &&
                    nextPlayer.bet === 0 && (nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.call) === 0
                    && nextPlayer.check === false) {
                    //currentPlayer('********** Все прочекали, ход последнего игока **********');
                    return nextPlayer;
                }
                if (nextPlayer && _this._bank &&
                    nextPlayer.getStatus() === types_1.GAME_STATUS_IN_GAME &&
                    ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.bet) >= ((_a = _this._bank) === null || _a === void 0 ? void 0 : _a.getBetValue()) ||
                        (nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.call) === ((_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getBetValue())) &&
                    !_this.firstCircle) {
                    //currentPlayer('+++++++++++ Переход на седующий раунд +++++++++++');
                    return undefined;
                }
                //currentPlayer('----------- Получен следующий игрок -----------');
                return nextPlayer;
            }
        };
        this.startPlayerTimeBank = function (player) {
            var _a;
            if (_this.players && _this.players.length > 1) {
                var timeBank = player.getTimeBank();
                _this.timerId = setTimeout(function () {
                    _this.stopPlayerTimeBank();
                }, timeBank);
                if (_this.observableCallback) {
                    _this.observableCallback({
                        type: types_1.START_TIMER,
                        data: { players: _this.players, betValue: (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.getBetValue() }
                    });
                }
            }
        };
        this.stopPlayerTimeBank = function () {
            var _a;
            if (_this.timerId) {
                //остановка таймера
                clearTimeout(_this.timerId);
                _this.players.forEach(function (p) { return p.isActive = false; });
                //обработка выигрыша без вскрытия
                if (_this.getPlayersInRound().length + _this.getPlayersAllIn().length < 2) {
                    _this.playerWinWithoutShowDown(_this.getPlayersInRound()[0]);
                    _this.changePlayersPositions();
                    _this.dealCards();
                }
                else {
                    var nextPlayer = _this.getNextPlayer(_this.activePlayer);
                    if (nextPlayer)
                        while ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()) !== types_1.GAME_STATUS_IN_GAME) {
                            //currentPlayer("статус следующего игрока = ", nextPlayer?.getStatus());
                            nextPlayer = _this.getNextPlayer(nextPlayer);
                            //currentPlayer("статус следующего игрока = ", nextPlayer?.getStatus());
                            if (!(nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()))
                                break;
                            if ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getPosition()) === ((_a = _this.activePlayer) === null || _a === void 0 ? void 0 : _a.getPosition()))
                                break;
                        }
                    if (nextPlayer) {
                        //фолд на ставку
                        if (_this._bank && _this.activePlayer && !_this.activePlayer.call && !_this.activePlayer.bet)
                            if (_this._bank.getBetValue()) {
                                _this.activePlayer.fold = true;
                                _this.activePlayer.setStatus(types_1.GAME_STATUS_WAIT);
                            }
                            else {
                                _this.activePlayer.check = true;
                            }
                        //currentPlayer('Set active player = ', nextPlayer.getPosition());
                        _this.setActivePlayer(nextPlayer);
                        _this.startPlayerTimeBank(nextPlayer);
                    }
                    else {
                        _this.nextRound();
                    }
                }
            }
        };
        this.playerBet = function (betValue) {
            if (_this.activePlayer && _this._bank && betValue > _this._bank.getBetValue()) {
                var heroTotalBet = betValue - (_this.activePlayer.call + _this.activePlayer.bet);
                var isBetSuccess = _this.activePlayer.actionBet(heroTotalBet);
                if (isBetSuccess) {
                    _this.activePlayer.bet = betValue;
                    _this.activePlayer.call = 0;
                    //currentPlayer("bet success");
                    _this._bank.setBetValue(betValue);
                    if (_this.activePlayer.getCash() === 0) {
                        _this.activePlayer.setStatus(types_1.GAME_STATUS_ALL_IN);
                    }
                    _this.stopPlayerTimeBank();
                }
            }
        };
        this.playerCall = function () {
            if (_this.activePlayer && _this._bank) {
                var activePlayerBet = 0;
                if (_this.activePlayer.bet) {
                    activePlayerBet = _this.activePlayer.bet;
                }
                else if (_this.activePlayer.call) {
                    activePlayerBet = _this.activePlayer.call;
                }
                var callValue = _this._bank.getBetValue() - activePlayerBet;
                //currentPlayer('player call: ', callValue);
                if (callValue > 0) {
                    var isCallSuccess = _this.activePlayer.actionBet(callValue);
                    if (isCallSuccess) {
                        //currentPlayer('call success', activePlayerBet + callValue);
                        _this.activePlayer.call = activePlayerBet + callValue;
                        _this.activePlayer.bet = 0;
                        _this._bank.setBetValue(activePlayerBet + callValue);
                        if (_this.activePlayer.getCash() === 0) {
                            _this.activePlayer.setStatus(types_1.GAME_STATUS_ALL_IN);
                        }
                        _this.stopPlayerTimeBank();
                    }
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
                p.call = 0;
                p.bet = 0;
                p.fold = false;
                if (p.getStatus() !== types_1.GAME_STATUS_IN_GAME) {
                    p.hasCards = false;
                }
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
            _this._bank = new Bank_1["default"]();
            _this._bank.setBetValue(bigBlind > smallBlind ? bigBlind : smallBlind);
        };
        this.dealFlop = function () {
            var _a, _b;
            var flop = (_a = _this._currentHand) === null || _a === void 0 ? void 0 : _a.generateFlop();
            //установка активного игрока
            var firstPlayer = _this.getFirstPlayer();
            //currentPlayer("позиция первого игрока после флопа ", firstPlayer.getPosition())
            _this.setActivePlayer(firstPlayer);
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.FLOP, data: { flop: flop, players: _this.players, bank: (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getCash() } });
            //проверка количества активных игроков в раунде
            if (_this.getPlayersInRound().length < 2)
                _this.nextRound();
            //запуск таймера
            _this.startPlayerTimeBank(firstPlayer);
        };
        this.dealTurn = function () {
            var _a, _b;
            var turn = (_a = _this._currentHand) === null || _a === void 0 ? void 0 : _a.generateTurn();
            //установка активного игрока
            var firstPlayer = _this.getFirstPlayer();
            _this.setActivePlayer(firstPlayer);
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.TURN, data: { turn: turn, players: _this.players, bank: (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getCash() } });
            //проверка количества активных игроков в раунде
            if (_this.getPlayersInRound().length < 2)
                _this.nextRound();
            //запуск таймера
            _this.startPlayerTimeBank(firstPlayer);
        };
        this.dealRiver = function () {
            var _a, _b;
            var river = (_a = _this._currentHand) === null || _a === void 0 ? void 0 : _a.generateRiver();
            //установка активного игрока
            var firstPlayer = _this.getFirstPlayer();
            _this.setActivePlayer(firstPlayer);
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.RIVER, data: { river: river, players: _this.players, bank: (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getCash() } });
            //проверка количества активных игроков в раунде
            if (_this.getPlayersInRound().length < 2)
                _this.nextRound();
            //запуск таймера
            _this.startPlayerTimeBank(firstPlayer);
        };
        this.showdown = function () {
            var _a, _b;
            console.log('Вскрытие, размера пота = ', (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.getCash());
            var winners = (_b = _this._currentHand) === null || _b === void 0 ? void 0 : _b.getWinners(__spreadArrays(_this.getPlayersInRound(), _this.getPlayersAllIn()));
            if (winners)
                _this.playerWinOnShowDown(winners);
            _this.nextRound();
        };
        this.playerWinWithoutShowDown = function (winner) {
            var _a;
            var sum = 0;
            _this.players.forEach(function (p) {
                return p.bet ? sum += p.bet : p.call ? sum += p.call : sum;
            });
            (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.addCash(sum);
            if (_this._bank && winner) {
                winner.increaseCash(_this._bank.getCash());
            }
        };
        this.playerWinOnShowDown = function (winners) {
            var _a;
            (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.shareBetweenPlayers(winners);
        };
        this.updateBank = function () {
            var _a, _b;
            var sum = 0;
            _this.players.forEach(function (p) { return sum += p.bet + p.call; });
            (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.addCash(sum);
            //console.log('В банк добавлено: ', sum);
            //очищаем ставки за прошлый раунд
            (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.setBetValue(0);
        };
        this.getCurrentRound = function () {
            return _this.round;
        };
        this.nextRound = function () {
            _this.updateBank();
            _this.refreshPlayers();
            switch (_this.round) {
                case types_1.PREFLOP: {
                    // console.log('dealFlop');
                    _this.round = types_1.FLOP;
                    _this.dealFlop();
                    break;
                }
                case types_1.FLOP: {
                    _this.round = types_1.TURN;
                    _this.dealTurn();
                    break;
                }
                case types_1.TURN: {
                    _this.round = types_1.RIVER;
                    _this.dealRiver();
                    break;
                }
                case types_1.RIVER: {
                    _this.round = types_1.SHOWDOWN;
                    _this.showdown();
                    break;
                }
                case types_1.SHOWDOWN: {
                    _this.round = types_1.PREFLOP;
                    _this.changePlayersPositions();
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
        this.firstCircle = true;
    }
    Game.prototype.getBank = function () {
        return this._bank;
    };
    Game.prototype.setBank = function () {
        this._bank = new Bank_1["default"]();
    };
    Game.prototype.setCurrentHand = function (value) {
        this._currentHand = value;
    };
    return Game;
}());
module.exports = Game;
