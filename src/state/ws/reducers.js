import {WS_CONNECTED} from "./types";

const websocketInitialState = { connected: false };

const websocketReducer = (state = { ...websocketInitialState }, action) => {
    console.log('зашел в редюсер', action.type);
    switch (action.type) {
        case WS_CONNECTED:
            return { ...state, connected: true };
        default:
            return state;
    }
};

export default websocketReducer;