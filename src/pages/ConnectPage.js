import React, { useState } from 'react';

import Form from '../components/Form';

export default function WelcomePage({ setIsLogged, setPlayerDetails }) {
  const [isSigned, setIsSigned] = useState(false);

  return (
    <>
      <div>
        {isSigned ? (
          <Form
            setPlayerDetails={setPlayerDetails}
            setIsLogged={setIsLogged}
            title="Sign In Form"
            buttonText="Log In"
            toggleText="hoo...new here?"
            setState={setIsSigned}
            allReadySigned={true}
          />
        ) : (
          <Form
            setPlayerDetails={setPlayerDetails}
            setIsLogged={setIsLogged}
            title="Sign up Form"
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
