import {Player} from "./player";

export class Hand {
    private readonly deck: Array<String>;
    private currentDeck: Array<String>;

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

    private dealCards = function (players: Array<Player>) {
        players.forEach(function (p) {
            p.setCards(
                [this.currentDeck.slice(Math.floor(Math.random() * this.currentDeck.length), 1)]
            )
        }.bind(this));
    }



}