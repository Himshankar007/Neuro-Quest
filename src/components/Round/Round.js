// src/components/Round/Round.js

import React, { useState, useEffect } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import Question from '../Question/Question';
import InstructionsPage from '../InstructionsPage/InstructionsPage'; // Import the new component
import './Round.css';

function Round({ roundData, onBackToMenu }) {
  const [view, setView] = useState('instructions'); // 'instructions', 'gameboard', or 'question'
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    setAnsweredQuestions([]);
    setView('instructions'); // Reset to instructions view when round changes
  }, [roundData]);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setView('question'); // Change view to the question page
  };

  const handleGoBack = () => {
    if (selectedQuestion) {
      setAnsweredQuestions([...answeredQuestions, selectedQuestion.id]);
    }
    setSelectedQuestion(null);
    setView('gameboard'); // Go back to the gameboard
  };

  const renderContent = () => {
    switch (view) {
      case 'instructions':
        return (
          <InstructionsPage
            roundName={roundData.name}
            instructions={roundData.instructions}
            onStartRound={() => setView('gameboard')}
          />
        );
      case 'gameboard':
        return (
          <>
            <h2 className="round-title">{roundData.name}</h2>
            <GameBoard
              roundData={roundData}
              questions={roundData.questions}
              onQuestionSelect={handleQuestionSelect}
              answeredQuestions={answeredQuestions}
            />
          </>
        );
      case 'question':
        return (
          <Question
            question={selectedQuestion}
            onGoBack={handleGoBack}
            roundNumber={roundData.round}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="round-container">
      <button className="back-to-menu" onClick={onBackToMenu}>
        &lt; Back to Rounds
      </button>
      {renderContent()}
    </div>
  );
}

export default Round;