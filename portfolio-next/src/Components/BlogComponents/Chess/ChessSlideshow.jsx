import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";

const ChessSlideshow = ({
  moves,
  initialBoard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ],
}) => {
  const [currentMove, setCurrentMove] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculate the current board state using useMemo to avoid infinite loops
  const currentBoard = useMemo(() => {
    let newBoard = JSON.parse(JSON.stringify(initialBoard)); // Deep copy

    for (let i = 1; i <= currentMove && i < moves.length; i++) {
      const move = moves[i];
      if (move.boardChanges) {
        move.boardChanges.forEach((change) => {
          const { from, to, piece } = change;
          if (from) {
            newBoard[from.row][from.col] = "";
          }
          if (to) {
            newBoard[to.row][to.col] = piece || "";
          }
        });
      }
    }

    return newBoard;
  }, [currentMove, moves, initialBoard]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentMove < moves.length - 1) {
      interval = setInterval(() => {
        setCurrentMove((prev) => prev + 1);
      }, 2000);
    } else {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentMove, moves.length]);

  const nextMove = () => {
    if (currentMove < moves.length - 1) {
      setCurrentMove(currentMove + 1);
    }
  };

  const prevMove = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  };

  const reset = () => {
    setCurrentMove(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-stone-100 font-sans">
      {/* Chess Board */}
      <div className="flex flex-col items-center">
        <div className="bg-neutral-200 p-6 rounded-lg border border-neutral-300">
          <div className="grid grid-cols-8 gap-0 border-2 border-amber-900 rounded-sm overflow-hidden shadow-lg">
            {currentBoard.map((row, rowIndex) =>
              row.map((piece, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
w-14 h-14 flex items-center justify-center text-3xl font-bold
${
  (rowIndex + colIndex) % 2 === 0
    ? "bg-stone-200 text-neutral-900"
    : "bg-neutral-700 text-stone-100"
}
transition-all duration-200
`}
                >
                  {piece}
                </div>
              )),
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={prevMove}
            disabled={currentMove === 0}
            className="p-3 rounded border border-neutral-300 bg-stone-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-neutral-900"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={togglePlay}
            disabled={currentMove === moves.length - 1}
            className="p-3 rounded border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={nextMove}
            disabled={currentMove === moves.length - 1}
            className="p-3 rounded border border-neutral-300 bg-stone-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-neutral-900"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={reset}
            className="p-3 rounded border border-neutral-300 bg-stone-100 hover:bg-neutral-200 transition-colors text-neutral-600 ml-2"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6">
          <div className="flex justify-between text-sm text-neutral-600 mb-2">
            <span>Move {currentMove}</span>
            <span>{moves.length - 1} moves</span>
          </div>
          <div className="w-full bg-neutral-300 rounded-full h-2 border border-neutral-400">
            <div
              className="bg-neutral-800 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentMove / (moves.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessSlideshow;
