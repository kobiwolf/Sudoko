import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleHead = styled.header`
  height: 2rem;
  background-color: lightgrey;
  display: flex;
  justify-content: space-around;
`;
const Header = () => (
  <StyleHead>
    <Link to="/">Home</Link>
    <Link to="/Players">Players Status</Link>
    <Link to="/board">game</Link>
    <a href="/">log out</a>
  </StyleHead>
);
export default Header;
