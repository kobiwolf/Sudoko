import React from 'react';
export default function Input({ row, col, state, setState }) {
  return (
    <input
      data-row={row}
      data-col={col}
      maxLength="1"
      value={state[`row${row}`][col]}
      onChange={({ nativeEvent: { data } }) => {
        if (data === null) data = 0;
        if (!isNaN(parseInt(data))) {
          const clone = JSON.parse(JSON.stringify(state));
          clone[`row${row}`][col] = parseInt(data);
          setState(clone);
        }
      }}
    />
  );
}
