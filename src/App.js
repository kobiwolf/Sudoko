import React, { useEffect, useState } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Board from './components/Board';
import WelcomePage from './pages/WelcomePage';
function App() {
  const [values, setValues] = useState({});
  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/board" exact>
            <Board setValues={setValues} values={values} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
