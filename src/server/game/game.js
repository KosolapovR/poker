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
            _this.isShowdown = false;
            if (_this.players && _this.players.length > 1 && _this.observableCallback) {
                _this.players.forEach(function (p) {
                    if (p.getCash() > 0) {
                        p.setStatus(types_1.GAME_STATUS_IN_GAME);
                        p.hasCards = true;
                        p.showCards = false;
                    }
                    else {
                        p.setStatus(types_1.GAME_STATUS_SIT_OUT);
                        p.hasCards = false;
                    }
                    if (p.addedCash > 0)
                        p.increaseCash(p.addedCash);
                    p.addedCash = 0;
                });
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
            var _a, _b, _c;
            if (currentPlayer) {
                var place_1 = _this.positionsInGame.indexOf(currentPlayer.getPosition());
                var nextPlayer = void 0;
                if (place_1 === 0) {
                    if (_this.firstCircle)
                        _this.firstCircle = false;
                    //все пошли All-in либо сфолдили
                    if (_this.getPlayersInRound().length < 1) {
                        console.log('<<<<<< Все пошли AI');
                        return undefined;
                    }
                    nextPlayer = _this.players.find(function (p) {
                        return p.getPosition() === _this.positionsInGame[_this.positionsInGame.length - 1];
                    });
                    while ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()) !== types_1.GAME_STATUS_IN_GAME) {
                        nextPlayer = _this.getNextPlayer(nextPlayer);
                        if (!(nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getStatus()))
                            break;
                        if (((_a = _this.getActivePlayer()) === null || _a === void 0 ? void 0 : _a.getPosition()) === (nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getPosition()))
                            break;
                    }
                    if (nextPlayer)
                        console.log('Зашли в первый блок 201, позиция следующего: ', nextPlayer.getPosition());
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
                    ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.bet) >= ((_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getBetValue()) ||
                        (nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.call) === ((_c = _this._bank) === null || _c === void 0 ? void 0 : _c.getBetValue())) &&
                    !_this.firstCircle) {
                    console.log('+++++++++++ Переход на седующий раунд +++++++++++');
                    return undefined;
                }
                console.log('----------- Получен следующий игрок -----------');
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
            var _a, _b, _c;
            if (_this.timerId) {
                //остановка таймера
                clearTimeout(_this.timerId);
                _this.players.forEach(function (p) { return p.isActive = false; });
                //обработка выигрыша без вскрытия
                if (_this.getPlayersInRound().length + _this.getPlayersAllIn().length < 2) {
                    var winner = _this.getPlayersInRound()[0];
                    _this.playerWinWithoutShowDown(winner);
                    _this.players.forEach(function (p) {
                        p.call = 0;
                        p.bet = 0;
                    });
                    if (_this.observableCallback)
                        _this.observableCallback({
                            type: types_1.MOVE_BANK,
                            data: {
                                players: _this.players,
                                bank: (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.getCash(),
                                winnersPositions: [winner.getPosition()]
                            }
                        });
                    setTimeout(function () {
                        _this.changePlayersPositions();
                        _this.dealCards();
                    }, 2000);
                }
                else {
                    var nextPlayer = _this.getNextPlayer(_this.activePlayer);
                    // if (nextPlayer)
                    //     while (nextPlayer?.getStatus() !== GAME_STATUS_IN_GAME) {
                    //         //currentPlayer("статус следующего игрока = ", nextPlayer?.getStatus());
                    //         nextPlayer = this.getNextPlayer(nextPlayer);
                    //         //currentPlayer("статус следующего игрока = ", nextPlayer?.getStatus());
                    //         if (!nextPlayer?.getStatus()) break;
                    //         if (nextPlayer?.getPosition() === this.activePlayer?.getPosition()) break;
                    //     }
                    console.log("@@@ nextPlayer?.getPosition() = ", nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getPosition());
                    console.log("@@@ this.ActivePlayer?.getPosition() = ", (_b = _this.activePlayer) === null || _b === void 0 ? void 0 : _b.getPosition());
                    if ((nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getPosition()) === ((_c = _this.activePlayer) === null || _c === void 0 ? void 0 : _c.getPosition())) {
                        console.log('!!!!!!! 286 pos: ', nextPlayer === null || nextPlayer === void 0 ? void 0 : nextPlayer.getPosition());
                        nextPlayer = undefined;
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
                        console.log('302 Set active player = ', nextPlayer.getPosition());
                        _this.setActivePlayer(nextPlayer);
                        _this.startPlayerTimeBank(nextPlayer);
                    }
                    else {
                        console.log('##### Кинули в следующий раунд');
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
                _this.activePlayer.hasCards = false;
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
                if (p.getStatus() !== types_1.GAME_STATUS_IN_GAME && p.getStatus() !== types_1.GAME_STATUS_ALL_IN) {
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
        this.openCardsOnShowDown = function () {
            var playersOnShowDown = __spreadArrays(_this.getPlayersInRound(), _this.getPlayersAllIn());
            playersOnShowDown.forEach(function (p) { return p.showCards = true; });
            _this.isShowdown = true;
        };
        this.dealFlop = function () {
            var _a, _b;
            var flop = (_a = _this._currentHand) === null || _a === void 0 ? void 0 : _a.generateFlop();
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.FLOP, data: { flop: flop, players: _this.players, bank: (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getCash() } });
            //проверка количества активных игроков в раунде
            if (_this.getPlayersInRound().length < 2) {
                console.log("КОличество активных игроков меньше 2");
                //всрытие карт
                if (!_this.isShowdown) {
                    console.log("Выскрытие карт");
                    _this.openCardsOnShowDown();
                }
                setTimeout(function () {
                    _this.nextRound();
                }, 3000);
            }
            else {
                //установка активного игрока
                var firstPlayer = _this.getFirstPlayer();
                console.log("позиция первого игрока после флопа ", firstPlayer.getPosition());
                _this.setActivePlayer(firstPlayer);
                //запуск таймера
                _this.startPlayerTimeBank(firstPlayer);
            }
        };
        this.dealTurn = function () {
            var _a, _b;
            var turn = (_a = _this._currentHand) === null || _a === void 0 ? void 0 : _a.generateTurn();
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.TURN, data: { turn: turn, players: _this.players, bank: (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getCash() } });
            //проверка количества активных игроков в раунде
            if (_this.getPlayersInRound().length < 2) {
                //всрытие карт
                if (!_this.isShowdown) {
                    _this.openCardsOnShowDown();
                }
                setTimeout(function () {
                    _this.nextRound();
                }, 3000);
            }
            else {
                //установка активного игрока
                var firstPlayer = _this.getFirstPlayer();
                _this.setActivePlayer(firstPlayer);
                //запуск таймера
                _this.startPlayerTimeBank(firstPlayer);
            }
        };
        this.dealRiver = function () {
            var _a, _b;
            var river = (_a = _this._currentHand) === null || _a === void 0 ? void 0 : _a.generateRiver();
            if (_this.observableCallback)
                _this.observableCallback({ type: types_1.RIVER, data: { river: river, players: _this.players, bank: (_b = _this._bank) === null || _b === void 0 ? void 0 : _b.getCash() } });
            //проверка количества активных игроков в раунде
            if (_this.getPlayersInRound().length < 2) {
                //всрытие карт
                if (!_this.isShowdown) {
                    _this.openCardsOnShowDown();
                }
                setTimeout(function () {
                    _this.nextRound();
                }, 3000);
            }
            else {
                //установка активного игрока
                var firstPlayer = _this.getFirstPlayer();
                _this.setActivePlayer(firstPlayer);
                //запуск таймера
                _this.startPlayerTimeBank(firstPlayer);
            }
        };
        this.showdown = function () {
            var _a, _b, _c;
            console.log('Вскрытие, размера пота = ', (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.getCash());
            var currentPlayersInRound = __spreadArrays(_this.getPlayersInRound(), _this.getPlayersAllIn());
            var winners = (_b = _this._currentHand) === null || _b === void 0 ? void 0 : _b.getWinners(currentPlayersInRound);
            currentPlayersInRound.forEach(function (w) { return w.showCards = true; });
            if (winners)
                _this.playerWinOnShowDown(winners);
            if (_this.observableCallback)
                _this.observableCallback({
                    type: types_1.MOVE_BANK,
                    data: {
                        players: _this.players,
                        bank: (_c = _this._bank) === null || _c === void 0 ? void 0 : _c.getCash(),
                        winnersPositions: []
                    }
                });
            //новая раздача
            setTimeout(function () {
                _this.nextRound();
            }, 6000);
        };
        this.playerWinWithoutShowDown = function (winner) {
            var _a;
            (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.shareBetweenPlayers([winner], _this.getPlayers());
        };
        this.playerWinOnShowDown = function (winners) {
            var _a;
            (_a = _this._bank) === null || _a === void 0 ? void 0 : _a.shareBetweenPlayers(winners, _this.getPlayers());
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
        this.isShowdown = false;
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
