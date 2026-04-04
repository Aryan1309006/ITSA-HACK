import { useState, useCallback } from 'react';
import API from '../api/axios';

export const useGameSession = () => {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const submitAnswer = useCallback((isCorrect) => {
    const points = isCorrect ? 15 : -15;
    setScore(prev => prev + points);
    setFeedback({
      isCorrect,
      points,
      message: isCorrect ? 'Correct! +15 points' : 'Incorrect! -15 points',
    });
    return points;
  }, []);

  const saveSession = useCallback(async (sessionData) => {
    try {
      const payload = {
        scenarioId: sessionData.scenarioId || 'mock-scenario',
        scenarioTitle: sessionData.scenarioTitle || 'Simulation',
        score,
        redFlagsSpotted: sessionData.redFlagsSpotted || 0,
        totalRedFlags: sessionData.totalRedFlags || 0,
        choicesMade: sessionData.choicesMade || [],
        vulnerabilityType: sessionData.vulnerabilityType || 'Phishing',
      };
      
      const res = await API.post('/sessions', payload);
      setSessionComplete(true);
      return res.data;
    } catch (err) {
      console.error('Failed to save session:', err);
      throw err;
    }
  }, [score]);

  const resetSession = useCallback(() => {
    setScore(0);
    setFeedback(null);
    setSessionComplete(false);
  }, []);

  return {
    score,
    feedback,
    sessionComplete,
    submitAnswer,
    saveSession,
    resetSession,
  };
};
