// src/components/Timer/Timer.js

import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = ({ initialDuration, isRunning, onComplete, resetKey }) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(initialDuration);
  }, [initialDuration, resetKey]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(0, prevTime - 0.01));
      }, 10);
    } else if (timeLeft <= 0 && isRunning) {
      onComplete();
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onComplete]);

  const timerColorClass =
    timeLeft <= 10 ? 'red' : timeLeft <= 30 ? 'yellow' : 'green';

  const formatTime = (time) => {
    const seconds = Math.floor(time);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className={`timer-display ${timerColorClass}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;