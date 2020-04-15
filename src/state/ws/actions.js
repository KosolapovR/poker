import {WS_CONNECTED} from "./types";

const wsConnectAC = payload => ({
    type: WS_CONNECTED,
    payload
});

export {
    wsConnectAC
}