import React from 'react';

function Card({value}) {
    return (
        <img
            width="55"
            height="auto"
            src={require(`./cards/${value}.png`)}
            alt='card'
        />
    );
}

export default Card;