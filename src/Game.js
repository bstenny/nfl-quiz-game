import React, { useState, useEffect } from 'react';
import Question from './Question';
import ScoreBoard from './ScoreBoard';
import nflData from './nflData.json';

const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledTeams, setShuffledTeams] = useState([]);

  useEffect(() => {
    const teams = Object.entries(nflData).flatMap(([division, teams]) =>
      Object.keys(teams).map(team => ({ team, division, coach: nflData[division][team] }))
    );
    teams.sort(() => 0.5 - Math.random());
    setShuffledTeams(teams);
  }, []);

  const allDivisions = Object.keys(nflData);
  const allCoaches = [...new Set(Object.values(nflData).flatMap(teams => Object.values(teams)))];

const handleAnswer = (isDivisionCorrect, isCoachCorrect) => {
  // Update the score based on whether the answers are correct
  if (isDivisionCorrect && isCoachCorrect) {
    setScore(prevScore => prevScore + 1);
  }
  // Proceed to the next question or any other required action
  setCurrentQuestionIndex(currentQuestionIndex + 1);
};


return (
  <div>
    <ScoreBoard score={score} />
    {currentQuestionIndex < shuffledTeams.length ? (
      <Question
        data={shuffledTeams[currentQuestionIndex]}
        onAnswer={handleAnswer}
        allDivisions={allDivisions}
        allCoaches={allCoaches}
      />
    ) : (
      <div>Game Over! Your score: {score}</div>
    )}
  </div>
);

};

export default Game;
