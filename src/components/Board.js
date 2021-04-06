import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Input from './Input';
import deepCopy from '../helpFuncs/deepCopy';
import H3 from './H3';
import Button from './Button';
import Select from './Select';
import uniqid from 'uniqid';

const StyleBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 4rem);
  grid-template-rows: repeat(9, 4rem);
`;

function Board({ setValues, values }) {
  const [rowsCols, setRowsCols] = useState([]);
  const [intialValues, setInitialValues] = useState([]);
  const [moves, setMoves] = useState([]);
  const selectRefGridNum = useRef();
  const selectRefLevel = useRef();
  const [gridSize, setGridSize] = useState(9);
  const [level, setLevel] = useState('easy');
  // const [myRefs, setMyRefs] = useState([]);

  useEffect(() => {
    const rowsColsCopy = [];
    for (let row = 0; row < gridSize; row++) {
      values[`${row}`] = Array(gridSize).fill('');
      setValues(values);
      for (let col = 0; col < gridSize; col++) {
        rowsColsCopy.push({ row, col });
        setRowsCols(rowsColsCopy);
      }
    }
    createStartBoard();
  }, []);
  const onButtonClick = () => {
    let filledValues = Object.values(values)
      .flat()
      .filter((cell) => cell);
    if (filledValues.length < gridSize * gridSize)
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
    for (let row = 0; row < gridSize; row++) {
      arrOfSets.push(new Set(values[row]));
      for (let col = 0; col < gridSize; col++) {
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
    while (seti.size < gridSize) {
      seti.add(Math.ceil(Math.random() * gridSize));
    }
    let arr = {};

    arr[0] = [...seti];
    for (let i = 1; i < gridSize; i++) {
      arr[i] = [];
      for (let j = 0; j < gridSize; j++) {
        if (i !== 3 && i !== 6) {
          arr[i][j] = j < 6 ? arr[i - 1][j + 3] : arr[i - 1][j - 6];
        } else {
          arr[i][j] = j === 8 ? arr[i - 1][0] : arr[i - 1][j + 1];
        }
      }
    }
    let pairsToBeDeleted;
    switch (level) {
      case 'hard':
        pairsToBeDeleted = 40;
        break;
      case 'medium':
        pairsToBeDeleted = 30;
        break;
      default:
        pairsToBeDeleted = 25;
        break;
    }
    // this if made for another rotate of the sudoku in order to confuse
    if (Math.random() > 0.1) {
      const copy = deepCopy(arr);
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          copy[x][y] = arr[y][8 - x];
          copy[y][8 - x] = arr[8 - x][8 - y];
          copy[8 - x][8 - y] = arr[8 - y][x];
          copy[8 - y][x] = arr[x][y];
        }
      }
      arr = deepCopy(copy);
    }

    const copy = deepCopy(arr);
    for (let x = 0; x < 9; x++) {
      copy[3][x] = arr[5][x];
      copy[5][x] = arr[3][x];

      console.log('wow');
    }
    arr = deepCopy(copy);

    for (let i = 0; i < pairsToBeDeleted; i++) {
      const randomRow = Math.floor(Math.random() * gridSize);
      const randomCol = Math.floor(Math.random() * gridSize);
      arr[randomRow][randomCol] = '';
      arr[gridSize - 1 - randomRow][gridSize - 1 - randomCol] = '';
    }

    setValues(arr);
    setInitialValues(arr);
  };
  const undoAction = () => {
    if (!moves.length) return;
    const [row, col, oldValue] = moves[moves.length - 1];
    const copyValues = deepCopy(values);
    const copyMoves = deepCopy(moves);
    copyValues[row][col] = oldValue;
    copyMoves.pop();
    setValues(copyValues);
    setMoves(copyMoves);
  };
  const checkSolution = (valuesRows) => {
    const { valuesSquares, arrOfSets, valuesCols } = putValuesToSquaresCols(
      valuesRows
    );
    const sum = gridSize === 9 ? 45 : 10;
    for (let i = 0; i < arrOfSets.length; i++) {
      if (
        arrOfSets[i].size !== gridSize ||
        valuesRows[i].reduce((a, b) => a + b, 0) !== sum ||
        valuesSquares[i].reduce((a, b) => a + b, 0) !== sum ||
        valuesCols[i].reduce((a, b) => a + b, 0) !== sum
      )
        return false;
    }
    return true;
  };

  const display = () => {
    return (
      <>
        <StyleBoard>
          {rowsCols.map(({ row, col }) => {
            return (
              <React.Fragment key={uniqid()}>
                {intialValues[row][col] ? (
                  <H3 text={values[row][col]} row={row} col={col} />
                ) : (
                  <Input
                    row={row}
                    col={col}
                    state={values}
                    setState={setValues}
                    moves={moves}
                    setMoves={setMoves}
                  />
                )}
              </React.Fragment>
            );
          })}
        </StyleBoard>
        <Button text="check" func={onButtonClick} />
        <Button text="fill mode" func={createStartBoard} />
        <Button text="undo" func={undoAction} />

        <Select
          sendRef={selectRefLevel}
          options={['easy', 'medium', 'hard']}
          state={level}
          setState={setLevel}
        />
        {/* <Select
            sendRef={selectRefGridNum}
            options={[4, 9]}
            state={gridSize}
            setState={setGridSize}
          /> */}
        <Link to="/">to main</Link>
      </>
    );
  };
  return <>{intialValues[0] ? display() : <h2>loading</h2>}</>;
}
export default Board;
