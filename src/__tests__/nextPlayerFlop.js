import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {FLOP, GAME_STATUS_ALL_IN, PREFLOP, TURN} from "../server/game/types";

test('get next player on bb | ch | ch | ch | ch |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP
    game.playerCheck();
    game.playerCheck();
    game.playerCheck();


    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeUndefined();
});
test('get next player on bb | ch | ch | ch | b |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP
    game.playerCheck();
    game.playerCheck();
    game.playerCheck();
    game.playerBet(10);


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('cut');
});
test('get next player on bb | f | ch | ch | b |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP
    game.playerFold();
    game.playerCheck();
    game.playerCheck();
    game.playerBet(10);


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('but');
});
test('get next player on bb | f | f | ch | b |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP
    game.playerFold();
    game.playerFold();
    game.playerCheck();
    game.playerBet(10);


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('sb');
});
test('get next player on bb | b | c | c | c |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP
    game.playerBet(10);
    game.playerCheck();
    game.playerCheck();


    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeUndefined();
});
test('get next player on bb | f | f | ch | b |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP
    game.playerCheck();
    game.playerBet(10);
    game.playerFold();
    game.playerFold();


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('cut');
});
test('get next player on bb | b | c | c | r |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP
    game.playerBet(10);
    game.playerCall();
    game.playerCall();
    game.playerBet(20);


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('cut');
});
test('get next player on bb | ai | c | c | r |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP

    const currentPlayer = game.getActivePlayer();
    currentPlayer.setCash(10);
    game.playerBet(10);
    game.playerCall();
    game.playerCall();
    game.playerBet(20);


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('but');
});
test('get next player on bb | ai | ai | c | r |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP


    cut.setCash(10);
    game.playerBet(10);

    but.setCash(20);
    game.playerBet(20);

    game.playerCall();
    game.playerBet(30);


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('sb');
});
test('get next player on bb | ai | c | r | c |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP


    cut.setCash(10);
    game.playerBet(10);
    game.playerCall();
    game.playerBet(30);
    game.playerCall();


    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('but');
});
test('get next player on bb | ai | r | c | c |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP


    cut.setCash(10);
    game.playerBet(10);
    game.playerBet(30);
    game.playerCall();

     // game.playerCall();

    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeUndefined();
});
test('get next player on but | ai | c/f | r | c |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP

    cut.setCash(10);
    game.playerBet(10);
    game.playerCall();
    game.playerBet(30);
    game.playerCall();

    let nextPlayer = game.getNextPlayer(but);

    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(nextPlayer).toBeUndefined();
});
test('get next player on bb | ai | ai | ai | c |', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    game.subscribe((data) => {
    });

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    game.dealCards();

    game.playerCall();
    game.playerCall();
    game.playerCall();
    game.playerCheck();

    //FLOP


    cut.setCash(10);
    but.setCash(10);
    sb.setCash(10);
    game.playerBet(10);
    game.playerCall();
    game.playerCall();
    game.playerCall();


    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(PREFLOP);
});



