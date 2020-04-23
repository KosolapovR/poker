export class Player {

    private readonly id: number;
    private readonly name: string;
    private cash: number;
    private place: number;
    private position: string;
    private status: string;
    private timeBank: number;
    private cards: Array<string>;
    private countDownId: any;

    constructor(name: string,
                cash: number,
                place: number,
                position: string,
                status: string) {

        this.id = place;
        this.name = name;
        this.cash = cash;
        this.place = place;
        this.position = position;
        this.status = status;
        this.timeBank = 30;
        this.cards = [];
    }

    getId = () => {
        return this.id;
    };

    getName = () => {
        return this.name;
    };

    setCash = (newCash) => {
        this.cash = newCash;
    };

    getCash = () => {
        return this.cash;
    };

    setPlace = (newPlace) => {
        this.place = newPlace;
    };

    getPlace = () => {
        return this.place;
    };

    setPosition = (newPosition) => {
        this.position = newPosition;
    };

    getPosition = () => {
        return this.position;
    };

    setStatus = (newStatus) => {
        this.status = newStatus;
    };

    getStatus = () => {
        return this.status;
    };

    getCards = (cards: Array<string>) => {
        this.cards = cards;
    };

    setCards = (strings: string[]) => {
        return this.cards;
    };

    setTimeBank = (timeBank: number) => {
        this.timeBank = timeBank;
    };

    getTimeBank = () => {
        return this.timeBank;
    };

    countdownStart = () => {
        this.countDownId = setTimeout(function () {
            this.setTimebank(0);
        }, this.getTimeBank());
    };
};