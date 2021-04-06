import React from 'react';

// const StyleDiv = styled.div`
//   border: 1px solid black;
//   border-radius: 15px;
//   display: ;
// `;

export default function WonMassage({ playerDetails }) {
  return (
    <div className="ui floating message">
      <h1>Congratulations You've Won!</h1>
      <h1>Your new score is:{playerDetails.score}!</h1>
      <h6>the score is based on your time & the sudoku difficulty </h6>
    </div>
  );
}
