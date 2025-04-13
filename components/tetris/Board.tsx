"use client";

import { TETROMINO_COLORS } from "@/lib/tetris/gameLogic";

interface BoardProps {
  board: number[][];
}

export default function TetrisBoard({ board }: BoardProps) {
  return (
    <div className="border-4 border-gray-700 bg-gray-800 p-1">
      <div className="grid grid-cols-10 gap-0">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-6 h-6 sm:w-8 sm:h-8 ${cell === 0 ? "bg-gray-900" : TETROMINO_COLORS[cell]}`}
              style={{ border: cell !== 0 ? "1px solid rgba(255,255,255,0.2)" : "none" }}
            />
          ))
        )}
      </div>
    </div>
  );
}