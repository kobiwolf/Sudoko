import React from 'react';
import Card from '../components/Card';

export default function HomePage({
  playerDetails: { name, score, avatar, time },
}) {
  return (
    <>
      <h1>
        Welcome {avatar ? 'Back:' : null}
        {name}
      </h1>
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
