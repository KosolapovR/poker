import React from 'react';
import s from "./turn.module.css";
import Card from "../card";

function Turn({card}) {
    if(card){
        return <div className={s.root}>
            <Card value={card.value}/>
        </div>
    }else{
        return <></>;
    }
}

export default Turn;