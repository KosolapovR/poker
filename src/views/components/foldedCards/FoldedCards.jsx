import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CardBackground from "../cardBackground";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: position => `${position.top}px`,
        left: position => `${position.left}px`,
    },
    leftCard: {
        position: 'absolute',
        left: '-10px',
        top: '-4px',
    }
}));

function FoldedCards({position}) {
    const classes = useStyles(position);
    return (
        <div className={classes.root}>
            <div className={classes.leftCard}>
                <CardBackground width={25}/>
            </div>
            <CardBackground width={25}/>
        </div>
    );
}

export default FoldedCards;