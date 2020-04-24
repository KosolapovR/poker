import {WS_CONNECTED, WS_NEXT_HAND} from "./types";

const wsConnectAC = payload => ({
    type: WS_CONNECTED,
    payload
});

const wsNextHandAC = () => ({
    type: WS_NEXT_HAND
});

export {
    wsConnectAC,
    wsNextHandAC
}