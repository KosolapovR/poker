import {DEAL_HAND} from "./types";

const dealHandAC = payload => ({
   type: DEAL_HAND,
   payload
});

export {
    dealHandAC
}