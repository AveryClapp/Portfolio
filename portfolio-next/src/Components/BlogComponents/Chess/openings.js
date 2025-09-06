export const italianGame = {
  title: "Italian Game - Classical Variation",
  description:
    "One of the oldest chess openings, focusing on rapid development and central control",
  moves: [
    {
      notation: "Starting Position",
      explanation:
        "The game begins with both armies in their starting positions.",
      strengths: ["Equal material", "All pieces available"],
      considerations: ["Opening preparation is crucial"],
    },
    {
      notation: "1. e4",
      explanation: "White opens with the king's pawn, controlling the center.",
      strengths: ["Controls d5 and f5 squares", "Opens lines for development"],
      considerations: ["Commits to an open game"],
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... e5",
      explanation: "Black mirrors White's move, establishing central presence.",
      strengths: ["Equal central control", "Sound and principled"],
      considerations: ["Allows White to maintain initiative"],
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "2. Nf3",
      explanation: "White develops the knight, attacking e5.",
      strengths: ["Develops with tempo", "Attacks e5"],
      considerations: ["Doesn't defend e4"],
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
    },
    {
      notation: "2... Nc6",
      explanation: "Black defends e5 while developing.",
      strengths: ["Defends e5", "Develops toward center"],
      considerations: ["Allows Bb5+ ideas"],
      boardChanges: [
        { from: { row: 0, col: 1 }, to: { row: 2, col: 2 }, piece: "n" },
      ],
    },
    {
      notation: "3. Bc4",
      explanation:
        "The Italian Game begins! White develops the bishop actively.",
      strengths: ["Rapid development", "Targets f7", "Prepares castling"],
      considerations: ["Bishop can become a target"],
      boardChanges: [
        { from: { row: 7, col: 5 }, to: { row: 4, col: 2 }, piece: "B" },
      ],
    },
  ],
};

export const sicilianDefense = {
  title: "Sicilian Defense - Open Variation",
  description: "The most popular and complex defense against 1.e4",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Standard starting position for all chess games.",
      strengths: ["Balanced position"],
      considerations: ["Theory knowledge important"],
    },
    {
      notation: "1. e4",
      explanation: "White's most popular opening move.",
      strengths: ["Central control", "Quick development"],
      considerations: ["Allows sharp responses"],
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... c5",
      explanation:
        "The Sicilian Defense! Black fights for central control asymmetrically.",
      strengths: [
        "Unbalanced positions",
        "Counterplay on queenside",
        "Statistical success",
      ],
      considerations: ["Complex theory", "Requires precise play"],
      boardChanges: [
        { from: { row: 1, col: 2 }, to: { row: 3, col: 2 }, piece: "p" },
      ],
    },
  ],
};
