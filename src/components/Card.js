import React from 'react';
import styled from 'styled-components';

const StyleCard = styled.div`
  display: flex;
  justify-content: space-around;
  border: black 3px solid;
  border-radius: 10px;
  margin: 5rem 1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
const StyledH2 = styled.h2`
  margin: 0;
`;

export default function Card({ name, score, source, time }) {
  return (
    <div class="ui card">
      <div class="image">
        <img src={source} />
      </div>
      <div class="content">
        <a class="header">{name}</a>
        <div class="meta">
          <span class="date">Joined in 2013</span>
        </div>
        <div class="description">
          Best time :{time ? time[0][0] : null}:
          {time && (time[0][1] < 10 ? `0${time[0][1]}` : time[0][1])}
        </div>
      </div>
      <div class="extra content">
        <h4>score:{score}</h4>
      </div>
    </div>
  );
}
