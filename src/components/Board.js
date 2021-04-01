import React, { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';

function Board({ setValues, values }) {
  const [rowsCols, setRowsCols] = useState([]);
  const [isValuesFull, setIsfull] = useState(false);
  useEffect(() => {
    const rowsColsCopy = [];
    for (let row = 0; row < 9; row++) {
      values[`row${row}`] = Array(9).fill('');
      setValues(values);
      for (let col = 0; col < 9; col++) {
        rowsColsCopy.push({ row, col });
        setRowsCols(rowsColsCopy);
      }
    }
  }, []);
  const onButtonClick = () => {
    let arr = Object.entries(values);
    arr = arr.map((cell) => cell[1]);
    arr = arr.flat();
    arr = arr.join('');
    console.log(arr);
  };
  const display = () => {
    return (
      <>
        <div className="board">
          {rowsCols.map(({ row, col }) => {
            return (
              <Input
                key={`${row}.${col}`}
                row={row}
                col={col}
                state={values}
                setState={setValues}
              />
            );
          })}
        </div>
        <Button text="check" func={onButtonClick} />
      </>
    );
  };
  return <>{display()}</>;
}
export default Board;
