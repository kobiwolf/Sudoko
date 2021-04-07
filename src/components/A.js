import React from 'react';
import styled from 'styled-components';

const StyleA = styled.a`
  width: 1rem;
  heigh: 1rem;
`;
export default function A({ location, text }) {
  return (
    <StyleA target="_blank" href={location}>
      {text}
    </StyleA>
  );
}
