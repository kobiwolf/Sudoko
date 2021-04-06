import React from 'react';
import styled from 'styled-components';

const StyleButton = styled.button`
  background: transparent;
  border: none;
  margin: 1rem 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`;
export default function Button({ text, func }) {
  return <StyleButton onClick={(e) => func(e)}>{text}</StyleButton>;
}
