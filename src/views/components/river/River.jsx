import React from 'react';
import SpriteMap from "../../../Sprite";

function River({card}) {
    return (
        <>
            <SpriteMap sprite={{type: 'card', suit: card.suit, value: card.value}}/>
        </>
    );
}

export default River;