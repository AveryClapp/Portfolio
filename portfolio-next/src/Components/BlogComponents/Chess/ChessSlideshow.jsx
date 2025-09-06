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
  title = "Chess board",
  moves = [],
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
            newBoard[from.row][from.col] = null;
          }
          if (to) {
            newBoard[to.row][to.col] = piece || null;
          }
        });
      }
    }
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
      <div className="">
        {/* Title and Description */}
        <div className="flex justify-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        </div>

        {/* Chess Board with coordinates inside */}
        <div className="aspect-square w-full rounded-md overflow-hidden shadow-lg border-2 border-gray-800">
          <div className="grid grid-cols-8 h-full">
            {currentBoard.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const squareKey = `${rowIndex}-${colIndex}`;

                // Chess.com style colors - exactly matching the reference
                const lightSquare = "#f0d9b5";
                const darkSquare = "#b58863";

                // Show rank number on the leftmost squares (a-file)
                const showRank = colIndex === 0;
                const rankNumber = ranks[rowIndex];

                // Show file letter on the bottom row (rank 1)
                const showFile = rowIndex === 7;
                const fileLetter = files[colIndex];

                return (
                  <div
                    key={squareKey}
                    className="relative flex items-center justify-center aspect-square"
                    style={{
                      backgroundColor: isLight ? lightSquare : darkSquare,
                    }}
                  >
                    {/* Rank numbers (left side) */}
                    {showRank && (
                      <div
                        className="absolute top-1 left-1 text-xs font-bold"
                        style={{ color: isLight ? darkSquare : lightSquare }}
                      >
                        {rankNumber}
                      </div>
                    )}

                    {/* File letters (bottom) */}
                    {showFile && (
                      <div
                        className="absolute bottom-1 right-1 text-xs font-bold"
                        style={{ color: isLight ? darkSquare : lightSquare }}
                      >
                        {fileLetter}
                      </div>
                    )}

                    {/* Chess piece */}
                    {piece && (
                      <div className="w-4/5 h-4/5">{renderPiece(piece)}</div>
                    )}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* Current Move Information */}
        <div className="mt-4 p-3 rounded-lg">
          <div className="font-semibold text-gray-800 mb-2 text-lg">
            {moves[currentMove]?.notation || "Starting Position"}
          </div>
          <div className="text-gray-600">{moves[currentMove]?.explanation}</div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentMove === 0}
            className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Move {currentMove}</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentMove / (moves.length - 1)) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {moves.length - 1} moves
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentMove === moves.length - 1}
            className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChessSlideshow;
