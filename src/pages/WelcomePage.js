import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';
export default function WelcomePage() {
  const [isSigned, setIsSigned] = useState(false);
  const toggleIsSigned = () => {
    console.log(isSigned);
    setIsSigned(!isSigned);
  };
  return (
    <div>
      <Link to="/board">to board</Link>
      <Link to="/players">to player</Link>
      {isSigned ? (
        <Form
          title="Sign In FORM"
          buttonText="LOG IN"
          buttonFunc={toggleIsSigned}
          allReadySigned={true}
        />
      ) : (
        <Form
          title="Sign up FORM"
          buttonText="LOG up"
          buttonFunc={toggleIsSigned}
          allReadySigned={false}
        />
      )}
    </div>
  );
}
