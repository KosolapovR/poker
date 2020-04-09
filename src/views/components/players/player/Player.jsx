import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SpriteMap from "../../../../Sprite";
import Bet from "../../bet";
import Card from "../../card";
import CardBackground from "../../cardBackground";
import FoldedCards from "../../foldedCards";
import Button from "../../button";

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
    }
});

function Player({name, dealer, bigBlind, smallBlind, fold, cards, position, img, cash, bet, me, showCards}) {


    const classes = useStyles(position);

    if (me) {
        return (
            <Grid container direction='column-reverse' className={classes.root}>
                {bet && <Bet position={position} value={bet}/>}
                {fold && <FoldedCards position={position.fold}/>}
                {dealer && <Button position={position.button} type='dealer'/>}
                {bigBlind && <Button position={position.button} type='bigBlind'/>}
                {smallBlind && <Button position={position.button} type='smallBlind'/>}
                {cards.length > 0 &&
                <div className={classes.pocketPair}>
                    <div className={classes.leftCard}>
                        <Card value={cards[0].value}/>
                    </div>

                    <Card value={cards[1].value}/>
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
                {fold && <FoldedCards position={position.fold}/>}
                {dealer && <Button position={position.button} type='dealer'/>}
                {bigBlind && <Button position={position.button} type='bigBlind'/>}
                {smallBlind && <Button position={position.button} type='smallBlind'/>}
                {cards && !fold && cards.length > 0 && !showCards && <div className={classes.pocketPairHidden}>
                    <CardBackground/>
                    <CardBackground/>
                </div>}
                {showCards && <div className={classes.pocketPair}>
                    <div className={classes.leftCard}>
                        <Card value={cards[0].value}/>
                    </div>

                    <Card value={cards[1].value}/>
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