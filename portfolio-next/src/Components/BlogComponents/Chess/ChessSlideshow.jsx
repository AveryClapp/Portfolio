import React, { useState, useEffect, useMemo } from "react";
import pieceComponents from "@/Components/BlogComponents/Chess/pieces";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  GitBranch,
  Info,
} from "lucide-react";

const ChessSlideshow = ({
  title,
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
  description,
}) => {
  // Safety check for moves prop
  if (!moves || moves.length === 0) {
    return <div className="text-center p-4">No chess moves provided</div>;
  }

  const [currentMove, setCurrentMove] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const currentMoveSequence = useMemo(() => {
    if (!selectedVariation) {
      return moves;
    }

    const variationMove = moves[selectedVariation.fromMoveIndex];
    if (!variationMove || !variationMove.variations) {
      return moves;
    }

    const variation = variationMove.variations.find(
      (v) => v.id === selectedVariation.variationId,
    );
    if (!variation) {
      return moves;
    }

    const newSequence = [
      ...moves.slice(0, selectedVariation.fromMoveIndex + 1),
      ...variation.moves,
    ];

    return newSequence;
  }, [moves, selectedVariation]);

  const currentBoard = useMemo(() => {
    let newBoard = JSON.parse(JSON.stringify(initialBoard));

    for (let i = 1; i <= currentMove && i < currentMoveSequence.length; i++) {
      const move = currentMoveSequence[i];
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
  }, [currentMove, currentMoveSequence, initialBoard]);

  // Get pieces that can make variation moves from current position
  const getVariationPieces = useMemo(() => {
    // Safety check: ensure currentMoveSequence exists and currentMove is valid
    if (
      !currentMoveSequence ||
      currentMove < 0 ||
      currentMove >= currentMoveSequence.length
    ) {
      return new Map();
    }

    const currentMoveData = currentMoveSequence[currentMove];
    if (!currentMoveData || !currentMoveData.variations) {
      return new Map();
    }

    const variationMap = new Map();

    currentMoveData.variations.forEach((variation) => {
      // Add null checks for variation structure
      if (
        variation &&
        variation.moves &&
        variation.moves.length > 0 &&
        variation.moves[0] &&
        variation.moves[0].boardChanges &&
        Array.isArray(variation.moves[0].boardChanges)
      ) {
        variation.moves[0].boardChanges.forEach((change) => {
          if (change && change.from) {
            const key = `${change.from.row}-${change.from.col}`;
            if (!variationMap.has(key)) {
              variationMap.set(key, []);
            }
            variationMap.get(key).push({
              variation,
              move: variation.moves[0],
            });
          }
        });
      }
    });

    return variationMap;
  }, [currentMoveSequence, currentMove]);

  const handlePrevious = () => {
    if (currentMove > 0) {
      const newMoveIndex = currentMove - 1;
      setCurrentMove(newMoveIndex);

      // Auto-return to main line if we've navigated back to the start point of the variation
      if (selectedVariation) {
        const variationStartPoint =
          selectedVariation.start || selectedVariation.fromMoveIndex;
        if (newMoveIndex <= variationStartPoint) {
          setSelectedVariation(null);
        }
      }
    }
  };

  const handleNext = () => {
    if (currentMove < currentMoveSequence.length - 1) {
      setCurrentMove(currentMove + 1);
    }
  };

  const handleSelectVariation = (fromMoveIndex, variationId) => {
    // Find the variation to get its start point
    const currentMoveData = currentMoveSequence[fromMoveIndex];
    const variation = currentMoveData?.variations?.find(
      (v) => v.id === variationId,
    );
    const startPoint = variation?.start || fromMoveIndex;

    setSelectedVariation({
      fromMoveIndex,
      variationId,
      start: startPoint,
    });
    setCurrentMove(fromMoveIndex + 1); // Start at first move of variation
    setShowTooltip(false);
  };

  const handleReturnToMainLine = () => {
    // Jump back to the start point (move before the branch)
    const startPoint = selectedVariation?.start || 0;
    setSelectedVariation(null);
    setCurrentMove(startPoint);
  };

  const handlePieceClick = (rowIndex, colIndex) => {
    const squareKey = `${rowIndex}-${colIndex}`;
    const variations = getVariationPieces.get(squareKey);

    if (variations && variations.length > 0) {
      // If only one variation, go directly to it
      if (variations.length === 1) {
        handleSelectVariation(currentMove, variations[0].variation.id);
      } else {
        // If multiple variations, could show a submenu (for now, take the first)
        handleSelectVariation(currentMove, variations[0].variation.id);
      }
    }
  };

  const handleSquareHover = (rowIndex, colIndex, isEntering) => {
    const squareKey = `${rowIndex}-${colIndex}`;

    if (isEntering && getVariationPieces.has(squareKey)) {
      setHoveredSquare({ row: rowIndex, col: colIndex });
      setShowTooltip(true);
    } else if (!isEntering) {
      setHoveredSquare(null);
      setShowTooltip(false);
    }
  };

  const renderPiece = (piece) => {
    if (!piece) return null;
    return pieceComponents[piece] || null;
  };

  const renderTooltip = () => {
    if (!showTooltip || !hoveredSquare) return null;

    const squareKey = `${hoveredSquare.row}-${hoveredSquare.col}`;
    const variations = getVariationPieces.get(squareKey);

    if (!variations || variations.length === 0) return null;

    return (
      <div
        className="absolute z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs"
        style={{
          top: `${hoveredSquare.row * 64 + 40}px`, // Adjust based on square size
          left: `${hoveredSquare.col * 64 + 20}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="flex items-center mb-1">
          <GitBranch className="w-3 h-3 mr-1" />
          <span className="font-medium">Alternative move</span>
        </div>
        {variations.map((item, index) => (
          <div key={index} className="text-xs opacity-90">
            {item.variation.name}
          </div>
        ))}
        <div className="text-xs opacity-75 mt-1">Click to explore</div>
      </div>
    );
  };

  // Get current move and check if it has variations
  const currentMoveData = currentMoveSequence[currentMove];
  const hasVariations =
    currentMoveData &&
    currentMoveData.variations &&
    currentMoveData.variations.length > 0;

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
        <div className="flex justify-center">
          <div className="relative inline-block border-2 border-gray-800">
            <div className="grid grid-cols-8 gap-0">
              {currentBoard.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  const isLight = (rowIndex + colIndex) % 2 === 0;
                  const lightSquare = "#f0d9b5";
                  const darkSquare = "#b58863";

                  const fileLetter = files[colIndex];
                  const rankNumber = ranks[rowIndex];
                  const showFile = rowIndex === 7;
                  const showRank = colIndex === 0;

                  // Check if this square has a piece that can make variation moves
                  const squareKey = `${rowIndex}-${colIndex}`;
                  const hasVariationMoves =
                    getVariationPieces.has(squareKey) && piece;
                  const isHovered =
                    hoveredSquare?.row === rowIndex &&
                    hoveredSquare?.col === colIndex;

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center relative ${
                        hasVariationMoves ? "cursor-pointer" : ""
                      }`}
                      style={{
                        backgroundColor: isLight ? lightSquare : darkSquare,
                        boxShadow: hasVariationMoves
                          ? isHovered
                            ? "inset 0 0 0 2px #3b82f6"
                            : "inset 0 0 0 1px #93c5fd"
                          : "none",
                      }}
                      onClick={() => handlePieceClick(rowIndex, colIndex)}
                      onMouseEnter={() =>
                        handleSquareHover(rowIndex, colIndex, true)
                      }
                      onMouseLeave={() =>
                        handleSquareHover(rowIndex, colIndex, false)
                      }
                    >
                      {/* Rank numbers (left) */}
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

                      {/* Variation indicator */}
                      {hasVariationMoves && (
                        <div className="absolute top-1 right-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full opacity-75"></div>
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

            {/* Render tooltip */}
            {renderTooltip()}
          </div>
        </div>

        {/* Current Move Information */}
        <div className="mt-4 p-3 rounded-lg">
          <div className="font-semibold text-gray-800 mb-2 text-lg">
            {currentMoveSequence[currentMove]?.notation || "Starting Position"}
          </div>
          <div className="text-gray-600">
            {currentMoveSequence[currentMove]?.explanation || description}
          </div>

          {/* Show if we're in a variation (only when past the start point) */}
          {selectedVariation &&
            currentMove >
              (selectedVariation.start || selectedVariation.fromMoveIndex) && (
              <div className="mt-2 text-sm text-blue-600 flex items-center">
                <GitBranch className="w-4 h-4 mr-1" />
                Viewing variation
                <button
                  onClick={handleReturnToMainLine}
                  className="ml-2 underline hover:no-underline"
                >
                  Return to main line
                </button>
              </div>
            )}
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
                  width: `${(currentMove / (currentMoveSequence.length - 1)) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {currentMoveSequence.length - 1} moves
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentMove === currentMoveSequence.length - 1}
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
