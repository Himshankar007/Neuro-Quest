// src/components/InstructionsPage/InstructionsPage.js

import React from 'react';
import './InstructionsPage.css';

const InstructionsPage = ({ roundName, instructions, onStartRound }) => {
  return (
    <div className="instructions-container">
      <h2 className="instructions-title">{roundName} - Instructions</h2>
      <div className="instructions-text">
        <p>{instructions}</p>
      </div>
      <button className="start-round-btn" onClick={onStartRound}>
        Start Round
      </button>
    </div>
  );
};

export default InstructionsPage;