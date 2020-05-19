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
            part = (pot - extra) / playersCount;
        if (playersCount === 3)
            console.log('pot = ', pot, ' extra = ', extra, ' part = ', part);
        players.forEach(p => {
            // p.increaseCash(part);
            p.addedCash = part;
        });

        for (let i = 0; extra > 0; i++, extra--) {
            // players[i].increaseCash(1);
            players[i].addedCash += 1;
        }

        this.cash = 0;
    }
}

export default Bank;