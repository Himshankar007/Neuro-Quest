// src/components/Round/Round.js

import React, { useState, useEffect } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import Question from '../Question/Question';
import './Round.css';

function Round({ roundData, onBackToMenu }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    setAnsweredQuestions([]);
  }, [roundData]);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleGoBack = () => {
    if (selectedQuestion) {
      setAnsweredQuestions([...answeredQuestions, selectedQuestion.id]);
    }
    setSelectedQuestion(null);
  };

  return (
    <div className="round-container">
      <button className="back-to-menu" onClick={onBackToMenu}>
        &lt; Back to Rounds
      </button>
      {!selectedQuestion ? (
        <>
          <h2 className="round-title">{roundData.name}</h2>
          <GameBoard
            roundData={roundData}
            questions={roundData.questions}
            onQuestionSelect={handleQuestionSelect}
            answeredQuestions={answeredQuestions}
          />
        </>
      ) : (
        <Question
          question={selectedQuestion}
          onGoBack={handleGoBack}
          // ADDED THIS PROP to tell the Question component which round it is
          roundNumber={roundData.round}
        />
      )}
    </div>
  );
}

export default Round;