import React from 'react';
import SpriteMap from "../../../Sprite";

function Flop({cards}) {
    return (
        <>
            <SpriteMap sprite={{type: 'card', suit: cards[0].suit, value: cards[0].value}}/>
            <SpriteMap sprite={{type: 'card', suit: cards[1].suit, value: cards[1].value}}/>
            <SpriteMap sprite={{type: 'card', suit: cards[2].suit, value: cards[2].value}}/>
        </>
    );
}

export default Flop;