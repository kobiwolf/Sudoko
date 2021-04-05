import React from 'react';
import './H3.css';

export default function H3({ text, row, col }) {
  return (
    <h3 data-row={row} data-col={col}>
      {text}
    </h3>
  );
}
