import React from 'react';

function CardBackground({width = 65}) {
    return (
        <img
            width={width}
            height="auto"
            src={require(`../card/cards/BackgroundRed.png`)}
            alt='card'
        />
    );
}

export default CardBackground;