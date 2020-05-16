import {DEAL_FLOP, DEAL_HAND, DEAL_RIVER, DEAL_TURN, SET_HERO_PLACE, START_TIMER} from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HERO_PLACE: {
            return {...state, heroPlace: action.payload}
        }
        case DEAL_HAND: {
            return {
                ...state,
                players: action.payload.players,
                bank: action.payload.bank,
                betValue: action.payload.betValue,
                flop: null,
                turn: null,
                river: null,
            }
        }
        case DEAL_FLOP: {
            return {
                ...state,
                players: action.payload.players,
                flop: action.payload.flop,
                bank: action.payload.bank,
                betValue: 0
            }
        }
        case DEAL_TURN: {
            return {
                ...state,
                players: action.payload.players,
                turn: action.payload.turn,
                bank: action.payload.bank,
                betValue: 0
            }
        }
        case DEAL_RIVER: {
            debugger;
            return {
                ...state,
                players: action.payload.players,
                river: action.payload.river,
                bank: action.payload.bank,
                betValue: 0
            }
        }
        case START_TIMER: {
            debugger;
            return {
                ...state,
                players: action.payload.players,
                betValue: action.payload.betValue,
            }
        }
        default:
            return state;
    }
};

export default reducer;