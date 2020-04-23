import {Player} from "./player";
import {Hand} from "./Hand";

export class Game {
    private players: Array<Player>;
    private handHistory: Array<Hand>;
    private emptyPlaces: Array<Number>;
    private availablePositions: Array<String>;
    private positionsInGame: Array<Number>;
    private statuses: Array<String>;

    constructor() {
        this.players = [];
        this.emptyPlaces = [6, 5, 4, 3, 2, 1];
        this.availablePositions = ['sb', 'bb', 'utg', 'mp', 'cut', 'but'];
        this.positionsInGame = [];
        this.statuses = ['inGame', 'wait', 'fold', 'show'];
    }

    getPlayers = function () {
        return this.players
    };

    addPlayer = function (user) {
        const place = this.emptyPlaces.pop();

        const player = new Player(user.name, 200, place, this.availablePositions[place - 1], this.statuses[1]);

        this.players.push(player);

        this.positionsInGame[this.positionsInGame.length] = this.availablePositions[this.positionsInGame.length];

        return player;
    };

    removePlayer = function (player: Player) {
        this.positionsInGame.pop();
        this.emptyPlaces.push(player.getPosition());
        this.players = this.players.filter(p => p.getId() !== player.getId());
    };

    getPositionsInGame = function () {
        return this.positionsInGame
    }

    dealCards = function () {

    }
};