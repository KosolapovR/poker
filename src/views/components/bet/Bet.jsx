import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import SpriteMap from "../../../Sprite";
import getChipsStack from "../../../utils/chipStack";

const useStyles = makeStyles({
    chips: {
        position: 'absolute',
        top: position => `${position.chips.top}px`,
        left: position => `${position.chips.left}px`,
        zIndex: 100,
        display: 'flex'
    },
    chip: {
        '&:nth-child(2)': {
            position: 'absolute',
            top: '-5px'
        },
        '&:nth-child(3)': {
            position: 'absolute',
            top: '-10px'
        },
        '&:nth-child(4)': {
            position: 'absolute',
            top: '-15px'
        },
        '&:nth-child(5)': {
            position: 'absolute',
            top: '-20px'
        },
        '&:nth-child(6)': {
            position: 'absolute',
            top: '-25px'
        },
        '&:nth-child(7)': {
            position: 'absolute',
            top: '-30px'
        },
        '&:nth-child(8)': {
            position: 'absolute',
            top: '-35px'
        },
    },
    betValue: {
        color: '#fff',
        fontSize: '14px',
        padding: '2px 5px',
        background: 'rgba(40, 40, 40, 0.5)',
        borderRadius: '4px',
        marginLeft: '5px'
    },
});

function Bet({value, position}) {
    const classes = useStyles(position);
    const chipsStack = getChipsStack(value);
    return (
        <div className={classes.chips}>
            {chipsStack.map((c, i) => <div key={i} className={`${classes.chip}`}>
                <SpriteMap sprite={{type: 'chips', value: c}}/>
            </div>)}
            <span className={classes.betValue}>{value}</span>
        </div>
    );
}

export default Bet;