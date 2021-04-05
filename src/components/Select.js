import styled from 'styled-components';

const StyleSelect = styled.select`
  border: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.192);
  }
`;
export default function Select({ sendRef, options, state, setState }) {
  return (
    <StyleSelect
      ref={sendRef}
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyleSelect>
  );
}
