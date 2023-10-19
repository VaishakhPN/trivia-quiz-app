import React from 'react';
import './Results.css';

const Results = ({ score }) => {
  return (
    <div className="results">
      <h2>Quiz Results</h2>
      <p>Correct Answers: {score}/10</p>
      <button onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
};

export default Results;