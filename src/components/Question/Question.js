// src/components/Question/Question.js

import React, { useState, useEffect } from 'react';
import Timer from '../Timer/Timer';
import './Question.css';

// ADDED roundNumber to the component's props
const Question = ({ question, onGoBack, roundNumber }) => {
  const [timerIsRunning, setTimerIsRunning] = useState(true);
  const [timerDuration, setTimerDuration] = useState(60);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [passAvailable, setPassAvailable] = useState(true);

  useEffect(() => {
    setTimerIsRunning(true);
  }, []);

  const handleOptionClick = (option) => {
    if (isAnswerRevealed) return;
    setTimerIsRunning(false);
    setSelectedOption(option);
  };

  const handleViewAnswerClick = () => {
    setTimerIsRunning(false);
    setIsAnswerRevealed(true);
  };

  const handlePassClick = () => {
    if (!passAvailable) return;
    setTimerDuration(30);
    setTimerResetKey((prevKey) => prevKey + 1);
    setTimerIsRunning(true);
    setPassAvailable(false);
    setSelectedOption(null);
  };

  const getOptionClassName = (option) => {
    if (!isAnswerRevealed) {
      return selectedOption === option ? 'selected' : '';
    }
    if (option === question.correctAnswer) {
      return 'correct';
    }
    if (option === selectedOption) {
      return 'wrong';
    }
    return 'disabled';
  };

  return (
    <div className="question-view-container">
      <div className="question-header">
        <h2>Question {question.id}</h2>
        <Timer
          initialDuration={timerDuration}
          isRunning={timerIsRunning}
          onComplete={() => setTimerIsRunning(false)}
          resetKey={timerResetKey}
        />
      </div>

      <div className="question-body">
        <p className="question-text">{question.text}</p>
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${getOptionClassName(option)}`}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswerRevealed}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        {/* --- THIS IS THE CONDITIONAL LOGIC --- */}
        {/* Only show the PASS button if the round is 1 or 2 */}
        {(roundNumber === 1 || roundNumber === 2) && (
          <button
            onClick={handlePassClick}
            className="action-btn pass-btn"
            disabled={!passAvailable || isAnswerRevealed}
          >
            PASS (30s)
          </button>
        )}
        <button
          onClick={handleViewAnswerClick}
          className="action-btn view-answer-btn"
          disabled={isAnswerRevealed || !selectedOption}
        >
          View Answer
        </button>
      </div>
      
      <button className="back-to-board" onClick={onGoBack}>
        Back to Board
      </button>
    </div>
  );
};

export default Question;