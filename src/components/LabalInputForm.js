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
      <div className="field">
        <label htmlFor={textLabel}>{textLabel}:</label>
        <input
          placeholder={textLabel}
          ref={inputRef}
          type={type}
          id={textLabel}
          value={myState}
          onChange={(e) => setMyState(e.target.value)}
        />
        {textLabel === 'Password' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              text={
                type === 'password' && textLabel === 'Password'
                  ? 'show'
                  : 'hide'
              }
              func={createShowButton}
            />
          </div>
        )}
      </div>
    </>
  );
}
