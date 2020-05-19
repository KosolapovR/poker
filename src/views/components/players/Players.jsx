import React from 'react';
import Player from "./player";

function Players({players}) {
    let renderedPlayers;
    if (players) {
        renderedPlayers = players.map(
            (p, i) =>
                <Player
                    key={i}
                    cards={p.cards}
                    position={p.position}
                    positions={p.positions}
                    name={p.name}
                    status={p.status}
                    hasCards={p.hasCards}
                    order={p.order}
                    /*img={p.img}*/
                    cash={p.cash}
                    me = {p.me ? true : null}
                    bet={p.bet || p.call || false}
                    addedCash={p.addedCash || false}
                    showCards={p.me || p.showCards ? true : null}
                    fold={p.fold}
                    dealer={p.dealer}
                    bigBlind={p.bigBlind}
                    smallBlind={p.smallBlind}
                    isActive={p.isActive}
                    toCall={p.toCall}
                    timeBank = {p.timeBank}
                />);

    }

    return (
        <>
            {players ? renderedPlayers : null}
        </>
    );
}

export default Players;