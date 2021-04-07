import React, { useState } from 'react';

import Board from '../components/Board';

export default function GamePage({ playerDetails, setPlayerDetails }) {
  const [reFresh, setReFresh] = useState(false);
  const [values, setValues] = useState({});
  return (
    <Board
      reFresh={reFresh}
      setReFresh={setReFresh}
      setValues={setValues}
      values={values}
      playerDetails={playerDetails}
      setPlayerDetails={setPlayerDetails}
    />
  );
}
