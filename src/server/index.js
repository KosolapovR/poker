var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Hand = require('pokersolver').Hand;
var isEqual = require('lodash.isequal');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const PORT = 8080,

    emptyPlaces = [6, 5, 4, 3, 2, 1],
    positions = ['sb', 'bb', 'utg', 'mp', 'cut', 'but'],
    positionsInGame = [],
    players = [],
    statuses = ['inGame', 'wait', 'fold', 'show'];

io.on('connection', function (socket) {
    console.log('a user connected!!');
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

            //резервирование места за столом
            const place = emptyPlaces.pop();

            const player = {
                id: place,
                name: user.name,
                cash: 200,
                place: place,
                position: positions[place - 1],
                status: statuses[1],
                timeBank: 30
            };

            players.push(player);

            positionsInGame[positionsInGame.length] = positions[positionsInGame.length];

            socket.user = player;

            emitAllUsersInRoom('PokerRoom');
        }

    });

    socket.on('nextHand', () => {
        changePositions(positionsInGame);
    });

    socket.on('disconnect', () => {
        if (socket.user && socket.user.place)
            tablePositions.push(socket.user.place);
        console.log('tablePositions', tablePositions);
        if (io.sockets.adapter.rooms['PokerRoom'])
            emitAllUsersInRoom('PokerRoom');
    })
});

function emitAllUsersInRoom(roomId) {
    let clients = io.sockets.adapter.rooms[roomId];

    const users = [];

    for (let id in clients.sockets) {
        users.push(io.sockets.connected[id].user);
    }

    io.sockets.emit('usersInRoom', users);
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