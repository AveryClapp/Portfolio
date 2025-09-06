import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";

const ChessSlideshow = ({
  title,
  description,
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
  const [board, setBoard] = useState(initialBoard);

  const applyMoves = (moveCount) => {
    let newBoard = JSON.parse(JSON.stringify(initialBoard)); // Deep copy

    for (let i = 1; i <= moveCount && i < moves.length; i++) {
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
  };

  useEffect(() => {
    setBoard(applyMoves(currentMove));
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

  const currentData = moves[currentMove];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-stone-100 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h1>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Chess Board */}
        <div className="flex flex-col items-center">
          <div className="bg-neutral-200 p-6 rounded-lg border border-neutral-300">
            <div className="grid grid-cols-8 gap-0 border-2 border-neutral-800 rounded-sm overflow-hidden shadow-lg">
              {board.map((row, rowIndex) =>
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

        {/* Analysis Panel */}
        <div className="space-y-6">
          {/* Current Move */}
          <div className="text-center pb-4 border-b border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">
              {currentData.notation}
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {currentData.explanation}
            </p>
          </div>

          {/* Strengths */}
          {currentData.strengths && currentData.strengths.length > 0 && (
            <div className="border-l-4 border-neutral-600 pl-4">
              <h3 className="font-bold text-neutral-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-neutral-600 rounded-full mr-3"></span>
                Strengths
              </h3>
              <ul className="space-y-2">
                {currentData.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="text-neutral-700 text-sm leading-relaxed"
                  >
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Considerations */}
          {currentData.considerations &&
            currentData.considerations.length > 0 && (
              <div className="border-l-4 border-neutral-400 pl-4">
                <h3 className="font-bold text-neutral-800 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full mr-3"></span>
                  Considerations
                </h3>
                <ul className="space-y-2">
                  {currentData.considerations.map((consideration, index) => (
                    <li
                      key={index}
                      className="text-neutral-600 text-sm leading-relaxed"
                    >
                      • {consideration}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Custom Analysis Sections */}
          {currentData.customSections &&
            currentData.customSections.map((section, index) => (
              <div key={index} className="border-l-4 border-neutral-500 pl-4">
                <h3 className="font-bold text-neutral-800 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-neutral-500 rounded-full mr-3"></span>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-neutral-700 text-sm leading-relaxed"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChessSlideshow;
