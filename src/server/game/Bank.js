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
        this.cash = 0;
        this.betValue = 0;
    }
    return Bank;
}());
exports["default"] = Bank;
