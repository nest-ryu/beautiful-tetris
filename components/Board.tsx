
import React from 'react';
import { BoardShape } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: BoardShape;
  currentPieceShape: (0 | 1)[][];
  currentPiecePos: { x: number; y: number };
  currentPieceColor: string;
  boardBgClass: string;
  boardBorderClass: string;
}

const Board: React.FC<BoardProps> = ({ board, currentPieceShape, currentPiecePos, currentPieceColor, boardBgClass, boardBorderClass }) => {
  const displayBoard: BoardShape = board.map(row => [...row]);

  // Draw the current falling piece
  currentPieceShape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = y + currentPiecePos.y;
        const boardX = x + currentPiecePos.x;
        if (boardY >= 0 && boardY < displayBoard.length && boardX >= 0 && boardX < displayBoard[0].length) {
          displayBoard[boardY][boardX] = [currentPieceColor, 'clear'];
        }
      }
    });
  });

  return (
    <div
      className={`${boardBgClass} ${boardBorderClass} border-4 rounded-xl shadow-2xl overflow-hidden p-1`}
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))`,
        width: `${board[0].length * 32}px`,
        height: `${board.length * 32}px`,
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: 'calc(100vh - 2rem)',
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
