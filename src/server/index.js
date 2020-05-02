var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Hand = require('pokersolver').Hand;
var isEqual = require('lodash.isequal');
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
        /*var hand1 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
        var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Ac', 'Kc']);
        var hand3 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Ah', 'Qh']);
        var winner = Hand.winners([hand1, hand2, hand3]); // hand2
        console.log('hand1 = ', isEqual(hand1.cards, winner[0].cards));

        console.log('hand2 = ', isEqual(hand2.cards, winner[0].cards));
        console.log('hand3 = ', isEqual(hand3.cards, winner[0].cards));
        console.log('Зашел   новый пользователь');*/

        //проверка наличия мест
        if (game.getPlayers().length <= 6) {
            socket.join('PokerRoom');

            socket.player = game.addPlayer({user: user});
            socket.emit('myPlace', socket.player.getPlace());
            console.log(game.getPositionsInGame());

            emitAllUsersInRoom('PokerRoom');
        }

    });

    socket.on('nextHand', () => {
        game.dealCards();
    });

    socket.on('bet', (value) => {
        game.playerBet(socket.player, 30);
    });

    socket.on('call', () => {
        game.playerCall(socket.player);
    });

    socket.on('check', () => {
        game.playerCheck(socket.player);
    });

    socket.on('fold', () => {
        game.playerFold(socket.player);
    });

    socket.on('disconnect', () => {
        if (socket.player)
            game.removePlayer(socket.player);
        console.log('tablePositions', game.getPositionsInGame());
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
            console.log('Старт таймера');
            io.sockets.emit('startTimer', event.data);
            break;
        }
        case types.STOP_TIMER: {
            console.log('Конец таймера');
            io.sockets.emit('stopTimer', event.data);
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