import {WS_CONNECTED, WS_HERO_BET, WS_HERO_CALL, WS_HERO_CHECK, WS_HERO_FOLD, WS_NEXT_HAND} from "../ws/types";
import openSocket from "socket.io-client";
import {dealHandAC} from "../game";
import {dealFlopAC, dealRiverAC, dealTurnAC, setHeroPlaceAC, startTimerAC} from "../game/actions";

const socketMiddleware = (store) => {

    // connect to the remote host
    let socket = openSocket('http://localhost:8080');
    socket.emit('join', {name: 'Рома'});

    /*socket.on('dealHand', data => {
        console.log('dealHand: ', data);
        store.dispatch(dealHandAC());
    });

    socket.on('startTimer', data => {
        console.log('startTimer: ', data);
    });

    socket.on('stopTimer', data => {
        console.log('stopTimer: ', data);
    });*/

    // the middleware part of this function
    return store => next => action => {
        switch (action.type) {
            case WS_CONNECTED: {
                socket.on('dealHand', data => {
                    store.dispatch(dealHandAC(data));
                });

                socket.on('usersInRoom', users => {
                    console.log('all users = ', users);
                });

                socket.on('myPlace', place => {
                    store.dispatch(setHeroPlaceAC(place));
                });

                socket.on('startTimer', data => {
                    store.dispatch(startTimerAC(data));
                });

                socket.on('dealFlop', data => {
                    store.dispatch(dealFlopAC(data));
                });

                socket.on('dealTurn', data => {
                    store.dispatch(dealTurnAC(data));
                });

                socket.on('dealRiver', data => {
                    store.dispatch(dealRiverAC(data));
                });

                break;
            }
            case 'WS_DISCONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case WS_NEXT_HAND:
                socket.emit('nextHand');

                break;
            case WS_HERO_CHECK: {
                socket.emit('heroCheck');
                break;
            }
            case WS_HERO_CALL: {
                socket.emit('heroCall');
                break;
            }
            case WS_HERO_FOLD: {
                socket.emit('heroFold');
                break;
            }
            case WS_HERO_BET: {
                socket.emit('heroBet', action.payload);
                break;
            }
            default: {
                console.log('the next action:', action);
                return next(action);
            }
        }
        console.log('the next action:', action);
        return next(action);
    };
};

export default socketMiddleware();