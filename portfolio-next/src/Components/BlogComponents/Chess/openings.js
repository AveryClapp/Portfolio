// Italian Game - Basic Line (No Variations)
export const italianGameBasic = {
  title: "Italian Game - Basic Development",
  description:
    "The fundamental Italian Game setup with quick piece development and central control.",
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
      notation: "2. Nf3",
      explanation:
        "White develops the knight to its best square, attacking the e5 pawn and preparing kingside castling.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
    },
    {
      notation: "2... Nc6",
      explanation:
        "Black defends the e5 pawn and develops the knight to its most active square.",
      boardChanges: [
        { from: { row: 0, col: 1 }, to: { row: 2, col: 2 }, piece: "n" },
      ],
    },
    {
      notation: "3. Bc4",
      explanation:
        "The Italian Game! White develops the bishop aggressively, targeting the weak f7 square.",
      boardChanges: [
        { from: { row: 7, col: 5 }, to: { row: 4, col: 2 }, piece: "B" },
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
      explanation: "Standard starting position for all chess games.",
    },
    {
      notation: "1. e4",
      explanation: "White opens with the king's pawn, controlling the center.",
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... e5",
      explanation:
        "Black responds symmetrically, leading to open game positions.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "2. Nf3",
      explanation:
        "White develops the knight, preparing to challenge Black's center.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
      variations: [
        {
          id: "kings-gambit",
          start: 2,
          name: "2. f4 (King's Gambit)",
          description:
            "The most aggressive approach - White sacrifices a pawn for rapid development and attacking chances.",
          moves: [
            {
              notation: "2. f4",
              explanation:
                "The King's Gambit! White offers a pawn to open lines and accelerate development.",
              boardChanges: [
                {
                  from: { row: 6, col: 5 },
                  to: { row: 4, col: 5 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "2... exf4",
              explanation:
                "Black accepts the gambit, winning material but allowing White dangerous compensation.",
              boardChanges: [
                {
                  from: { row: 3, col: 4 },
                  to: { row: 4, col: 5 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "3. Nf3",
              explanation:
                "White develops with tempo, preparing to regain the pawn or continue the attack.",
              boardChanges: [
                {
                  from: { row: 7, col: 6 },
                  to: { row: 5, col: 5 },
                  piece: "N",
                },
              ],
            },
          ],
        },
        {
          id: "vienna-game",
          start: 2,
          name: "2. Nc3 (Vienna Game)",
          description:
            "A flexible approach that can transpose to many different openings while maintaining central control.",
          moves: [
            {
              notation: "2. Nc3",
              explanation:
                "The Vienna Game - flexible development that keeps many options open.",
              boardChanges: [
                {
                  from: { row: 7, col: 1 },
                  to: { row: 5, col: 2 },
                  piece: "N",
                },
              ],
            },
            {
              notation: "2... Nf6",
              explanation:
                "Black develops naturally, preparing to challenge White's center.",
              boardChanges: [
                {
                  from: { row: 0, col: 6 },
                  to: { row: 2, col: 5 },
                  piece: "n",
                },
              ],
            },
            {
              notation: "3. f4",
              explanation:
                "Vienna Gambit - White can still offer the f-pawn with strong compensation.",
              boardChanges: [
                {
                  from: { row: 6, col: 5 },
                  to: { row: 4, col: 5 },
                  piece: "P",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "2... Nc6",
      explanation:
        "Black develops the knight, defending e5 and preparing further development.",
      boardChanges: [
        { from: { row: 0, col: 1 }, to: { row: 2, col: 2 }, piece: "n" },
      ],
    },
    {
      notation: "3. Bc4",
      explanation:
        "The Italian Game proper! White targets the f7 weakness immediately.",
      boardChanges: [
        { from: { row: 7, col: 5 }, to: { row: 4, col: 2 }, piece: "B" },
      ],
      variations: [
        {
          id: "ruy-lopez",
          start: 4,
          name: "3. Bb5 (Ruy Lopez)",
          description:
            "The Spanish Opening - more positional approach focusing on long-term pressure against the knight.",
          moves: [
            {
              notation: "3. Bb5",
              explanation:
                "The Ruy Lopez! White pins the knight and prepares long-term positional pressure.",
              boardChanges: [
                {
                  from: { row: 7, col: 5 },
                  to: { row: 3, col: 1 },
                  piece: "B",
                },
              ],
            },
            {
              notation: "3... a6",
              explanation:
                "Black immediately challenges the bishop with the most popular response.",
              boardChanges: [
                {
                  from: { row: 1, col: 0 },
                  to: { row: 2, col: 0 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "4. Ba4",
              explanation:
                "White retreats but maintains the pin - leading to the main line Ruy Lopez.",
              boardChanges: [
                {
                  from: { row: 3, col: 1 },
                  to: { row: 2, col: 0 },
                  piece: "B",
                },
              ],
            },
            {
              notation: "4... Nf6",
              explanation:
                "Black develops the knight with tempo, attacking the e4 pawn.",
              boardChanges: [
                {
                  from: { row: 0, col: 6 },
                  to: { row: 2, col: 5 },
                  piece: "n",
                },
              ],
            },
          ],
        },
        {
          id: "scotch-game",
          start: 4,
          name: "3. d4 (Scotch Game)",
          description:
            "Direct central confrontation - White immediately challenges Black's pawn structure.",
          moves: [
            {
              notation: "3. d4",
              explanation:
                "The Scotch Game! White strikes directly at Black's center.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "3... exd4",
              explanation:
                "Black captures, opening the center and forcing White to recapture.",
              boardChanges: [
                {
                  from: { row: 3, col: 4 },
                  to: { row: 4, col: 3 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "4. Nxd4",
              explanation:
                "White recaptures with the knight, maintaining central control and rapid development.",
              boardChanges: [
                {
                  from: { row: 5, col: 5 },
                  to: { row: 4, col: 3 },
                  piece: "N",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "3... Bc5",
      explanation:
        "Black mirrors White's development - the classical Italian Game position.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 3, col: 2 }, piece: "b" },
      ],
      variations: [
        {
          id: "hungarian-defense",
          start: 5,
          name: "3... Be7 (Hungarian Defense)",
          description:
            "Solid but passive - Black prioritizes king safety over piece activity.",
          moves: [
            {
              notation: "3... Be7",
              explanation:
                "The Hungarian Defense - solid development preparing kingside castling.",
              boardChanges: [
                {
                  from: { row: 0, col: 5 },
                  to: { row: 1, col: 4 },
                  piece: "b",
                },
              ],
            },
            {
              notation: "4. d4",
              explanation:
                "White advances in the center, gaining space and initiative.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "4... d6",
              explanation:
                "Black builds a solid pawn structure, preparing gradual development.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 2, col: 3 },
                  piece: "p",
                },
              ],
            },
          ],
        },
        {
          id: "two-knights",
          start: 5,
          name: "3... f5 (Rousseau Gambit)",
          description:
            "Ultra-aggressive and dubious - Black immediately attacks White's center with a pawn sacrifice.",
          moves: [
            {
              notation: "3... f5",
              explanation:
                "The Rousseau Gambit! Black sacrifices development for immediate counterplay.",
              boardChanges: [
                {
                  from: { row: 1, col: 5 },
                  to: { row: 3, col: 5 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "4. exf5",
              explanation:
                "White accepts the gambit, winning material with a strong position.",
              boardChanges: [
                {
                  from: { row: 4, col: 4 },
                  to: { row: 3, col: 5 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "4... Nf6",
              explanation:
                "Black develops with tempo, trying to create complications despite the material deficit.",
              boardChanges: [
                {
                  from: { row: 0, col: 6 },
                  to: { row: 2, col: 5 },
                  piece: "n",
                },
              ],
            },
          ],
        },
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
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ],
};

// Export default for backward compatibility
export default italianGameBasic;
