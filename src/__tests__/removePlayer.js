import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {GAME_STATUS_IN_GAME} from "../server/game/types";


const game = new Game();


test('remove existent Player', () => {

    game.addPlayer({user: {name: "Роман1"}});

    let player = game.getPlayers()[0];

    game.removePlayer(player);

    let players = game.getPlayers();

    expect(players.length).toBe(0);
});

test('remove nonexistent Player', () => {

    game.addPlayer({user: {name: "Роман1"}});

    let player = game.getPlayers()[0];

    game.removePlayer(new Player('Роман1', 100, 2, 'bb', GAME_STATUS_IN_GAME));

    let players = game.getPlayers();

    expect(players.length).toBe(1);
});


