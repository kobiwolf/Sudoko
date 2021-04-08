import React from 'react';
import Card from '../components/Card';

export default function HomePage({
  playerDetails: { name, score, avatar, time },
}) {
  return (
    <>
      <h1>Hello! {name} Welcome Back! </h1>
      <div>
        <Card
          name={name}
          score={score}
          source={avatar}
          time={time}
          list={false}
        />
      </div>
    </>
  );
}
