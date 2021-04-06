import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyleH3 = styled.h3`
  font-size: 1.5rem;
  display: inline;
  color: red;
`;
export default function Timer({ ref1, ref2 }) {
  const [secs, setSecs] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [finishCount, setFinishCount] = useState(false);
  const addSec = async () => {
    if (finishCount) return;
    await setTimeout(() => {
      if (secs !== 60) setSecs(secs + 1);
      else {
        setSecs(0);
        setMinutes(minutes + 1);
      }
    }, 1000);
  };

  useEffect(() => {
    addSec();
  });
  useEffect(() => {
    if (minutes === 60) setFinishCount(true);
  }, [minutes]);

  return (
    <div>
      <StyleH3 ref={ref2}>{minutes}</StyleH3>:
      <StyleH3 ref={ref1}>{secs}</StyleH3>
    </div>
  );
}
