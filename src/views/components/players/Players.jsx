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
                showCards={p.showCards}
                fold={p.fold}
                dealer={p.dealer}
                bigBlind={p.bigBlind}
                smallBlind={p.smallBlind}
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
                showCards={p.showCards}
                fold={p.fold}
                dealer={p.dealer}
                bigBlind={p.bigBlind}
                smallBlind={p.smallBlind}
            />);

    return (
        <>
        {renderedPlayers}
        </>
    );
}

export default Players;