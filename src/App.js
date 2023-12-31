import React, { useState } from 'react';
import HomePage from './pages/HomePage/index';
import Question from './pages/Questions/index';
import Results from './pages/Results/index';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('home');
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setGameState('question');
    setScore(0);
  };

  const endQuiz = () => {
    setGameState('results');
  };
  

  return (
    <div className="app">
      {gameState === 'home' && <HomePage onStartQuiz={startQuiz} />}
      {gameState === 'question' && <Question score={score} endQuiz={endQuiz} totalQuestions={10} setScore={setScore} />}
      {gameState === 'results' && <Results score={score} />}
    </div>
  );
};

export default App;
