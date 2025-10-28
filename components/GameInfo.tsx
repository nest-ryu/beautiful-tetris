
import React from 'react';

interface GameInfoProps {
  score: number;
  level: number;
  linesCleared: number;
  lives: number;
  uiBgClass: string;
  uiBorderClass: string;
  uiInnerBgClass: string;
}

const GameInfo: React.FC<GameInfoProps> = ({ score, level, linesCleared, lives, uiBgClass, uiBorderClass, uiInnerBgClass }) => {
  return (
    <div className={`${uiBgClass} ${uiBorderClass} border-2 rounded-xl p-4 shadow-xl w-full max-w-xs`}>
      <div className={`${uiInnerBgClass} p-4 rounded-lg space-y-3`}>
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">SCORE</div>
          <div className="text-3xl font-bold text-white font-mono">{score.toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">LEVEL</div>
            <div className="text-2xl font-bold text-blue-400 font-mono">{level}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">LINES</div>
            <div className="text-2xl font-bold text-green-400 font-mono">{linesCleared}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
