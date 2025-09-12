// Italian Game - Basic Line (No Variations)
export const kingsGambitBasic = {
  title: "King's Gambit - Basic Development",
  description:
    "The fundamental setup for the aggresive and decisive King's Gambit opening.",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Standard starting position for all chess games.",
    },
    {
      notation: "1. e4",
      explanation:
        "White opens with the king's pawn, controlling the center and freeing the bishop and queen.",
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... e5",
      explanation:
        "Black mirrors White's opening, fighting for central control and preparing piece development.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "2. f4",
      explanation:
        "White develops the knight to its best square, attacking the e5 pawn and preparing kingside castling.",
      boardChanges: [
        { from: { row: 6, col: 5 }, to: { row: 4, col: 5 }, piece: "P" },
      ],
    },
  ],
  initialBoard: [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ],
};

// Italian Game - With Major Variations
export const italianGameVariations = {
  title: "Italian Game - Strategic Crossroads",
  description:
    "Explore the key decision points in the Italian Game where different plans lead to completely different types of positions.",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Picking up with where we left after the first 5 moves",
    },

    {
      notation: "3... Bc5",
      explanation:
        "Black mirrors White's development - the classical Italian Game position.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 3, col: 2 }, piece: "b" },
      ],
    },
    {
      notation: "4. c3",
      explanation:
        "The Italian Classical! White prepares d4 to establish a strong pawn center.",
      boardChanges: [
        { from: { row: 6, col: 2 }, to: { row: 5, col: 2 }, piece: "P" },
      ],
      variations: [
        {
          id: "italian-gambit",
          start: 6,
          name: "4. f4 (Italian Gambit)",
          description:
            "Immediate aggression - White sacrifices the f-pawn for rapid piece development and kingside attack.",
          moves: [
            {
              notation: "4. f4",
              explanation:
                "The Italian Gambit! White offers a pawn to accelerate development and create attacking chances.",
              boardChanges: [
                {
                  from: { row: 6, col: 5 },
                  to: { row: 4, col: 5 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "4... exf4",
              explanation:
                "Black accepts the gambit, taking material but allowing White dangerous compensation.",
              boardChanges: [
                {
                  from: { row: 3, col: 4 },
                  to: { row: 4, col: 5 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "5. d4",
              explanation:
                "White continues aggressively, opening lines and challenging Black's bishop.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "5... Bb6",
              explanation:
                "Black retreats the bishop to safety while maintaining central tension.",
              boardChanges: [
                {
                  from: { row: 3, col: 2 },
                  to: { row: 2, col: 1 },
                  piece: "b",
                },
              ],
            },
          ],
        },
        {
          id: "giuoco-piano",
          start: 6,
          name: "4. d3 (Giuoco Piano)",
          description:
            "The 'Quiet Game' - positional approach focusing on solid development and gradual improvement.",
          moves: [
            {
              notation: "4. d3",
              explanation:
                "The Giuoco Piano - quiet development maintaining flexibility and solid structure.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 5, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "4... d6",
              explanation:
                "Black mirrors White's solid approach, preparing kingside castling.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 2, col: 3 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "5. Be3",
              explanation:
                "White develops the bishop actively, preparing to challenge Black's strong bishop.",
              boardChanges: [
                {
                  from: { row: 7, col: 2 },
                  to: { row: 5, col: 4 },
                  piece: "B",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  initialBoard: [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, "n", null, null, null, null, null],
    [null, null, null, null, "p", null, null, null],
    [null, null, "B", null, "P", null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", null, "P", "P"],
    ["R", "N", "B", "Q", "K", null, null, "R"],
  ],
};
