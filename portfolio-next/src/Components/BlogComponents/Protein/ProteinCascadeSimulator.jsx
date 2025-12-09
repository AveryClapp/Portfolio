"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const GRID_WIDTH = 40;
const GRID_HEIGHT = 20;
const CELL_SIZE = 14;

const STATES = {
  HEALTHY: 0,
  MISFOLDED: 1,
  DEAD: 2,
};

const COLORS = {
  [STATES.HEALTHY]: '#86efac',
  [STATES.MISFOLDED]: '#ef4444',
  [STATES.DEAD]: '#d4d4d4',
};

// Initialize grid with all healthy cells
const createGrid = () => {
  return Array(GRID_HEIGHT).fill(null).map(() =>
    Array(GRID_WIDTH).fill(null).map(() => ({
      state: STATES.HEALTHY,
      age: 0,
    }))
  );
};

// Add random misfolded protein in center 50%
const addRandomMisfold = (grid) => {
  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
  const centerX = Math.floor(GRID_WIDTH * 0.25 + Math.random() * GRID_WIDTH * 0.5);
  const centerY = Math.floor(GRID_HEIGHT * 0.25 + Math.random() * GRID_HEIGHT * 0.5);
  newGrid[centerY][centerX] = { state: STATES.MISFOLDED, age: 0 };
  return newGrid;
};

// Get neighbors (Moore neighborhood - 8 surrounding cells)
const getNeighbors = (grid, x, y) => {
  const neighbors = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < GRID_WIDTH && ny >= 0 && ny < GRID_HEIGHT) {
        neighbors.push(grid[ny][nx]);
      }
    }
  }
  return neighbors;
};

// Update cell based on rules
const updateCell = (cell, neighbors) => {
  const misfoldedNeighbors = neighbors.filter(n => n.state === STATES.MISFOLDED).length;

  switch (cell.state) {
    case STATES.HEALTHY: {
      // Cascade: induced misfolding (15% per misfolded neighbor)
      const infectionProb = misfoldedNeighbors * 0.15;
      if (Math.random() < infectionProb) {
        return { state: STATES.MISFOLDED, age: 0 };
      }
      return cell;
    }

    case STATES.MISFOLDED: {
      const newAge = cell.age + 1;
      // Die after 8 generations
      if (newAge >= 8) {
        return { state: STATES.DEAD, age: 0 };
      }
      return { state: STATES.MISFOLDED, age: newAge };
    }

    case STATES.DEAD:
      return cell;

    default:
      return cell;
  }
};

// Calculate next generation
const nextGeneration = (grid) => {
  return grid.map((row, y) =>
    row.map((cell, x) => {
      const neighbors = getNeighbors(grid, x, y);
      return updateCell(cell, neighbors);
    })
  );
};

// Calculate stats
const getStats = (grid) => {
  let healthy = 0, misfolded = 0, dead = 0;
  grid.forEach(row => {
    row.forEach(cell => {
      if (cell.state === STATES.HEALTHY) healthy++;
      else if (cell.state === STATES.MISFOLDED) misfolded++;
      else if (cell.state === STATES.DEAD) dead++;
    });
  });
  const total = GRID_WIDTH * GRID_HEIGHT;
  return {
    healthy: Math.round((healthy / total) * 100),
    misfolded: Math.round((misfolded / total) * 100),
    dead: Math.round((dead / total) * 100),
    healthyCount: healthy,
    misfoldedCount: misfolded,
    deadCount: dead,
  };
};

export default function ProteinCascadeSimulator() {
  const [grid, setGrid] = useState(() => addRandomMisfold(createGrid()));
  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(2); // 2x, 4x, 8x (displayed as 1x, 2x, 4x)
  const intervalRef = useRef(null);

  const stats = getStats(grid);
  const total = GRID_WIDTH * GRID_HEIGHT;
  const isFinished = generation >= 100 || stats.deadCount === total || stats.misfoldedCount === 0;

  // Auto-pause when finished
  useEffect(() => {
    if (isFinished && isPlaying) {
      setIsPlaying(false);
    }
  }, [isFinished, isPlaying]);

  // Game loop
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const interval = 1000 / speed; // ms per generation
    intervalRef.current = setInterval(() => {
      setGrid(prevGrid => nextGeneration(prevGrid));
      setGeneration(prev => prev + 1);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed]);

  const handleReset = () => {
    setGrid(addRandomMisfold(createGrid()));
    setGeneration(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="my-8 border-2 border-neutral-300 p-4">
      {/* Title */}
      <h3 className="text-lg font-semibold text-neutral-900 mb-2 text-center">
        Protein Misfolding Cascade
      </h3>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <button
          onClick={togglePlay}
          className="flex items-center px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-sm"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Play
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center px-4 py-2 border border-neutral-300 hover:bg-neutral-100 transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-600">Speed:</span>
          {[{actual: 2, display: 1}, {actual: 4, display: 2}, {actual: 8, display: 4}].map(({actual, display}) => (
            <button
              key={actual}
              onClick={() => setSpeed(actual)}
              className={`px-3 py-1 border transition-colors ${
                speed === actual
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              {display}x
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex justify-center mb-4">
        <div
          className="border-2 border-neutral-900"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
            gap: '1px',
            backgroundColor: '#525252',
            padding: '1px',
          }}
        >
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: COLORS[cell.state],
                  transition: 'background-color 0.2s',
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="text-center text-sm text-neutral-700">
        <span className="font-mono">
          Healthy: {stats.healthy}% | Misfolded: {stats.misfolded}% | Dead: {stats.dead}% | Gen: {generation}
        </span>
      </div>
    </div>
  );
}
