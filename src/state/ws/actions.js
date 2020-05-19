import {
    WS_CONNECTED,
    WS_HERO_BET,
    WS_HERO_CALL,
    WS_HERO_CHECK,
    WS_HERO_FOLD,
    WS_NEXT_HAND
} from "./types";

const wsConnectAC = payload => ({
    type: WS_CONNECTED,
    payload
});

const wsNextHandAC = () => ({
    type: WS_NEXT_HAND
});

const wsFoldAC = () => ({
    type: WS_HERO_FOLD
});

const wsCheckAC = () => ({
    type: WS_HERO_CHECK
});

const wsCallAC = () => ({
    type: WS_HERO_CALL
});

const wsBetAC = (payload) => ({
    type: WS_HERO_BET,
    payload
});

export {
    wsConnectAC,
    wsNextHandAC,
    wsBetAC,
    wsCallAC,
    wsCheckAC,
    wsFoldAC
}