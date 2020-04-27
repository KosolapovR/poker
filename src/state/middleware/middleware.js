import {WS_CONNECTED, WS_NEXT_HAND} from "../ws/types";
import openSocket from "socket.io-client";
import {dealHandAC} from "../game";

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
                    console.log('dealHand inside midlleware: ', data);
                    store.dispatch(dealHandAC(data));
                });

                socket.on('usersInRoom', users => {
                    console.log('all users = ', users);
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