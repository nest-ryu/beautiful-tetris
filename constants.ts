

import { Tetromino, Theme } from './types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINOS: { [key: string]: Tetromino } = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    color: 'bg-cyan-500',
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: 'bg-blue-500',
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: 'bg-orange-500',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'bg-yellow-500',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: 'bg-green-500',
  },
  T: {
    shape: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: 'bg-purple-500',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-red-500',
  },
};

export const INITIAL_DROP_TIME = 1000; // milliseconds
export const DROP_TIME_DECREASE_PER_LEVEL = 70; // milliseconds
export const MIN_DROP_TIME = 100; // milliseconds
export const LINES_PER_LEVEL = 10;
export const INITIAL_LIVES = 3;

export const THEMES: Theme[] = [
  {
    id: 'classic',
    name: 'Classic Dark',
    bodyBgClass: 'bg-gray-900',
    boardBgClass: 'bg-gray-900',
    boardBorderClass: 'border-gray-700',
    emptyCellClass: 'bg-gray-800',
    uiBgClass: 'bg-gray-800',
    uiBorderClass: 'border-gray-700',
    uiInnerBgClass: 'bg-gray-900',
  },
  {
    id: 'ocean',
    name: 'Ocean Blues',
    bodyBgClass: 'bg-blue-900',
    boardBgClass: 'bg-blue-800',
    boardBorderClass: 'border-blue-600',
    emptyCellClass: 'bg-blue-700',
    uiBgClass: 'bg-blue-700',
    uiBorderClass: 'border-blue-600',
    uiInnerBgClass: 'bg-blue-800',
  },
  {
    id: 'forest',
    name: 'Deep Forest',
    bodyBgClass: 'bg-green-900',
    boardBgClass: 'bg-green-800',
    boardBorderClass: 'border-green-600',
    emptyCellClass: 'bg-green-700',
    uiBgClass: 'bg-green-700',
    uiBorderClass: 'border-green-600',
    uiInnerBgClass: 'bg-green-800',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    bodyBgClass: 'bg-indigo-900',
    boardBgClass: 'bg-indigo-800',
    boardBorderClass: 'border-indigo-600',
    emptyCellClass: 'bg-indigo-700',
    uiBgClass: 'bg-indigo-700',
    uiBorderClass: 'border-indigo-600',
    uiInnerBgClass: 'bg-indigo-800',
  },
];

export const DEFAULT_THEME_ID = 'classic';