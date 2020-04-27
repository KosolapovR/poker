import {WS_CONNECTED} from "./types";

const websocketInitialState = { connected: false };

const websocketReducer = (state = { ...websocketInitialState }, action) => {
    switch (action.type) {
        case WS_CONNECTED:
            return { ...state, connected: true };
        default:
            return state;
    }
};

export default websocketReducer;