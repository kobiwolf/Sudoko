import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  display: block;
  color: red;
  font-size: 0.8rem;
`;
export default function ErrorMassage({ condition, text }) {
  return condition ? <StyledSpan>{text}</StyledSpan> : null;
}
