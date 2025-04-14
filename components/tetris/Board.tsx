"use client";

import React from "react";
import { TETROMINO_COLORS } from "@/lib/tetris/gameLogic";

interface BoardProps {
  board: number[][];
}

export default function TetrisBoard({ board }: BoardProps) {
  // 各セルのサイズを計算するためのクラス
  const cellClass = "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8";
  
  return (
    <div className="border-4 border-gray-700 bg-gray-800 p-1 shadow-lg rounded-sm">
      {board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${cellClass} ${cell === 0 ? "bg-gray-900" : TETROMINO_COLORS[cell]}`}
              style={{ border: cell !== 0 ? "1px solid rgba(255,255,255,0.2)" : "none" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}