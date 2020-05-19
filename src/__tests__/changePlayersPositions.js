import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {GAME_STATUS_SIT_OUT} from "../server/game/types";

test('default case', () => {

    const game = new Game();

    game.subscribe(() => {
    });

    const player1 = game.addPlayer({user: {name: "Роман1"}}); //bb
    const player2 = game.addPlayer({user: {name: "Роман2"}}); //sb
    const player3 = game.addPlayer({user: {name: "Роман3"}}); //but
    const player4 = game.addPlayer({user: {name: "Роман4"}}); //cut
    const player5 = game.addPlayer({user: {name: "Роман5"}}); //mp
    const player6 = game.addPlayer({user: {name: "Роман6"}}); //utg

    let players = game.getNonSitOutPLayers();

    expect(players.length).toEqual(6);

    game.changePlayersPositions();

    expect(player1.getPosition()).toEqual('sb');
    expect(player2.getPosition()).toEqual('but');
    expect(player3.getPosition()).toEqual('cut');
    expect(player4.getPosition()).toEqual('mp');
    expect(player5.getPosition()).toEqual('utg');
    expect(player6.getPosition()).toEqual('bb');

    game.changePlayersPositions();

    expect(player1.getPosition()).toEqual('but');
    expect(player2.getPosition()).toEqual('cut');
    expect(player3.getPosition()).toEqual('mp');
    expect(player4.getPosition()).toEqual('utg');
    expect(player5.getPosition()).toEqual('bb');
    expect(player6.getPosition()).toEqual('sb');
});
test('1 player SIT_OUT', () => {

    const game = new Game();
    game.subscribe(() => {
    });

    const player1 = game.addPlayer({user: {name: "Роман1"}}); //bb
    const player2 = game.addPlayer({user: {name: "Роман2"}}); //sb
    const player3 = game.addPlayer({user: {name: "Роман3"}}); //but
    const player4 = game.addPlayer({user: {name: "Роман4"}}); //cut
    const player5 = game.addPlayer({user: {name: "Роман5"}}); //mp
    const player6 = game.addPlayer({user: {name: "Роман6"}}); //utg

    player3.setStatus(GAME_STATUS_SIT_OUT);

    let players = game.getPlayersInRound();

    expect(players.length).toEqual(5);

    game.changePlayersPositions();

    expect(players[2].getName()).toEqual("Роман4");

    expect(player1.getPosition()).toEqual('sb');
    expect(player2.getPosition()).toEqual('but');
    expect(player4.getPosition()).toEqual('cut');
    expect(player5.getPosition()).toEqual('mp');
    expect(player6.getPosition()).toEqual('bb');

    game.changePlayersPositions();

    expect(player1.getPosition()).toEqual('but');
    expect(player2.getPosition()).toEqual('cut');
    expect(player4.getPosition()).toEqual('mp');
    expect(player5.getPosition()).toEqual('bb');
    expect(player6.getPosition()).toEqual('sb');

    player4.setStatus(GAME_STATUS_SIT_OUT);
    game.changePlayersPositions();

    expect(player1.getPosition()).toEqual('cut');
    expect(player2.getPosition()).toEqual('bb');
    expect(player5.getPosition()).toEqual('sb');
    expect(player6.getPosition()).toEqual('but');
});
