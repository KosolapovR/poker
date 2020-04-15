import {WS_CONNECTED} from "../ws/types";
import openSocket from "socket.io-client";
import {wsConnectAC} from "../ws";

const socketMiddleware = () => {
    // connect to the remote host
    let socket = openSocket('http://localhost:8080');
    socket.emit('join', {name: 'Рома'});

    socket.on('newUserJoin', user => {
        console.log('middleware', user);
    });

    // the middleware part of this function
    return store => next => action => {
        switch (action.type) {
            case WS_CONNECTED: {

                break;
            }
            case 'WS_DISCONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case 'NEW_MESSAGE':
                console.log('sending a message', action.msg);
                socket.send(JSON.stringify({command: 'NEW_MESSAGE', message: action.msg}));
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