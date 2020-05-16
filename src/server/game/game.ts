import {Player} from "./player";
import {CurrentHand} from "./hand";
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
    private _currentHand: CurrentHand | undefined;
    private emptyPlaces: Array<number>;
    private placesInGame: Array<number> | undefined;
    private readonly availablePositions: Array<string>;
    private readonly positionsInGame: Array<string>;
    private activePlayer: Player | undefined;
    private timerId: NodeJS.Timeout | undefined;
    private observableCallback: Function | undefined;
    private round: string | undefined;
    private _bank: Bank | undefined;
    public firstCircle: boolean;

    constructor() {
        this.players = [];
        this.emptyPlaces = [6, 5, 4, 3, 2, 1];
        this.availablePositions = ['bb', 'sb', 'but', 'cut', 'mp', 'utg'];
        this.positionsInGame = [];
        this.firstCircle = true;
    }

    subscribe = (callback: Function) => {
        this.observableCallback = callback;
    };

    public getBank(): Bank | undefined {
        return this._bank;
    }

    public setBank() {
        this._bank = new Bank();
    }

    public getFirstPlayer = () => {
        const player: Player | undefined = this.players.find(p =>
            p.getPosition() === this.positionsInGame[this.positionsInGame.length - 1]);
        return <Player>player;
    };

    public setActivePlayer = (player: Player) => {
        player.isActive = true;
        this.activePlayer = player;
    };

    public getActivePlayer = (): Player | undefined => {
        return this.activePlayer;
    };

    private getPlayersInRound = (): Array<Player> => {
        return this.players.filter(p => p.getStatus() === GAME_STATUS_IN_GAME)
    };

    getPlayers = () => {
        return <Array<Player>>this.players
    };

    addPlayer = ({user}: { user: any }) => {
        if (this.getPlayers().length < 6) {
            const place = this.emptyPlaces.pop();

            if (place && this.placesInGame)
                this.placesInGame.push(place);

            const player = new Player(user.name, 200, place, this.availablePositions[<number>place - 1], GAME_STATUS_IN_GAME);

            if (player)
                this.players.push(player);

            this.positionsInGame[this.positionsInGame.length] = this.availablePositions[this.positionsInGame.length];

            return <Player>player;
        }
    };

    removePlayer = (player: Player) => {
        this.positionsInGame.pop();
        this.emptyPlaces.push(<number>player.getPlace());

        if (this.placesInGame)
            this.placesInGame.filter(place => place !== player.getPlace());

        this.players = this.players.filter(p => p.getId() !== player.getId());

        player.setPlace(0);
    };

    dealCards = () => {
        if (this.players && this.players.length > 1 && this.observableCallback) {

            this.players.forEach(p => p.setStatus(GAME_STATUS_IN_GAME));

            this.firstCircle = true;

            this.refreshPlayers();

            this.postBlinds();

            this.round = PREFLOP;

            //раздача карт
            this.setCurrentHand(new CurrentHand(this.players));

            //установка активного игрока
            const firstPlayer = this.getFirstPlayer();
            this.setActivePlayer(firstPlayer);
            this.observableCallback({
                type: DEAL_HAND,
                data: {players: this.players, bank: this._bank?.getCash(), betValue: this._bank?.getBetValue()}
            });

            console.log("Раздача карт");
            //запуск таймера
            this.startPlayerTimeBank(firstPlayer);

        }
    };

    private changePlayersPositions = () => {
        this.players.forEach(p => {
            let positionIndex = this.positionsInGame.indexOf(p.getPosition());
            // console.log('this pos = ', p.getPosition(), 'new posIndex', positionIndex + 1, 'pos in game = ', this.positionsInGame);
            if (positionIndex + 1 < this.positionsInGame.length) {
                p.setPosition(this.positionsInGame[++positionIndex]);
            } else {
                p.setPosition(this.positionsInGame[0]);
            }
        })
    };

    private setCurrentHand(value: CurrentHand) {
        this._currentHand = value;
    }

    public getNextPlayer = (currentPlayer: Player | undefined): Player | undefined => {
        if (currentPlayer) {
            const place: number = this.positionsInGame.indexOf(currentPlayer.getPosition());

            let nextPlayer: Player | undefined;

            if (place === 0) {
                if (this.firstCircle) this.firstCircle = false;

                nextPlayer = this.players.find(p =>
                    p.getPosition() === this.positionsInGame[this.positionsInGame.length - 1]
                );

                while (nextPlayer?.getStatus() !== GAME_STATUS_IN_GAME) {
                    nextPlayer = this.getNextPlayer(nextPlayer);
                    if (!nextPlayer?.getStatus()) break;
                }

            } else {
                nextPlayer = this.players.find(p =>
                    p.getPosition() === this.positionsInGame[place - 1]
                );

                while (nextPlayer?.getStatus() !== GAME_STATUS_IN_GAME) {
                    nextPlayer = this.getNextPlayer(nextPlayer);
                    if (!nextPlayer?.getStatus()) break;
                }
            }

            if (nextPlayer && this._bank &&
                nextPlayer.getStatus() === GAME_STATUS_IN_GAME &&
                (nextPlayer?.bet >= this._bank?.getBetValue() ||
                    nextPlayer?.call === this._bank?.getBetValue()) &&
                !this.firstCircle) {
                console.log('+++++++++++ Ставка следующего больше размера банка +++++++++++');
                return undefined;
            }

            console.log('----------- Получен следующий игрок -----------');

            return nextPlayer;
        }

    };

    private startPlayerTimeBank = (player: Player) => {
        if (this.players && this.players.length > 1) {

            const timeBank = player.getTimeBank();

            this.timerId = setTimeout(() => {
                this.stopPlayerTimeBank();
            }, timeBank);

            if (this.observableCallback) {
                this.observableCallback({
                    type: START_TIMER,
                    data: {players: this.players, betValue: this._bank?.getBetValue()}
                });
            }
        }
    };

    private stopPlayerTimeBank = (): void => {

        if (this.timerId) {

            //остановка таймера
            clearTimeout(<NodeJS.Timeout>this.timerId);

            this.players.forEach(p => p.isActive = false);

            //обработка выигрыша без вскрытия
            if (this.getPlayersInRound().length < 2) {

                this.playerWinWithoutShowDown(this.getPlayersInRound()[0]);

                this.changePlayersPositions();

                this.dealCards();

            } else {
                let nextPlayer: Player | undefined = this.getNextPlayer(this.activePlayer);
                if (nextPlayer)
                    while (nextPlayer?.getStatus() !== GAME_STATUS_IN_GAME) {
                        console.log("статус следующего игрока = ", nextPlayer?.getStatus());
                        nextPlayer = this.getNextPlayer(nextPlayer);
                        console.log("статус следующего игрока = ", nextPlayer?.getStatus());
                        if (!nextPlayer?.getStatus()) break;
                    }

                if (nextPlayer) {
                    //фолд на ставку
                    if (this._bank && this.activePlayer && !this.activePlayer.call && !this.activePlayer.bet)
                        if (this._bank.getBetValue()) {
                            this.activePlayer.fold = true;
                            this.activePlayer.setStatus(GAME_STATUS_WAIT);
                        } else {
                            this.activePlayer.check = true;
                        }

                    console.log('Set active player = ', nextPlayer.getPosition());
                    this.setActivePlayer(nextPlayer);
                    this.startPlayerTimeBank(nextPlayer);
                } else {
                    this.nextRound();
                }
            }
        }
    };

    playerBet = (betValue: number) => {

        if (this.activePlayer && this._bank && betValue > this._bank.getBetValue()) {

            let heroTotalBet = betValue - (this.activePlayer.call + this.activePlayer.bet);

            const isBetSuccess = this.activePlayer.actionBet(heroTotalBet);

            if (isBetSuccess) {
                this.activePlayer.bet = betValue;
                this.activePlayer.call = 0;

                console.log("bet success");

                this._bank.setBetValue(betValue);

                this.stopPlayerTimeBank();
            }
        }
    };

    playerCall = () => {
        if (this.activePlayer && this._bank) {
            let activePlayerBet = 0;

            if (this.activePlayer.bet) {
                activePlayerBet = this.activePlayer.bet;
            } else if (this.activePlayer.call) {
                activePlayerBet = this.activePlayer.call;
            }

            const callValue = this._bank.getBetValue() - activePlayerBet;

            console.log('player call: ', callValue);
            if (callValue > 0) {
                const isCallSuccess = this.activePlayer.actionBet(callValue);

                if (isCallSuccess) {
                    console.log('call success', activePlayerBet + callValue);
                    this.activePlayer.call = activePlayerBet + callValue;
                    this.activePlayer.bet = 0;

                    this._bank.setBetValue(activePlayerBet + callValue);

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

            if (p.getStatus() !== GAME_STATUS_IN_GAME) {
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

        this._bank = new Bank();
        this._bank.setBetValue(bigBlind > smallBlind ? bigBlind : smallBlind);
    };

    private dealFlop = () => {
        const flop = this._currentHand?.generateFlop();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: FLOP, data: {flop, players: this.players, bank: this._bank?.getCash()}});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    private dealTurn = () => {
        const turn = this._currentHand?.generateTurn();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: TURN, data: {turn, players: this.players, bank: this._bank?.getCash()}});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    private dealRiver = () => {
        const river = this._currentHand?.generateRiver();

        //установка активного игрока
        const firstPlayer = this.getFirstPlayer();
        this.setActivePlayer(firstPlayer);

        if (this.observableCallback)
            this.observableCallback({type: RIVER, data: {river, players: this.players, bank: this._bank?.getCash()}});

        //запуск таймера
        this.startPlayerTimeBank(firstPlayer)
    };

    private showdown = () => {
        console.log('Вскрытие, размера пота = ', this._bank?.getCash());

        const winners = this._currentHand?.getWinners(this.getPlayersInRound());

        if (winners)
            this.playerWinOnShowDown(winners);
    };

    private playerWinWithoutShowDown = (winner: Player | undefined) => {

        let sum = 0;

        this.players.forEach(p =>
            p.bet ? sum += p.bet : p.call ? sum += p.call : sum
        );

        this._bank?.addCash(sum);

        if (this._bank && winner) {
            winner.increaseCash(this._bank.getCash());
        }
    };

    private playerWinOnShowDown = (winners: Player[]) => {
        this._bank?.shareBetweenPlayers(winners);
    };

    private updateBank = () => {
        let sum = 0;

        this.players.forEach(p => sum += p.bet + p.call);

        this._bank?.addCash(sum);

        console.log('В банк добавлено: ', sum);

        //очищаем ставки за прошлый раунд
        this._bank?.setBetValue(0);
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
                this.round = SHOWDOWN;
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