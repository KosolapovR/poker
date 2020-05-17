import Game from '../server/game/game';
import {Player} from "../server/game/player";

test('share 8-pot between 1 Player', () => {
    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(8)

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toBe(208);
});

test('share 8-pot between 2 Player', () => {
    const game = new Game();

    let bb = game.addPlayer({user: {name: "Роман1"}});
    let sb = game.addPlayer({user: {name: "Роман2"}});

    let players = game.getPlayers();

    game.setBank();
    game.getBank().addCash(8)

    game
        .getBank()
        .shareBetweenPlayers(players);

    expect(bb.getCash()).toBe(204);
    expect(sb.getCash()).toBe(204);
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

    expect(bb.getCash()).toBe(205);
    expect(sb.getCash()).toBe(204);
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

    expect(bb.getCash()).toBe(203);
    expect(sb.getCash()).toBe(203);
    expect(but.getCash()).toBe(203);
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

    expect(bb.getCash()).toBe(203);
    expect(sb.getCash()).toBe(203);
    expect(but.getCash()).toBe(202);
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

    expect(bb.getCash()).toBe(203);
    expect(sb.getCash()).toBe(202);
    expect(but.getCash()).toBe(202);
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

    expect(bb.getCash()).toBe(202);
    expect(sb.getCash()).toBe(202);
    expect(but.getCash()).toBe(202);
    expect(cut.getCash()).toBe(201);
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

    expect(bb.getCash()).toBe(202);
    expect(sb.getCash()).toBe(202);
    expect(but.getCash()).toBe(202);
    expect(cut.getCash()).toBe(202);
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

    expect(bb.getCash()).toBe(203);
    expect(sb.getCash()).toBe(202);
    expect(but.getCash()).toBe(202);
    expect(cut.getCash()).toBe(202);
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

    expect(bb.getCash()).toBe(203);
    expect(sb.getCash()).toBe(203);
    expect(but.getCash()).toBe(202);
    expect(cut.getCash()).toBe(202);
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

    expect(bb.getCash()).toBe(203);
    expect(sb.getCash()).toBe(203);
    expect(but.getCash()).toBe(203);
    expect(cut.getCash()).toBe(202);
});
