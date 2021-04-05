import React from 'react';
import styled from 'styled-components';

const StyledH3 = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  font-weight: bolder;
  border: 1px solid black;
  border-bottom: ${(props) =>
    props.row === 2 || props.row === 5
      ? 'black 10px solid'
      : '1px solid black'};
  border-right: ${(props) =>
    props.col === 2 || props.col === 5
      ? 'black 10px solid'
      : '1px solid black'};
`;

export default function H3({ text, row, col }) {
  return (
    <StyledH3 row={row} col={col}>
      {text}
    </StyledH3>
  );
}
