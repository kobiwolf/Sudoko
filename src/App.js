import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Board from './components/Board';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import PlayerPage from './pages/PlayerPage';
import WrongPage from './pages/WrongPage';
const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 92vh;
`;
function App() {
  const [values, setValues] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [playerDetails, setPlayerDetails] = useState({});

  const displayIfLogged = () => {
    return (
      <>
        <Header isLogged={isLogged} />
        <StyleContainer>
          <Switch>
            <Route path="/" exact>
              <HomePage playerDetails={playerDetails} />
            </Route>
            <Route path="/board" exact>
              <Board
                setValues={setValues}
                values={values}
                playerDetails={playerDetails}
                setPlayerDetails={setPlayerDetails}
              />
            </Route>
            <Route path="/players" exact>
              <PlayerPage />
            </Route>
            <Route exact component={WrongPage} />
          </Switch>
        </StyleContainer>
        <Footer />
      </>
    );
  };
  const displayIfNotLogged = () => {
    return (
      <>
        <Header isLogged={isLogged} />
        <Switch>
          <StyleContainer>
            <Route path="/" exact>
              <ConnectPage
                setIsLogged={setIsLogged}
                setPlayerDetails={setPlayerDetails}
              />
            </Route>
          </StyleContainer>
          <Route exact component={WrongPage} />
        </Switch>
        <Footer />
      </>
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
