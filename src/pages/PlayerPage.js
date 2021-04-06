import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../helpFuncs/Api';
import errorHandle from '../helpFuncs/errorHandle';
import Card from '../components/Card';

export default function PlayerPage() {
  const [playersData, setPlayersData] = useState([]);
  async function getData() {
    await Api.get('/')
      .then((promise) => {
        console.log(promise);
        setPlayersData(promise.data);
      })
      .catch((e) => errorHandle(e));
  }
  useEffect(() => {
    console.log('wow');
    getData();
  }, []);
  function display() {
    return playersData.map((player) => (
      <Card
        key={player.id}
        name={player.name}
        score={player.score}
        source={player.avatar}
      />
    ));
  }

  return (
    <>
      {playersData.length && display()}
      <Link to="/">Home</Link>
      <Link to="/board">game</Link>
    </>
  );
}
