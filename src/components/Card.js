import React from 'react';
import './Card.css';
export default function Card({ name, score, source }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={source} alt={`${name}'s avatar`} />
      <h2>score:{score}</h2>
    </div>
  );
}
