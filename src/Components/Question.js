import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Question.css';
import Results from './Results';
 
const Question = ({score, endQuiz, setScore, totalQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&category=32&type=multiple');
        setQuestions(response.data.results);
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
      setScore(prevScore => prevScore + 1);
    }
 
    if (isLastQuestion) {
      setShowNextButton(false);
      endQuiz();
    } else {
      setTimeout(() => {
        setShowNextButton(false);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
      }, 1000);
    }
  };
 
if(currentQuestionIndex < 9) {
  return (
    <div className="question">
      <h2>{questions[currentQuestionIndex]?.question}</h2>
      <div className="options">
        {questions[currentQuestionIndex]?.incorrect_answers.map((option, index) => (
          <div
            key={index}
            className={`option ${showNextButton && option === selectedOption && (option === questions[currentQuestionIndex]?.correct_answer ? 'correct' : 'wrong')}`}
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </div>
        ))}
        {questions[currentQuestionIndex]?.correct_answer && (
          <div
            className={`option ${showNextButton && questions[currentQuestionIndex]?.correct_answer === selectedOption ? 'correct' : ''}`}
            onClick={() => handleAnswerClick(questions[currentQuestionIndex]?.correct_answer)}
          >
            {questions[currentQuestionIndex]?.correct_answer}
          </div>
        )}
      </div>
      {showNextButton ? (
        <button onClick={handleNextQuestion}>
          {isLastQuestion ? 'See Results' : 'Next'}
        </button>
      ) : null}
    </div>
  );
}
else return <Results score={score}></Results>
};
 
export default Question;



// if (count <= 9) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
//       {currentQuestion && (
//         <>
//           <Question currentQuestion={currentQuestion.question}></Question>
//           <Options
//             options={currentQuestion.options}
//             correctanswer={currentQuestion.correctAnswer}
//             handleOptions={handleOptions}
//             mappedQuiz={mappedQuiz}
//             setCurrentQuestion={setCurrentQuestion}
//             setCount={setCount}
//             correctAnswerCount={correctAnswerCount}
//             setCorrectAnswerCount={setCorrectAnswerCount}
//           ></Options>
//         </>
//       )}
//     </div>
//   );
// } else {
//   return (
//     <div>
//       <h1>Complete</h1>
//       <h2>yyour score is {correctAnswerCount}/10</h2>
//       <div>
//         <button onClick={refreshPage}>Play Again?</button>
//       </div>
//     </div>
//   );
// }