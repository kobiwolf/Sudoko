import React, { useRef, useState } from 'react';
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
  toggleText,
  setState,
}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const onButtonClick = () => {
    buttonFunc();
  };
  return (
    <StyleForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1>{title}</h1>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type={title === 'Sign In FORM' ? 'password' : 'text'}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text={buttonText} func={onButtonClick} />
      <StyleButton onClick={() => setState(!allReadySigned)}>
        {toggleText}
      </StyleButton>
    </StyleForm>
  );
}
