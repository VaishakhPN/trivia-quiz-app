import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Question.css';
import Results from '../Results';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Question = ({ score, endQuiz, setScore, totalQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=29&type=multiple');
        const shuffledQuestions = response.data.results.map((question) => {
          const options = shuffleArray([question.correct_answer, ...question.incorrect_answers]);
          question.options = options;
          return question;
        });
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    setIsLastQuestion(currentQuestionIndex === totalQuestions - 1);
  }, [currentQuestionIndex, totalQuestions]);

  const handleAnswerClick = (option) => {
    if (!showNextButton) {
      setSelectedOption(option);
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === questions[currentQuestionIndex]?.correct_answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (isLastQuestion) {
      setShowNextButton(false);
      endQuiz();
    } else {
      setTimeout(() => {
        setShowNextButton(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
        setQuestionNumber((prevNumber) => prevNumber + 1);
      }, 1000);
    }
  };

  if (currentQuestionIndex < totalQuestions) {
    return (
      <div className="question">
        <h1>Comics Quiz</h1>
        <h2>Question {questionNumber}</h2>
        <h3>{questions[currentQuestionIndex]?.question}</h3>
        <div className="options">
          {questions[currentQuestionIndex]?.options.map((option, index) => (
            <div
              key={index}
              className={`option ${showNextButton && option === selectedOption && (option === questions[currentQuestionIndex]?.correct_answer ? 'correct' : 'wrong')}`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
        {showNextButton ? (
          <button onClick={handleNextQuestion}>
            {isLastQuestion ? 'See Results' : 'Next'}
          </button>
        ) : null}
      </div>
    );
  } else return <Results score={score}></Results>;
};

export default Question;
