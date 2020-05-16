import {Player} from "./player";

class Bank {
    private cash: number;
    private betValue: number;

    constructor() {
        this.cash = 0;
        this.betValue = 0;
    }

    public getCash = (): number => {
        return this.cash;
    };

    public addCash = (cash: number) => {
        this.cash = this.cash ? this.cash += cash : cash;
    };

    public getBetValue = (): number => {
        return this.betValue;
    };

    public setBetValue = (value: number) => {
        this.betValue = value;
    };

    public shareBetweenPlayers = (players: Player[]) => {
        let playersCount = players.length,
            pot = this.getCash(),
            extra = pot % playersCount,
            part = pot / playersCount;

        players.forEach(p => p.increaseCash(part));

        while (extra > 0) {
            players[extra].increaseCash(1);
            extra--;
        }

        this.cash = 0;
    }
}

export default Bank;