import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import {makeStyles} from "@material-ui/styles";
import Input from "@material-ui/core/Input";

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

function ActionBar() {

    const classes = useStyles();
    const [value, setValue] = React.useState(30);

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

    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
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
                    <Button variant='contained' color='secondary' size='small'>FOLD</Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' color='secondary' size='small'>CHECK</Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' color='secondary' size='small'>CALL</Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' color='secondary' size='small'>BET</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default ActionBar;