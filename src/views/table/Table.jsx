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
    const [flop, setFlop] = useState(null);
    const [fold, setFold] = useState(false);
    const [Zhanna, setZhanna] = useState([
        {
            value: 'Ah'
        },
        {
            value: '2h'
        }
    ]);
    const [turn, setTurn] = useState(null);

    const [river, setRiver] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setFlop([
                {value: 'Ac'},
                {value: 'Ad'},
                {value: '4s'}
            ]);
        }, 2000);
    }, []);

    const [showCards, setShowCards] = useState(false);

    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    const values = ['A', 'K', 'Q', 'J', 'T', 9, 8, 7, 6, 5, 4, 3, 2];

    const players = [
        {
            name: 'Рома',
            cash: 200,
            img: {Avatar},
            status: 'inGame',
            position: {top: 300, left: 500, chips: {top: -40, left: 25}, fold: {top: -20, left: 95}, button: {top: -10, left: 5}},
            order: 1,
            bet: 2,
            fold: true,
            dealer: true,
            cards: [
                {
                    value: 'Ah'
                },
                {
                    value: '2h',
                }
            ]
        },
        {
            name: 'Жанна',
            cash: 200,
            img: {Avatar},
            status: 'inGame',
            position: {top: 300, left: 100, chips: {top: -40, left: 155}, fold: {top: -20, left: 125}, button: {top: -10, left: 45}},
            bet: 43,
            order: 2,
            fold: fold,
            dealer: true,
            me: true,
            smallBlind: true,
            cards: Zhanna
        },
        {
            name: 'Никита',
            cash: 200,
            img: {Avatar},
            status: 'inGame',
            position: {top: 120, left: -150, chips: {top: 50, left: 255}, fold: {top: 10, left: 195}, button: {top: 60, left: 210}},
            order: 3,
            bet: 3,
            showCards: showCards,
            dealer: true,
            fold: true,
            bigBlind: true,
            cards: []
        },
        {
            name: 'Даша',
            cash: 200, img: {Avatar},
            status: 'sitOut',
            position: {top: -80, left: 100, chips: {top: 130, left: 95}, fold: {top: 110, left: 55}, button: {top: 110, left: 150}},
            bet: 45, order: 4,
            bigBlind: true,
            fold: true,
            cards: []
        },
        {
            name: 'Петя',
            cash: 200,
            img: {Avatar},
            status: 'wait',
            position: {top: -80, left: 500, chips: {top: 130, left: 55}, fold: {top: 110, left: 25}, button: {top: 110, left: -10}},
            bet: 145,
            order: 5,
            bigBlind: true,
            fold: true,
            cards: []
        },
        {
            name: 'Вася', cash: 200, img: {Avatar}, status: 'inGame',
            position: {top: 120, left: 700, chips: {top: 50, left: -125}, fold: {top: 20, left: -45}, button: {top: 70, left: -40}},
            bet: 200,
            order: 6,
            fold: true,
            bigBlind: true,
            cards: []
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
                <button style={{marginTop: '-30px'}} onClick={() => {
                    setFold(true);
                    setZhanna([]);
                }}>Fold
                </button>
                <button style={{marginTop: '-30px'}} onClick={() => {
                    setTurn({value: 'Jc'})
                }}>Turn
                </button>
                <button style={{marginTop: '-30px'}} onClick={() => {
                    setRiver({value: 'Jd'})
                }}>River
                </button>
            </div>
        </div>
    );
}

export default Table;