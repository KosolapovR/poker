import React from 'react';
import SpriteMap from "../../../Sprite";

function Turn({card}) {
    return (
        <>
            <SpriteMap sprite={{type: 'card', suit: card.suit, value: card.value}}/>
        </>
    );
}

export default Turn;