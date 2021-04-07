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
