import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import api from '../helpFuncs/Api';

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
const StyledSpan = styled.span`
  display: block;
  color: red;
  font-size: 0.8rem;
`;
export default function Form({
  setIsLogged,
  buttonText,
  buttonFunc,
  title,
  allReadySigned,
  toggleText,
  setState,
  setPlayerDetails,
}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [wrongInput, setWrongInput] = useState(false);
  const [nameTaken, setNameTaken] = useState(false);
  const [isFoundName, setIsFoundName] = useState(true);

  const fetchData = async () => {
    const { data } = await api.get('/');
    return data;
  };

  const signInSubmit = async () => {
    const data = await fetchData();
    const match = data.find(
      (player) => player.name === name && player.password === password
    );
    if (!match) setIsFoundName(false);
    else {
      setIsLogged(true);
      setPlayerDetails({ name: match.name, score: match.score });
    }
  };
  const signUpSubmit = async () => {
    const data = await fetchData();
    console.log(data);
    if (data.find((player) => player.name === name)) setNameTaken(true);
    else {
      setIsLogged(true);
      await api.post('/', { name, password, score: 0 });
    }
  };
  const onButtonClick = () => {
    console.log(name.length);
    if (name.length < 8 || password.length < 8) setWrongInput(true);
    else allReadySigned ? signInSubmit() : signUpSubmit();
  };
  const toggleDisplay = (condition, text) =>
    condition ? <StyledSpan>{text}</StyledSpan> : null;
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
      {toggleDisplay(
        !allReadySigned,
        '*A name must be unique and have at least 8 letters/digits'
      )}

      <label htmlFor="password">Password:</label>
      {toggleDisplay(
        !allReadySigned,
        '*A Password must have at least 8 letters/digits'
      )}
      <input
        type={title === 'Sign In FORM' ? 'password' : 'text'}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {toggleDisplay(
        wrongInput,
        'Your name or your password are invalid,please check again'
      )}

      <Button text={buttonText} func={onButtonClick} />
      {toggleDisplay(
        !isFoundName,
        "sorry,we didn't find your name or your password is incorrect...please check again"
      )}
      {toggleDisplay(
        nameTaken,
        'Sorry,name already taken please choose another name'
      )}
      <StyleButton
        onClick={() => {
          setWrongInput(false);
          setState(!allReadySigned);
        }}
      >
        {toggleText}
      </StyleButton>
    </StyleForm>
  );
}
