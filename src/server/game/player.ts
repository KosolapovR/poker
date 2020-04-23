export class Player {

    private id: Number;
    private name: String;
    private cash: Number;
    private place: Number;
    private position: String;
    private status: String;
    private timeBank: Number;
    private cards: Array<String>;

    constructor(name: String,
                cash: Number,
                place: Number,
                position: String,
                status: String) {

        this.id = place;
        this.name = name;
        this.cash = cash;
        this.place = place;
        this.position = position;
        this.status = status;
        this.timeBank = 30;
        this.cards = [];
    }

    getId = function () {
        return this.id;
    }

    getName = function () {
        return this.name;
    }

    setCash = function (newCash) {
        this.cash = newCash;
    }

    getCash = function () {
        return this.cash;
    };

    setPlace = function (newPlace) {
        this.place = newPlace;
    };

    getPlace = function () {
        return this.place;
    };

    setPosition = function (newPosition) {
        this.position = newPosition;
    };

    getPosition = function () {
        return this.position;
    };

    setStatus = function (newStatus) {
        this.status = newStatus;
    };

    getStatus = function () {
        return this.status;
    };

    getCards = function (cards: Array<String>) {
        this.cards = cards;
    };

    setCards = function (strings: string[]) {
        return this.cards;
    };

    getTimeBank = function (timeBank) {
        this.timeBank = timeBank;
    };

    setTimeBank = function () {
        return this.timeBank;
    };
};