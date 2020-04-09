import React from 'react';
import s from './flop.module.css';
import Card from "../card";


function Flop({cards}) {
    if(cards){
        return <div className={s.root}>
            {cards.map(c => <Card value={c.value}/>)}
        </div>
    }else{
        return <></>;
    }
}

export default Flop;