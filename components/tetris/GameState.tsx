"use client";

import { TETROMINO_COLORS, NextPiece } from "@/lib/tetris/gameLogic";

interface GameStateProps {
  score: number;
  level: number;
  lines: number;
  nextPiece: NextPiece | null;
  isGameOver: boolean;
  isPaused: boolean;
  onStart: () => void;
  onReset: () => void;
  onPause: () => void;
}

export default function GameState({ 
  score, 
  level, 
  lines, 
  nextPiece,
  isGameOver,
  isPaused,
  onStart,
  onReset,
  onPause
}: GameStateProps) {
  const statsClass = "py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded mb-2 shadow-sm";
  
  return (
    <div className="flex flex-col items-center w-full max-w-[200px]">
      <div className="w-full mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">Stats</h2>
        <div className={statsClass}>
          <p><span className="font-bold">Score:</span> {score}</p>
        </div>
        <div className={statsClass}>
          <p><span className="font-bold">Level:</span> {level}</p>
        </div>
        <div className={statsClass}>
          <p><span className="font-bold">Lines:</span> {lines}</p>
        </div>
      </div>
      
      {nextPiece && (
        <div className="w-full mb-6">
          <h2 className="text-xl font-bold mb-2 text-center">Next</h2>
          <div className="bg-gray-800 p-3 rounded shadow-md flex justify-center">
            <div className="flex flex-col items-center justify-center">
              {/* テトロミノの形状を適切に中央揃えして表示 */}
              {nextPiece.shape.map((row, rowIndex) => (
                <div key={`next-row-${rowIndex}`} className="flex">
                  {row.map((cell, colIndex) => (
                    <div
                      key={`next-${rowIndex}-${colIndex}`}
                      className={`w-5 h-5 ${cell === 0 ? "bg-transparent" : TETROMINO_COLORS[nextPiece.type]}`}
                      style={{ border: cell !== 0 ? "1px solid rgba(255,255,255,0.2)" : "none" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full space-y-3">
        {!isGameOver && !isPaused && (
          <button 
            onClick={onPause} 
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow-md transition-colors"
          >
            Pause
          </button>
        )}
        
        {(isGameOver || isPaused) && (
          <button 
            onClick={onStart} 
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow-md transition-colors"
          >
            {isPaused ? "Resume" : "Start"}
          </button>
        )}
        
        <button 
          onClick={onReset} 
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow-md transition-colors"
        >
          Reset
        </button>
      </div>
      
      {isGameOver && (
        <div className="mt-6 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded shadow-md text-center">
          <p className="text-red-700 dark:text-red-200 font-bold">Game Over!</p>
        </div>
      )}
    </div>
  );
}