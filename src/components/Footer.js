import React from 'react';
import styled from 'styled-components';

const StyleFooter = styled.footer`
  height: 2rem;
  background-color: lightgray;
  display: flex;
  justify-content: space-around;
`;
export default function Footer() {
  return (
    <StyleFooter>
      <h2>copyRights by Kobi Wolf &#169;</h2>
    </StyleFooter>
  );
}
