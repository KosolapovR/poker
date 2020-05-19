var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Game = require('./game/game');
var types = require('./game/types');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const PORT = 8080;

const game = new Game();
game.subscribe(gameEventHandler);


io.on('connection', function (socket) {

    socket.on('join', (user) => {
        //проверка наличия мест
        if (game.getPlayers().length <= 6) {
            socket.join('PokerRoom');

            socket.player = game.addPlayer({user: user});
            socket.emit('myPlace', socket.player.getPlace());

            emitAllUsersInRoom('PokerRoom');
        }

    });

    socket.on('nextHand', () => {
        game.dealCards();
    });

    socket.on('heroBet', (value) => {
        game.playerBet(value);
    });

    socket.on('heroCall', () => {
        game.playerCall();
    });

    socket.on('heroCheck', () => {
        game.playerCheck();
    });

    socket.on('heroFold', () => {
        game.playerFold();
    });

    socket.on('disconnect', () => {
        if (socket.player)
            game.removePlayer(socket.player);
        if (io.sockets.adapter.rooms['PokerRoom'])
            emitAllUsersInRoom('PokerRoom');
    })
});

function gameEventHandler(event) {
    switch (event.type) {
        case types.DEAL_HAND: {
            console.log('Раздача карт');
            io.sockets.emit('dealHand', event.data);
            break;
        }
        case types.START_TIMER: {
            io.sockets.emit('startTimer', event.data);
            break;
        }
        case types.STOP_TIMER: {
            io.sockets.emit('stopTimer', event.data);
            break;
        }
        case types.FLOP: {
            console.log('Раздача Флопа');
            io.sockets.emit('dealFlop', event.data);
            break;
        }
        case types.TURN: {
            console.log('Раздача Терна');
            io.sockets.emit('dealTurn', event.data);
            break;
        }
        case types.RIVER: {
            console.log('Раздача Ривера');
            io.sockets.emit('dealRiver', event.data);
            break;
        }
        case types.MOVE_BANK: {
            console.log('Перемещение банка');
            io.sockets.emit('moveBank', event.data);
            break;
        }
        default: {
            console.log('Поступил необрабатываемый event: ', event.type);
            break;
        }
    }
}

function emitAllUsersInRoom(roomId) {
    let clients = io.sockets.adapter.rooms[roomId];

    const players = [];

    for (let id in clients.sockets) {
        players.push(io.sockets.connected[id].player);
    }

    io.sockets.emit('usersInRoom', players);
}

http.listen(PORT, function () {
    console.log(`listening on :${PORT}`);
});