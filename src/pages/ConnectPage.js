import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';
export default function WelcomePage({ setIsLogged, setPlayerDetails }) {
  const [isSigned, setIsSigned] = useState(false);
  const getNamePassword = () => {
    console.log('got the password!');
  };
  return (
    <div>
      {isSigned ? (
        <Form
          setPlayerDetails={setPlayerDetails}
          setIsLogged={setIsLogged}
          title="Sign In FORM"
          buttonText="LOG IN"
          toggleText="hoo...new here?"
          buttonFunc={getNamePassword}
          setState={setIsSigned}
          allReadySigned={true}
        />
      ) : (
        <Form
          setPlayerDetails={setPlayerDetails}
          setIsLogged={setIsLogged}
          title="Sign up FORM"
          buttonText="Sign Up"
          buttonFunc={getNamePassword}
          toggleText="Already have an account?"
          setState={setIsSigned}
          allReadySigned={false}
        />
      )}
    </div>
  );
}
