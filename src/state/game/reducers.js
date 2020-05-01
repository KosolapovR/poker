import {DEAL_HAND, SET_HERO_PLACE, START_TIMER} from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HERO_PLACE: {
            return {...state, heroPlace: action.payload}
        }
        case DEAL_HAND: {
            return {...state, players: action.payload}
        }
        case START_TIMER: {
            return {...state, players: action.payload}
        }
        default:
            return state;
    }
};

export default reducer;