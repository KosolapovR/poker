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
    TURN
} from "./types";
import Bank from "./Bank";

class Game {
    private players: Array<Player>;
    private currentHand: Hand | undefined;
    private emptyPlaces: Array<number>;
    private placesInGame: Array<number> | undefined;
    private readonly availablePositions: Array<string>;
    private readonly positionsInGame: Array<string>;
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

        const player = new Player(user.name, 200, place, this.availablePositions[<number>place - 1], GAME_STATUS_IN_GAME);

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

    dealCards = () => {
        if (this.players && this.players.length > 1 && this.observableCallback) {

            this.players.forEach(p => p.setStatus(GAME_STATUS_IN_GAME));

            this.refreshPlayers();

            this.postBlinds();

            this.round = PREFLOP;

            //раздача карт
            this.setCurrentHand(new Hand(this.players));

            //установка активного игрока
            const firstPlayer = this.getFirstPlayer();
            this.setActivePlayer(firstPlayer);
            this.observableCallback({
                type: DEAL_HAND,
                data: {players: this.players, bank: this.bank?.getCash(), betValue: this.bank?.getBetValue()}
            });


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

    private setCurrentHand(value: Hand) {
        this.currentHand = value;
    }


    private getNextPlayer = (currentPlayer: Player | undefined): Player | undefined => {
        if (currentPlayer) {
            const place: number = this.positionsInGame.indexOf(currentPlayer.getPosition());

            if (place > 0) {
                return this.players.find(p =>
                    p.getPosition() === this.positionsInGame[place - 1]
                );
            } else if (place === 0) {
                let nextPlayer = this.players.find(p =>
                    p.getPosition() === this.positionsInGame[this.positionsInGame.length - 1]
                );
                if (this.bank && nextPlayer) {
                    //проверка неободимости следующего круга ставок
                    if (nextPlayer.bet && nextPlayer.bet < this.bank?.getBetValue() ||
                        nextPlayer.call && nextPlayer.call < this.bank?.getBetValue())
                        return nextPlayer;
                }
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

        let nextPlayer: Player | undefined = this.getNextPlayer(this.activePlayer);

        console.log(nextPlayer?.getStatus());

        if (nextPlayer)
            while (nextPlayer?.getStatus() !== GAME_STATUS_IN_GAME) {
                nextPlayer = this.getNextPlayer(nextPlayer);
                console.log(nextPlayer?.getStatus());
            }

        if (nextPlayer) {
            //фолд на ставку
            if (this.bank && this.activePlayer && !this.activePlayer.call)
                if (this.bank.getBetValue()) {
                    this.activePlayer.fold = true;
                    this.activePlayer.setStatus(GAME_STATUS_WAIT);
                } else {
                    this.activePlayer.check = true;
                }


            this.setActivePlayer(nextPlayer);
            this.startPlayerTimeBank(nextPlayer);
        } else {
            //обработка выигрыша без вскрытия
            if (this.getPlayersInRound().length < 2) {

                this.playerWinWithoutShowDown(this.activePlayer);

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
                this.stopPlayerTimeBank();
            }
        }
    };

    playerCall = () => {
        if (this.activePlayer && this.bank) {
            let activePlayerBet = 0;

            if (this.activePlayer.bet) {
                activePlayerBet = this.activePlayer.bet;
            } else if (this.activePlayer.call) {
                activePlayerBet = this.activePlayer.call;
            }

            const callValue = this.bank.getBetValue() - activePlayerBet;
            if (callValue) {
                const isCallSuccess = this.activePlayer.decreaseCash(callValue);

                if (isCallSuccess) {
                    this.activePlayer.call = activePlayerBet + callValue;
                    this.activePlayer.bet = 0;

                    this.stopPlayerTimeBank();
                }
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
            p.call = 0;
            p.bet = 0;
            p.fold = false;

            if(p.getStatus() !== GAME_STATUS_IN_GAME){
                p.hasCards = false;
            }
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

        this.bank = new Bank();
        this.bank.setBetValue(bigBlind > smallBlind ? bigBlind : smallBlind);
    };

    private dealFlop = () => {
        const flop = this.currentHand?.generateFlop();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: FLOP, data: {flop, players: this.players, bank: this.bank?.getCash()}});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    private dealTurn = () => {
        const turn = this.currentHand?.generateTurn();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: TURN, data: {turn, bank: this.bank?.getCash()}});

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

    private playerWinWithoutShowDown = (winner: Player | undefined) => {

        let sum = 0;

        this.players.forEach(p =>
            p.bet ? sum += p.bet : p.call ? sum += p.call : sum
        );

        this.bank?.addCash(sum);

        if (this.bank && winner) {
            winner.increaseCash(this.bank.getCash());
        }
    };

    private updateBank = () => {
        let sum = 0;

        this.players.forEach(p => sum += p.bet + p.call);

        this.bank?.addCash(sum);

        //очищаем ставки за прошлый раунд
        this.bank?.setBetValue(0);
    };

    private nextRound = () => {

        this.updateBank();
        this.refreshPlayers();

        switch (this.round) {
            case PREFLOP: {
                console.log('dealFlop');
                this.round = FLOP;
                this.dealFlop();
                break;
            }
            case FLOP: {
                this.round = TURN;
                this.dealTurn();
                break;
            }
            case TURN: {
                this.round = RIVER;
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