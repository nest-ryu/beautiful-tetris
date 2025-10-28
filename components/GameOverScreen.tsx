
import React from 'react';
import Button from './Button';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center p-4 rounded-lg z-10">
      <h2 className="font-['Press_Start_2P'] text-4xl text-red-500 mb-6 animate-pulse">GAME OVER!</h2>
      <p className="font-['Press_Start_2P'] text-xl text-white mb-8">FINAL SCORE: <span className="text-yellow-400">{score}</span></p>
      <Button variant="primary" onClick={onRestart}>
        RESTART GAME
      </Button>
    </div>
  );
};

export default GameOverScreen;
