import {DEAL_HAND, SET_HERO_PLACE, START_TIMER} from "./types";


const setHeroPlaceAC = payload => ({
    type: SET_HERO_PLACE,
    payload
});

const dealHandAC = payload => ({
   type: DEAL_HAND,
   payload
});

const startTimerAC = payload => ({
    type: START_TIMER,
    payload
});

export {
    dealHandAC,
    setHeroPlaceAC,
    startTimerAC
}