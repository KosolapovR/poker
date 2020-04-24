import {Player} from "./player";
import {Hand} from "./hand";

class Game {
    private players: Array<Player>;
    private currentHand: Hand | undefined;
    private emptyPlaces: Array<number>;
    private availablePositions: Array<string>;
    private positionsInGame: Array<string>;
    private statuses: Array<string>;

    constructor() {
        this.players = [];
        this.emptyPlaces = [6, 5, 4, 3, 2, 1];
        this.availablePositions = ['bb', 'sb', 'but', 'cut', 'mp', 'utg'];
        this.positionsInGame = [];
        this.statuses = ['inGame', 'wait', 'fold', 'show'];

    }

    getPlayers = () => {
        return this.players
    };

    hasEmptyPlaces = () => {
      return Boolean(this.emptyPlaces.length);
    };

    addPlayer = ({user}: { user: any }) => {
        const place = this.emptyPlaces.pop();

        const player = new Player(user.name, 200, place, this.availablePositions[<number>place - 1], this.statuses[1]);

        this.players.push(player);

        this.positionsInGame[this.positionsInGame.length] = this.availablePositions[this.positionsInGame.length];

        return player;
    };

    removePlayer = (player: Player) => {
        this.positionsInGame.pop();
        this.emptyPlaces.push(<number>player.getPlace());
        this.players = this.players.filter(p => p.getId() !== player.getId());
    };

    getPositionsInGame = () => {
        return this.positionsInGame
    };

    dealCards = () => {
        this.setCurrentHand(new Hand(this.players));
    };


    getCurrentHand(): Hand {
        return <Hand>this.currentHand;
    }

    setCurrentHand(value: Hand) {
        this.currentHand = value;
    }
};

module.exports = Game;