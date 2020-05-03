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
    }
}

export default Bank;