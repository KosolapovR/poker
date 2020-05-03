import React from 'react';
import s from "./river.module.css";
import Card from "../card";

function River({card}) {
    if (card) {
        return <div className={s.root}>
            <Card value={card}/>
        </div>
    } else {
        return <></>;
    }
}

export default River;