import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Board from './components/Board';
import WelcomePage from './pages/WelcomePage';
import PlayerPage from './pages/PlayerPage';
import Header from './components/Header';
import Footer from './components/Footer';

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function App() {
  const [values, setValues] = useState({});
  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <StyleContainer>
          <Switch>
            <Route path="/" exact>
              <WelcomePage />
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
      </BrowserRouter>
    </>
  );
}

export default App;
