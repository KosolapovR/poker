import {Player} from "./player";
import {GAME_STATUS_IN_GAME} from "./types";

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

    public shareBetweenPlayers = (winners: Player[], allPlayers: Player[]) => {
        let playersCount = winners.length,
            pot = this.getCash() + allPlayers.reduce((acc, p) => acc + Math.max(p.bet, p.call) , 0),
            extra = pot % playersCount,
            part = (pot - extra) / playersCount;

        winners.forEach(p => {
            // p.increaseCash(part);
            p.addedCash = part;
        });

        if (extra)
            for (let i = 0; extra > 0; i++, extra--) {
                // players[i].increaseCash(1);
                winners[i].addedCash += 1;
            }

        this.cash = 0;
    }
}

export default Bank;