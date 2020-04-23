"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(name, cash, place, position, status) {
        this.getId = function () {
            return this.id;
        };
        this.getName = function () {
            return this.name;
        };
        this.setCash = function (newCash) {
            this.cash = newCash;
        };
        this.getCash = function () {
            return this.cash;
        };
        this.setPlace = function (newPlace) {
            this.place = newPlace;
        };
        this.getPlace = function () {
            return this.place;
        };
        this.setPosition = function (newPosition) {
            this.position = newPosition;
        };
        this.getPosition = function () {
            return this.position;
        };
        this.setStatus = function (newStatus) {
            this.status = newStatus;
        };
        this.getStatus = function () {
            return this.status;
        };
        this.getTimeBank = function (timeBank) {
            this.timeBank = timeBank;
        };
        this.setTimeBank = function () {
            return this.timeBank;
        };
        this.id = place;
        this.name = name;
        this.cash = cash;
        this.place = place;
        this.position = position;
        this.status = status;
        this.timeBank = 30;
    }
    return Player;
}());
exports.Player = Player;
;
