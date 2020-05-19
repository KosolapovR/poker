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
        this.shareBetweenPlayers = function (winners, allPlayers) {
            var playersCount = winners.length, pot = _this.getCash() + allPlayers.reduce(function (acc, p) { return acc + Math.max(p.bet, p.call); }, 0), extra = pot % playersCount, part = (pot - extra) / playersCount;
            winners.forEach(function (p) {
                // p.increaseCash(part);
                p.addedCash = part;
            });
            if (extra)
                for (var i = 0; extra > 0; i++, extra--) {
                    // players[i].increaseCash(1);
                    winners[i].addedCash += 1;
                }
            _this.cash = 0;
        };
        this.cash = 0;
        this.betValue = 0;
    }
    return Bank;
}());
exports["default"] = Bank;
