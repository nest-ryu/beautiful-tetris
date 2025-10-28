

import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import NextPieceDisplay from './components/NextPieceDisplay';
import Button from './components/Button';
import GameOverScreen from './components/GameOverScreen';
import HowToPlayModal from './components/HowToPlayModal';
import ThemeSelectionModal from './components/ThemeSelectionModal';
import { useTetris } from './hooks/useTetris';
import { THEMES, DEFAULT_THEME_ID, INITIAL_DROP_TIME, DROP_TIME_DECREASE_PER_LEVEL, MIN_DROP_TIME } from './constants';
import { Theme } from './types';

const App: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showThemeSelection, setShowThemeSelection] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const selectedTheme = THEMES.find(theme => theme.id === selectedThemeId) || THEMES[0];

  const {
    board,
    player,
    nextPiece,
    score,
    level,
    linesCleared,
    gameOver,
    isPaused,
    lives,
    resetGame,
    playerRotate,
    movePlayer,
    hardDrop,
    setIsPaused,
    setDropTime,
  } = useTetris(selectedTheme.emptyCellClass);

  // Update body background when theme changes
  useEffect(() => {
    // Ensure existing font styles are not overridden, apply only dynamic background
    document.body.className = `${selectedTheme.bodyBgClass} text-white min-h-screen flex items-center justify-center`;
  }, [selectedTheme]);

  const startGame = useCallback(() => {
    resetGame();
    setGameStarted(true);
  }, [resetGame]);

  const handlePauseToggle = useCallback(() => {
    if (gameOver) return;
    setIsPaused(prev => {
      if (prev) { // Was paused, now resuming
        // Recalculate drop time based on current level
        setDropTime(Math.max(MIN_DROP_TIME, INITIAL_DROP_TIME - ((level - 1) * DROP_TIME_DECREASE_PER_LEVEL)));
      } else { // Was playing, now pausing
        setDropTime(null);
      }
      return !prev;
    });
  }, [gameOver, setIsPaused, setDropTime, level]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver || !gameStarted || isPaused || showHowToPlay || showThemeSelection) return;

      if (event.key === 'ArrowLeft') {
        movePlayer(-1);
      } else if (event.key === 'ArrowRight') {
        movePlayer(1);
      } else if (event.key === 'ArrowDown') {
        playerRotate(board, 1);
      } else if (event.key === ' ') {
        event.preventDefault();
        hardDrop();
      } else if (event.key === 'p' || event.key === 'P') {
        handlePauseToggle();
      }
    },
    [gameOver, gameStarted, movePlayer, playerRotate, board, hardDrop, handlePauseToggle, isPaused, showHowToPlay, showThemeSelection]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleSelectTheme = useCallback((theme: Theme) => {
    setSelectedThemeId(theme.id);
    // If the game is started, and not game over, reset it with the new theme settings
    // This ensures a fresh board with the new empty cell background
    if (gameStarted && !gameOver) {
      resetGame();
    }
    // Optionally close the modal after selection, handled in the modal itself
  }, [gameStarted, gameOver, resetGame]);

  if (!gameStarted) {
    return (
      <div className={`${selectedTheme.bodyBgClass} text-white min-h-screen flex flex-col items-center justify-center p-4`}>
        <h1 className="font-['Press_Start_2P'] text-5xl text-blue-500 mb-8 text-center leading-tight">
          Beautiful Tetris
        </h1>
        <div className="flex flex-col space-y-4">
          <Button onClick={startGame}>START GAME</Button>
          <Button variant="secondary" onClick={() => setShowHowToPlay(true)}>
            HOW TO PLAY
          </Button>
          <Button variant="secondary" onClick={() => setShowThemeSelection(true)}>
            THEMES
          </Button>
        </div>

        {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
        {showThemeSelection && (
          <ThemeSelectionModal
            onClose={() => setShowThemeSelection(false)}
            onSelectTheme={handleSelectTheme}
            selectedThemeId={selectedThemeId}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:flex-row items-center justify-center min-h-screen ${selectedTheme.bodyBgClass} text-white p-4 gap-8`}>
      <div className="flex flex-col items-center gap-6 order-2 lg:order-1">
        <GameInfo
          score={score}
          level={level}
          linesCleared={linesCleared}
          lives={lives}
          uiBgClass={selectedTheme.uiBgClass}
          uiBorderClass={selectedTheme.uiBorderClass}
          uiInnerBgClass={selectedTheme.uiInnerBgClass}
        />
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button onClick={handlePauseToggle} disabled={gameOver}>
            {isPaused ? 'RESUME' : 'PAUSE'}
          </Button>
          <Button variant="danger" onClick={startGame}>
            RESTART
          </Button>
          <Button variant="secondary" onClick={() => setShowHowToPlay(true)}>
            HOW TO PLAY
          </Button>
        </div>
      </div>

      <div className="relative order-1 lg:order-2">
        <Board
          board={board}
          currentPieceShape={player.tetromino.shape}
          currentPiecePos={player.pos}
          currentPieceColor={player.tetromino.color}
          boardBgClass={selectedTheme.boardBgClass}
          boardBorderClass={selectedTheme.boardBorderClass}
        />
        {(gameOver || isPaused) && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center p-4 rounded-lg z-10">
            {gameOver ? (
              <GameOverScreen score={score} onRestart={startGame} />
            ) : (
              <div className="flex flex-col items-center">
                <h2 className="font-['Press_Start_2P'] text-4xl text-yellow-400 mb-6 animate-pulse">PAUSED</h2>
                <Button variant="primary" onClick={handlePauseToggle}>RESUME</Button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="order-3 lg:order-3">
        <NextPieceDisplay
          nextPiece={nextPiece}
          emptyCellClass={selectedTheme.emptyCellClass}
          uiBgClass={selectedTheme.uiBgClass}
          uiBorderClass={selectedTheme.uiBorderClass}
        />
      </div>

      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
    </div>
  );
};

export default App;