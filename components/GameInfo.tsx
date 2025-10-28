

import React from 'react';

interface GameInfoProps {
  score: number;
  level: number;
  linesCleared: number;
  lives: number;
  uiBgClass: string; // New prop
  uiBorderClass: string; // New prop
  uiInnerBgClass: string; // New prop
}

const GameInfo: React.FC<GameInfoProps> = ({ score, level, linesCleared, lives, uiBgClass, uiBorderClass, uiInnerBgClass }) => {
  return (
    <div className={`flex flex-col gap-3 p-4 ${uiBgClass} ${uiBorderClass} border-2 rounded shadow-md w-full max-w-xs`}>
      <div className={`flex justify-between items-center ${uiInnerBgClass} p-2 rounded`}>
        <span className="font-['Press_Start_2P'] text-xs text-gray-300">SCORE</span>
        <span className="font-['Press_Start_2P'] text-sm text-yellow-400">{score}</span>
      </div>
      <div className={`flex justify-between items-center ${uiInnerBgClass} p-2 rounded`}>
        <span className="font-['Press_Start_2P'] text-xs text-gray-300">LEVEL</span>
        <span className="font-['Press_Start_2P'] text-sm text-green-400">{level}</span>
      </div>
      <div className={`flex justify-between items-center ${uiInnerBgClass} p-2 rounded`}>
        <span className="font-['Press_Start_2P'] text-xs text-gray-300">LINES</span>
        <span className="font-['Press_Start_2P'] text-sm text-purple-400">{linesCleared}</span>
      </div>
      <div className={`flex justify-between items-center ${uiInnerBgClass} p-2 rounded`}>
        <span className="font-['Press_Start_2P'] text-xs text-gray-300">LIVES</span>
        <span className="font-['Press_Start_2P'] text-sm text-red-400">{lives}</span>
      </div>
    </div>
  );
};

export default GameInfo;