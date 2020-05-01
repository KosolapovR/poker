import React from 'react';
import s from './timeBank.module.css';
import styled, {keyframes} from 'styled-components'


const timeLine = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
`;

const TimeLine = styled.div`
    animation: ${timeLine} ${props => props.duration}ms ease-in-out;
    animation-fill-mode: forwards;
    background: #FFFF11;
    width: 100%;
`;

function TimeBank(props) {
    return (
        <div className={s.root}>
            <TimeLine duration={5000}/>
        </div>
    );
}

export default TimeBank;