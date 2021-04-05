import React from 'react';
import styled from 'styled-components';
import deepCopy from '../helpFuncs/deepCopy';

const StyleInput = styled.input`
  text-align: center;
  font-size: larger;
  border: 1px solid black;
  border-bottom: ${(props) =>
    props.row === 2 || props.row === 5
      ? 'black 10px solid'
      : '1px solid black'};
  border-right: ${(props) =>
    props.col === 2 || props.col === 5
      ? 'black 10px solid'
      : '1px solid black'};
`;
export default function Input({ row, col, state, setState, moves, setMoves }) {
  return (
    <StyleInput
      type="text"
      className="input"
      row={row}
      col={col}
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
