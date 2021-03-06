import {DEAL_FLOP, DEAL_HAND, DEAL_RIVER, DEAL_TURN, MOVE_BANK, SET_HERO_PLACE, START_TIMER} from "./types";

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
                isBankMoved: false,
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
            return {
                ...state,
                players: action.payload.players,
                river: action.payload.river,
                bank: action.payload.bank,
                betValue: 0
            }
        }
        case START_TIMER: {
            return {
                ...state,
                players: action.payload.players,
                betValue: action.payload.betValue,
            }
        }
        case MOVE_BANK: {
            console.log('bank moved reducer');
            return {
                ...state,
                players: action.payload.players,
                bank: action.payload.bank,
                winnersPositions: action.payload.winnersPositions,
                isBankMoved: true
            }
        }
        default:
            return state;
    }
};

export default reducer;