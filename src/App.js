// src/App.js

import React, { useState } from 'react';
import Round from './components/Round/Round';
import { rounds } from './questions';
import './App.css';
import './WelcomePage.css';

// --- WelcomePage Component ---
const WelcomePage = ({ onEnter }) => {
  return (
    <div className="welcome-container">
      {/* Header with Logos + Name */}
      <div className="header-bar">
        <img 
          src="https://aditya.ac.in/aec/wp-content/uploads/2015/04/aditya-logo.png" 
          alt="College Logo" 
          className="clg-logo" 
        />
        <img 
          src="Aditya name.png" 
          alt="Clg Name" 
          className="aditya-name" 
        />
        <img 
          src="LOGO.png" 
          alt="Event Logo" 
          className="event-logo" 
        />
      </div>

      {/* Main Content */}
      <div className="welcome-content">
        <h1 className="fade-in">Welcome to Neuro Quest</h1>
        <h2 className="fade-in">Organized by VisionX AI</h2>
        <p className="fade-in">💡 Unlock Your Mind • Compete • Learn • Win</p>
        <button className="btn" onClick={onEnter}>
          Enter
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentRound, setCurrentRound] = useState(null);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  // 1. Show the Welcome Page first
  if (showWelcome) {
    return <WelcomePage onEnter={handleEnter} />;
  }

  // 2. If a round is selected, show the Round component
  if (currentRound) {
    return <Round roundData={currentRound} onBackToMenu={() => setCurrentRound(null)} />;
  }

  // 3. Otherwise, show the main round selection menu
  return (
    <div className="app-container">
      <div className="main-menu">
        <h1 className="main-title">AI QUIZ CHALLENGE</h1>
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
