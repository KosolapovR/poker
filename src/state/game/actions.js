import {DEAL_FLOP, DEAL_HAND, DEAL_RIVER, DEAL_TURN, MOVE_BANK, SET_HERO_PLACE, START_TIMER} from "./types";


const setHeroPlaceAC = payload => ({
    type: SET_HERO_PLACE,
    payload
});

const dealHandAC = payload => ({
   type: DEAL_HAND,
   payload
});

const dealFlopAC = payload => ({
    type: DEAL_FLOP,
    payload
});

const dealTurnAC = payload => ({
    type: DEAL_TURN,
    payload
});

const dealRiverAC = payload => ({
    type: DEAL_RIVER,
    payload
});

const moveBankAC = (payload) => ({
    type: MOVE_BANK,
    payload
});

const startTimerAC = payload => ({
    type: START_TIMER,
    payload
});

export {
    dealHandAC,
    setHeroPlaceAC,
    startTimerAC,
    dealFlopAC,
    dealTurnAC,
    dealRiverAC,
    moveBankAC,
}