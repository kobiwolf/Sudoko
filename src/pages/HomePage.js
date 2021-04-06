import React from 'react';

export default function HomePage({ playerDetails: { name, score } }) {
  return (
    <div>
      <h1>
        welcome:{name} your score is:{score}
      </h1>
    </div>
  );
}
