
import React from 'react';
import Button from './Button';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-['Press_Start_2P'] text-4xl text-red-400 mb-4 animate-pulse">GAME OVER</h2>
      <div className="text-xl text-gray-300 mb-6">
        <div>Final Score:</div>
        <div className="text-3xl font-bold text-white font-mono mt-2">{score.toLocaleString()}</div>
      </div>
      <Button onClick={onRestart}>PLAY AGAIN</Button>
    </div>
  );
};

export default GameOverScreen;
