import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: position => `${position.top}px`,
        left: position => `${position.left}px`,
        zIndex: 100
    },
});

function Button({position, type}) {
    const classes = useStyles(position);
    console.log('type: ', type);
    return (
        <img
            className={classes.root}
            width="25"
            height="auto"
            src={require(`./${type}.png`)}
            alt='button'
        />
    );
}

export default Button;