

import { BOARD_HEIGHT, BOARD_WIDTH, TETROMINOS } from '../constants';
import { BoardShape, CellValue, Player, Tetromino } from '../types';

export const createBoard = (emptyCellColorClass: string): BoardShape =>
  // Fix: Explicitly cast the value to CellValue to ensure type safety during board initialization.
  Array.from(Array(BOARD_HEIGHT), () =>
    Array(BOARD_WIDTH).fill([emptyCellColorClass, 'clear'] as CellValue)
  );

export const randomTetromino = (): Tetromino => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const checkCollision = (
  player: Player,
  board: BoardShape,
  { x: moveX, y: moveY }: { x: number; y: number }
): boolean => {
  for (let y = 0; y < player.tetromino.shape.length; y++) {
    for (let x = 0; x < player.tetromino.shape[y].length; x++) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino.shape[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // Don't need to check if it's over the top as the piece starts there
          !board[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell we're moving to isn't already set
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const rotate = (matrix: (0 | 1)[][], dir: number): (0 | 1)[][] => {
  // Make the rows to be cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse());
  return rotatedTetro.reverse();
};

export const updateBoard = (
  prevBoard: BoardShape,
  player: Player
): BoardShape => {
  // First, clear the board from previous render
  const newBoard = prevBoard.map((row) =>
    row.map((cell) => (cell[1] === 'clear' ? cell : cell)) // This line assumes a clear cell should retain its background color
  );

  // Then, draw the Tetromino
  player.tetromino.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newBoard[y + player.pos.y][x + player.pos.x] = [player.tetromino.color, 'clear'];
      }
    });
  });
  return newBoard;
};

export const mergePiece = (
  board: BoardShape,
  player: Player
): BoardShape => {
  const newBoard = board.map((row, y) =>
    // Fix: Explicitly define the type for the elements returned by the inner map.
    // This ensures that the inner map produces an array of CellValue tuples, resolving a type inference issue.
    row.map<CellValue>((cell, x) => {
      if (
        player.tetromino.shape[y - player.pos.y] &&
        player.tetromino.shape[y - player.pos.y][x - player.pos.x] !== 0
      ) {
        return [player.tetromino.color, 'merged'];
      }
      return cell;
    })
  );
  return newBoard;
};

export const clearLines = (board: BoardShape, emptyCellColorClass: string): { newBoard: BoardShape; clearedLines: number } => {
  let clearedLines = 0;
  // Fix: Explicitly specify the accumulator type for reduce to ensure correct inference of BoardShape.
  // This resolves a type inference issue where TypeScript might incorrectly infer a more general array type.
  const newBoard = board.reduce<BoardShape>((acc, row) => {
    if (row.every((cell) => cell[1] === 'merged')) {
      // If row is full, create a new empty row at the top and don't add this row
      clearedLines++;
      // Fix: Explicitly cast the value to CellValue to ensure type safety,
      // preventing a potential widening to `string[]` which is incompatible with `CellValue` tuple type.
      acc.unshift(Array(BOARD_WIDTH).fill([emptyCellColorClass, 'clear'] as CellValue));
      return acc;
    }
    // If row is not full, add it to the accumulator
    acc.push(row);
    return acc;
  }, [] as BoardShape); // Explicitly cast initial empty array to BoardShape

  return { newBoard, clearedLines };
};