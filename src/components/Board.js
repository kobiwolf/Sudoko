import React, { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import './Board.css';

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
    if (arr.length < rowsCols.length)
      alert('you must fill up all the board in order to check result');
    else console.log(checkSolution(values));
  };
  const putValuesToSquaresCols = (values) => {
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
          case between(row, 3, 5, col):
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
          case between(row, 6, 8, col):
            fillValuesObj('8', value);
            break;
          default:
            break;
        }
      }
    }
    return { valuesSquares, arrOfSets, valuesCols };
  };
  const createStartBoard = () => {
    const seti = new Set();
    while (seti.size < 9) {
      seti.add(Math.ceil(Math.random() * 9));
    }
    const arr = {};
    arr[0] = [...seti];
    for (let i = 1; i < 9; i++) {
      arr[i] = [];
      for (let j = 0; j < 9; j++) {
        if (i !== 3 && i !== 6) {
          arr[i][j] = j < 6 ? arr[i - 1][j + 3] : arr[i - 1][j - 6];
        } else {
          arr[i][j] = j === 8 ? arr[i - 1][0] : arr[i - 1][j + 1];
        }
      }
    }
    for (let i = 0; i < 30; i++) {
      const randomRow = Math.ceil(Math.random() * 8);
      const randomCol = Math.ceil(Math.random() * 8);
      arr[randomRow][randomCol] = '';
      arr[8 - randomRow][8 - randomCol] = '';
    }
    setValues(arr);
  };
  const checkSolution = (valuesRows) => {
    const { valuesSquares, arrOfSets, valuesCols } = putValuesToSquaresCols(
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
        <Button text="fillmode" func={createStartBoard} />
      </>
    );
  };
  return <>{display()}</>;
}
export default Board;
