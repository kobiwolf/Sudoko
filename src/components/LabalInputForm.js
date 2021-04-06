import React, { useRef } from 'react';
import Button from './Button';

export default function LabelInputForm({
  textLabel,
  type,
  myState,
  setMyState,
}) {
  const inputRef = useRef();
  const createShowButton = ({ target }) => {
    inputRef.current.type =
      inputRef.current.type === 'password' ? 'text' : 'password';
    target.innerHTML = target.innerHTML === 'show' ? 'hide' : 'show';
  };
  return (
    <>
      <label htmlFor={textLabel}>{textLabel}:</label>
      <div>
        <input
          ref={inputRef}
          type={type}
          id={textLabel}
          value={myState}
          onChange={(e) => setMyState(e.target.value)}
        />
        {textLabel === 'Password' && (
          <Button text="show" func={createShowButton} />
        )}
      </div>
    </>
  );
}
