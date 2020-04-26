import {Player} from "./player";
import {Hand} from "./hand";

class Game {
    private players: Array<Player>;
    private currentHand: Hand | undefined;
    private emptyPlaces: Array<number>;
    private placesInGame: Array<number> | undefined;
    private availablePositions: Array<string>;
    private positionsInGame: Array<string>;
    private statuses: Array<string>;
    private activePlayer: Player | undefined;
    private timerId: NodeJS.Timeout | undefined;

    constructor() {
        this.players = [];
        this.emptyPlaces = [6, 5, 4, 3, 2, 1];
        this.availablePositions = ['bb', 'sb', 'but', 'cut', 'mp', 'utg'];
        this.positionsInGame = [];
        this.statuses = ['inGame', 'wait', 'fold', 'show'];
    }

    getFirstPlayer = () => {
        const player: Player | undefined = this.players.find(p =>
            p.getPosition() === this.positionsInGame[this.positionsInGame.length - 1]);
        return <Player>player;
    };

    setActivePlayer = (player: Player) => {
        this.activePlayer = player;
    };

    getActivePlayer = () => {
        return <Player>this.activePlayer;
    };

    getPlayers = () => {
        return <Array<Player>>this.players
    };

    hasEmptyPlaces = () => {
        return Boolean(this.emptyPlaces.length);
    };

    addPlayer = ({user}: { user: any }) => {
        const place = this.emptyPlaces.pop();

        if (place && this.placesInGame)
            this.placesInGame.push(place);

        const player = new Player(user.name, 200, place, this.availablePositions[<number>place - 1], this.statuses[1]);

        if (player)
            this.players.push(player);

        this.positionsInGame[this.positionsInGame.length] = this.availablePositions[this.positionsInGame.length];

        return <Player>player;
    };

    removePlayer = (player: Player) => {
        this.positionsInGame.pop();
        this.emptyPlaces.push(<number>player.getPlace());
        if (this.placesInGame)
            this.placesInGame.filter(place => place !== player.getPlace());
        this.players = this.players.filter(p => p.getId() !== player.getId());
    };

    getPositionsInGame = () => {
        return this.positionsInGame
    };

    dealCards = () => {
        if (this.players && this.players.length > 1) {
            console.log('Dealing cards');
            this.setCurrentHand(new Hand(this.players));

            const firstPlayer = this.getFirstPlayer();

            this.setActivePlayer(firstPlayer);
            this.startPlayerTimeBank(firstPlayer)
        }
    };


    getCurrentHand(): Hand {
        return <Hand>this.currentHand;
    }

    setCurrentHand(value: Hand) {
        this.currentHand = value;
    }


    getNextPlayer = () => {
        const place: number | undefined = this.activePlayer?.getPlace();
        console.log('active player place = ', place);
        if (place) {
                return this.players.find(p => p.getPlace() === place - 1)
        }
    };

    startPlayerTimeBank = (player: Player) => {
        if (this.players && this.players.length > 1) {
            console.log('Player on position: ', player.getPosition(), 'startTimeBank');
            this.timerId = setTimeout(() => {
                this.stopPlayerTimeBank();
            }, player.getTimeBank());
        }
    };

    stopPlayerTimeBank = (): void => {
        console.log('Player on position: ', this.activePlayer?.getPosition(), 'endTimeBank');
        clearTimeout(<NodeJS.Timeout>this.timerId);
        const nextPlayer: Player | undefined = this.getNextPlayer();
        console.log('nextPlayer = ', nextPlayer?.getPosition());
        if (nextPlayer) {
            this.setActivePlayer(nextPlayer);
            console.log('смена активного игрока');
            this.startPlayerTimeBank(nextPlayer);
        }

    }
};

module.exports = Game;