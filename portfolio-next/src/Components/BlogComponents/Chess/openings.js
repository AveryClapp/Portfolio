export const italianGame = {
  title: "Italian Game - Start",
  moves: [
    {
      notation: "Starting Position",
      explanation:
        "The game begins with both armies in their starting positions.",
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
      explanation: "Black mirrors White's move, establishing central presence.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "2. Nf3",
      explanation: "White develops the knight, attacking e5.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
    },
    {
      notation: "2... Nc6",
      explanation: "Black defends e5 while developing.",
      boardChanges: [
        { from: { row: 0, col: 1 }, to: { row: 2, col: 2 }, piece: "n" },
      ],
    },
    {
      notation: "3. Bc4",
      explanation:
        "The Italian Game begins! White develops the bishop actively.",
      boardChanges: [
        { from: { row: 7, col: 5 }, to: { row: 4, col: 2 }, piece: "B" },
      ],
    },
  ],
};

// Italian Game - Classical Variation (Giuoco Piano)
export const italianClassical = {
  title: "Italian Game - Classical Variation (Giuoco Piano)",
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
      notation: "4. c3",
      explanation:
        "The Classical approach - White prepares d4 to challenge the center.",
      boardChanges: [
        { from: { row: 6, col: 2 }, to: { row: 4, col: 2 }, piece: "P" },
      ],
    },
    {
      notation: "4... Nf6",
      explanation: "Black develops with tempo, attacking e4.",
      boardChanges: [
        { from: { row: 0, col: 6 }, to: { row: 2, col: 5 }, piece: "n" },
      ],
    },
    {
      notation: "5. d3",
      explanation: "White defends e4 and prepares steady development.",
      boardChanges: [
        { from: { row: 6, col: 3 }, to: { row: 5, col: 3 }, piece: "P" },
      ],
    },
    {
      notation: "5... d6",
      explanation:
        "Black solidifies the center and prepares further development.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 2, col: 3 }, piece: "p" },
      ],
    },
    {
      notation: "6. Be3",
      explanation: "White develops and challenges Black's active bishop.",
      boardChanges: [
        { from: { row: 7, col: 2 }, to: { row: 5, col: 4 }, piece: "B" },
      ],
    },
  ],
  initialBoard: [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "", "p", "p", "p"],
    ["", "", "n", "", "", "", "", ""],
    ["", "", "", "", "p", "", "", ""],
    ["", "", "B", "", "P", "", "", ""],
    ["", "", "", "", "", "N", "", ""],
    ["P", "P", "P", "P", "", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "", "", "R"],
  ],
};

// Italian Game - Italian Gambit
export const italianGambit = {
  title: "Italian Game - Italian Gambit",
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
    },
  ],
};
