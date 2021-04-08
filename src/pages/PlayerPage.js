import React, { useState, useEffect } from 'react';

import Api from '../helpFuncs/Api';
import errorHandle from '../helpFuncs/errorHandle';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
  }
`;

export default function PlayerPage() {
  const [playersData, setPlayersData] = useState([]);
  async function getData() {
    await Api.get('/')
      .then(({ data }) => {
        data.sort((b, a) => a.score - b.score);
        setPlayersData(data);
      })
      .catch((e) => errorHandle(e));
  }
  useEffect(() => {
    getData();
  }, []);
  function display() {
    return (
      <StyleGrid>
        {playersData.map(({ id, name, score, avatar, time }) => (
          <Card
            key={id}
            name={name}
            score={score}
            source={avatar}
            time={time}
          />
        ))}
      </StyleGrid>
    );
  }

  return <>{playersData.length ? display() : <Spinner />}</>;
}
