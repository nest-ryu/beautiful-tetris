
import React from 'react';
import { Tetromino } from '../types';
import Cell from './Cell';

interface NextPieceDisplayProps {
  nextPiece: Tetromino;
  emptyCellClass: string;
  uiBgClass: string;
  uiBorderClass: string;
}

const NextPieceDisplay: React.FC<NextPieceDisplayProps> = ({ 
  nextPiece, 
  emptyCellClass, 
  uiBgClass, 
  uiBorderClass 
}) => {
  const rows = 4;
  const cols = 4;
  const shape = nextPiece.shape;

  // Center the piece in a 4x4 grid
  const offsetX = Math.floor((cols - shape[0].length) / 2);
  const offsetY = Math.floor((rows - shape.length) / 2);

  return (
    <div className={`${uiBgClass} ${uiBorderClass} border-2 rounded-xl p-4 shadow-xl w-full max-w-xs`}>
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-gray-300">NEXT</h3>
      </div>
      <div
        className="grid grid-cols-4 gap-0 mx-auto"
        style={{
          width: `${cols * 32}px`,
          height: `${rows * 32}px`,
        }}
      >
        {Array.from({ length: rows }).map((_, y) =>
          Array.from({ length: cols }).map((_, x) => {
            const shapeY = y - offsetY;
            const shapeX = x - offsetX;
            const hasBlock = 
              shapeY >= 0 && shapeY < shape.length &&
              shapeX >= 0 && shapeX < shape[0].length &&
              shape[shapeY][shapeX] !== 0;

            return (
              <Cell
                key={`${y}-${x}`}
                type={hasBlock ? [nextPiece.color, 'clear'] : [emptyCellClass, 'clear']}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default NextPieceDisplay;
