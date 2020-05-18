import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {FLOP, GAME_STATUS_ALL_IN, GAME_STATUS_IN_GAME, GAME_STATUS_SIT_OUT, PREFLOP, TURN} from "../server/game/types";

test('pre-flop | 1-th - sit_out', () => {

    const game = new Game();

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    cut.setCash(0);
    cut.setStatus(GAME_STATUS_SIT_OUT);

    let firstPlayer = game.getFirstPlayer();
    // expect(playersInRound.length).toEqual(2);
    expect(firstPlayer.getPosition()).toBe('but');
});

test('pre-flop | 1-th, 2-nd - sit_out', () => {

    const game = new Game();

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    cut.setStatus(GAME_STATUS_SIT_OUT);
    but.setStatus(GAME_STATUS_SIT_OUT);

    let firstPlayer = game.getFirstPlayer();

    expect(firstPlayer.getPosition()).toBe('sb');
});

test('flop | 1-th - sit_out', () => {

    const game = new Game();

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});

    game.setActivePlayer(but);
    game.getActivePlayer().setStatus(GAME_STATUS_ALL_IN);
    game.playerCall();

    game.setActivePlayer(sb);
    game.playerCall();

    game.setActivePlayer(bb);
    game.playerCheck();

    let firstPlayer = game.getFirstPlayer();

    expect(firstPlayer.getPosition()).toBe('sb');
});

test('flop | 1-th - sit_out, 2-tnd - sit_out' , () => {

    const game = new Game();
    game.subscribe((data)=> {});

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    game.dealCards();

    expect(game.getCurrentRound()).toEqual(PREFLOP);

    game.getActivePlayer().setStatus(GAME_STATUS_ALL_IN);
    game.playerCall();

    game.getActivePlayer().setStatus(GAME_STATUS_ALL_IN);
    game.playerCall();

    game.playerCall();

    game.playerCheck();

    let firstPlayer = game.getFirstPlayer();

    expect(game.getPlayersInRound().length).toEqual(2);
    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(firstPlayer.getPosition()).toBe('sb');
});

test('turn | 1-th - sit_out, 2-tnd - sit_out' , () => {

    const game = new Game();
    game.subscribe((data)=> {});

    const bb = game.addPlayer({user: {name: "Роман1"}});
    const sb = game.addPlayer({user: {name: "Роман2"}});
    const but = game.addPlayer({user: {name: "Роман3"}});
    const cut = game.addPlayer({user: {name: "Роман4"}});

    game.dealCards();

    expect(game.getCurrentRound()).toEqual(PREFLOP);

    //cut
    game.getActivePlayer().setStatus(GAME_STATUS_ALL_IN);
    game.playerCall();

    //but
    game.getActivePlayer().setStatus(GAME_STATUS_ALL_IN);
    game.playerCall();

    //sb
    game.playerCall();

    //bb
    game.playerCheck();

    //FLOP

    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(game.getActivePlayer().getPosition()).toEqual('sb');

    game.playerCheck();

    expect(game.getActivePlayer().getPosition()).toEqual('bb');
    expect(game.getCurrentRound()).toEqual(FLOP);

    game.playerCheck();

    //TURN

    expect(game.getActivePlayer().getPosition()).toEqual('sb');
    expect(game.getCurrentRound()).toEqual(TURN);

    let firstPlayer = game.getFirstPlayer();

    expect(game.getPlayersInRound().length).toEqual(2);
    expect(firstPlayer.getPosition()).toBe('sb');
});




