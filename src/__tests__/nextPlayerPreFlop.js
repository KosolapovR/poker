import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {GAME_STATUS_ALL_IN, PREFLOP} from "../server/game/types";

test('get next player on bb | c | c | c | ch |', () => {

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


    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeUndefined();
});
test('get next player on bb | c | c | c | b |', () => {

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
    game.playerBet(10);

    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('cut');
});
test('get next player on bb | f | c | c | b |', () => {

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

    game.playerFold();
    game.playerCall();
    game.playerCall();
    game.playerBet(10);

    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('but');
});
test('get next player on bb | f | f | c | b |', () => {

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

    game.playerFold();
    game.playerFold();
    game.playerCall();
    game.playerBet(10);

    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('sb');
});
test('get next player on bb | f | f | b | c |', () => {

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

    game.playerFold();
    game.playerFold();
    game.playerBet(10);
    // game.playerCall();

    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeUndefined();
});
test('get next player on bb | f | b | c | f |', () => {

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

    game.playerFold();
    game.playerBet(10);
    game.playerCall();
    // game.playerFold();

    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeUndefined();
});
test('get next player on bb | f | f | b | r |', () => {

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

    game.playerFold();
    game.playerFold();
    game.playerBet(10);
    game.playerBet(20);

    let nextPlayer = game.getNextPlayer(bb);


    expect(game.getPlayersInRound().length).toEqual(2);
    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('sb');
});
test('get next player on sb | f | b/rr | c/f | r |', () => {

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

    game.playerFold();
    game.playerBet(10);
    game.playerCall();
    game.playerBet(30);

    game.playerBet(40);
    game.playerFold();

    let nextPlayer = game.getNextPlayer(sb);

    expect(game.getPlayersInRound().length).toEqual(2);
    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('bb');
});
test('get next player on bb | ai | f | c | r |', () => {

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

    let currentPlayer = game.getActivePlayer();
    currentPlayer.setStatus(GAME_STATUS_ALL_IN);
    game.playerBet(10);
    currentPlayer.setCash(0);

    game.playerFold();
    game.playerCall();
    game.playerBet(30);


    let nextPlayer = game.getNextPlayer(bb);

    expect(game.getPlayersAllIn().length).toEqual(1);
    expect(game.getPlayersInRound().length).toEqual(2);
    expect(game.getCurrentRound()).toEqual(PREFLOP);
    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toEqual('sb');
});

// test('get next player on bb in firstRound, cut-fold | but-fold |  sb-call | bb-bet', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const bb = game.addPlayer({user: {name: "Роман1"}});
//     const sb = game.addPlayer({user: {name: "Роман2"}});
//     const but = game.addPlayer({user: {name: "Роман3"}});
//     const cut = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(bb.postBigBlind(2));
//
//     game.setActivePlayer(cut);
//     game.playerFold();
//
//     game.setActivePlayer(but);
//     game.playerFold();
//
//     game.setActivePlayer(sb);
//     game.playerCall();
//
//     game.setActivePlayer(bb);
//     game.playerBet(10);
//
//     let nextPlayer = game.getNextPlayer(bb);
//
//     expect(nextPlayer).toBeInstanceOf(Player);
//     expect(nextPlayer.getPosition()).toBe('sb');
// });
// test('get next player on but in firstRound, but-bet | sb-fold | bb-raise', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const bb = game.addPlayer({user: {name: "Роман1"}});
//     const sb = game.addPlayer({user: {name: "Роман2"}});
//     const but = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(bb.postBigBlind(2));
//
//     game.setActivePlayer(but);
//     game.playerBet(10);
//
//     game.setActivePlayer(sb);
//     game.playerFold();
//
//     game.setActivePlayer(bb);
//     game.playerBet(20);
//
//     let nextPlayer = game.getNextPlayer(but);
//
//     expect(nextPlayer.getPosition()).toBe('bb');
// });
// test('get next player on bb in firstRound, but-bet | sb-call | bb-call', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//     game.setActivePlayer(player3);
//     game.playerBet(10);
//
//     game.setActivePlayer(player2);
//     game.playerCall();
//
//     game.setActivePlayer(player1);
//     game.playerCall();
//
//     let nextPlayer = game.getNextPlayer(player1);
//
//     expect(nextPlayer).toBeUndefined();
// });
// test('get next player on bb in firstRound, but-bet | sb-call | bb-raise', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//     game.setActivePlayer(player3);
//     game.playerBet(10);
//
//     game.setActivePlayer(player2);
//     game.playerCall();
//
//     game.setActivePlayer(player1);
//     game.playerBet(20);
//
//     let nextPlayer = game.getNextPlayer(player1);
//
//     expect(nextPlayer).toBeInstanceOf(Player);
//     expect(nextPlayer.getPosition()).toBe('but');
// });
// test('get next player on bb in firstRound, but-fold | sb-call | bb-bet', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//     game.setActivePlayer(player3);
//     game.playerFold();
//
//     game.setActivePlayer(player2);
//     game.playerCall();
//
//     game.setActivePlayer(player1);
//     game.playerBet(10);
//
//     let nextPlayer = game.getNextPlayer(player1);
//
//     expect(nextPlayer).toBeInstanceOf(Player);
//     expect(nextPlayer.getPosition()).toBe('sb');
// });
// test('get next player on bb in firstRound, but-call | sb-bet | bb-raise', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//     game.setActivePlayer(player3);
//     game.playerCall();
//
//     game.setActivePlayer(player2);
//     game.playerBet(10);
//
//     game.setActivePlayer(player1);
//     game.playerBet(20);
//
//     let nextPlayer = game.getNextPlayer(player1);
//
//     expect(nextPlayer).toBeInstanceOf(Player);
//     expect(nextPlayer.getPosition()).toBe('but');
// });
// test('get next player on bb in firstRound, but-fold | sb-bet | bb-raise', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//     game.setActivePlayer(player3);
//     game.playerFold();
//
//     game.setActivePlayer(player2);
//     game.playerBet(10);
//
//     game.setActivePlayer(player1);
//     game.playerBet(20);
//
//     let nextPlayer = game.getNextPlayer(player1);
//
//     expect(nextPlayer).toBeInstanceOf(Player);
//     expect(nextPlayer.getPosition()).toBe('sb');
// });
// test('get next player on bb in firstRound, all players limp', () => {
//
//     const game = new Game();
//
//     game.setBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//
//     game.setActivePlayer(player3);
//     game.playerCall();
//
//     game.setActivePlayer(player2);
//     game.playerCall();
//
//     game.setActivePlayer((player1));
//     game.playerCheck();
//
//     const nextPlayer = game.getNextPlayer(player1);
//
//     expect(nextPlayer).toBeUndefined();
// });
// test('get next player on btn in firstRound, all players limp', () => {
//
//     const game = new Game();
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//     let nextPlayer = game.getNextPlayer(player3);
//
//     expect(nextPlayer).toBeInstanceOf(Player);
//     expect(nextPlayer.getPosition()).toBe('sb');
// });
// test('get next player on sb in firstRound, all players limp', () => {
//
//     const game = new Game();
//
//     game.subscribe((data) => {
//     })
//
//     game.setBank();
//     const bank = game.getBank();
//
//     const player1 = game.addPlayer({user: {name: "Роман1"}});
//     const player2 = game.addPlayer({user: {name: "Роман2"}});
//     const player3 = game.addPlayer({user: {name: "Роман3"}});
//
//     game.getBank().setBetValue(player1.postBigBlind(2));
//
//     game.dealCards();
//
//     let nextPlayer = game.getNextPlayer(game.getActivePlayer());
//
//     expect(game.getActivePlayer().getPosition()).toBe('but');
//
//     expect(nextPlayer).toBeInstanceOf(Player);
//     expect(nextPlayer.getPosition()).toBe('sb');
// });
// test('turn | 1-th - sit_out, 2-tnd - sit_out, get next player on sb', () => {
//
//     const game = new Game();
//     game.subscribe((data) => {
//     })
//
//     const bb = game.addPlayer({user: {name: "Роман1"}});
//     const sb = game.addPlayer({user: {name: "Роман2"}});
//     const but = game.addPlayer({user: {name: "Роман3"}});
//     const cut = game.addPlayer({user: {name: "Роман4"}});
//
//     game.dealCards();
//
//     expect(game.getCurrentRound()).toEqual(PREFLOP);
//
//     //cut
//     game.getActivePlayer().setStatus(GAME_STATUS_ALL_IN);
//     game.playerCall();
//
//     //but
//     game.getActivePlayer().setStatus(GAME_STATUS_ALL_IN);
//     game.playerCall();
//
//     //sb
//     game.playerCall();
//
//     //bb
//     game.playerCheck();
//
//     //FLOP
//     expect(game.getCurrentRound()).toEqual(FLOP);
//
//     let nextPlayer = game.getNextPlayer(game.getActivePlayer());
//     // game.playerCheck();
//     expect(game.getActivePlayer().getPosition()).toEqual('sb');
//     expect(game.getPlayersInRound().length).toEqual(2);
//     expect(nextPlayer.getPosition()).toEqual('bb');
//
//     // game.playerCheck();
//
//     //TURN
//
//     expect(game.getCurrentRound()).toEqual(TURN);
//
//     let firstPlayer = game.getFirstPlayer();
//
//     expect(game.getPlayersInRound().length).toEqual(2);
//     expect(firstPlayer.getPosition()).toBe('sb');
// });


