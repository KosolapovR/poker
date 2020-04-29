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
    private availablePositions: Array<string>;
    private positionsInGame: Array<string>;
    private statuses: Array<string>;
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

    getFirstPlayer = () => {
        const player: Player | undefined = this.players.find(p =>
            p.getPosition() === this.positionsInGame[this.positionsInGame.length - 1]);
        return <Player>player;
    };

    setActivePlayer = (player: Player) => {
        player.isActive = true;
        this.activePlayer = player;
    };

    getActivePlayer = () => {
        return <Player>this.activePlayer;
    };

    getPlayersInRound = (): Array<Player> => {
        return this.players.filter(p => p.getStatus() !== GAME_STATUS_IN_GAME)
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

    getPositionsInGame = () => {
        return this.positionsInGame
    };

    dealCards = () => {
        if (this.players && this.players.length > 1 && this.observableCallback) {

            this.postBlinds();

            this.round = PREFLOP;

            this.players.forEach(p => p.setStatus(GAME_STATUS_IN_GAME));

            //раздача карт
            this.setCurrentHand(new Hand(this.players));

            //установка активного игрока
            const firstPlayer = this.getFirstPlayer();
            this.setActivePlayer(firstPlayer);
            this.observableCallback({type: DEAL_HAND, data: this.players});


            //запуск таймера
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

        if (place) {
            return this.players.find(p => p.getPlace() === place - 1)
        }
    };

    startPlayerTimeBank = (player: Player) => {
        if (this.players && this.players.length > 1) {

            const timeBank = player.getTimeBank();

            this.timerId = setTimeout(() => {
                this.stopPlayerTimeBank();
            }, timeBank);

            if (this.observableCallback) {
                const time = Date.now() + timeBank;
                this.observableCallback({type: START_TIMER, data: {player, time}});
            }
        }
    };

    stopPlayerTimeBank = (): void => {
        //остановка таймера
        clearTimeout(<NodeJS.Timeout>this.timerId);

        //уведомление подписчика
        if (this.observableCallback)
            this.observableCallback({type: STOP_TIMER, data: {player: this.activePlayer}});

        const nextPlayer: Player | undefined = this.getNextPlayer();

        if (nextPlayer) {
            this.setActivePlayer(nextPlayer);
            this.startPlayerTimeBank(nextPlayer);
        } else {
            //обработка выигрыша без вскрытия
            if (this.getPlayersInRound().length < 2) {
                const winner = this.getPlayersInRound()[0];

                this.playerWinWithoutShowDown(winner);

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
                this.activePlayer.call = callValue
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

    refreshPlayers = (): void => {
        this.players.forEach(p => {
            p.check = false;
            p.call = null;
            p.bet = null;
            p.fold = false;
        })
    };

    postBlinds = () => {

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
        this.bank.setBetValue(bigBlind > smallBlind ? bigBlind : smallBlind);
    };

    dealFlop = () => {
        const flop = this.currentHand?.generateFlop();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: FLOP, data: flop});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    dealTurn = () => {
        const turn = this.currentHand?.generateTurn();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: TURN, data: turn});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    dealRiver = () => {
        const river = this.currentHand?.generateRiver();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: RIVER, data: river});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    showdown = () => {

    };

    playerWinWithoutShowDown = (winner: Player) => {
        if (this.bank) {
            winner.increaseCash(this.bank.getCash());
        }
    };

    nextRound = () => {

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
};

module.exports = Game;