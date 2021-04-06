import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const styleDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export default function WrongPage() {
  return (
    <styleDiv>
      <h1>
        Error:you probably logged out of the site,you can log again{' '}
        <Link to="/">here</Link>{' '}
      </h1>
    </styleDiv>
  );
}
