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
    <div className="ui card">
      <div className="image">
        <img src={source} />
      </div>
      <div className="content">
        <a className="header">{name}</a>
        <div className="meta">
          <span className="date">Joined in 2013</span>
        </div>
        <div className="description">
          {time
            ? `Best time : ${time[0][0].padStart(
                2,
                '0'
              )}: ${time[0][1].padStart(2, '0')}`
            : "Didn't won yet..."}
        </div>
      </div>
      <div className="extra content">
        <h4>score:{score}</h4>
      </div>
    </div>
  );
}
