import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {FLOP, GAME_STATUS_ALL_IN, PREFLOP, RIVER, TURN} from "../server/game/types";

test('2 players on showdown', () => {

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

    cut.setCash(10);
    game.playerBet(10);
    game.playerCall();
    game.playerFold();
    game.playerFold();


    let playersOnShowDown = [...game.getPlayersInRound(), ...game.getPlayersAllIn()];

    expect(game.getCurrentRound()).toEqual(FLOP);
    expect(playersOnShowDown.length).toEqual(2);
    expect(playersOnShowDown[0].showCards).toBeTruthy();
    expect(playersOnShowDown[1].showCards).toBeTruthy();
});
test('3 players on showdown', () => {

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


    game.dealCards();

    cut.setCash(10);
    game.playerBet(10);

    but.setCash(10);
    game.playerCall();
    game.playerCall();

    expect(game.getActivePlayer().getPosition()).toEqual('bb');
    game.playerFold();
    game.playerFold();

    expect(game.getCurrentRound()).toEqual(FLOP);


    let playersOnShowDown = [...game.getPlayersAllIn(), ...game.getPlayersInRound()];

    console.log('playersOnShowDown[2].showCards = ', playersOnShowDown[2].showCards);
    expect(game.getPlayersAllIn().length).toEqual(2);
    expect(game.getPlayersInRound().length).toEqual(1);
    expect(playersOnShowDown.length).toEqual(3);
    expect(playersOnShowDown[0].showCards).toBeTruthy();
    expect(playersOnShowDown[1].showCards).toBeTruthy();
    expect(playersOnShowDown[2].showCards).toBeTruthy();
});



