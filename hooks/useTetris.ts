
import { useState, useCallback, useEffect, useRef } from 'react';
import { createBoard, randomTetromino, checkCollision, rotate, clearLines } from '../utils/tetrisUtils';
import { BOARD_HEIGHT, BOARD_WIDTH, INITIAL_DROP_TIME, DROP_TIME_DECREASE_PER_LEVEL, MIN_DROP_TIME, LINES_PER_LEVEL, INITIAL_LIVES } from '../constants';
import { Player, BoardShape, Tetromino } from '../types';
import { soundManager } from '../utils/soundManager';

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
  const [clearedLines, setClearedLines] = useState(0);

  const intervalRef = useRef<number | undefined>();

  // Reset board when theme changes
  useEffect(() => {
    setBoard(createBoard(emptyCellColorClass));
    setPlayer(prev => ({
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
    setClearedLines(0);
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
    soundManager.rotatePiece();
    setPlayer(clonedPlayer);
  }, [player]);

  const checkGameOver = useCallback((currentPlayer: Player): boolean => {
    // Check if any block is at or above row 0
    for (let y = 0; y < currentPlayer.tetromino.shape.length; y++) {
      for (let x = 0; x < currentPlayer.tetromino.shape[y].length; x++) {
        if (currentPlayer.tetromino.shape[y][x] !== 0) {
          const boardY = y + currentPlayer.pos.y;
          if (boardY <= 0) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const drop = useCallback(() => {
    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
      // No sound for automatic drop - only for manual actions
    } else {
      // Piece settled - check for game over
      if (checkGameOver(player)) {
        soundManager.gameOver();
        setGameOver(true);
        setDropTime(null);
      }
      setPlayer((prev) => ({ ...prev, collided: true }));
    }
  }, [player, board, updatePlayerPos, checkGameOver]);

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
    soundManager.hardDrop();
    updatePlayerPos({ x: 0, y: newY, collided: true });
  }, [player, board, updatePlayerPos, gameOver, isPaused]);

  const movePlayer = useCallback((dir: number) => {
    if (!gameOver && !isPaused && !checkCollision(player, board, { x: dir, y: 0 })) {
      soundManager.movePiece();
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  }, [player, board, updatePlayerPos, gameOver, isPaused]);

  // Handle game updates when piece settles
  useEffect(() => {
    if (player.collided) {
      setBoard((prevBoard) => {
        // Merge piece into board
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
          soundManager.lineClear();
          setLinesCleared((prev) => prev + newClearedLines);
          setScore((prev) => prev + (newClearedLines * 100 * level));
          setClearedLines(newClearedLines);

          // Level up logic
          const totalLines = linesCleared + newClearedLines;
          if (totalLines >= (level * LINES_PER_LEVEL)) {
            soundManager.levelUp();
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

      // Check if new piece immediately collides
      const spawnPlayer = { pos: { x: BOARD_WIDTH / 2 - 2, y: 0 }, tetromino: nextPiece, collided: false };
      if (checkCollision(spawnPlayer, board, { x: 0, y: 0 }) && checkGameOver(spawnPlayer)) {
        soundManager.gameOver();
        setGameOver(true);
        setDropTime(null);
      }
    }
  }, [player.collided, board, nextPiece, level, linesCleared, emptyCellColorClass, checkGameOver]);

  // Game loop
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
    clearedLines,
    resetGame,
    playerRotate,
    movePlayer,
    hardDrop,
  };
};
