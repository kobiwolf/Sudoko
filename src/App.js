import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import PlayerPage from './pages/PlayerPage';
import WrongPage from './pages/WrongPage';
import GamePage from './pages/GamePage';
const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: -webkit-fill-available;
  @media (max-width: 600px) {
    max-height: 82%;
  }
`;
function App() {
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
                  <GamePage
                    playerDetails={playerDetails}
                    setPlayerDetails={setPlayerDetails}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route path="/players" exact>
                {isLogged ? <PlayerPage /> : <Redirect to="/" />}
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
