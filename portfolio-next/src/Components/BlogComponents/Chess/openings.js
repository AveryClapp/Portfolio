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

export const kingsGambitAccepted = {
  title: "King's Gambit - Accepted",
  description:
    "Starting after 1. e4 e5 2. f4 exf4 - Black has accepted the gambit. White must now decide how to continue the attack.",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Picking up where we left off",
    },
    {
      notation: "2... f4",
      explanation:
        "Black has accepted the King's Gambit. White has sacrificed the f-pawn for rapid development and attacking chances.",
      boardChanges: [
        { from: { row: 3, col: 4 }, to: { row: 4, col: 5 }, piece: "p" },
      ],
      variations: [
        {
          id: "bishops-gambit",
          start: 1,
          name: "3. Bc4 (Bishop's Gambit)",
          description:
            "Direct development targeting f7 - leads to sharp tactical complications and immediate pressure on Black's kingside.",
          moves: [
            {
              notation: "3. Bc4",
              explanation:
                "The Bishop's Gambit! White immediately develops the bishop to its most active square, targeting the weak f7 point and preparing rapid castling.",
              boardChanges: [
                {
                  from: { row: 7, col: 5 },
                  to: { row: 4, col: 2 },
                  piece: "B",
                },
              ],
            },
            {
              notation: "3... d5",
              explanation:
                "Black strikes back in the center immediately, the most principled response to challenge White's aggressive setup.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 3, col: 3 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "4. Bxd5",
              explanation:
                "White accepts the pawn sacrifice, maintaining the initiative while keeping material roughly balanced.",
              boardChanges: [
                {
                  from: { row: 4, col: 2 },
                  to: { row: 3, col: 3 },
                  piece: "B",
                },
              ],
            },
            {
              notation: "4... Nf6",
              explanation:
                "Black develops with tempo, attacking the centralized bishop and preparing to castle kingside quickly.",
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
      notation: "3. Nf3",
      explanation:
        "The King's Knight Gambit - the most popular continuation. White develops with tempo and prepares to reclaim the f4 pawn or launch a kingside attack.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
      variations: [
        {
          id: "modern-defense",
          start: 3,
          name: "3... d6 (Modern Defense)",
          description:
            "A solid positional approach - Black reinforces the center and prepares calm development without immediate tactical fireworks.",
          moves: [
            {
              notation: "3... d6",
              explanation:
                "The Modern Defense. Black solidifies the center and prepares methodical piece development, avoiding the tactical complications of 3...g5.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 2, col: 3 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "4. d4",
              explanation:
                "White establishes a classical pawn center, offering another pawn for rapid development and strong central control.",
              boardChanges: [
                {
                  from: { row: 6, col: 3 },
                  to: { row: 4, col: 3 },
                  piece: "P",
                },
              ],
            },
            {
              notation: "4... g5",
              explanation:
                "Black finally advances the g-pawn to maintain the material advantage while preparing to consolidate the position.",
              boardChanges: [
                {
                  from: { row: 1, col: 6 },
                  to: { row: 3, col: 6 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "5. h4",
              explanation:
                "White immediately challenges Black's pawn chain, opening lines for a kingside attack and preventing Black from consolidating easily.",
              boardChanges: [
                {
                  from: { row: 6, col: 7 },
                  to: { row: 4, col: 7 },
                  piece: "P",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "3... g5",
      explanation:
        "The Kieseritzky Gambit! The most challenging and sharp defense. Black holds onto the extra pawn and prepares to kick the knight, leading to extremely tactical play.",
      boardChanges: [
        { from: { row: 1, col: 6 }, to: { row: 3, col: 6 }, piece: "p" },
      ],
    },
    {
      notation: "4. h4",
      explanation:
        "The Allgaier Gambit approach! White immediately attacks Black's pawn chain, sacrificing material for a devastating kingside attack.",
      boardChanges: [
        { from: { row: 6, col: 7 }, to: { row: 4, col: 7 }, piece: "P" },
      ],
    },
    {
      notation: "4... g4",
      explanation:
        "Black advances the pawn, attacking the knight and maintaining material advantage, but White gets tremendous compensation in rapid development.",
      boardChanges: [
        { from: { row: 3, col: 6 }, to: { row: 4, col: 6 }, piece: "p" },
      ],
    },
    {
      notation: "5. Ne5",
      explanation:
        "The knight jumps to its powerful central outpost, attacking f7 and preparing devastating tactics. This is the critical position of the King's Gambit Accepted!",
      boardChanges: [
        { from: { row: 5, col: 5 }, to: { row: 3, col: 4 }, piece: "N" },
      ],
    },
  ],
  initialBoard: [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", null, "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, "p", null, null, null],
    [null, null, null, null, "P", "P", null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", null, "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ],
};

export const kingsGambitDeclined = {
  title: "King's Gambit - Declined",
  description:
    "Starting after 1. e4 e5 2. f4 - Black declines the gambit. Instead of taking the f4 pawn, Black chooses solid development and counterplay.",
  moves: [
    {
      notation: "Starting Position",
      explanation: "Picking up where we left off",
      variations: [
        {
          id: "modern-defense",
          start: 1,
          name: "2... d6 (Modern Defense)",
          description:
            "Solid positional approach - Black reinforces the center and prepares gradual piece development.",
          moves: [
            {
              notation: "2... d6",
              explanation:
                "The Modern Defense! Black solidifies the center and prepares methodical development, avoiding tactical complications.",
              boardChanges: [
                {
                  from: { row: 1, col: 3 },
                  to: { row: 2, col: 3 },
                  piece: "p",
                },
              ],
            },
            {
              notation: "3. Nf3",
              explanation:
                "White develops the knight to its best square, preparing to support the center and castle kingside.",
              boardChanges: [
                {
                  from: { row: 7, col: 6 },
                  to: { row: 5, col: 5 },
                  piece: "N",
                },
              ],
            },
            {
              notation: "3... Nc6",
              explanation:
                "Black develops the knight, preparing to challenge White's center and support the e5 pawn.",
              boardChanges: [
                {
                  from: { row: 0, col: 1 },
                  to: { row: 2, col: 2 },
                  piece: "n",
                },
              ],
            },
            {
              notation: "4. Bb5",
              explanation:
                "White develops the bishop actively, pinning the knight and preparing to challenge Black's setup.",
              boardChanges: [
                {
                  from: { row: 7, col: 5 },
                  to: { row: 4, col: 1 },
                  piece: "B",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      notation: "2... Bc5",
      explanation:
        "The Classical Defense! Black declines the gambit and develops the bishop to its most active square, maintaining central tension and preparing kingside castling.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 3, col: 2 }, piece: "b" },
      ],
    },
    {
      notation: "3. Nf3",
      explanation:
        "White develops the knight to its natural square, supporting the center and preparing to challenge Black's bishop on c5.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
    },
    {
      notation: "3... d6",
      explanation:
        "Black reinforces the center with the d-pawn, preparing to complete kingside development and maintain the solid pawn structure.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 2, col: 3 }, piece: "p" },
      ],
    },
    {
      notation: "4. c3",
      explanation:
        "White prepares d4 to establish a strong pawn center, challenging Black's bishop and gaining space in the center.",
      boardChanges: [
        { from: { row: 6, col: 2 }, to: { row: 5, col: 2 }, piece: "P" },
      ],
    },
    {
      notation: "4... f5",
      explanation:
        "Black advances the f-pawn to challenge White's center and prepare kingside counterplay, leading to sharp tactical positions.",
      boardChanges: [
        { from: { row: 1, col: 5 }, to: { row: 3, col: 5 }, piece: "p" },
      ],
    },
    {
      notation: "5. d4",
      explanation:
        "White strikes in the center, opening lines and challenging Black's bishop. This leads to the critical position of the Classical Defense!",
      boardChanges: [
        { from: { row: 6, col: 3 }, to: { row: 4, col: 3 }, piece: "P" },
      ],
    },
  ],
  initialBoard: [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", null, "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, "p", null, null, null],
    [null, null, null, null, "P", "P", null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", null, null, "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ],
};
export const spasskyBronstein1960 = {
  title: "Spassky vs. Bronstein, 1960",
  description:
    "The legendary King's Gambit game featured in James Bond's 'From Russia With Love' - Spassky's masterpiece against the former World Championship candidate.",
  moves: [
    {
      notation: "Starting Position",
      explanation:
        "USSR Championship, Leningrad 1960 - A clash between two titans of Soviet chess.",
    },
    {
      notation: "1. e4",
      explanation:
        "Spassky opens with his king's pawn, setting the stage for his beloved King's Gambit.",
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: "P" },
      ],
    },
    {
      notation: "1... e5",
      explanation:
        "Bronstein accepts the classical challenge, mirroring White's central control.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "2. f4",
      explanation:
        "The King's Gambit! Spassky offers the f-pawn for rapid development and attacking chances.",
      boardChanges: [
        { from: { row: 6, col: 5 }, to: { row: 4, col: 5 }, piece: "P" },
      ],
    },
    {
      notation: "2... exf4",
      explanation:
        "Bronstein accepts the challenge, taking the material while allowing White dangerous compensation.",
      boardChanges: [
        { from: { row: 3, col: 4 }, to: { row: 4, col: 5 }, piece: "p" },
      ],
    },
    {
      notation: "3. Nf3",
      explanation:
        "The King's Knight Gambit - White develops with tempo while preparing to reclaim the f4 pawn.",
      boardChanges: [
        { from: { row: 7, col: 6 }, to: { row: 5, col: 5 }, piece: "N" },
      ],
    },
    {
      notation: "3... d5",
      explanation:
        "The Fischer Defense! Bronstein strikes back immediately in the center instead of the usual 3...g5.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 3, col: 3 }, piece: "p" },
      ],
    },
    {
      notation: "4. exd5",
      explanation:
        "Spassky accepts the pawn, opening the center and preparing rapid piece development.",
      boardChanges: [
        { from: { row: 4, col: 4 }, to: { row: 3, col: 3 }, piece: "P" },
      ],
    },
    {
      notation: "4... Bd6",
      explanation:
        "An unusual but clever move! Bronstein protects the f4 pawn with the bishop instead of weakening his kingside.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 2, col: 3 }, piece: "b" },
      ],
    },
    {
      notation: "5. Nc3",
      explanation:
        "Spassky develops the knight to its best square, supporting the d5 pawn and preparing rapid castling.",
      boardChanges: [
        { from: { row: 7, col: 1 }, to: { row: 5, col: 2 }, piece: "N" },
      ],
    },
    {
      notation: "5... Ne7",
      explanation:
        "Bronstein prepares to support the f4 pawn with Ng6, while keeping his options open for development.",
      boardChanges: [
        { from: { row: 0, col: 6 }, to: { row: 1, col: 4 }, piece: "n" },
      ],
    },
    {
      notation: "6. d4",
      explanation:
        "White establishes a strong pawn center, gaining space and preparing to challenge Black's position.",
      boardChanges: [
        { from: { row: 6, col: 3 }, to: { row: 4, col: 3 }, piece: "P" },
      ],
    },
    {
      notation: "6... 0-0",
      explanation:
        "Bronstein castles kingside, bringing his king to safety before the tactical storm begins.",
      boardChanges: [
        { from: { row: 0, col: 4 }, to: { row: 0, col: 6 }, piece: "k" },
        { from: { row: 0, col: 7 }, to: { row: 0, col: 5 }, piece: "r" },
      ],
    },
    {
      notation: "7. Bd3",
      explanation:
        "Spassky develops the bishop aggressively, targeting the h7 square and preparing kingside castling.",
      boardChanges: [
        { from: { row: 7, col: 5 }, to: { row: 5, col: 3 }, piece: "B" },
      ],
    },
    {
      notation: "7... Nd7",
      explanation:
        "Black develops the knight to support the center and prepare coordinated piece play.",
      boardChanges: [
        { from: { row: 0, col: 1 }, to: { row: 1, col: 3 }, piece: "n" },
      ],
    },
    {
      notation: "8. 0-0",
      explanation:
        "White castles kingside, completing development and preparing to launch a kingside attack.",
      boardChanges: [
        { from: { row: 7, col: 4 }, to: { row: 7, col: 6 }, piece: "K" },
        { from: { row: 7, col: 7 }, to: { row: 7, col: 5 }, piece: "R" },
      ],
    },
    {
      notation: "8... h6",
      explanation:
        "Bronstein creates luft for his king, but this move proves to be unnecessary and slightly weakening.",
      boardChanges: [
        { from: { row: 1, col: 7 }, to: { row: 2, col: 7 }, piece: "p" },
      ],
    },
    {
      notation: "9. Ne4!",
      explanation:
        "Brilliant! Spassky sacrifices a pawn to activate his pieces dramatically and increase the pressure on Black's position.",
      boardChanges: [
        { from: { row: 5, col: 5 }, to: { row: 4, col: 4 }, piece: "N" },
      ],
    },
    {
      notation: "9... Nxd5",
      explanation:
        "Bronstein accepts the pawn sacrifice, but this allows White tremendous piece activity and attacking chances.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 3, col: 3 }, piece: "n" },
      ],
    },
    {
      notation: "10. c4",
      explanation:
        "White advances in the center, attacking the knight and further opening lines for his pieces.",
      boardChanges: [
        { from: { row: 6, col: 2 }, to: { row: 4, col: 2 }, piece: "P" },
      ],
    },
    {
      notation: "10... Ne3",
      explanation:
        "The knight jumps to an active square, attacking the bishop and trying to trade off White's dangerous pieces.",
      boardChanges: [
        { from: { row: 3, col: 3 }, to: { row: 5, col: 4 }, piece: "n" },
      ],
    },
    {
      notation: "11. Bxe3",
      explanation:
        "Spassky recaptures, opening the f-file and maintaining the initiative despite the piece trade.",
      boardChanges: [
        { from: { row: 7, col: 2 }, to: { row: 5, col: 4 }, piece: "B" },
      ],
    },
    {
      notation: "11... fxe3",
      explanation:
        "Black recaptures, creating a dangerous passed pawn on e3 that will soon become a major factor.",
      boardChanges: [
        { from: { row: 4, col: 5 }, to: { row: 5, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "12. c5",
      explanation:
        "Impressive! White advances with tempo, attacking the bishop and gaining space in the center.",
      boardChanges: [
        { from: { row: 4, col: 2 }, to: { row: 3, col: 2 }, piece: "P" },
      ],
    },
    {
      notation: "12... Be7",
      explanation:
        "The bishop retreats to safety but Black's position is becoming increasingly cramped.",
      boardChanges: [
        { from: { row: 2, col: 3 }, to: { row: 1, col: 4 }, piece: "b" },
      ],
    },
    {
      notation: "13. Bc2",
      explanation:
        "Spassky repositions the bishop to the long diagonal, preparing a devastating queen and bishop battery.",
      boardChanges: [
        { from: { row: 5, col: 3 }, to: { row: 6, col: 2 }, piece: "B" },
      ],
    },
    {
      notation: "13... Re8",
      explanation:
        "Black activates the rook on the e-file, but White's attack is building faster than Black's defense.",
      boardChanges: [
        { from: { row: 0, col: 5 }, to: { row: 0, col: 4 }, piece: "r" },
      ],
    },
    {
      notation: "14. Qd3",
      explanation:
        "The queen joins the attack, targeting the h7 square and preparing devastating tactical motifs.",
      boardChanges: [
        { from: { row: 7, col: 3 }, to: { row: 5, col: 3 }, piece: "Q" },
      ],
    },
    {
      notation: "14... e2",
      explanation:
        "The passed pawn advances to the second rank with tremendous effect, creating immediate threats.",
      boardChanges: [
        { from: { row: 5, col: 4 }, to: { row: 6, col: 4 }, piece: "p" },
      ],
    },
    {
      notation: "15. Nd6!!",
      explanation:
        "The move that shocked the chess world! Spassky plays one of the most spectacular knight sacrifices in chess history, offering the piece to destroy Black's kingside.",
      boardChanges: [
        { from: { row: 4, col: 4 }, to: { row: 2, col: 3 }, piece: "N" },
      ],
    },
    {
      notation: "15... Nf8",
      explanation:
        "Bronstein flinches under the pressure and plays a weak move, trying to defend but walking into a forced mate.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 0, col: 5 }, piece: "n" },
      ],
    },
    {
      notation: "16. Nxf7!",
      explanation:
        "The knockout blow! White sacrifices the knight, exposing Black's king and creating unstoppable mating threats.",
      boardChanges: [
        { from: { row: 2, col: 3 }, to: { row: 1, col: 5 }, piece: "N" },
      ],
    },
    {
      notation: "16... exf1=Q+",
      explanation:
        "Black promotes the pawn with check, but this desperate attempt to complicate cannot save the game.",
      boardChanges: [
        { from: { row: 6, col: 4 }, to: { row: 7, col: 5 }, piece: "q" },
      ],
    },
    {
      notation: "17. Rxf1",
      explanation:
        "White recaptures the queen, and now threatens immediate mate with the devastating Qh7+ and Qh8#.",
      boardChanges: [
        { from: { row: 7, col: 0 }, to: { row: 7, col: 5 }, piece: "R" },
      ],
    },
    {
      notation: "17... Bf5",
      explanation:
        "Black desperately tries to block the mating attack, but White's assault is unstoppable.",
      boardChanges: [
        { from: { row: 0, col: 2 }, to: { row: 3, col: 5 }, piece: "b" },
      ],
    },
    {
      notation: "18. Qxf5",
      explanation:
        "Spassky captures the bishop, maintaining all his threats while staying a piece ahead.",
      boardChanges: [
        { from: { row: 5, col: 3 }, to: { row: 3, col: 5 }, piece: "Q" },
      ],
    },
    {
      notation: "18... Qd7",
      explanation:
        "Black's queen rushes to defend, but the damage to the kingside is irreparable.",
      boardChanges: [
        { from: { row: 0, col: 3 }, to: { row: 1, col: 3 }, piece: "q" },
      ],
    },
    {
      notation: "19. Qf4",
      explanation:
        "The queen repositions to maintain maximum pressure on Black's shattered kingside defenses.",
      boardChanges: [
        { from: { row: 3, col: 5 }, to: { row: 4, col: 5 }, piece: "Q" },
      ],
    },
    {
      notation: "19... Bf6",
      explanation:
        "Black develops the bishop, trying to create some counterplay and defend the weakened kingside.",
      boardChanges: [
        { from: { row: 1, col: 4 }, to: { row: 2, col: 5 }, piece: "b" },
      ],
    },
    {
      notation: "20. N3e5",
      explanation:
        "The second knight joins the attack, creating multiple threats that Black cannot meet simultaneously.",
      boardChanges: [
        { from: { row: 5, col: 2 }, to: { row: 3, col: 4 }, piece: "N" },
      ],
    },
    {
      notation: "20... Qe7",
      explanation:
        "A final desperate attempt to coordinate defense, but White's attack has reached unstoppable momentum.",
      boardChanges: [
        { from: { row: 1, col: 3 }, to: { row: 1, col: 4 }, piece: "q" },
      ],
    },
    {
      notation: "21. Bb3",
      explanation:
        "White brings the bishop into the attack with deadly effect, creating multiple mating threats.",
      boardChanges: [
        { from: { row: 6, col: 2 }, to: { row: 5, col: 1 }, piece: "B" },
      ],
    },
    {
      notation: "21... Bxe5",
      explanation:
        "Black captures the knight in desperation, trying to eliminate one of White's attacking pieces.",
      boardChanges: [
        { from: { row: 2, col: 5 }, to: { row: 3, col: 4 }, piece: "b" },
      ],
    },
    {
      notation: "22. Nxe5+",
      explanation:
        "The final blow! White captures with check, and after Kh7, Qe4+ leads to forced mate.",
      boardChanges: [
        { from: { row: 1, col: 5 }, to: { row: 3, col: 4 }, piece: "N" },
      ],
    },
    {
      notation: "Bronstein Resigns",
      explanation:
        "Facing inevitable mate after 22...Kh7 23.Qe4+ g6 24.Qh4, Bronstein resigned. This masterpiece was later featured in the James Bond film 'From Russia With Love.'",
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
