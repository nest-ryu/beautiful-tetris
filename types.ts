

export type CellValue = [string, string]; // [colorClass, 'clear' | 'merged']

export type BoardShape = CellValue[][];

export interface PieceShape {
  shape: (string | number)[][]; // Use string for '0' to represent empty, and number for block type, or simply use 0/1. Let's use 0 for empty and 1 for filled.
  color: string;
}

export interface Tetromino {
  shape: (0 | 1)[][];
  color: string;
}

export interface Player {
  pos: { x: number; y: number };
  tetromino: Tetromino;
  collided: boolean;
}

export interface Theme {
  id: string;
  name: string;
  bodyBgClass: string;
  boardBgClass: string;
  boardBorderClass: string;
  emptyCellClass: string;
  uiBgClass: string; // For GameInfo, NextPieceDisplay main container
  uiBorderClass: string; // For GameInfo, NextPieceDisplay border
  uiInnerBgClass: string; // For SCORE, LEVEL, LINES, LIVES boxes inside GameInfo
}