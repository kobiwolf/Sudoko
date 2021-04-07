import React, { useRef, useEffect, useState } from 'react';

import styled from 'styled-components';
import uniqid from 'uniqid';

import deepCopy from '../helpFuncs/deepCopy';
import fetchData from '../helpFuncs/fetchData';
import errorHandle from '../helpFuncs/errorHandle';
import Api from '../helpFuncs/Api';

import Input from './Input';
import H3 from './H3';
import Button from './Button';
import Select from './Select';
import Timer from './Timer';
import WonMassage from './WonMassage';

const StyleBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 4rem);
  grid-template-rows: repeat(9, 4rem);

  @media (max-width: 500px) {
    grid-template-columns: repeat(9, 2.5rem);
    grid-template-rows: repeat(9, 3rem);
  } ;
`;

function Board({
  setValues,
  values,
  setPlayerDetails,
  playerDetails,
  setReFresh,
  reFresh,
}) {
  const [rowsCols, setRowsCols] = useState([]);
  const [intialValues, setInitialValues] = useState([]);
  const [moves, setMoves] = useState([]);
  const selectRefLevel = useRef();
  const [gridSize, setGridSize] = useState(9);
  const [level, setLevel] = useState('easy');
  const [isWon, setIsWon] = useState(false);
  const [isTimer, setIsTimer] = useState(true);

  const minutesRef = useRef();
  const secsRef = useRef();

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
  const updateTimeAndScore = () => {
    const calcScore = (minutes, level) => {
      let score = 15;
      if (minutes < 4) score = score * 1.2;
      switch (level) {
        case 'medium':
          score = score * 1.2;
          break;
        case 'hard':
          score = score * 1.4;
          break;
        default:
          break;
      }
      return score;
    };

    const copy = deepCopy(playerDetails);
    const secs = secsRef.current.innerHTML;
    const minutes = minutesRef.current.innerHTML;
    copy.score = copy.score + calcScore(minutes, level);
    const newTime = minutes * 60 + secs;
    if (copy.time?.length) {
      const oldTime = copy.time[0] * 60 + copy.time[1];
      if (newTime > oldTime) copy.time = [minutes, secs];
    } else copy.time = [[minutes, secs]];
    console.log(setPlayerDetails);
    setPlayerDetails(copy);
    fetchData().then((promise) => {
      const match = promise.find((person) => person.name === copy.name);
      Api.put(`/${match.id}`, {
        ...playerDetails,
        score: copy.score,
        time: copy.time,
      }).catch((e) => {
        errorHandle(e);
      });
    });
  };
  const onButtonClick = () => {
    const filledValues = Object.values(values)
      .flat()
      .filter((cell) => cell);
    if (filledValues.length < gridSize * gridSize)
      alert('you must fill up all the board in order to check result');
    else {
      const booli = checkSolution(values);
      if (booli) {
        updateTimeAndScore();
        setIsWon(booli);
      }
    }
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
  const theTimer = () => {
    setIsTimer(false);
    setTimeout(() => {
      setIsTimer(true);
    }, 0.5);
  };
  const createStartBoard = () => {
    setIsWon(false);
    theTimer();
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
    const [row, col, oldTime] = moves[moves.length - 1];
    const copyValues = deepCopy(values);
    const copyMoves = deepCopy(moves);
    copyValues[row][col] = oldTime;
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
        {!isWon ? (
          <>
            {isTimer && (
              <Timer ref1={secsRef} ref2={minutesRef} reFresh={reFresh} />
            )}
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
          </>
        ) : (
          <WonMassage playerDetails={playerDetails} />
        )}
        <div>
          <Button text="check" func={onButtonClick} />
          <Button text="new game" func={createStartBoard} />
          <Button text="undo" func={undoAction} />

          <Select
            sendRef={selectRefLevel}
            options={['easy', 'medium', 'hard']}
            state={level}
            setState={setLevel}
          />
        </div>
        {/* <Select
            sendRef={selectRefGridNum}
            options={[4, 9]}
            state={gridSize}
            setState={setGridSize}
          /> */}
      </>
    );
  };
  return <>{intialValues[0] ? display() : <h2>loading</h2>}</>;
}
export default Board;
