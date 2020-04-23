"use strict";
exports.__esModule = true;
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
        this.getCash = function () {
            return _this.cash;
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
        this.getCards = function (cards) {
            _this.cards = cards;
        };
        this.setCards = function (strings) {
            return _this.cards;
        };
        this.setTimeBank = function (timeBank) {
            _this.timeBank = timeBank;
        };
        this.getTimeBank = function () {
            return _this.timeBank;
        };
        this.countdownStart = function () {
            _this.countDownId = setTimeout(function () {
                this.setTimebank(0);
            }, _this.getTimeBank());
        };
        this.id = place;
        this.name = name;
        this.cash = cash;
        this.place = place;
        this.position = position;
        this.status = status;
        this.timeBank = 30;
        this.cards = [];
    }
    return Player;
}());
exports.Player = Player;
;
