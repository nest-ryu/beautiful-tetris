

import { useState, useCallback, useEffect, useRef } from 'react';
import { createBoard, randomTetromino, checkCollision, rotate, clearLines } from '../utils/tetrisUtils';
import { BOARD_HEIGHT, BOARD_WIDTH, INITIAL_DROP_TIME, DROP_TIME_DECREASE_PER_LEVEL, MIN_DROP_TIME, LINES_PER_LEVEL, INITIAL_LIVES } from '../constants';
import { Player, BoardShape, Tetromino } from '../types';

export const useTetris = (emptyCellColorClass: string) => {
  const [board, setBoard] = useState<BoardShape>(createBoard(emptyCellColorClass));
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino(),
    collided: false,
  });
  const [nextPiece, setNextPiece] = useState<Tetromino>(randomTetromino());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [linesCleared, setLinesCleared] = useState(0);
  const [dropTime, setDropTime] = useState<number | null>(INITIAL_DROP_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lives, setLives] = useState(INITIAL_LIVES);

  // Interval ref to prevent stale closures and manage the game loop
  const intervalRef = useRef<number | undefined>();

  // Reset board when theme changes (emptyCellColorClass changes)
  useEffect(() => {
    setBoard(createBoard(emptyCellColorClass));
    setPlayer(prev => ({ // Reset player position to center with new board
      ...prev,
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
    }));
  }, [emptyCellColorClass]);

  const updatePlayerPos = useCallback(
    ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
      setPlayer((prev) => ({
        ...prev,
        pos: { x: prev.pos.x + x, y: prev.pos.y + y },
        collided,
      }));
    },
    []
  );

  const resetGame = useCallback(() => {
    setBoard(createBoard(emptyCellColorClass));
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino(),
      collided: false,
    });
    setNextPiece(randomTetromino());
    setScore(0);
    setLevel(1);
    setLinesCleared(0);
    setDropTime(INITIAL_DROP_TIME);
    setGameOver(false);
    setIsPaused(false);
    setLives(INITIAL_LIVES);
  }, [emptyCellColorClass]);

  const playerRotate = useCallback((board: BoardShape, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, board, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino.shape[0].length) {
        rotate(clonedPlayer.tetromino.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }, [player]);

  const drop = useCallback(() => {
    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Piece settled
      if (player.pos.y < 1) { // If player is at the top
        if (lives > 1) {
          setLives(prev => prev - 1);
          // Instead of game over, reset the piece
          setPlayer({
            pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
            tetromino: nextPiece,
            collided: false,
          });
          setNextPiece(randomTetromino());
          return;
        } else {
          setGameOver(true);
          setDropTime(null);
        }
      }
      setPlayer((prev) => ({ ...prev, collided: true }));
    }
  }, [player, board, updatePlayerPos, nextPiece, lives, emptyCellColorClass]); // Added emptyCellColorClass here

  const dropPiece = () => {
    if (gameOver || isPaused) return;
    drop();
  };

  const hardDrop = useCallback(() => {
    if (gameOver || isPaused) return;

    let newY = 0;
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      if (checkCollision(player, board, { x: 0, y: y - player.pos.y })) {
        newY = y - player.pos.y - 1;
        break;
      }
      newY = y - player.pos.y;
    }
    updatePlayerPos({ x: 0, y: newY, collided: true });
  }, [player, board, updatePlayerPos, gameOver, isPaused]);

  const movePlayer = useCallback((dir: number) => {
    if (!gameOver && !isPaused && !checkCollision(player, board, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  }, [player, board, updatePlayerPos, gameOver, isPaused]);

  // Handle game updates when player.collided changes (piece settled)
  useEffect(() => {
    if (player.collided) {
      setBoard((prevBoard) => {
        // Merge the collided piece into the board permanently
        player.tetromino.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              prevBoard[y + player.pos.y][x + player.pos.x] = [player.tetromino.color, 'merged'];
            }
          });
        });

        // Clear full lines
        const { newBoard: clearedBoard, clearedLines: newClearedLines } = clearLines(prevBoard, emptyCellColorClass);

        if (newClearedLines > 0) {
          setLinesCleared((prev) => prev + newClearedLines);
          setScore((prev) => prev + (newClearedLines * 100 * level));

          // Level up logic
          if ((linesCleared + newClearedLines) >= (level * LINES_PER_LEVEL)) {
            setLevel((prev) => prev + 1);
            setDropTime(
              Math.max(MIN_DROP_TIME, INITIAL_DROP_TIME - (level * DROP_TIME_DECREASE_PER_LEVEL))
            );
          }
        }
        return clearedBoard;
      });

      // Spawn new piece
      setPlayer({
        pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
        tetromino: nextPiece,
        collided: false,
      });
      setNextPiece(randomTetromino());

      // Check if new piece immediately collides (game over condition)
      if (checkCollision({ pos: { x: BOARD_WIDTH / 2 - 2, y: 0 }, tetromino: nextPiece, collided: false }, board, { x: 0, y: 0 })) {
         if (lives > 1) {
            setLives(prev => prev - 1);
            // Respawn the piece again to prevent immediate game over after losing a life
            setPlayer({
              pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
              tetromino: randomTetromino(), // New piece entirely
              collided: false,
            });
            setNextPiece(randomTetromino());
         } else {
            setGameOver(true);
            setDropTime(null);
         }
      }
    }
  }, [player.collided, board, nextPiece, level, linesCleared, lives, emptyCellColorClass]);

  // Game loop with interval
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (dropTime !== null && !gameOver && !isPaused) {
      intervalRef.current = window.setInterval(dropPiece, dropTime);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dropTime, dropPiece, gameOver, isPaused]);

  return {
    board,
    setBoard,
    player,
    setPlayer,
    nextPiece,
    score,
    setScore,
    level,
    setLevel,
    linesCleared,
    setLinesCleared,
    dropTime,
    setDropTime,
    gameOver,
    setGameOver,
    isPaused,
    setIsPaused,
    lives,
    resetGame,
    playerRotate,
    movePlayer,
    hardDrop,
  };
};