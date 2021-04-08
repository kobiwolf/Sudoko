import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import api from '../helpFuncs/Api';
import ErrorMassage from './ErrorMassage';
import LabelInputForm from './LabalInputForm';
import fetchData from '../helpFuncs/fetchData';

const StyleForm = styled.form`
  border: 1px solid #d4d4d599;
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
  setIsLogged,
  buttonText,
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

  const signInSubmit = async () => {
    const data = await fetchData();
    const match = data.find(
      (player) => player.name === name && player.password === password
    );
    if (!match) setIsFoundName(false);
    else {
      setIsLogged(true);
      setPlayerDetails({
        name: match.name,
        score: match.score,
        avatar: match.avatar,
        time: match.time,
      });
    }
  };
  const signUpSubmit = async () => {
    const data = await fetchData();

    if (data.find((player) => player.name === name)) setNameTaken(true);
    else {
      setIsLogged(true);
      await api.post('/', {
        name,
        password,
        score: 0,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 40
        )}.jpg`,
      });
      setPlayerDetails({ name: name, score: 0 });
    }
  };
  const onButtonClick = () => {
    if (name.length < 8 || password.length < 8) setWrongInput(true);
    else allReadySigned ? signInSubmit() : signUpSubmit();
  };

  return (
    <StyleForm
      className="ui form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 className="ui header">{title}</h1>
      <LabelInputForm
        textLabel="Name"
        type="text"
        myState={name}
        setMyState={setName}
      />
      <ErrorMassage
        condition={!allReadySigned}
        text="*A name must be unique and have at least 8 letters/digits"
      />
      <LabelInputForm
        textLabel="Password"
        type={title === 'Sign In FORM' ? 'password' : 'text'}
        myState={password}
        setMyState={setPassword}
      />
      <ErrorMassage
        condition={!allReadySigned}
        text="*A Password must have at least 8 letters/digits"
      />
      <ErrorMassage
        condition={wrongInput}
        text="Your name or your password are invalid,please check again"
      />

      <Button text={buttonText} func={onButtonClick} />
      <ErrorMassage
        condition={!isFoundName}
        text="sorry,we didn't find your name or your password is incorrect...please check again"
      />
      <ErrorMassage
        condition={nameTaken}
        text="Sorry,name already taken please choose another name"
      />

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
