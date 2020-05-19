"use strict";
exports.__esModule = true;
var Bank = /** @class */ (function () {
    function Bank() {
        var _this = this;
        this.getCash = function () {
            return _this.cash;
        };
        this.addCash = function (cash) {
            _this.cash = _this.cash ? _this.cash += cash : cash;
        };
        this.getBetValue = function () {
            return _this.betValue;
        };
        this.setBetValue = function (value) {
            _this.betValue = value;
        };
        this.shareBetweenPlayers = function (players) {
            var playersCount = players.length, pot = _this.getCash(), extra = pot % playersCount, part = (pot - extra) / playersCount;
            if (playersCount === 3)
                console.log('pot = ', pot, ' extra = ', extra, ' part = ', part);
            players.forEach(function (p) {
                // p.increaseCash(part);
                p.addedCash = part;
            });
            for (var i = 0; extra > 0; i++, extra--) {
                // players[i].increaseCash(1);
                players[i].addedCash += 1;
            }
            _this.cash = 0;
        };
        this.cash = 0;
        this.betValue = 0;
    }
    return Bank;
}());
exports["default"] = Bank;
