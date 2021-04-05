import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';
export default function WelcomePage() {
  const [isSigned, setIsSigned] = useState(false);
  const getNamePassword = () => {
    console.log('got the password!');
  };
  return (
    <div>
      <Link to="/board">to board</Link>
      <Link to="/players">to player</Link>
      {isSigned ? (
        <Form
          title="Sign In FORM"
          buttonText="LOG IN"
          toggleText="hoo...new here?"
          buttonFunc={getNamePassword}
          setState={setIsSigned}
          allReadySigned={true}
        />
      ) : (
        <Form
          title="Sign up FORM"
          buttonText="LOG up"
          buttonFunc={getNamePassword}
          toggleText="Already have an account?"
          setState={setIsSigned}
          allReadySigned={false}
        />
      )}
    </div>
  );
}
