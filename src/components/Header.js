import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLogged }) => (
  <>
    {isLogged ? (
      <>
        <div className="ui four item menu">
          <Link className=" item" to="/">
            Home
          </Link>
          <Link className=" item" to="/Players">
            Players Status
          </Link>
          <Link className=" item" to="/board">
            game
          </Link>
          <a className=" item" href="/">
            log out
          </a>
        </div>
      </>
    ) : (
      <div className="ui one item menu">
        <h1 className="active item">Welcome to SFF(Sudoku For Friends)</h1>
      </div>
    )}
  </>
);
export default Header;
