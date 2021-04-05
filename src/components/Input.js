import React from 'react';
import deepCopy from '../helpFuncs/deepCopy';
import './Input.css';
export default function Input({ row, col, state, setState, moves, setMoves }) {
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
          //the next three lines is made in order to able an 'undo' action
          const copy = deepCopy(moves);
          copy.push([row, col, state[`${row}`][col]]);
          setMoves(copy);

          const clone = deepCopy(state);
          clone[`${row}`][col] = parseInt(data) || '';
          setState(clone);
        }
      }}
    />
  );
}
