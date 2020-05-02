import {Player} from "./player";
import {Hand} from "./hand";
import {
    DEAL_HAND,
    FLOP,
    GAME_STATUS_IN_GAME,
    GAME_STATUS_WAIT,
    PREFLOP,
    RIVER,
    SHOWDOWN,
    START_TIMER,
    STOP_TIMER,
    TURN
} from "./types";
import Bank from "./Bank";

class Game {
    private players: Array<Player>;
    private currentHand: Hand | undefined;
    private emptyPlaces: Array<number>;
    private placesInGame: Array<number> | undefined;
    private readonly availablePositions: Array<string>;
    private positionsInGame: Array<string>;
    private readonly statuses: Array<string>;
    private activePlayer: Player | undefined;
    private timerId: NodeJS.Timeout | undefined;
    private observableCallback: Function | undefined;
    private round: string | undefined;
    private bank: Bank | undefined;

    constructor() {
        this.players = [];
        this.emptyPlaces = [6, 5, 4, 3, 2, 1];
        this.availablePositions = ['bb', 'sb', 'but', 'cut', 'mp', 'utg'];
        this.positionsInGame = [];
        this.statuses = ['inGame', 'wait', 'fold', 'show'];
    }

    subscribe = (callback: Function) => {
        this.observableCallback = callback;
    };

    private getFirstPlayer = () => {
        const player: Player | undefined = this.players.find(p =>
            p.getPosition() === this.positionsInGame[this.positionsInGame.length - 1]);
        return <Player>player;
    };

    private setActivePlayer = (player: Player) => {
        player.isActive = true;
        this.activePlayer = player;
    };

    private getPlayersInRound = (): Array<Player> => {
        return this.players.filter(p => p.getStatus() === GAME_STATUS_IN_GAME)
    };

    getPlayers = () => {
        return <Array<Player>>this.players
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

    private getPositionsInGame = () => {
        return this.positionsInGame
    };

    dealCards = () => {
        if (this.players && this.players.length > 1 && this.observableCallback) {

            this.refreshPlayers();

            this.postBlinds();

            this.round = PREFLOP;

            this.players.forEach(p => p.setStatus(GAME_STATUS_IN_GAME));

            //раздача карт
            this.setCurrentHand(new Hand(this.players));

            //установка активного игрока
            const firstPlayer = this.getFirstPlayer();
            this.setActivePlayer(firstPlayer);
            this.observableCallback({type: DEAL_HAND, data: {players: this.players, bank: this.bank?.getCash()}});


            //запуск таймера
            this.startPlayerTimeBank(firstPlayer)
        }
    };

    private changePlayersPositions = () => {
        this.players.forEach(p => {
            let positionIndex = this.positionsInGame.indexOf(p.getPosition());
            console.log('this pos = ', p.getPosition(), 'new posIndex', positionIndex + 1, 'pos in game = ', this.positionsInGame);
            if (positionIndex + 1 < this.positionsInGame.length) {
                p.setPosition(this.positionsInGame[++positionIndex]);
            } else {
                p.setPosition(this.positionsInGame[0]);
            }
        })
    };

    getCurrentHand(): Hand {
        return <Hand>this.currentHand;
    }

    private setCurrentHand(value: Hand) {
        this.currentHand = value;
    }


    private getNextPlayer = () => {
        if (this.activePlayer) {
            const place: number = this.positionsInGame.indexOf(this.activePlayer.getPosition());

            if (place) {
                return this.players.find(p => p.getPosition() === this.positionsInGame[place - 1]);
            }
        }

    };

    private startPlayerTimeBank = (player: Player) => {
        if (this.players && this.players.length > 1) {

            const timeBank = player.getTimeBank();

            this.timerId = setTimeout(() => {
                this.stopPlayerTimeBank();
            }, timeBank);

            if (this.observableCallback) {
                this.observableCallback({type: START_TIMER, data: this.players});
            }
        }
    };

    private stopPlayerTimeBank = (): void => {
        //остановка таймера
        clearTimeout(<NodeJS.Timeout>this.timerId);

        this.players.forEach(p => p.isActive = false);


        //уведомление подписчика
        if (this.observableCallback)
            this.observableCallback({type: STOP_TIMER, data: {player: this.activePlayer}});

        const nextPlayer: Player | undefined = this.getNextPlayer();

        if (nextPlayer) {
            //фолд на ставку
            if (this.bank && this.activePlayer)
                if (this.bank.getBetValue()) {
                    this.activePlayer.fold = true;
                    this.activePlayer.setStatus(GAME_STATUS_WAIT);
                }


            this.setActivePlayer(nextPlayer);
            this.startPlayerTimeBank(nextPlayer);
        } else {
            //обработка выигрыша без вскрытия
            if (this.getPlayersInRound().length < 2) {
                const winner = this.getPlayersInRound()[0];

                this.playerWinWithoutShowDown(winner);

                this.changePlayersPositions();

                this.dealCards();

            } else {
                this.nextRound();
            }
        }
    };

    playerBet = (betValue: number) => {
        if (this.activePlayer && this.bank) {

            const isBetSuccess = this.activePlayer.decreaseCash(betValue);

            if (isBetSuccess) {
                this.activePlayer.bet = betValue;
                this.bank.addCash(betValue);

                this.stopPlayerTimeBank();
            }
        }
    };

    playerCall = () => {
        if (this.activePlayer && this.bank) {

            const callValue = this.bank.getBetValue();

            const isCallSuccess = this.activePlayer.decreaseCash(callValue);

            if (isCallSuccess) {
                this.activePlayer.call = callValue;
                this.bank.addCash(callValue);

                this.stopPlayerTimeBank();
            }
        }
    };

    playerFold = () => {
        if (this.activePlayer) {
            this.activePlayer.fold = true;
            this.activePlayer.setStatus(GAME_STATUS_WAIT);
            this.stopPlayerTimeBank();
        }
    };

    playerCheck = () => {
        if (this.activePlayer) {
            this.activePlayer.check = true;
            this.stopPlayerTimeBank();
        }
    };

    private refreshPlayers = (): void => {
        this.players.forEach(p => {
            p.check = false;
            p.call = null;
            p.bet = null;
            p.fold = false;
        })
    };

    private postBlinds = () => {

        const playerOnBB = this.players.find(p => p.getPosition() === 'bb');
        const playerOnSB = this.players.find(p => p.getPosition() === 'sb');

        let smallBlind = 0;
        let bigBlind = 0;

        if (playerOnBB) {
            bigBlind = playerOnBB.postBigBlind(2);
        }

        if (playerOnSB) {
            smallBlind = playerOnSB.postSmallBlind(1);
        }

        this.bank = new Bank(smallBlind + bigBlind);
        console.log('post blinds: ', this.bank.getCash());
        this.bank.setBetValue(bigBlind > smallBlind ? bigBlind : smallBlind);
    };

    private dealFlop = () => {
        const flop = this.currentHand?.generateFlop();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: FLOP, data: flop});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    private dealTurn = () => {
        const turn = this.currentHand?.generateTurn();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: TURN, data: turn});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    private dealRiver = () => {
        const river = this.currentHand?.generateRiver();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: RIVER, data: river});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    private showdown = () => {

    };

    private playerWinWithoutShowDown = (winner: Player) => {
        if (this.bank) {
            winner.increaseCash(this.bank.getCash());
        }
    };

    private nextRound = () => {

        this.refreshPlayers();

        switch (this.round) {
            case PREFLOP: {
                this.dealFlop();
                break;
            }
            case FLOP: {
                this.dealTurn();
                break;
            }
            case TURN: {
                this.dealRiver();
                break;
            }
            case RIVER: {
                this.showdown();
                break;
            }
            case SHOWDOWN: {
                this.dealCards()
            }
            default:
                break;
        }
    }
}

module.exports = Game;