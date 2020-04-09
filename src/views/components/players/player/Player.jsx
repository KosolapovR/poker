import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SpriteMap from "../../../../Sprite";
import Bet from "../../bet";

const useStyles = makeStyles({
    root: {
        width: '200px',
        height: '100px',
        position: 'absolute',
        top: position => `${position.top}px`,
        left: position => `${position.left}px`
    },
    card: {
        color: '#FFF',
        background: '#282828',
        border: '3px solid silver',
        borderRadius: '8px',
        position: 'absolute',
        zIndex: 50
    },
    pocketPair: {
        position: 'absolute',
        left: '-55px',
        zIndex: 100,
        display: 'flex'
    },
    pocketPairHidden: {
        position: 'absolute',
        left: '55px',
        zIndex: 10,
        display: 'flex'
    }
});

function Player({name, cards, position, img, cash, bet, me, showCards}) {

    if (me) console.log(position);
    const classes = useStyles(position, bet);

    if (me) {
        return (
            <Grid container direction='column-reverse' className={classes.root}>
                {bet && <Bet position={position} value={bet}/>}
                {cards &&
                <div className={classes.pocketPair}>
                    <SpriteMap sprite={{type: 'card', suit: cards[0].suit, value: cards[0].value}}/>
                    <SpriteMap sprite={{type: 'card', suit: cards[1].suit, value: cards[1].value}}/>
                </div>
                }
                <Grid className={classes.card} container item>
                    <Grid xs={4} item>
                        <Avatar src={img.Avatar} alt='avatar'/>
                    </Grid>
                    <Grid xs={8} item container direction='column' justify='center' alignItems='center'>
                        <Grid item>{name}</Grid>
                        <Grid item>{cash}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container direction='column-reverse' className={classes.root}>
                {bet && <Bet value={bet} position={position}/>}
                {cards.length > 0 && !showCards && <div className={classes.pocketPairHidden}>
                    <SpriteMap sprite={{type: 'card shirt'}}/>
                    <SpriteMap sprite={{type: 'card shirt'}}/>
                </div>}
                {showCards && <div className={classes.pocketPair}>
                    <SpriteMap sprite={{type: 'card', suit: cards[0].suit, value: cards[0].value}}/>
                    <SpriteMap sprite={{type: 'card', suit: cards[1].suit, value: cards[1].value}}/>
                </div>}
                <Grid className={classes.card} container item>
                    <Grid xs={4} item>
                        <Avatar src={img.Avatar} alt='avatar'/>
                    </Grid>
                    <Grid xs={8} item container direction='column' justify='center' alignItems='center'>
                        <Grid item>{name}</Grid>
                        <Grid item>{cash}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Player;