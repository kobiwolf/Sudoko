import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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

  const display = () => {
    return (
      <>
        <BrowserRouter>
          <Header isLogged={isLogged} />
          <StyleContainer>
            <Switch>
              <Route path="/" exact>
                {isLogged ? (
                  <HomePage playerDetails={playerDetails} />
                ) : (
                  <ConnectPage
                    setIsLogged={setIsLogged}
                    setPlayerDetails={setPlayerDetails}
                  />
                )}
              </Route>
              <Route path="/board" exact>
                {isLogged ? (
                  <Board
                    setValues={setValues}
                    values={values}
                    playerDetails={playerDetails}
                    setPlayerDetails={setPlayerDetails}
                  />
                ) : (
                  <Redirect path="/" />
                )}
              </Route>
              <Route path="/players" exact>
                {isLogged ? <PlayerPage /> : <Redirect path="/" />}
              </Route>
              <Route exact component={WrongPage} />
            </Switch>
          </StyleContainer>
          <Footer />
        </BrowserRouter>
      </>
    );
  };
  return <>{display()}</>;
}

export default App;
