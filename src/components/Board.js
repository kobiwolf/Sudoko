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
    // let arr = Object.values(values);

    // if (arr.length < rowsCols.length)
    //   alert('you must fill up all the board in order to check result');
    // else {
    // }

    console.log(checkSolution(values));
  };
  const putValuesToRowsCols = (values) => {
    //helpers funcs
    function between(x, min, max, y, min2 = min, max2 = max) {
      return x >= min && x <= max && y >= min2 && y <= max2;
    }
    function fillValuesObj(cubeNum, value, obj = valuesSquares) {
      obj[cubeNum]
        ? obj[cubeNum].push(value)
        : (obj[cubeNum] = Array(1).fill(value));
    }
    const arrOfSets = [];
    const valuesSquares = {};
    const valuesCols = {};
    for (let row = 0; row < 9; row++) {
      arrOfSets.push(new Set(values[row]));
      for (let col = 0; col < 9; col++) {
        const value = values[row][col];
        fillValuesObj(row, values[col][row], valuesCols);
        switch (true) {
          case between(row, 0, 2, col):
            fillValuesObj('0', value);
            break;
          case between(row, 0, 2, col, 3, 5):
            fillValuesObj('1', value);
            break;
          case between(row, 0, 2, col, 6, 8):
            fillValuesObj('2', value);
            break;
          case between(row, 3, 5, col, 0, 2):
            fillValuesObj('3', value);
            break;
          case between(row, 3, 5, col, 3, 5):
            fillValuesObj('4', value);
            break;
          case between(row, 3, 5, col, 6, 8):
            fillValuesObj('5', value);
            break;
          case between(row, 6, 8, col, 0, 2):
            fillValuesObj('6', value);
            break;
          case between(row, 6, 8, col, 3, 5):
            fillValuesObj('7', value);
            break;
          case between(row, 6, 8, col, 6, 8):
            fillValuesObj('8', value);
            break;
          default:
            break;
        }
      }
    }
    return { valuesSquares, arrOfSets, valuesCols };
  };
  const toFillBoard = () => {
    const a = [
      5,
      1,
      7,
      6,
      9,
      8,
      2,
      3,
      4,
      2,
      8,
      9,
      1,
      3,
      4,
      7,
      5,
      6,
      3,
      4,
      6,
      2,
      7,
      5,
      8,
      9,
      1,
      6,
      7,
      2,
      8,
      4,
      9,
      3,
      1,
      5,
      1,
      3,
      8,
      5,
      2,
      6,
      9,
      4,
      7,
      9,
      5,
      4,
      7,
      1,
      3,
      6,
      8,
      2,
      4,
      9,
      5,
      3,
      6,
      2,
      1,
      7,
      8,
      7,
      2,
      3,
      4,
      8,
      1,
      5,
      6,
      9,
      8,
      6,
      1,
      9,
      5,
      7,
      4,
      2,
      3,
    ];
    const clone = JSON.parse(JSON.stringify(values));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        clone[`${i}`][j] = a[i * 9 + j];
      }
    }
    setValues(clone);
  };
  const checkSolution = (valuesRows) => {
    const { valuesSquares, arrOfSets, valuesCols } = putValuesToRowsCols(
      valuesRows
    );
    for (let i = 0; i < arrOfSets.length; i++) {
      if (
        arrOfSets[i].size !== 9 ||
        valuesRows[i].reduce((a, b) => a + b, 0) !== 45 ||
        valuesSquares[i].reduce((a, b) => a + b, 0) !== 45 ||
        valuesCols[i].reduce((a, b) => a + b, 0) !== 45
      )
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
        <Button text="fill" func={toFillBoard} />
      </>
    );
  };
  return <>{display()}</>;
}
export default Board;
