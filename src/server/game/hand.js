"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Hand = /** @class */ (function () {
    function Hand(players) {
        var _this = this;
        this.dealCards = function (players) {
            players.forEach(function (p) {
                var card1 = _this.currentDeck.splice(Math.floor(Math.random() * _this.currentDeck.length), 1);
                var card2 = _this.currentDeck.splice(Math.floor(Math.random() * _this.currentDeck.length), 1);
                p.setCards([card1, card2]);
            });
        };
        this.deck = [
            'Ah', 'Kh', 'Qh', 'Jh', 'Th', '9h', '8h', '7h', '6h', '5h', '4h', '3h', '2h',
            'As', 'Ks', 'Qs', 'Js', 'Ts', '9s', '8s', '7s', '6s', '5s', '4s', '3s', '2s',
            'Ac', 'Kc', 'Qc', 'Jc', 'Tc', '9c', '8c', '7c', '6c', '5c', '4c', '3c', '2c',
            'Ad', 'Kd', 'Qd', 'Jd', 'Td', '9d', '8d', '7d', '6d', '5d', '4d', '3d', '2d',
        ];
        this.currentDeck = __spreadArrays(this.deck);
        this.dealCards(players);
    }
    return Hand;
}());
exports.Hand = Hand;
