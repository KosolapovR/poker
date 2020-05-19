import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Bet from "../../bet";
import Card from "../../card";
import CardBackground from "../../cardBackground";
import FoldedCards from "../../foldedCards";
import Button from "../../button";
import TimeBank from "../../timeBank";

const useStyles = makeStyles((theme) => ({
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
    leftCard: {
        position: 'absolute',
        left: '-40px',
        top: '-10px'
    },
    pocketPair: {
        position: 'absolute',
        left: '0px',
        zIndex: 100,
        top: '35px',
        display: 'flex',
        width: '60px'
    },
    pocketPairHidden: {
        position: 'absolute',
        left: '55px',
        zIndex: 10,
        display: 'flex'
    },
}));

function Player({name, status, dealer, bigBlind, timeBank, smallBlind, fold, isActive, hasCards, cards, position, positions, img, cash, bet, addedCash, me, showCards}) {

    const classes = useStyles(positions);

    if (me) {
        return (
            <Grid container direction='column-reverse' className={classes.root}>
                {bet && <Bet position={positions} value={bet}/>}
                {addedCash && <Bet position={positions} value={addedCash}/>}

                {fold && <FoldedCards position={positions.fold}/>}
                {dealer && <Button position={positions.button} type='dealer'/>}
                {bigBlind && <Button position={positions.button} type='bigBlind'/>}
                {smallBlind && <Button position={positions.button} type='smallBlind'/>}
                {cards.length > 0 && hasCards &&
                <div className={classes.pocketPair}>
                    <div className={classes.leftCard}>
                        <Card value={cards[0]}/>
                    </div>

                    <Card value={cards[1]}/>
                </div>
                }
                <Grid className={classes.card} container item>
                    <Grid xs={4} item>
                        {/*<Avatar src={img.Avatar} alt='avatar'/>*/}
                    </Grid>
                    <Grid xs={8} item container direction='column' justify='center' alignItems='center'>
                        <Grid item>{status}</Grid>
                        <Grid item>{cash}</Grid>
                    </Grid>
                </Grid>
                {isActive && <TimeBank/>}
            </Grid>
        );
    } else {
        return (
            <Grid container direction='column-reverse' className={classes.root}>
                {bet && <Bet value={bet} position={positions}/>}
                {addedCash && <Bet position={positions} value={addedCash}/>}

                {fold && <FoldedCards position={positions.fold}/>}
                {dealer && <Button position={positions.button} type='dealer'/>}
                {bigBlind && <Button position={positions.button} type='bigBlind'/>}
                {smallBlind && <Button position={positions.button} type='smallBlind'/>}
                {cards && !fold && cards.length > 0 && hasCards && !showCards && <div className={classes.pocketPairHidden}>
                    <CardBackground/>
                    <CardBackground/>
                </div>}
                {showCards && <div className={classes.pocketPair}>
                    <div className={classes.leftCard}>
                        <Card value={cards[0]}/>
                    </div>

                    <Card value={cards[1]}/>
                </div>}
                <Grid className={classes.card} container item>
                    <Grid xs={4} item>
                        <Avatar alt='avatar'/>
                    </Grid>
                    <Grid xs={8} item container direction='column' justify='center' alignItems='center'>
                        <Grid item>{status}</Grid>
                        <Grid item>{cash}</Grid>
                    </Grid>
                </Grid>
                {isActive && <TimeBank timeBank={timeBank}/>}
            </Grid>
        );
    }
}

export default Player;