

import React from 'react';
import { Tetromino } from '../types';
import Cell from './Cell';

interface NextPieceDisplayProps {
  nextPiece: Tetromino;
  emptyCellClass: string; // New prop
  uiBgClass: string; // New prop
  uiBorderClass: string; // New prop
}

const NextPieceDisplay: React.FC<NextPieceDisplayProps> = ({ nextPiece, emptyCellClass, uiBgClass, uiBorderClass }) => {
  // Create a small grid to display the next piece
  const gridRows = nextPiece.shape.length;
  const gridCols = nextPiece.shape[0].length;

  const displayGrid = Array.from(Array(gridRows), () =>
    Array(gridCols).fill([emptyCellClass, 'clear'])
  );

  nextPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        displayGrid[y][x] = [nextPiece.color, 'clear'];
      }
    });
  });

  return (
    <div className={`${uiBgClass} ${uiBorderClass} border-2 rounded p-2 flex flex-col items-center justify-center`}>
      <h3 className="font-['Press_Start_2P'] text-sm mb-2 text-gray-300">NEXT</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
        }}
      >
        {displayGrid.map((row, y) =>
          row.map((cell, x) => (
            <Cell key={`${y}-${x}-next`} type={cell} />
          ))
        )}
      </div>
    </div>
  );
};

export default NextPieceDisplay;