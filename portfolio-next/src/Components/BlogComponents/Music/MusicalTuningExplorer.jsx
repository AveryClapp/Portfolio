"use client";

import React, { useState, useEffect, useRef } from "react";

// Calculate frequency for a given MIDI note in different tuning systems
function getFrequency(midiNumber, tuningSystem, baseFreq = 261.63) {
  const semitonesFromC4 = midiNumber - 60;
  const octave = Math.floor(semitonesFromC4 / 12);
  const noteInOctave = ((semitonesFromC4 % 12) + 12) % 12;

  switch(tuningSystem) {
    case 'equal':
      return baseFreq * Math.pow(2, semitonesFromC4 / 12);

    case 'just': {
      const justRatios = {
        0: 1/1, 1: 16/15, 2: 9/8, 3: 6/5, 4: 5/4, 5: 4/3,
        6: 45/32, 7: 3/2, 8: 8/5, 9: 5/3, 10: 16/9, 11: 15/8,
      };
      const ratio = justRatios[noteInOctave];
      return baseFreq * ratio * Math.pow(2, octave);
    }

    case 'pythagorean': {
      const fifthsOrder = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
      const fifthsFromC = fifthsOrder.indexOf(noteInOctave);
      const ratio = Math.pow(3/2, fifthsFromC);
      const reducedRatio = ratio / Math.pow(2, Math.floor(Math.log2(ratio)));
      return baseFreq * reducedRatio * Math.pow(2, octave);
    }
  }
}

export default function MusicalTuningExplorer() {
  const [tuningSystem, setTuningSystem] = useState('equal');
  const [activeNotes, setActiveNotes] = useState(new Set());
  const [lastPlayedChord, setLastPlayedChord] = useState(null);

  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef(new Map());

  const notes = [
    { name: 'C', midi: 60, white: true },
    { name: 'C♯', midi: 61, white: false },
    { name: 'D', midi: 62, white: true },
    { name: 'D♯', midi: 63, white: false },
    { name: 'E', midi: 64, white: true },
    { name: 'F', midi: 65, white: true },
    { name: 'F♯', midi: 66, white: false },
    { name: 'G', midi: 67, white: true },
    { name: 'G♯', midi: 68, white: false },
    { name: 'A', midi: 69, white: true },
    { name: 'A♯', midi: 70, white: false },
    { name: 'B', midi: 71, white: true },
    { name: 'C', midi: 72, white: true },
  ];

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Start note
  const startNote = async (midi) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (oscillatorsRef.current.has(midi)) return;

    const freq = getFrequency(midi, tuningSystem);
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05); // Louder and slower attack for more sustained sound

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();

    oscillatorsRef.current.set(midi, { oscillator, gainNode });
    setActiveNotes(prev => new Set(prev).add(midi));
  };

  // Stop note
  const stopNote = (midi) => {
    const osc = oscillatorsRef.current.get(midi);
    if (!osc) return;

    const ctx = audioContextRef.current;
    osc.gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.oscillator.stop(ctx.currentTime + 0.1);

    oscillatorsRef.current.delete(midi);
    setActiveNotes(prev => {
      const next = new Set(prev);
      next.delete(midi);
      return next;
    });
  };

  // Play chord helper
  const playChord = (midiNumbers, chordName) => {
    midiNumbers.forEach(midi => startNote(midi));
    setLastPlayedChord({ notes: midiNumbers, name: chordName });
  };

  // Stop all notes
  const stopAllNotes = () => {
    Array.from(oscillatorsRef.current.keys()).forEach(midi => stopNote(midi));
  };

  // Calculate frequency ratios for visualization
  const getChordAnalysis = () => {
    if (!lastPlayedChord) return null;

    const baseFreq = getFrequency(lastPlayedChord.notes[0], tuningSystem);
    const ratios = lastPlayedChord.notes.map(midi =>
      (getFrequency(midi, tuningSystem) / baseFreq).toFixed(4)
    );

    // Calculate how "off" this tuning is from Just Intonation
    const justBaseFreq = getFrequency(lastPlayedChord.notes[0], 'just');
    const justRatios = lastPlayedChord.notes.map(midi =>
      (getFrequency(midi, 'just') / justBaseFreq).toFixed(4)
    );

    // Calculate cents difference for the interval
    let maxCentsDiff = 0;
    lastPlayedChord.notes.forEach((midi, i) => {
      if (i > 0) {
        const currentRatio = getFrequency(midi, tuningSystem) / baseFreq;
        const justRatio = getFrequency(midi, 'just') / justBaseFreq;
        const cents = Math.abs(1200 * Math.log2(currentRatio / justRatio));
        if (cents > maxCentsDiff) maxCentsDiff = cents;
      }
    });

    return {
      ratios,
      justRatios,
      maxCentsDiff: maxCentsDiff.toFixed(1),
      isPerfect: tuningSystem === 'just'
    };
  };

  const analysis = getChordAnalysis();

  return (
    <div className="my-8">
      {/* Tuning System Toggle - Centered */}
      <div className="mb-4 flex justify-center">
        <div className="flex gap-2">
          {[
            { id: 'just', label: 'Just Intonation' },
            { id: 'pythagorean', label: 'Pythagorean' },
            { id: 'equal', label: 'Equal Temperament' },
          ].map(system => (
            <button
              key={system.id}
              onClick={() => setTuningSystem(system.id)}
              className={`px-4 py-2 text-sm border transition-colors ${
                tuningSystem === system.id
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              {system.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chord Buttons */}
      <div className="mb-6">
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => playChord([60, 64, 67], 'C Major')}
            className="px-3 py-2 text-sm border border-neutral-300 hover:bg-neutral-100 transition-colors"
          >
            C Major (C-E-G)
          </button>
          <button
            onClick={() => playChord([60, 67], 'Perfect Fifth')}
            className="px-3 py-2 text-sm border border-neutral-300 hover:bg-neutral-100 transition-colors"
          >
            Perfect Fifth (C-G)
          </button>
          <button
            onClick={() => playChord([60, 64], 'Major Third')}
            className="px-3 py-2 text-sm border border-neutral-300 hover:bg-neutral-100 transition-colors"
          >
            Major Third (C-E)
          </button>
          <button
            onClick={stopAllNotes}
            className="px-3 py-2 text-sm border border-neutral-300 bg-red-50 hover:bg-red-100 text-red-900 transition-colors"
          >
            Stop All
          </button>
        </div>
      </div>

      {/* Visualization Panel */}
      {lastPlayedChord && analysis && (
        <div className="mb-6 border-2 border-neutral-900 bg-stone-50 p-4">
          <div className="text-center mb-3">
            <h3 className="text-lg font-semibold text-neutral-900">{lastPlayedChord.name}</h3>
            <div className="text-sm text-neutral-600 mb-2">
              {tuningSystem === 'just' ? 'Just Intonation' : tuningSystem === 'pythagorean' ? 'Pythagorean' : 'Equal Temperament'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div className="bg-white p-3 border border-neutral-300">
              <div className="font-semibold text-neutral-900 mb-1">Current Ratios</div>
              <div className="font-mono text-neutral-700">
                {analysis.ratios.join(' : ')}
              </div>
            </div>
            <div className="bg-white p-3 border border-neutral-300">
              <div className="font-semibold text-neutral-900 mb-1">Perfect Ratios</div>
              <div className="font-mono text-neutral-700">
                {analysis.justRatios.join(' : ')}
              </div>
            </div>
          </div>

          <div className={`p-4 text-center border-2 ${
            analysis.isPerfect
              ? 'bg-green-50 border-green-600'
              : 'bg-orange-50 border-orange-600'
          }`}>
            <div className={`text-base font-bold ${
              analysis.isPerfect ? 'text-green-900' : 'text-orange-900'
            }`}>
              {analysis.isPerfect ? (
                <>✓ PERFECT HARMONY</>
              ) : (
                <>COMPROMISED: ~{analysis.maxCentsDiff}¢ off</>
              )}
            </div>
            <div className={`text-sm mt-2 ${
              analysis.isPerfect ? 'text-green-800' : 'text-orange-800'
            }`}>
              {analysis.isPerfect
                ? 'Pure mathematical ratios - no beating'
                : 'Mathematical approximation - listen for beating'}
            </div>
          </div>
        </div>
      )}

      {/* Piano Keyboard */}
      <div className="flex justify-center">
        <div className="relative inline-block select-none">
          {/* White keys */}
          <div className="flex">
            {notes.filter(n => n.white).map(note => (
              <div
                key={note.midi}
                onMouseDown={() => startNote(note.midi)}
                onMouseUp={() => stopNote(note.midi)}
                onMouseLeave={() => stopNote(note.midi)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  startNote(note.midi);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  stopNote(note.midi);
                }}
                className={`w-14 h-48 border-2 border-neutral-900 bg-white hover:bg-neutral-50 cursor-pointer transition-colors ${
                  activeNotes.has(note.midi) ? 'bg-neutral-200' : ''
                }`}
              >
                <span className="block mt-auto mb-2 text-center text-xs text-neutral-900 pointer-events-none">
                  {note.name}
                </span>
              </div>
            ))}
          </div>

          {/* Black keys */}
          <div className="absolute top-0 left-0 pointer-events-none">
            {notes.filter(n => !n.white).map((note) => {
              // Map black keys to their position between white keys
              // C♯ is between C (white 0) and D (white 1)
              // D♯ is between D (white 1) and E (white 2)
              // F♯ is between F (white 3) and G (white 4)
              // G♯ is between G (white 4) and A (white 5)
              // A♯ is between A (white 5) and B (white 6)
              const blackKeyPositions = {
                61: 0,  // C♯ - after white key 0 (C)
                63: 1,  // D♯ - after white key 1 (D)
                66: 3,  // F♯ - after white key 3 (F)
                68: 4,  // G♯ - after white key 4 (G)
                70: 5,  // A♯ - after white key 5 (A)
              };

              const whiteKeyIndex = blackKeyPositions[note.midi];
              if (whiteKeyIndex === undefined) return null;

              return (
                <div
                  key={note.midi}
                  onMouseDown={() => startNote(note.midi)}
                  onMouseUp={() => stopNote(note.midi)}
                  onMouseLeave={() => stopNote(note.midi)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startNote(note.midi);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    stopNote(note.midi);
                  }}
                  className={`absolute w-9 h-28 bg-neutral-900 hover:bg-neutral-700 border-2 border-neutral-900 pointer-events-auto cursor-pointer transition-colors ${
                    activeNotes.has(note.midi) ? 'bg-neutral-600' : ''
                  }`}
                  style={{ left: `${whiteKeyIndex * 56 + 56 - 18}px` }}
                >
                  <span className="block mt-auto mb-2 text-center text-[10px] text-white pointer-events-none">
                    {note.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
