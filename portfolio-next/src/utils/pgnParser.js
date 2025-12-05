// src/utils/pgnParser.js
import { Chess } from 'chess.js';

/**
 * Parse PGN string into ChessSlideshow-compatible format
 * Uses chess.js for robust move parsing + custom logic for variations
 *
 * @param {string} pgnString - Raw PGN text from markdown code block
 * @returns {Object} { title, moves, description }
 */
export function parsePGN(pgnString) {
  try {
    // Initialize chess.js
    const chess = new Chess();

    // Parse the PGN (chess.js handles main line only)
    chess.loadPgn(pgnString);

    // Extract headers for title/description
    const headers = chess.header();
    const title = generateTitle(headers);
    const description = headers.Event || headers.Site || 'Chess game';

    // Get move history with full details (already loaded from loadPgn)
    const history = chess.history({ verbose: true });

    // Convert to ChessSlideshow format
    const moves = convertToChessSlideshowFormat(history);

    // Extract and attach variations (custom logic)
    const movesWithVariations = attachVariations(pgnString, moves);

    return {
      title,
      description,
      moves: movesWithVariations,
    };
  } catch (error) {
    console.error('PGN parsing error:', error);
    throw new Error(`Failed to parse PGN: ${error.message}`);
  }
}

/**
 * Generate title from PGN headers
 */
function generateTitle(headers) {
  const white = headers.White || 'White';
  const black = headers.Black || 'Black';
  const event = headers.Event;

  if (event && event !== '?') {
    return `${white} vs ${black} - ${event}`;
  }

  return `${white} vs ${black}`;
}

/**
 * Convert chess.js move history to ChessSlideshow format
 */
function convertToChessSlideshowFormat(history) {
  const moves = [
    {
      notation: 'Starting Position',
      explanation: 'Standard starting position',
    }
  ];

  let moveNumber = 1;

  history.forEach((move, index) => {
    const isWhite = move.color === 'w';

    // Convert chess.js coordinates to ChessSlideshow format
    // chess.js uses algebraic (e.g., "e2", "e4")
    // ChessSlideshow uses {row: 0-7, col: 0-7}
    const boardChanges = convertMoveToBoardChanges(move);

    // Generate move notation
    const notation = isWhite
      ? `${moveNumber}. ${move.san}`
      : `${moveNumber}... ${move.san}`;

    // Generate simple explanation
    const explanation = `${isWhite ? 'White' : 'Black'} plays ${move.san}`;

    moves.push({
      notation,
      explanation,
      boardChanges,
    });

    // Increment move number after black's move
    if (!isWhite) {
      moveNumber++;
    }
  });

  return moves;
}

/**
 * Convert chess.js move to boardChanges format
 * Handles regular moves and castling
 */
function convertMoveToBoardChanges(move) {
  // Handle castling (returns array of 2 changes: king + rook)
  if (move.flags.includes('k')) {
    // Kingside castling
    const row = move.color === 'w' ? 7 : 0;
    return [
      { from: { row, col: 4 }, to: { row, col: 6 }, piece: move.color === 'w' ? 'K' : 'k' },
      { from: { row, col: 7 }, to: { row, col: 5 }, piece: move.color === 'w' ? 'R' : 'r' },
    ];
  }

  if (move.flags.includes('q')) {
    // Queenside castling
    const row = move.color === 'w' ? 7 : 0;
    return [
      { from: { row, col: 4 }, to: { row, col: 2 }, piece: move.color === 'w' ? 'K' : 'k' },
      { from: { row, col: 0 }, to: { row, col: 3 }, piece: move.color === 'w' ? 'R' : 'r' },
    ];
  }

  // Regular move
  const fromSquare = algebraicToCoords(move.from);
  const toSquare = algebraicToCoords(move.to);

  // Get piece letter (uppercase for white, lowercase for black)
  let piece = move.piece.toUpperCase();
  if (move.color === 'b') {
    piece = piece.toLowerCase();
  }

  // Handle pawn promotion
  if (move.flags.includes('p')) {
    piece = move.promotion.toUpperCase();
    if (move.color === 'b') {
      piece = piece.toLowerCase();
    }
  }

  return [{
    from: fromSquare,
    to: toSquare,
    piece,
  }];
}

/**
 * Convert algebraic notation (e.g., "e4") to board coordinates
 * @param {string} square - Algebraic notation (e.g., "e4", "a1")
 * @returns {Object} {row, col} where row 0 = rank 8, col 0 = file a
 */
function algebraicToCoords(square) {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0); // a=0, b=1, ..., h=7
  const rank = parseInt(square[1]); // 1-8

  return {
    row: 8 - rank,  // Invert: rank 8 = row 0, rank 1 = row 7
    col: file,
  };
}

/**
 * Extract variations from PGN and attach to moves
 *
 * Expected format in PGN:
 * 3. Nf3
 *    {variation: Bishop's Gambit}
 *    (3. Bc4 d5 4. Bxd5)
 *
 * @param {string} pgnString - Original PGN text
 * @param {Array} moves - Converted moves array
 * @returns {Array} Moves with variations attached
 */
function attachVariations(pgnString, moves) {
  // Extract variation blocks
  // Format: {variation: Name}\n(PGN moves)
  const variationRegex = /\{variation:\s*([^}]+)\}\s*\(([^)]+)\)/g;
  let match;

  const variations = [];
  while ((match = variationRegex.exec(pgnString)) !== null) {
    const name = match[1].trim();
    const variationPgn = match[2].trim();

    variations.push({
      name,
      pgn: variationPgn,
      position: match.index,
    });
  }

  // If no variations found, return original moves
  if (variations.length === 0) {
    return moves;
  }

  // For each variation, parse it and attach to the correct move
  variations.forEach((variation, varIndex) => {
    try {
      // Parse the variation PGN
      const varChess = new Chess();

      // Extract move number from variation (e.g., "3. Bc4" -> move 3)
      const moveNumMatch = variation.pgn.match(/^(\d+)\./);
      if (!moveNumMatch) return;

      const branchMoveNumber = parseInt(moveNumMatch[1]);

      // Find the move index to attach this variation to
      // We need to find the move BEFORE the variation branches
      const branchMoveIndex = findMoveIndexByNumber(moves, branchMoveNumber);

      if (branchMoveIndex === -1) return;

      // Parse the variation moves - need to pass the board state at branch point
      const variationMoves = parseVariationPgn(variation.pgn, branchMoveNumber, moves);

      // Attach variation to the move
      if (!moves[branchMoveIndex].variations) {
        moves[branchMoveIndex].variations = [];
      }

      moves[branchMoveIndex].variations.push({
        id: `variation-${varIndex}`,
        name: variation.name,
        start: branchMoveIndex,
        moves: variationMoves,
      });
    } catch (error) {
      console.warn(`Failed to parse variation "${variation.name}":`, error);
    }
  });

  return moves;
}

/**
 * Find move index by move number
 * e.g., move number 3 for White = index where notation starts with "3."
 */
function findMoveIndexByNumber(moves, moveNumber) {
  for (let i = 0; i < moves.length; i++) {
    const notation = moves[i].notation;
    if (notation.startsWith(`${moveNumber}.`) && !notation.includes('...')) {
      return i;
    }
  }
  return -1;
}

/**
 * Parse variation PGN into move objects
 * @param {string} variationPgn - PGN for the variation (e.g., "3. Bc4 d5 4. Bxd5")
 * @param {number} startMoveNumber - Starting move number
 * @param {Array} mainLineMoves - Main line moves to replay up to branch point
 * @returns {Array} Array of move objects
 */
function parseVariationPgn(variationPgn, startMoveNumber, mainLineMoves) {
  try {
    // Create a chess instance and replay moves up to the branch point
    const chess = new Chess();

    // Replay all moves before the variation (move 1 through move N-1)
    // Skip index 0 (Starting Position) and replay up to the move before the branch
    for (let i = 1; i < mainLineMoves.length; i++) {
      const move = mainLineMoves[i];

      // Stop when we reach the move number where variation starts
      if (move.notation.startsWith(`${startMoveNumber}.`)) {
        break;
      }

      // Replay this move to build up the position
      if (move.boardChanges && move.boardChanges.length > 0) {
        // Extract the SAN (Standard Algebraic Notation) from the notation
        // e.g., "1. e4" -> "e4", "2... Nc6" -> "Nc6"
        const sanMatch = move.notation.match(/(?:\d+\.{1,3}\s*)?(.+)/);
        if (sanMatch && sanMatch[1]) {
          const san = sanMatch[1].trim();
          try {
            chess.move(san);
          } catch (e) {
            console.warn(`Failed to replay move ${san} for variation setup:`, e);
          }
        }
      }
    }

    // Clean up the variation PGN (remove move numbers for parsing)
    const cleanPgn = variationPgn
      .replace(/\d+\.\.\./g, '') // Remove "1..."
      .replace(/\d+\./g, '')      // Remove "1."
      .trim();

    // Split into individual moves
    const moveList = cleanPgn.split(/\s+/).filter(m => m.length > 0);

    const variationMoves = [];
    let moveNumber = startMoveNumber;
    let isWhiteTurn = true;

    moveList.forEach(san => {
      try {
        // Make the move
        const move = chess.move(san);

        if (!move) {
          console.warn(`Invalid move in variation: ${san}`);
          return;
        }

        // Convert to board changes
        const boardChanges = convertMoveToBoardChanges(move);

        // Generate notation
        const notation = isWhiteTurn
          ? `${moveNumber}. ${san}`
          : `${moveNumber}... ${san}`;

        variationMoves.push({
          notation,
          explanation: `${isWhiteTurn ? 'White' : 'Black'} plays ${san}`,
          boardChanges,
        });

        // Toggle turn
        if (!isWhiteTurn) {
          moveNumber++;
        }
        isWhiteTurn = !isWhiteTurn;
      } catch (error) {
        console.warn(`Error processing variation move ${san}:`, error);
      }
    });

    return variationMoves;
  } catch (error) {
    console.error('Error parsing variation PGN:', error);
    return [];
  }
}
