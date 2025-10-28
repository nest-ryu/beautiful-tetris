

import React from 'react';
import { BoardShape } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: BoardShape;
  currentPieceShape: (0 | 1)[][];
  currentPiecePos: { x: number; y: number };
  currentPieceColor: string;
  boardBgClass: string; // New prop
  boardBorderClass: string; // New prop
}

const Board: React.FC<BoardProps> = ({ board, currentPieceShape, currentPiecePos, currentPieceColor, boardBgClass, boardBorderClass }) => {
  const displayBoard: BoardShape = board.map(row => row.map(cell => cell)); // Create a copy

  // Draw the current falling piece onto the display board
  currentPieceShape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = y + currentPiecePos.y;
        const boardX = x + currentPiecePos.x;
        if (boardY >= 0 && boardY < displayBoard.length && boardX >= 0 && boardX < displayBoard[0].length) {
          displayBoard[boardY][boardX] = [currentPieceColor, 'clear']; // 'clear' as it's still moving
        }
      }
    });
  });

  return (
    <div
      className={`${boardBgClass} ${boardBorderClass} border-4 rounded-lg shadow-xl overflow-hidden p-1`}
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))`,
        width: `${board[0].length * 32}px`, // 32px per cell (sm:w-8)
        height: `${board.length * 32}px`,
        maxWidth: 'calc(100vw - 2rem)', // Max width for mobile
        maxHeight: 'calc(100vh - 2rem)', // Max height for mobile
      }}
    >
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <Cell key={`${y}-${x}`} type={cell} />
        ))
      )}
    </div>
  );
};

export default Board;