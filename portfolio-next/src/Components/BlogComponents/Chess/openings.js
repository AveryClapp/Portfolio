// Italian Game - Classic Line
export const italianGame = {
  title: "Italian Game - Classical Variation",
  description:
    "One of the oldest chess openings, developing pieces quickly while controlling the center.",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Standard starting position for all chess games.",
    },
    {
      notation: "1. e4",
      explanation: "White's most popular opening move, controlling the center.",
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... e5",
      explanation:
        "Black mirrors White's opening, fighting for central control.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "2. Nf3",
      explanation: "White develops the knight and attacks the e5 pawn.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
      variations: [
        {
          id: "kings-gambit",
          name: "2. f4 (King's Gambit)",
          description:
            "Aggressive gambit play, sacrificing a pawn for rapid development.",
          moves: [
            {
              notation: "2. f4",
              explanation:
                "The King's Gambit! White sacrifices a pawn for attacking chances.",
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
              explanation: "Black accepts the gambit, taking the material.",
              boardChanges: [
                {
                  from: { row: 3, col: 4 },
                  to: { row: 4, col: 5 },
                  piece: "p",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "2... Nc6",
      explanation: "Black defends the e5 pawn and develops the knight.",
      boardChanges: [
        { from: { row: 0, col: 1 }, to: { row: 2, col: 2 }, piece: "n" },
      ],
    },
    {
      notation: "3. Bc4",
      explanation:
        "The Italian Game! White develops the bishop aggressively, targeting f7.",
      boardChanges: [
        { from: { row: 7, col: 5 }, to: { row: 4, col: 2 }, piece: "B" },
      ],
      variations: [
        {
          id: "ruy-lopez",
          name: "3. Bb5 (Ruy Lopez)",
          description:
            "The Spanish Opening, pinning the knight and preparing queenside castling.",
          moves: [
            {
              notation: "3. Bb5",
              explanation:
                "The Ruy Lopez! White pins the knight and prepares long-term pressure.",
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
              explanation: "Black questions the bishop immediately.",
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
              explanation: "White retreats the bishop, maintaining the pin.",
              boardChanges: [
                {
                  from: { row: 3, col: 1 },
                  to: { row: 2, col: 0 },
                  piece: "B",
                },
              ],
            },
          ],
        },
        {
          id: "center-game",
          name: "3. d4 (Center Game)",
          description:
            "Aggressive central play, immediately challenging Black's pawn.",
          moves: [
            {
              notation: "3. d4",
              explanation:
                "The Center Game approach - White attacks the center immediately.",
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
              explanation: "Black captures, opening the center.",
              boardChanges: [
                {
                  from: { row: 3, col: 4 },
                  to: { row: 4, col: 3 },
                  piece: "p",
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
        "Black mirrors White's development, creating sharp tactical possibilities.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 3, col: 2 }, piece: "b" },
      ],
      variations: [
        {
          id: "hungarian",
          name: "3... Be7 (Hungarian Defense)",
          description: "Solid development, preparing kingside castling.",
          moves: [
            {
              notation: "3... Be7",
              explanation:
                "The Hungarian Defense - more solid, preparing to castle.",
              boardChanges: [
                {
                  from: { row: 0, col: 5 },
                  to: { row: 1, col: 4 },
                  piece: "b",
                },
              ],
            },
            {
              notation: "4. d3",
              explanation:
                "White develops quietly, maintaining the bishop pair.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 5, col: 3 },
                  piece: "P",
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
        "The classical continuation, preparing d4 to challenge Black's center.",
      boardChanges: [
        { from: { row: 6, col: 2 }, to: { row: 5, col: 2 }, piece: "P" },
      ],
      variations: [
        {
          id: "italian-gambit",
          name: "4. f4 (Italian Gambit)",
          description:
            "Aggressive gambit play, sacrificing a pawn for rapid development.",
          moves: [
            {
              notation: "4. f4",
              explanation:
                "The Italian Gambit! White sacrifices a pawn for attacking chances.",
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
              explanation: "Black accepts the gambit, taking the material.",
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
              explanation: "White continues attacking, opening the center.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
          ],
        },
        {
          id: "quiet-italian",
          name: "4. d3 (Quiet Italian)",
          description: "Positional approach, avoiding immediate confrontation.",
          moves: [
            {
              notation: "4. d3",
              explanation: "The quiet Italian, maintaining solid development.",
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
              explanation: "Black develops solidly, preparing to castle.",
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
      ],
    },
    {
      notation: "4... f5",
      explanation:
        "The aggressive Rousseau Gambit! Black counter-attacks immediately.",
      boardChanges: [
        { from: { row: 1, col: 5 }, to: { row: 3, col: 5 }, piece: "p" },
      ],
    },
    {
      notation: "5. d4",
      explanation: "White accepts the challenge and opens the center.",
      boardChanges: [
        { from: { row: 6, col: 3 }, to: { row: 4, col: 3 }, piece: "P" },
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

// Italian Classical - Enhanced with variations
export const italianClassical = {
  title: "Italian Game - Classical Line",
  description:
    "The main theoretical line of the Italian Game with deep strategic content.",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Standard starting position for all chess games.",
    },
    {
      notation: "1. e4",
      explanation: "White opens with the king's pawn.",
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... e5",
      explanation: "Black responds symmetrically.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "2. Nf3",
      explanation: "Knight to f3, attacking the e5 pawn.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
    },
    {
      notation: "2... Nc6",
      explanation: "Black defends e5 with the knight.",
      boardChanges: [
        { from: { row: 0, col: 1 }, to: { row: 2, col: 2 }, piece: "n" },
      ],
    },
    {
      notation: "3. Bc4",
      explanation: "Italian Game setup, targeting the f7 square.",
      boardChanges: [
        { from: { row: 7, col: 5 }, to: { row: 4, col: 2 }, piece: "B" },
      ],
    },
    {
      notation: "3... Bc5",
      explanation: "Black mirrors the development.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 3, col: 2 }, piece: "b" },
      ],
    },
    {
      notation: "4. c3",
      explanation: "Preparing d4 to challenge the center.",
      boardChanges: [
        { from: { row: 6, col: 2 }, to: { row: 5, col: 2 }, piece: "P" },
      ],
    },
    {
      notation: "4... d6",
      explanation:
        "Black solidifies the center and prepares further development.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 2, col: 3 }, piece: "p" },
      ],
    },
    {
      notation: "5. d4",
      explanation: "White establishes central control.",
      boardChanges: [
        { from: { row: 6, col: 3 }, to: { row: 4, col: 3 }, piece: "P" },
      ],
    },
    {
      notation: "5... exd4",
      explanation: "Black exchanges in the center.",
      boardChanges: [
        { from: { row: 3, col: 4 }, to: { row: 4, col: 3 }, piece: "p" },
      ],
    },
    {
      notation: "6. cxd4",
      explanation: "White recaptures, maintaining central presence.",
      boardChanges: [
        { from: { row: 5, col: 2 }, to: { row: 4, col: 3 }, piece: "P" },
      ],
    },
    {
      notation: "6... Bb6",
      explanation: "Black retreats the bishop to safety.",
      boardChanges: [
        { from: { row: 3, col: 2 }, to: { row: 2, col: 1 }, piece: "b" },
      ],
    },
  ],
  initialBoard: [
    ["r", "n", "b", "q", "k", "b", "", "r"],
    ["p", "p", "p", "p", "", "p", "p", "p"],
    ["", "", "n", "", "", "", "", ""],
    ["", "", "", "", "p", "", "", ""],
    ["", "", "B", "", "P", "", "", ""],
    ["", "", "", "", "", "N", "", ""],
    ["P", "P", "P", "P", "", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "", "", "R"],
  ],
};

// Italian Gambit - Enhanced with variations
export const italianGambit = {
  title: "Italian Game - Italian Gambit",
  description:
    "Aggressive gambit play in the Italian Game, sacrificing material for rapid development.",
  moves: [
    {
      notation: "3... Bc5",
      explanation:
        "Black mirrors White's development, creating the Italian Game proper.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 3, col: 2 }, piece: "b" },
      ],
    },
    {
      notation: "4. f4",
      explanation:
        "The Italian Gambit! White immediately attacks the center with aggression.",
      boardChanges: [
        { from: { row: 6, col: 5 }, to: { row: 4, col: 5 }, piece: "P" },
      ],
      variations: [
        {
          id: "rousseau-declined",
          name: "4... d6 (Declining)",
          description: "Black declines the gambit and plays solidly.",
          moves: [
            {
              notation: "4... d6",
              explanation:
                "Black declines the gambit, preferring solid development.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 2, col: 3 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "5. fxe5",
              explanation: "White captures anyway, opening lines.",
              boardChanges: [
                {
                  from: { row: 4, col: 5 },
                  to: { row: 3, col: 4 },
                  piece: "P",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "4... exf4",
      explanation:
        "Black accepts the gambit, winning material but allowing White initiative.",
      boardChanges: [
        {
          from: { row: 3, col: 4 },
          to: { row: 4, col: 5 },
          piece: "p",
          captures: "P",
        },
      ],
    },
    {
      notation: "5. e5",
      explanation: "White advances aggressively, gaining space and tempo.",
      boardChanges: [
        { from: { row: 4, col: 4 }, to: { row: 3, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "5... d5",
      explanation:
        "Black strikes back in the center, challenging White's advance.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 3, col: 3 }, piece: "p" },
      ],
    },
    {
      notation: "6. Bb5",
      explanation:
        "White develops with check, maintaining pressure and initiative.",
      boardChanges: [
        { from: { row: 4, col: 2 }, to: { row: 3, col: 1 }, piece: "B" },
      ],
    },
    {
      notation: "6... Ne4",
      explanation:
        "Black centralizes the knight aggressively, seeking counterplay.",
      boardChanges: [
        { from: { row: 2, col: 2 }, to: { row: 4, col: 4 }, piece: "n" },
      ],
    },
  ],
  initialBoard: [
    ["r", "n", "b", "q", "k", "b", "", "r"],
    ["p", "p", "p", "p", "", "p", "p", "p"],
    ["", "", "n", "", "", "", "", ""],
    ["", "", "", "", "p", "", "", ""],
    ["", "", "B", "", "P", "", "", ""],
    ["", "", "", "", "", "N", "", ""],
    ["P", "P", "P", "P", "", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "", "", "R"],
  ],
};

// Sicilian Defense - Enhanced with variations
export const sicilianDefense = {
  title: "Sicilian Defense - Open Variation",
  description: "The most popular and complex defense against 1.e4",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Standard starting position for all chess games.",
    },
    {
      notation: "1. e4",
      explanation: "White's most popular opening move.",
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... c5",
      explanation:
        "The Sicilian Defense! Black fights for central control asymmetrically.",
      boardChanges: [
        { from: { row: 1, col: 2 }, to: { row: 3, col: 2 }, piece: "p" },
      ],
      variations: [
        {
          id: "french-defense",
          name: "1... e6 (French Defense)",
          description: "Solid pawn structure, preparing d5.",
          moves: [
            {
              notation: "1... e6",
              explanation:
                "The French Defense - Black prepares d5 with solid structure.",
              boardChanges: [
                {
                  from: { row: 1, col: 4 },
                  to: { row: 2, col: 4 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "2. d4",
              explanation: "White establishes central control.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "2... d5",
              explanation: "Black challenges the center immediately.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 3, col: 3 },
                  piece: "p",
                },
              ],
            },
          ],
        },
        {
          id: "caro-kann",
          name: "1... c6 (Caro-Kann Defense)",
          description:
            "Solid defense preparing d5 with better piece development than French.",
          moves: [
            {
              notation: "1... c6",
              explanation:
                "The Caro-Kann Defense - preparing d5 with solid development.",
              boardChanges: [
                {
                  from: { row: 1, col: 2 },
                  to: { row: 2, col: 2 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "2. d4",
              explanation: "White controls the center.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "2... d5",
              explanation: "Black challenges the center with solid support.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 3, col: 3 },
                  piece: "p",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "2. Nf3",
      explanation:
        "White develops the knight, preparing to control the center.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
      variations: [
        {
          id: "closed-sicilian",
          name: "2. Nc3 (Closed Sicilian)",
          description: "Positional approach avoiding early central tensions.",
          moves: [
            {
              notation: "2. Nc3",
              explanation:
                "The Closed Sicilian - positional development avoiding immediate confrontation.",
              boardChanges: [
                {
                  from: { row: 7, col: 1 },
                  to: { row: 5, col: 2 },
                  piece: "N",
                },
              ],
            },
            {
              notation: "2... Nc6",
              explanation:
                "Black develops naturally, mirroring White's knight.",
              boardChanges: [
                {
                  from: { row: 0, col: 1 },
                  to: { row: 2, col: 2 },
                  piece: "n",
                },
              ],
            },
            {
              notation: "3. f4",
              explanation:
                "King's Indian Attack setup, preparing kingside expansion.",
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
        {
          id: "bb5-sicilian",
          name: "2. Bb5+ (Check Variation)",
          description: "Immediate check disrupting Black's development.",
          moves: [
            {
              notation: "2. Bb5+",
              explanation:
                "Immediate check forces Black to make early decisions.",
              boardChanges: [
                {
                  from: { row: 7, col: 5 },
                  to: { row: 3, col: 1 },
                  piece: "B",
                },
              ],
            },
            {
              notation: "2... Bd7",
              explanation: "Most natural response, developing the bishop.",
              boardChanges: [
                {
                  from: { row: 0, col: 2 },
                  to: { row: 1, col: 3 },
                  piece: "b",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "2... d6",
      explanation:
        "Black supports the c5 pawn and prepares natural development.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 2, col: 3 }, piece: "p" },
      ],
      variations: [
        {
          id: "accelerated-dragon",
          name: "2... g6 (Accelerated Dragon)",
          description: "Immediate fianchetto avoiding d6.",
          moves: [
            {
              notation: "2... g6",
              explanation: "The Accelerated Dragon - fianchetto without d6.",
              boardChanges: [
                {
                  from: { row: 1, col: 6 },
                  to: { row: 2, col: 6 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "3. d4",
              explanation: "White opens the center.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "3... cxd4",
              explanation: "Black captures, opening lines.",
              boardChanges: [
                {
                  from: { row: 3, col: 2 },
                  to: { row: 4, col: 3 },
                  piece: "p",
                },
              ],
            },
          ],
        },
        {
          id: "najdorf",
          name: "2... Nc6 (Najdorf Setup)",
          description: "Classic development preparing the Najdorf variation.",
          moves: [
            {
              notation: "2... Nc6",
              explanation: "Classical development, preparing various setups.",
              boardChanges: [
                {
                  from: { row: 0, col: 1 },
                  to: { row: 2, col: 2 },
                  piece: "n",
                },
              ],
            },
            {
              notation: "3. d4",
              explanation: "White challenges the center.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "3. d4",
      explanation:
        "White opens the center, challenging Black's pawn structure.",
      boardChanges: [
        { from: { row: 6, col: 3 }, to: { row: 4, col: 3 }, piece: "P" },
      ],
    },
    {
      notation: "3... cxd4",
      explanation: "Black captures, opening the c-file for potential pressure.",
      boardChanges: [
        { from: { row: 3, col: 2 }, to: { row: 4, col: 3 }, piece: "p" },
      ],
    },
    {
      notation: "4. Nxd4",
      explanation:
        "White recaptures with the knight, maintaining central control.",
      boardChanges: [
        { from: { row: 5, col: 5 }, to: { row: 4, col: 3 }, piece: "N" },
      ],
    },
    {
      notation: "4... Nf6",
      explanation: "Black develops with tempo, attacking the e4 pawn.",
      boardChanges: [
        { from: { row: 0, col: 6 }, to: { row: 2, col: 5 }, piece: "n" },
      ],
    },
    {
      notation: "5. Nc3",
      explanation: "White develops the knight, supporting the center.",
      boardChanges: [
        { from: { row: 7, col: 1 }, to: { row: 5, col: 2 }, piece: "N" },
      ],
    },
    {
      notation: "5... g6",
      explanation:
        "The Dragon setup - Black fianchettoes the bishop for kingside pressure.",
      boardChanges: [
        { from: { row: 1, col: 6 }, to: { row: 2, col: 6 }, piece: "p" },
      ],
      variations: [
        {
          id: "sicilian-najdorf",
          name: "5... a6 (Najdorf Variation)",
          description:
            "The most popular Sicilian variation, preparing b5 expansion.",
          moves: [
            {
              notation: "5... a6",
              explanation:
                "The Najdorf! Black prepares queenside expansion with b5.",
              boardChanges: [
                {
                  from: { row: 1, col: 0 },
                  to: { row: 2, col: 0 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "6. Be3",
              explanation:
                "White develops the bishop, preparing kingside castling.",
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
    {
      notation: "6. Be3",
      explanation: "White develops the bishop and prepares castling.",
      boardChanges: [
        { from: { row: 7, col: 2 }, to: { row: 5, col: 4 }, piece: "B" },
      ],
    },
  ],
};
