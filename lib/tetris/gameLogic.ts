"use client";

import { useState, useEffect, useCallback } from "react";

// Board size
const ROWS = 20;
const COLS = 10;

// Tetromino types
enum TetrominoType {
  I = 1,
  J = 2,
  L = 3,
  O = 4,
  S = 5,
  T = 6,
  Z = 7
}

// Tetromino colors
export const TETROMINO_COLORS: { [key: number]: string } = {
  [TetrominoType.I]: "bg-cyan-500",
  [TetrominoType.J]: "bg-blue-500",
  [TetrominoType.L]: "bg-orange-500",
  [TetrominoType.O]: "bg-yellow-500",
  [TetrominoType.S]: "bg-green-500",
  [TetrominoType.T]: "bg-purple-500",
  [TetrominoType.Z]: "bg-red-500"
};

// Tetromino shapes
const TETROMINOES: { [key in TetrominoType]: number[][] } = {
  [TetrominoType.I]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [TetrominoType.J]: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  [TetrominoType.L]: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  [TetrominoType.O]: [
    [4, 4],
    [4, 4]
  ],
  [TetrominoType.S]: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  [TetrominoType.T]: [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  [TetrominoType.Z]: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
};

// Next piece type
export interface NextPiece {
  type: TetrominoType;
  shape: number[][];
}

// Create empty board
const createEmptyBoard = (): number[][] => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

// Game logic hook
export const useGameLogic = () => {
  // Game state
  const [board, setBoard] = useState<number[][]>(createEmptyBoard());
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lines, setLines] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);
  
  // Current piece state
  const [currentPiece, setCurrentPiece] = useState<TetrominoType | null>(null);
  const [currentShape, setCurrentShape] = useState<number[][]>([]);
  const [currentPosition, setCurrentPosition] = useState<{ row: number, col: number }>({ row: 0, col: 0 });
  const [nextPiece, setNextPiece] = useState<NextPiece | null>(null);
  
  // Speed settings
  const [speed, setSpeed] = useState<number>(800);
  const [dropTime, setDropTime] = useState<number | null>(null);

  // Initialize game
  const initGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLevel(1);
    setLines(0);
    setSpeed(800);
    setGameOver(false);
    setPaused(false);
    generateNewPiece();
  }, []);

  // Generate random tetromino
  const getRandomTetromino = (): TetrominoType => {
    const tetrominoTypes = Object.values(TetrominoType).filter(
      (value): value is TetrominoType => typeof value === "number"
    );
    return tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
  };

  // Generate new piece
  const generateNewPiece = useCallback(() => {
    // If we have a next piece, use it
    if (nextPiece) {
      setCurrentPiece(nextPiece.type);
      setCurrentShape(nextPiece.shape);
    } else {
      // First piece of the game
      const newPieceType = getRandomTetromino();
      setCurrentPiece(newPieceType);
      setCurrentShape(TETROMINOES[newPieceType]);
    }

    // Generate next piece
    const newNextPieceType = getRandomTetromino();
    setNextPiece({
      type: newNextPieceType,
      shape: TETROMINOES[newNextPieceType]
    });

    // Set initial position
    setCurrentPosition({ row: 0, col: Math.floor(COLS / 2) - 1 });

    // Check for game over
    if (!isValidPosition(0, Math.floor(COLS / 2) - 1, TETROMINOES[currentPiece || nextPiece?.type || TetrominoType.I])) {
      setGameOver(true);
      setDropTime(null);
    }
  }, [currentPiece, nextPiece]);

  // Check if position is valid
  const isValidPosition = (row: number, col: number, shape: number[][]): boolean => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] !== 0) {
          const newRow = row + r;
          const newCol = col + c;
          
          // Check if out of bounds
          if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) {
            return false;
          }
          
          // Check if collision with placed pieces
          if (board[newRow][newCol] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Rotate piece
  const rotatePiece = useCallback((): void => {
    if (!currentShape || paused || gameOver) return;
    
    // Transpose and reverse rows to rotate 90 degrees clockwise
    const rotatedShape = currentShape[0].map((_, colIndex) => 
      currentShape.map((row) => row[colIndex]).reverse()
    );
    
    if (isValidPosition(currentPosition.row, currentPosition.col, rotatedShape)) {
      setCurrentShape(rotatedShape);
    }
  }, [currentShape, currentPosition, paused, gameOver, board]);

  // Move piece left
  const moveLeft = useCallback((): void => {
    if (paused || gameOver) return;
    
    if (isValidPosition(currentPosition.row, currentPosition.col - 1, currentShape)) {
      setCurrentPosition({
        ...currentPosition,
        col: currentPosition.col - 1
      });
    }
  }, [currentPosition, currentShape, paused, gameOver, board]);

  // Move piece right
  const moveRight = useCallback((): void => {
    if (paused || gameOver) return;
    
    if (isValidPosition(currentPosition.row, currentPosition.col + 1, currentShape)) {
      setCurrentPosition({
        ...currentPosition,
        col: currentPosition.col + 1
      });
    }
  }, [currentPosition, currentShape, paused, gameOver, board]);

  // Move piece down
  const moveDown = useCallback((): void => {
    if (paused || gameOver) return;
    
    if (isValidPosition(currentPosition.row + 1, currentPosition.col, currentShape)) {
      setCurrentPosition({
        ...currentPosition,
        row: currentPosition.row + 1
      });
    } else {
      // Lock the piece
      placePiece();
    }
  }, [currentPosition, currentShape, paused, gameOver, board]);

  // Drop piece immediately
  const dropPiece = useCallback((): void => {
    if (paused || gameOver) return;
    
    let newRow = currentPosition.row;
    while (isValidPosition(newRow + 1, currentPosition.col, currentShape)) {
      newRow++;
    }
    
    setCurrentPosition({
      ...currentPosition,
      row: newRow
    });
    
    // Lock the piece
    placePiece();
  }, [currentPosition, currentShape, paused, gameOver, board]);

  // Place piece on board
  const placePiece = useCallback(() => {
    // Create a new board
    const newBoard = [...board.map(row => [...row])];
    
    // Place the current piece on the board
    for (let r = 0; r < currentShape.length; r++) {
      for (let c = 0; c < currentShape[r].length; c++) {
        if (currentShape[r][c] !== 0) {
          const boardRow = currentPosition.row + r;
          const boardCol = currentPosition.col + c;
          
          if (boardRow >= 0 && boardRow < ROWS && boardCol >= 0 && boardCol < COLS) {
            newBoard[boardRow][boardCol] = currentShape[r][c];
          }
        }
      }
    }
    
    // Update the board
    setBoard(newBoard);
    
    // Check for completed lines
    checkLines(newBoard);
    
    // Generate new piece
    generateNewPiece();
  }, [board, currentShape, currentPosition]);

  // Check for completed lines
  const checkLines = useCallback((boardToCheck: number[][]) => {
    let linesCleared = 0;
    
    // Check each row
    const newBoard = [...boardToCheck];
    for (let r = ROWS - 1; r >= 0; r--) {
      // If every cell in the row is filled
      if (newBoard[r].every(cell => cell !== 0)) {
        // Remove the row
        newBoard.splice(r, 1);
        // Add an empty row at the top
        newBoard.unshift(Array(COLS).fill(0));
        linesCleared++;
        r++; // Check the same row again
      }
    }
    
    // Update state based on cleared lines
    if (linesCleared > 0) {
      // Update lines cleared
      const newLines = lines + linesCleared;
      setLines(newLines);
      
      // Update score (more points for clearing multiple lines at once)
      const linePoints = [0, 100, 300, 500, 800];
      const newScore = score + linePoints[linesCleared] * level;
      setScore(newScore);
      
      // Update level every 10 lines
      const newLevel = Math.floor(newLines / 10) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        // Increase speed with level
        setSpeed(Math.max(800 - (newLevel - 1) * 50, 100));
      }
      
      // Update board
      setBoard(newBoard);
    }
  }, [lines, level, score]);

  // Game controls
  const startGame = useCallback(() => {
    if (gameOver) {
      initGame();
    } else {
      setPaused(false);
      setDropTime(speed);
    }
  }, [gameOver, initGame, speed]);

  const pauseGame = useCallback(() => {
    setPaused(true);
    setDropTime(null);
  }, []);

  const resetGame = useCallback(() => {
    initGame();
  }, [initGame]);

  // Game loop with useEffect
  useEffect(() => {
    if (!gameOver && !paused) {
      setDropTime(speed);
    }
  }, [gameOver, paused, speed]);

  // Handle automatic piece dropping
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (dropTime) {
      timer = setInterval(() => {
        moveDown();
      }, dropTime);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [dropTime, moveDown]);

  // Render game board with current piece
  const renderBoard = useCallback(() => {
    // Create a copy of the board
    const boardWithPiece = board.map(row => [...row]);
    
    // Add current piece to board
    if (currentShape && !gameOver) {
      for (let r = 0; r < currentShape.length; r++) {
        for (let c = 0; c < currentShape[r].length; c++) {
          if (currentShape[r][c] !== 0) {
            const boardRow = currentPosition.row + r;
            const boardCol = currentPosition.col + c;
            
            if (boardRow >= 0 && boardRow < ROWS && boardCol >= 0 && boardCol < COLS) {
              boardWithPiece[boardRow][boardCol] = currentShape[r][c];
            }
          }
        }
      }
    }
    
    return boardWithPiece;
  }, [board, currentShape, currentPosition, gameOver]);

  // Return game state and functions
  return {
    board: renderBoard(),
    score,
    level,
    lines,
    nextPiece,
    isGameOver: gameOver,
    isPaused: paused,
    moveLeft,
    moveRight,
    rotate: rotatePiece,
    moveDown,
    dropPiece,
    startGame,
    pauseGame,
    resetGame
  };
};