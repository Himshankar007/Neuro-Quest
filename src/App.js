// src/App.js

import React, { useState } from 'react';
import Round from './components/Round/Round';
import { rounds } from './questions';
import './App.css';

function App() {
  const [currentRound, setCurrentRound] = useState(null);

  if (currentRound) {
    return <Round roundData={currentRound} onBackToMenu={() => setCurrentRound(null)} />;
  }

  return (
    <div className="app-container">
      <div className="main-menu">
        <h1 className="main-title">NEURO QUEST</h1>
        <p className="subtitle">Select Your Challenge</p>
        <div className="round-selection">
          {rounds.map((round, index) => (
            <div 
              key={index} 
              className="round-card" 
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setCurrentRound(round)}
            >
              <h2 className="round-card-title">{round.name}</h2>
              <p className="round-card-description">{round.questions.length} Questions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;