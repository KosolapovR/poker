var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Hand = require('pokersolver').Hand;
var isEqual = require('lodash.isequal');


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

const PORT = 8080;

let tablePositions = [1, 2, 3, 4, 5, 6];

io.on('connection', function(socket){
    console.log('a user connected!!');
    socket.on('join', (user)=> {
        /*var hand1 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
        var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Ac', 'Kc']);
        var hand3 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Ah', 'Qh']);
        var winner = Hand.winners([hand1, hand2, hand3]); // hand2
        console.log('hand1 = ', isEqual(hand1.cards, winner[0].cards));

        console.log('hand2 = ', isEqual(hand2.cards, winner[0].cards));
        console.log('hand3 = ', isEqual(hand3.cards, winner[0].cards));
        console.log('Зашел   новый пользователь');*/

        var clients = io.sockets.adapter.rooms['PokerRoom'];

        if(clients.sockets.length <= 5){
            socket.user = user;
            socket.join('PokerRoom');

            for(let id in clients.sockets){
                console.log(io.sockets.connected[id].user);
            }

            socket.broadcast.emit('newUserJoin', user);
        }
    });

    socket.on('disconnect', ()=> {
        console.log('user disconnected')
    })
});

http.listen(PORT, function(){
    console.log(`listening on :${PORT}`);
});