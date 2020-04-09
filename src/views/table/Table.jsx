import React, {useEffect, useState} from 'react';
import PokerTable from './table.png';
import Avatar from './teacher.png';
import Flop from "../components/flop";
import Turn from "../components/turn";
import River from "../components/river";
import Players from "../components/players";
import Bank from "../components/bank";

function Table(props) {
    const [suit, setSuit] = useState('hearts');
    const [value, setValue] = useState('A');
    const [flop, setFlop] = useState([
        {suit: 'spades', value: 2},
        {suit: 'spades', value: 5},
        {suit: 'clubs', value: 'Q'}
    ]);

    const [turn, setTurn] = useState({suit: 'diamonds', value: 'A'}
    );

    const [river, setRiver] = useState(
        {suit: 'hearts', value: 'T'}
    );

    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    const values = ['A', 'K', 'Q', 'J', 'T', 9, 8, 7, 6, 5, 4, 3, 2];

    const players = [
        {
            name: 'Рома',
            cash: 200,
            img: {Avatar},
            status: 'inGame',
            position: {top: 300, left: 500, chips: {top: -40, left: 25}},
            order: 1,
            me: true,
            bet: 45,
            cards: [
                {
                    suit: 'hearts',
                    value: 'A'
                },
                {
                    suit: 'spades',
                    value: 9
                }
            ]
        },
        {
            name: 'Жанна',
            cash: 200,
            img: {Avatar},
            status: 'inGame',
            position: {top: 300, left: 100, chips: {top: -40, left: 155}},
            bet: 45,
            order: 2,
            cards: [{
                suit: 'hearts',
                value: 'A'
            },
                {
                    suit: 'spades',
                    value: 9
                }]
        },
        {
            name: 'Никита',
            cash: 200,
            img: {Avatar},
            status: 'inGame',
            hasCards: true,
            position: {top: 120, left: -150, chips: {top: 50, left: 255}},
            order: 3,
            bet: 49,
            showCards: true,
            cards: [
                {
                    suit: 'hearts',
                    value: 'A'
                },
                {
                    suit: 'spades',
                    value: 9
                }
            ]
        },
        {
            name: 'Даша', cash: 200, img: {Avatar}, status: 'sitOut', position: {top: -80, left: 100, chips: {top: 130, left: 95}}, bet: 45, order: 4,
            cards: []
        },
        {
            name: 'Петя', cash: 200, img: {Avatar}, status: 'wait', position: {top: -80, left: 500, chips: {top: 130, left: 55}}, bet: 145, order: 5,
            cards: []
        },
        {
            name: 'Вася', cash: 200, img: {Avatar}, status: 'inGame',
            position: {top: 120, left: 700, chips: {top: 50, left: -75}},
            bet: 200,
            order: 6,
            cards: [
                {
                    suit: 'hearts',
                    value: 'A'
                },
                {
                    suit: 'spades',
                    value: 9
                }
            ]
        },
    ];

    return (
        <div style={{backgroundImage: `url(${PokerTable})`, position: "relative", width: '756px', height: '359px'}}>
            <div style={{width: "min-content", margin: '80px auto', display: 'flex'}}>
                <Flop cards={flop}/>
                <Turn card={turn}/>
                <River card={river}/>
                <Players players={players}/>
                <Bank amount={321}/>
            </div>
        </div>
    );
}

export default Table;