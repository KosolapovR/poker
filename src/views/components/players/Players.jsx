import React from 'react';
import Player from "./player";

function Players({players}) {

    const renderedPlayers = players.map(
        (p, i) => p.me ?
            <Player
                key={i}
                cards={p.cards}
                position={p.position}
                name={p.name}
                status={p.status}
                hasCards={p.hasCards}
                order={p.order}
                img={p.img}
                cash={p.cash}
                me={true}
                bet={p.bet}
            /> :
            <Player
                key={i}
                cards={p.cards}
                position={p.position}
                name={p.name}
                status={p.status}
                hasCards={p.hasCards}
                order={p.order}
                img={p.img}
                cash={p.cash}
                bet={p.bet}
            />);

    return (
        <>
        {renderedPlayers}
        </>
    );
}

export default Players;