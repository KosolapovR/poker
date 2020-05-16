import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import {makeStyles} from "@material-ui/styles";
import Input from "@material-ui/core/Input";
import {connect} from "react-redux";
import {wsConnectAC} from "../../../state/ws";
import {wsBetAC, wsCallAC, wsCheckAC, wsFoldAC, wsNextHandAC} from "../../../state/ws/actions";

const useStyles = makeStyles({
    root: {
        width: 300,
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: '#333'
    },
    input: {
        width: 42,
    },
});

function ActionBar({toCall, player, fold, check, call, bet}) {

    const classes = useStyles();
    const [value, setValue] = React.useState(toCall);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    const handleFold = () => {
        fold();
    };

    const handleCheck = () => {
        check();
    };

    const handleCall = () => {
        call();
    };

    const handleBet = () => {
        bet(value);
    };

    console.log("rendered Action bar, betValue = ", toCall);
    console.log("player.bet = ", player.bet);

    debugger;

    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        min={toCall}
                        max={player.cash}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container justify='space-between'>
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        onClick={handleFold}
                    >
                        FOLD
                    </Button>
                </Grid>
                <Grid item>
                    {toCall - player.bet ?
                        <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            disabled
                        >
                            CHECK
                        </Button> :
                        <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            onClick={handleCheck}
                        >
                            CHECK
                        </Button>}

                </Grid>

                <Grid item>
                    {toCall && toCall - player.bet > 0 ?
                        <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            onClick={handleCall}
                        >
                            CALL {toCall - player.bet}
                        </Button> :
                        <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            onClick={handleCall}
                            disabled
                        >
                            CALL
                        </Button>}
                </Grid>
                {player.cash > toCall &&
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        onClick={handleBet}
                    >
                        BET
                    </Button>
                </Grid>}
            </Grid>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fold: () => {
        dispatch(wsFoldAC())
    },
    check: () => {
        dispatch(wsCheckAC())
    },
    call: () => {
        dispatch(wsCallAC())
    },
    bet: (value) => {
        dispatch(wsBetAC(value))
    },
});

export default connect(null, mapDispatchToProps)(ActionBar);