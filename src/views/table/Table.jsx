import React, {useEffect, useState} from 'react';
import PokerTable from './table.png';
import Avatar from './teacher.png';
import Flop from "../components/flop";
import Turn from "../components/turn";
import River from "../components/river";
import Players from "../components/players";
import Bank from "../components/bank";
import ActionBar from "../components/actionBar";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {wsConnectAC} from "../../state/ws";
import {wsNextHandAC} from "../../state/ws/actions";
import {getCoordsByPlace} from "../../utils/tablePositions";

const useStyles = makeStyles({
    actionBar: {
        position: 'fixed',
        bottom: 0,
        right: 0
    }
});


function Table({connected, bank, betValue, flop, turn, river, connect, nextHand, realPlayers, heroPlace}) {

    useEffect(() => {
        connect()
    }, []);

    const [hero, setHero] = useState({});

    if (realPlayers) {
        realPlayers = realPlayers.map(p => ({
            ...p,
            order: p.place,
            positions: getCoordsByPlace(p.place),
            showCards: false,
            toCall: betValue
        }));

        let currentPlayer = realPlayers.find(p => p.place === heroPlace);

        currentPlayer.me = true;
        currentPlayer.showCards = true;

        let activePlayer = realPlayers.find(p => p.isActive);

        if (activePlayer)
            if (hero.place !== activePlayer.place || hero.position !== activePlayer.position) {

                currentPlayer = activePlayer;

                setHero(currentPlayer);
            }
    }

    const classes = useStyles();

    const isHeroActive = () => {
        const hero = realPlayers.find(p => p.place === heroPlace);
        return hero.isActive;
    };

    const dealNextHand = () => {
        nextHand()
    };

    return (
        <div style={{backgroundImage: `url(${PokerTable})`, position: "relative", width: '756px', height: '359px'}}>
            <div style={{width: "min-content", margin: '80px auto', display: 'flex'}}>
                {flop && <Flop cards={flop}/>}
                {turn && <Turn card={turn}/>}
                {river && <River card={river}/>}
                <Players players={realPlayers}/>
                {bank && <Bank amount={bank}/>}

                <button style={{marginTop: '-30px'}} onClick={() => {
                    dealNextHand()
                }}>deal hand
                </button>

            </div>
            {
                realPlayers &&
                isHeroActive() &&
                <ActionBar player={hero} toCall={betValue} className={classes.actionBar}/>
            }
        </div>
    );
}


const mapStateToProps = state => ({
    connected: state.ws.connected,
    realPlayers: state.Game.players,
    heroPlace: state.Game.heroPlace,
    bank: state.Game.bank,
    betValue: state.Game.betValue,
    flop: state.Game.flop,
    turn: state.Game.turn,
    river: state.Game.river,
});

const mapDispatchToProps = dispatch => ({
    connect: () => {
        dispatch(wsConnectAC())
    },
    nextHand: () => {
        dispatch(wsNextHandAC())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
