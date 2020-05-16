import Game from '../server/game/game';
import {Player} from "../server/game/player";

const game = new Game();


test('add Player', () => {

    game.addPlayer({user: {name: "Роман1"}});

    let players = game.getPlayers();

    expect(players[0]).toBeInstanceOf(Player);
    expect(players.length).toBe(1);
});

test('add 6 Players', () => {

    game.addPlayer({user: {name: "Роман2"}});
    game.addPlayer({user: {name: "Роман3"}});
    game.addPlayer({user: {name: "Роман4"}});
    game.addPlayer({user: {name: "Роман5"}});
    game.addPlayer({user: {name: "Роман6"}});

    let players = game.getPlayers();

    expect(players.length).toBe(6);
});

test('add extra Players', () => {

    game.addPlayer({user: {name: "Роман7"}});

    let players = game.getPlayers();

    expect(players.length).toBe(6);
});
