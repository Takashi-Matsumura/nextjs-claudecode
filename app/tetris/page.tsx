"use client";

import { useEffect, useState } from "react";
import TetrisBoard from "@/components/tetris/Board";
import TetrisControls from "@/components/tetris/Controls";
import GameState from "@/components/tetris/GameState";
import { useGameLogic } from "@/lib/tetris/gameLogic";

export default function TetrisGame() {
  const {
    board,
    score,
    level,
    lines,
    nextPiece,
    isGameOver,
    isPaused,
    moveLeft,
    moveRight,
    rotate,
    moveDown,
    dropPiece,
    startGame,
    pauseGame,
    resetGame
  } = useGameLogic();

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver) return;
      
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowUp":
          rotate();
          break;
        case "ArrowDown":
          moveDown();
          break;
        case " ":
          dropPiece();
          break;
        case "p":
          pauseGame();
          break;
        case "r":
          resetGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameOver, moveLeft, moveRight, rotate, moveDown, dropPiece, pauseGame, resetGame]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8">Tetris</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <GameState 
          score={score} 
          level={level} 
          lines={lines} 
          nextPiece={nextPiece}
          isGameOver={isGameOver}
          isPaused={isPaused}
          onStart={startGame}
          onReset={resetGame}
          onPause={pauseGame}
        />
        
        <TetrisBoard board={board} />
        
        <TetrisControls 
          onMoveLeft={moveLeft} 
          onMoveRight={moveRight} 
          onRotate={rotate} 
          onMoveDown={moveDown} 
          onDrop={dropPiece}
          disabled={isGameOver || isPaused}
        />
      </div>
    </div>
  );
}