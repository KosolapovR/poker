import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {GAME_STATUS_IN_GAME} from "../server/game/types";

test('get next player on bb in firstRound, cut-fold | but-fold |  sb-call | bb-bet', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(bb.postBigBlind(2));

    game.setActivePlayer(cut);
    game.playerFold();

    game.setActivePlayer(but);
    game.playerFold();

    game.setActivePlayer(sb);
    game.playerCall();

    game.setActivePlayer(bb);
    game.playerBet(10);

    let nextPlayer = game.getNextPlayer(bb);

    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toBe('sb');
});

test('get next player on but in firstRound, but-bet | sb-fold | bb-raise', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(bb.postBigBlind(2));

    game.setActivePlayer(but);
    game.playerBet(10);

    game.setActivePlayer(sb);
    game.playerFold();

    game.setActivePlayer(bb);
    game.playerBet(20);

    let nextPlayer = game.getNextPlayer(but);

    expect(nextPlayer.getPosition()).toBe('bb');
});
test('get next player on bb in firstRound, but-bet | sb-call | bb-call', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));

    game.setActivePlayer(player3);
    game.playerBet(10);

    game.setActivePlayer(player2);
    game.playerCall();

    game.setActivePlayer(player1);
    game.playerCall();

    let nextPlayer = game.getNextPlayer(player1);

    expect(nextPlayer).toBeUndefined();
});
test('get next player on bb in firstRound, but-bet | sb-call | bb-raise', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));

    game.setActivePlayer(player3);
    game.playerBet(10);

    game.setActivePlayer(player2);
    game.playerCall();

    game.setActivePlayer(player1);
    game.playerBet(20);

    let nextPlayer = game.getNextPlayer(player1);

    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toBe('but');
});
test('get next player on bb in firstRound, but-fold | sb-call | bb-bet', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));

    game.setActivePlayer(player3);
    game.playerFold();

    game.setActivePlayer(player2);
    game.playerCall();

    game.setActivePlayer(player1);
    game.playerBet(10);

    let nextPlayer = game.getNextPlayer(player1);

    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toBe('sb');
});

test('get next player on bb in firstRound, but-call | sb-bet | bb-raise', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));

    game.setActivePlayer(player3);
    game.playerCall();

    game.setActivePlayer(player2);
    game.playerBet(10);

    game.setActivePlayer(player1);
    game.playerBet(20);

    let nextPlayer = game.getNextPlayer(player1);

    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toBe('but');
});
test('get next player on bb in firstRound, but-fold | sb-bet | bb-raise', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));

    game.setActivePlayer(player3);
    game.playerFold();

    game.setActivePlayer(player2);
    game.playerBet(10);

    game.setActivePlayer(player1);
    game.playerBet(20);

    let nextPlayer = game.getNextPlayer(player1);

    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toBe('sb');
});

test('get next player on bb in firstRound, all players limp', () => {

    const game = new Game();

    game.setBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));


    game.setActivePlayer(player3);
    game.playerCall();

    game.setActivePlayer(player2);
    game.playerCall();

    game.setActivePlayer((player1));
    game.playerCheck();

    const nextPlayer = game.getNextPlayer(player1);

    expect(nextPlayer).toBeUndefined();
});
test('get next player on btn in firstRound, all players limp', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));

    let nextPlayer = game.getNextPlayer(player3);

    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toBe('sb');
});
test('get next player on sb in firstRound, all players limp', () => {

    const game = new Game();

    game.setBank();
    const bank = game.getBank();

    const player1 = game.addPlayer({user: {name: "Роман1"}});
    const player2 = game.addPlayer({user: {name: "Роман2"}});
    const player3 = game.addPlayer({user: {name: "Роман3"}});

    game.getBank().setBetValue(player1.postBigBlind(2));

    let nextPlayer = game.getNextPlayer(player2);

    expect(nextPlayer).toBeInstanceOf(Player);
    expect(nextPlayer.getPosition()).toBe('bb');
});



