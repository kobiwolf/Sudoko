import React from 'react';
import './Input.css';
export default function Input({ row, col, state, setState }) {
  return (
    <input
      type="text"
      className="input"
      data-row={row}
      data-col={col}
      maxLength="1"
      value={state[`${row}`][col]}
      onChange={({ nativeEvent: { data } }) => {
        if (!isNaN(parseInt(data)) || data === null) {
          const clone = JSON.parse(JSON.stringify(state));
          clone[`${row}`][col] = parseInt(data) || '';
          setState(clone);
        }
      }}
    />
  );
}
