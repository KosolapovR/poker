import {Player} from "./player";

export class Hand {
    private readonly deck: Array<string>;
    private currentDeck: Array<string>;
    private flop: Array<string> | undefined;
    private turn: string | undefined;
    private river: string | undefined;

    constructor(players: Array<Player>) {
        this.deck = [
            'Ah', 'Kh', 'Qh', 'Jh', 'Th', '9h', '8h', '7h', '6h', '5h', '4h', '3h', '2h',
            'As', 'Ks', 'Qs', 'Js', 'Ts', '9s', '8s', '7s', '6s', '5s', '4s', '3s', '2s',
            'Ac', 'Kc', 'Qc', 'Jc', 'Tc', '9c', '8c', '7c', '6c', '5c', '4c', '3c', '2c',
            'Ad', 'Kd', 'Qd', 'Jd', 'Td', '9d', '8d', '7d', '6d', '5d', '4d', '3d', '2d',
        ];

        this.currentDeck = [...this.deck];

        this.dealCards(players);
    }

    private dealCards = (players: Array<Player>) => {
        players.forEach((p: Player) => {
            const card1 = this.currentDeck.splice(Math.floor(Math.random() * this.currentDeck.length), 1);
            const card2 = this.currentDeck.splice(Math.floor(Math.random() * this.currentDeck.length), 1);

            p.setCards([card1, card2]);
        });
    };

    public generateFlop = (): Array<string> => {
        const card1 = this.currentDeck.splice(Math.floor(Math.random() * this.currentDeck.length), 1);
        const card2 = this.currentDeck.splice(Math.floor(Math.random() * this.currentDeck.length), 1);
        const card3 = this.currentDeck.splice(Math.floor(Math.random() * this.currentDeck.length), 1);

        return this.flop = [...card1, ...card2, ...card3];
    };

    public generateTurn = (): string => {
        const card = this.currentDeck.splice(Math.floor(Math.random() * this.currentDeck.length), 1);

        return this.turn = card[0];
    };

    public generateRiver = (): string => {
        const card = this.currentDeck.splice(Math.floor(Math.random() * this.currentDeck.length), 1);

        return this.river = card[0];
    };

    public getFlop = (): Array<string> | undefined => {
        return this.flop;
    };

    public getTurn = (): string | undefined => {
        return this.turn;
    };

    public getRiver = (): string | undefined => {
        return this.river;
    };
}