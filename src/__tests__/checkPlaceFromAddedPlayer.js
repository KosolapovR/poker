import Game from '../server/game/game';
import {Player} from "../server/game/player";
import {GAME_STATUS_IN_GAME} from "../server/game/types";


const game = new Game();

let player = game.addPlayer({user: {name: "Роман1"}});
let player2 = game.addPlayer({user: {name: "Роман2"}});
let player3 = game.addPlayer({user: {name: "Роман3"}});

test('first added Player Place', () => {
    expect(player.getPlace()).toBe(1);
});

test('third added Player Place', () => {
    expect(player3.getPlace()).toBe(3);
});


test('fourth added Player Place after removed second Player', () => {
    game.removePlayer(player2);

    let player4 = game.addPlayer({user: {name: "Роман4"}});

    expect(player4.getPlace()).toBe(2);
});







