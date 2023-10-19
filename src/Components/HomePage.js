import React from 'react';
import './HomePage.css';

const HomePage = ({ onStartQuiz }) => {
  return (
    <div className='home'>
      <h1>Welcome to the Game!</h1>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default HomePage;