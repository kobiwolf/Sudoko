import './Select.css';
export default function Select({ sendRef, options, state, setState }) {
  return (
    <select
      ref={sendRef}
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
