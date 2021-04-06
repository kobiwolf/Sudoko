import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Board from './components/Board';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import PlayerPage from './pages/PlayerPage';
const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function App() {
  const [values, setValues] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [playerDetails, setPlayerDetails] = useState({});

  useEffect(() => {
    console.log(values);
  }, [values]);
  useEffect(() => {
    console.log('IS CONNECTED:', isLogged);
  }, [isLogged]);
  const displayIfLogged = () => {
    return (
      <>
        <Header />
        <StyleContainer>
          <Switch>
            <Route path="/" exact>
              <HomePage playerDetails={playerDetails} />
            </Route>
            <Route path="/board" exact>
              <Board setValues={setValues} values={values} />
            </Route>
            <Route path="/players" exact>
              <PlayerPage />
            </Route>
          </Switch>
        </StyleContainer>
        <Footer />
      </>
    );
  };
  const displayIfNotLogged = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <ConnectPage
            setIsLogged={setIsLogged}
            setPlayerDetails={setPlayerDetails}
          />
        </Route>
      </Switch>
    );
  };
  return (
    <>
      <BrowserRouter>
        {isLogged ? displayIfLogged() : displayIfNotLogged()}
      </BrowserRouter>
    </>
  );
}

export default App;
