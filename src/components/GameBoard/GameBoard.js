// src/components/GameBoard/GameBoard.js

import React from 'react';
import './GameBoard.css';

const GameBoard = ({ roundData, questions, onQuestionSelect, answeredQuestions }) => {
  // Determine the CSS class based on the round number
  const boardClassName = roundData.round === 1 ? 'game-board round-one-grid' : 'game-board';

  return (
    <div className={boardClassName}>
      {questions.map((question) => (
        <div
          key={question.id}
          className={`question-number ${
            answeredQuestions.includes(question.id) ? 'answered' : ''
          }`}
          onClick={() =>
            !answeredQuestions.includes(question.id) && onQuestionSelect(question)
          }
        >
          {question.id}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;