var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Hand = require('pokersolver').Hand;
var isEqual = require('lodash.isequal');
var Game = require('./game/game');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const PORT = 8080,

    emptyPlaces = [6, 5, 4, 3, 2, 1],
    positions = ['sb', 'bb', 'utg', 'mp', 'cut', 'but'],
    positionsInGame = [],
    players = [],
    statuses = ['inGame', 'wait', 'fold', 'show'];

const game = new Game();

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
        if (players.length <= 6) {
            socket.join('PokerRoom');

            socket.player = game.addPlayer({user: user});
            console.log(game.getPositionsInGame());

            emitAllUsersInRoom('PokerRoom');
        }

    });

    socket.on('nextHand', () => {
        game.dealCards();
        game.getPlayers().forEach(p => {
            console.log(p.getName() + ' ' + p.getCards())
        });
    });

    socket.on('disconnect', () => {
        if (socket.player)
            game.removePlayer(socket.player);
        console.log('tablePositions', game.getPositionsInGame());
        if (io.sockets.adapter.rooms['PokerRoom'])
            emitAllUsersInRoom('PokerRoom');
    })
});

function emitAllUsersInRoom(roomId) {
    let clients = io.sockets.adapter.rooms[roomId];

    const players = [];

    for (let id in clients.sockets) {
        players.push(io.sockets.connected[id].player);
    }

    io.sockets.emit('usersInRoom', players);
}

function changePositions(positions) {

    const newPositions = [];

    for (let i = 0; i < positions.length; i++) {
        newPositions[i] = i === positions.length - 1 ? positions[0] : positions[i + 1];
    }

}

http.listen(PORT, function () {
    console.log(`listening on :${PORT}`);
});