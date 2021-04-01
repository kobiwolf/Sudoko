import React, { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';

function Board({ setValues, values }) {
  const [rowsCols, setRowsCols] = useState([]);
  useEffect(() => {
    const rowsColsCopy = [];
    for (let row = 0; row < 9; row++) {
      values[`${row}`] = Array(9).fill('');
      setValues(values);
      for (let col = 0; col < 9; col++) {
        rowsColsCopy.push({ row, col });
        setRowsCols(rowsColsCopy);
      }
    }
  }, []);
  const onButtonClick = () => {
    let arr = Object.values(values);

    // if (arr.length < rowsCols.length)
    //   alert('you must fill up all the board in order to check result');
    // else {
    // }

    console.log(checkSolution(values));
  };
  const putValuesToSquares = (inputs) => {
    //helprs funcs
    function between(x, min, max, y, min2 = min, max2 = max) {
      return x >= min && x <= max && y >= min2 && y <= max2;
    }
    function fillInputsSquaresObj(cubeNum, value, obj = inputsSquares) {
      obj[cubeNum]
        ? obj[cubeNum].push(value)
        : (obj[cubeNum] = Array(1).fill(value));
    }
    const arrOfSets = Array(9).fill(new Set());
    const inputsSquares = {};
    for (let row = 0; row < inputs[0].length; row++) {
      for (let col = 0; col < inputs[0].length; col++) {
        const value = inputs[row][col];
        arrOfSets[row].add(value);
        switch (true) {
          case between(row, 0, 2, col):
            fillInputsSquaresObj('0', value);
            break;
          case between(row, 0, 2, col, 3, 5):
            fillInputsSquaresObj('1', value);
            break;
          case between(row, 0, 2, col, 6, 8):
            fillInputsSquaresObj('2', value);
            break;
          case between(row, 3, 5, col, 0, 2):
            fillInputsSquaresObj('3', value);
            break;
          case between(row, 3, 5, col, 3, 5):
            fillInputsSquaresObj('4', value);
            break;
          case between(row, 3, 5, col, 6, 8):
            fillInputsSquaresObj('5', value);
            break;
          case between(row, 6, 8, col, 0, 2):
            fillInputsSquaresObj('6', value);
            break;
          case between(row, 6, 8, col, 3, 5):
            fillInputsSquaresObj('7', value);
            break;
          case between(row, 6, 8, col, 6, 8):
            fillInputsSquaresObj('9', value);
            break;
          default:
            break;
        }
      }
    }
    return { inputsSquares, arrOfSets };
  };
  const checkSolution = (inputs) => {
    console.log(inputs);
    const { inputsSquares, arrOfSets } = putValuesToSquares(inputs);
    console.log(inputsSquares);
    for (let i = 0; i < arrOfSets.length; i++) {
      let set = arrOfSets[i];
      console.log(set);
      if (set.size !== 9 || inputs[i].reduce((a, b) => a + b, 0) !== 45)
        return false;
    }
    return true;
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
