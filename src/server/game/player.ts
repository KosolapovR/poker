export class Player {

    private readonly id: number | undefined;
    private readonly name: string;
    private cash: number;
    private place: number | undefined;
    private position: string;
    private status: string;
    private timeBank: number;
    private cards: string[][];
    private countDownId: any;
    public isActive: boolean;

    constructor(name: string,
                cash: number,
                place: number | undefined,
                position: string,
                status: string) {

        this.id = place;
        this.name = name;
        this.cash = cash;
        this.place = place;
        this.position = position;
        this.status = status;
        this.timeBank = 5000;
        this.cards = [];
        this.isActive = false;
    }

    getId = () => {
        return this.id;
    };

    getName = () => {
        return this.name;
    };

    setCash = (newCash: number) => {
        this.cash = newCash;
    };

    getCash = () => {
        return this.cash;
    };

    setPlace = (newPlace: number) => {
        this.place = newPlace;
    };

    getPlace = () => {
        return this.place;
    };

    setPosition = (newPosition: string) => {
        this.position = newPosition;
    };

    getPosition = () => {
        return this.position;
    };

    setStatus = (newStatus: string) => {
        this.status = newStatus;
    };

    getStatus = () => {
        return this.status;
    };

    setCards = (cards: string[][]) => {
        this.cards = cards;
    };

    getCards = (strings: string[][]) => {
        return this.cards;
    };

    setTimeBank = (timeBank: number) => {
        this.timeBank = timeBank;
    };

    getTimeBank = () => {
        return this.timeBank;
    };
/*
    countdownStart = () => {
        this.countDownId = setTimeout(function () {
            this.setTimebank(0);
        }, this.getTimeBank());
    };*/
};