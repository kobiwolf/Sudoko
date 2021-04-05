import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleHead = styled.div`
  height: 2rem;
  background-color: lightgrey;
  display: flex;
  justify-content: space-around;
`;
const StyleButtonLink = styled.button`
  background: none;
  border: none;
  font-family: arial, sans-serif;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
`;
const Header = () => (
  <StyleHead>
    <Link to="/Players">Players Status</Link>
    <StyleButtonLink onClick={() => console.log('wow')}>
      log out
    </StyleButtonLink>
  </StyleHead>
);
export default Header;
