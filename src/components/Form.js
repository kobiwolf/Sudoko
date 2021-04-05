import React from 'react';
import Button from './Button';
import './Form.css';
export default function Form({
  buttonText,
  buttonFunc,
  title,
  allReadySigned,
}) {
  return (
    <form
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
        <button className="link-button" onClick={() => buttonFunc()}>
          all Ready Signed?
        </button>
      )}
    </form>
  );
}
