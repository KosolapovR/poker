import Game from '../server/game/game';
import {Player} from "../server/game/player";

test('share 8-pot between 1 Player', () => {
    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(8);

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(8);
});

test('share 8-pot between 2 Player', () => {
    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(8);

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(4);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(4);

});
test('share 9-pot between 2 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(9);

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(5);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(4);
});

test('share 9-pot between 3 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(9);

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(3);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(3);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(3);
});
test('share 8-pot between 3 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(8);

    game
        .getBank()
        .shareBetweenPlayers(players);


    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(3);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(3);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(2);
});
test('share 7-pot between 3 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(7);

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(3);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(2);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(2);
});

test('share 7-pot between 4 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});
    let cut = game.addPlayer({user: {name: "Роман4"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(7);

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(2);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(2);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(2);
    expect(cut.getCash()).toEqual(200);
    expect(cut.addedCash).toEqual(1);
});
test('share 8-pot between 4 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});
    let cut = game.addPlayer({user: {name: "Роман4"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(8);

    game
        .getBank()
        .shareBetweenPlayers(players);


    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(2);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(2);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(2);
    expect(cut.getCash()).toEqual(200);
    expect(cut.addedCash).toEqual(2);
});
test('share 9-pot between 4 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});
    let cut = game.addPlayer({user: {name: "Роман4"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(9);

    game
        .getBank()
        .shareBetweenPlayers(players);


    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(3);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(2);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(2);
    expect(cut.getCash()).toEqual(200);
    expect(cut.addedCash).toEqual(2);
});
test('share 10-pot between 4 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});
    let cut = game.addPlayer({user: {name: "Роман4"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(10);

    game
        .getBank()
        .shareBetweenPlayers(players);


    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(3);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(3);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(2);
    expect(cut.getCash()).toEqual(200);
    expect(cut.addedCash).toEqual(2);
});
test('share 11-pot between 4 Player', () => {

    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});
    let but = game.addPlayer({user: {name: "Роман3"}});
    let cut = game.addPlayer({user: {name: "Роман4"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(11);

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toEqual(200);
    expect(bb.addedCash).toEqual(3);
    expect(sb.getCash()).toEqual(200);
    expect(sb.addedCash).toEqual(3);
    expect(but.getCash()).toEqual(200);
    expect(but.addedCash).toEqual(3);
    expect(cut.getCash()).toEqual(200);
    expect(cut.addedCash).toEqual(2);

    expect(bb.bet).toEqual(0);
    expect(bb.call).toEqual(0);
    expect(sb.bet).toEqual(0);
    expect(sb.call).toEqual(0);
    expect(but.bet).toEqual(0);
    expect(but.call).toEqual(0);
    expect(cut.bet).toEqual(0);
    expect(cut.call).toEqual(0);
});
