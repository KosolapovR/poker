import {DEAL_HAND} from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DEAL_HAND: {
            return {...state, players: action.payload}
        }
        default:
            return state;
    }
};

export default reducer;