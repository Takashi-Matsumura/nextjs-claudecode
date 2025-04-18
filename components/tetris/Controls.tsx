"use client";

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onMoveDown: () => void;
  onDrop: () => void;
  disabled: boolean;
}

export default function TetrisControls({ 
  onMoveLeft, 
  onMoveRight, 
  onRotate, 
  onMoveDown, 
  onDrop, 
  disabled 
}: ControlsProps) {
  const buttonClass = "w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-colors";
  const disabledClass = "w-12 h-12 sm:w-14 sm:h-14 bg-gray-400 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg cursor-not-allowed";
  
  return (
    <div className="flex flex-col items-center gap-4 mt-4 md:mt-0 w-full max-w-[200px]">
      <h2 className="text-xl font-bold mb-2">Controls</h2>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center justify-center"></div>
        <button 
          onClick={onRotate} 
          disabled={disabled} 
          className={disabled ? disabledClass : buttonClass}
          aria-label="Rotate"
        >
          ↑
        </button>
        <div className="flex items-center justify-center"></div>

        <button 
          onClick={onMoveLeft} 
          disabled={disabled} 
          className={disabled ? disabledClass : buttonClass}
          aria-label="Move Left"
        >
          ←
        </button>
        <button 
          onClick={onMoveDown} 
          disabled={disabled} 
          className={disabled ? disabledClass : buttonClass}
          aria-label="Move Down"
        >
          ↓
        </button>
        <button 
          onClick={onMoveRight} 
          disabled={disabled} 
          className={disabled ? disabledClass : buttonClass}
          aria-label="Move Right"
        >
          →
        </button>
      </div>
      
      <button 
        onClick={onDrop} 
        disabled={disabled} 
        className={`mt-4 px-6 py-2 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"} text-white rounded shadow-lg transition-colors w-full`}
        aria-label="Drop"
      >
        Drop
      </button>
      
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded p-2 bg-gray-50 dark:bg-gray-800 shadow-sm w-full text-center">
        <p>Keyboard: Arrow keys + Space</p>
        <p>P: Pause | R: Reset</p>
      </div>
    </div>
  );
}