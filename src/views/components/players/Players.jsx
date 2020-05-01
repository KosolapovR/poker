import React from 'react';
import Player from "./player";

function Players({players}) {
    let renderedPlayers;
    if (players) {
        renderedPlayers = players.map(
            (p, i) => p.me ?
                <Player
                    key={i}
                    cards={p.cards}
                    position={p.position}
                    name={p.name}
                    status={p.status}
                    hasCards={p.hasCards}
                    order={p.order}
                    /*img={p.img}*/
                    cash={p.cash}
                    me={true}
                    /*bet={p.bet}*/
                    showCards={p.showCards}
                    fold={p.fold}
                    dealer={p.dealer}
                    bigBlind={p.bigBlind}
                    smallBlind={p.smallBlind}
                    isActive = {p.isActive}
                /> :
                <Player
                    key={i}
                    cards={p.cards}
                    position={p.position}
                    name={p.name}
                    status={p.status}
                    hasCards={true}
                    order={p.order}
                    //img={p.img}
                    cash={p.cash}
                    //bet={p.bet}
                    showCards={p.showCards}
                    fold={p.fold}
                    dealer={p.dealer}
                    bigBlind={p.bigBlind}
                    smallBlind={p.smallBlind}
                    isActive = {p.isActive}
                />);

    }

    return (
        <>
            {players ? renderedPlayers : null}
        </>
    );
}

export default Players;