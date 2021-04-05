import React from 'react';
import styled from 'styled-components';

const StyledH3 = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0
  margin-block-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: 1.7rem;
  font-weight: bolder;
  border: 1px solid black;
  border-bottom: ${({ row }) =>
    row === 2 || row === 5 ? 'black 10px solid' : '1px solid black'};
  border-right: ${({ col }) =>
    col === 2 || col === 5 ? 'black 10px solid' : '1px solid black'};
`;

export default function H3({ text, row, col }) {
  return (
    <StyledH3 row={row} col={col}>
      {text}
    </StyledH3>
  );
}
