"use strict";
exports.__esModule = true;
var types_1 = require("./types");
var Player = /** @class */ (function () {
    function Player(name, cash, place, position, status) {
        var _this = this;
        this.getId = function () {
            return _this.id;
        };
        this.getName = function () {
            return _this.name;
        };
        this.setCash = function (newCash) {
            _this.cash = newCash;
        };
        this.increaseCash = function (value) {
            _this.cash += value;
        };
        this.actionBet = function (value) {
            if (_this.cash >= value) {
                _this.cash -= value;
                return true;
            }
            else {
                return false;
            }
        };
        this.getCash = function () {
            return _this.cash;
        };
        this.postBigBlind = function (value) {
            if (_this.getCash() >= value) {
                _this.bet = value;
                _this.setCash(_this.getCash() - value);
                return value;
            }
            else {
                //нехватает денег на установку блайнда
                _this.setStatus(types_1.GAME_STATUS_WAIT);
                return 0;
            }
        };
        this.postSmallBlind = function (value) {
            if (_this.getCash() >= value) {
                _this.bet = value;
                _this.setCash(_this.getCash() - value);
                return value;
            }
            else {
                //нехватает денег на установку блайнда
                _this.setStatus(types_1.GAME_STATUS_WAIT);
                return 0;
            }
        };
        this.setPlace = function (newPlace) {
            _this.place = newPlace;
        };
        this.getPlace = function () {
            return _this.place;
        };
        this.setPosition = function (newPosition) {
            _this.position = newPosition;
        };
        this.getPosition = function () {
            return _this.position;
        };
        this.setStatus = function (newStatus) {
            _this.status = newStatus;
        };
        this.getStatus = function () {
            return _this.status;
        };
        this.setCards = function (cards) {
            _this.cards = cards;
        };
        this.getCards = function () {
            return _this.cards;
        };
        this.setTimeBank = function (timeBank) {
            _this.timeBank = timeBank;
        };
        this.getTimeBank = function () {
            return _this.timeBank;
        };
        this.id = place;
        this.name = name;
        this.cash = cash;
        this.place = place;
        this.position = position;
        this.status = status;
        this.timeBank = 30000;
        this.cards = [];
        this.isActive = false;
        this.bet = 0;
        this.fold = null;
        this.check = null;
        this.call = 0;
        this.hasCards = true;
        this.showCards = false;
        this.addedCash = 0;
    }
    return Player;
}());
exports.Player = Player;
