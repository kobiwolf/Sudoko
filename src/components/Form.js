import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyleForm = styled.form`
  border: 3px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: max-content;
`;
const StyleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;
export default function Form({
  buttonText,
  buttonFunc,
  title,
  allReadySigned,
}) {
  return (
    <StyleForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1>{title}</h1>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" />
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" />
      <Button text={buttonText} func={buttonFunc} />
      {!allReadySigned && (
        <StyleButton onClick={() => buttonFunc()}>
          all Ready Signed?
        </StyleButton>
      )}
    </StyleForm>
  );
}
