import React, { useState } from 'react';
import styled from 'styled-components';
import Form from '../components/Form';
const StyleHead = styled.header`
  height: 2rem;
  background-color: lightgrey;
  display: flex;
  justify-content: space-around;
  width=100%;
`;
export default function WelcomePage({ setIsLogged, setPlayerDetails }) {
  const [isSigned, setIsSigned] = useState(false);

  return (
    <>
      <div>
        {isSigned ? (
          <Form
            setPlayerDetails={setPlayerDetails}
            setIsLogged={setIsLogged}
            title="Sign In FORM"
            buttonText="LOG IN"
            toggleText="hoo...new here?"
            setState={setIsSigned}
            allReadySigned={true}
          />
        ) : (
          <Form
            setPlayerDetails={setPlayerDetails}
            setIsLogged={setIsLogged}
            title="Sign up FORM"
            buttonText="Sign Up"
            toggleText="Already have an account?"
            setState={setIsSigned}
            allReadySigned={false}
          />
        )}
      </div>
    </>
  );
}
