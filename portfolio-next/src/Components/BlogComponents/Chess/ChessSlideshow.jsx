import React, { useState, useEffect, useMemo } from "react";
import pieceComponents from "@/Components/BlogComponents/Chess/pieces";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const ChessSlideshow = ({
  title,
  description,
  moves,
  initialBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"], // Black pieces (row 8)
    ["p", "p", "p", "p", "p", "p", "p", "p"], // Black pawns (row 7)
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"], // White pawns (row 2)
    ["R", "N", "B", "Q", "K", "B", "N", "R"], // White pieces (row 1)
  ],
}) => {
  const [currentMove, setCurrentMove] = useState(0);

  const currentBoard = useMemo(() => {
    let newBoard = JSON.parse(JSON.stringify(initialBoard));

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
    console.log(newBoard);
    return newBoard;
  }, [currentMove, moves, initialBoard]);

  const handlePrevious = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  };

  const handleNext = () => {
    if (currentMove < moves.length - 1) {
      setCurrentMove(currentMove + 1);
    }
  };

  const renderPiece = (piece) => {
    if (!piece) return null;
    return pieceComponents[piece] || null;
  };

  // File labels (a-h)
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  // Rank labels (8-1 from top to bottom)
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  return (
    <div className="max-w-xl mx-auto p-2 sm:p-4">
      {/* Main Container - Chess.com style */}
      <div className="">
        {/* Board Container */}
        <div className="relative">
          {/* Coordinate Labels */}
          <div className="absolute -left-6 top-0 h-full hidden sm:flex flex-col justify-around py-[2%]">
            {ranks.map((rank) => (
              <div
                key={rank}
                className="text-xs text-black font-bold h-[11%] flex items-center"
              >
                {rank}
              </div>
            ))}
          </div>
          <div className="absolute -bottom-6 left-0 w-full hidden sm:flex justify-around px-[2%]">
            {files.map((file) => (
              <div
                key={file}
                className="text-xs text-black font-bold w-[11%] text-center"
              >
                {file}
              </div>
            ))}
          </div>

          {/* Chess Board */}
          <div className="aspect-square w-full rounded-md overflow-hidden shadow-lg">
            <div className="grid grid-cols-8 h-full">
              {currentBoard.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  const isLight = (rowIndex + colIndex) % 2 === 0;
                  const squareKey = `${rowIndex}-${colIndex}`;

                  // Chess.com colors
                  const lightSquare = "#ebecd0";
                  const darkSquare = "#779556";

                  return (
                    <div
                      key={squareKey}
                      className="relative flex items-center justify-center aspect-square"
                      style={{
                        backgroundColor: isLight ? lightSquare : darkSquare,
                      }}
                    >
                      <div className="w-[85%] h-[85%]">
                        {renderPiece(piece)}
                      </div>
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        </div>

        {/* Move Information */}
        <div className="mt-8 p-3 rounded-lg">
          <h3 className="font-bold text-black text-lg mb-1">
            {moves[currentMove].notation}
          </h3>
          <p className="text-black text-sm">{moves[currentMove].explanation}</p>
        </div>

        {/* Controls - Chess.com style */}
        <div className="flex items-center justify-center gap-1 mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentMove === 0}
            className="p-2 rounded bg-[#262522] hover:bg-[#3d3a36] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            aria-label="Previous move"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentMove === moves.length - 1}
            className="p-2 rounded bg-[#262522] hover:bg-[#3d3a36] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            aria-label="Next move"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Move {currentMove}</span>
            <span>{moves.length - 1} moves</span>
          </div>
          <div className="w-full bg-[#262522] rounded-full h-1.5">
            <div
              className="bg-[#81b64c] h-1.5 rounded-full transition-all duration-300"
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
