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

export default function Card({ name, score, source, time }) {
  return (
    <StyleCard>
      <h2>{name}</h2>
      {time && <h2>best time:{`${time[0]} tt${time[1]}`}</h2>}
      <img src={source} alt={`${name}'s avatar`} />
      <h2>score:{score}</h2>
    </StyleCard>
  );
}
