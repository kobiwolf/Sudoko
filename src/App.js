import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
function App() {
  const [values, setValues] = useState({});
  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <Board setValues={setValues} values={values} />
    </>
  );
}

export default App;
