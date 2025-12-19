---
title: "The Computational Collapse of the Brain"
date: "12-XX-2025"
preview: ""
slug: "the-computational-collapse-of-the-brain"
tags: ["Technical"]
subtopics: ["NP-Completeness", "Protein Folding", "Complexity Theory"]
---

## We Need More Compute

We are a walking collection of biological algorithms. All throughout our bodies, evolution has curated, tested, and improved the way in which our body responds to input. From how our body replicates cells to how we strengthen our neural pathways, its possible to form the perspective that our biological structure is simply a suite of tools that take in input, do something with it, and generate some output. Clearly, we can draw parallels to fields like Computer Science here, where certain algorithms rule both theory and practical applications.

Unfortunately, this idea works a little too well. In Computer Science, there is the concept of [[NP-Complete|NP-Completeness]]. Problems classified under this category can be verified^1[An observer can check if the answer is right or wrong] in polynomial time, but finding a solution requires exponential time in the worst case. The important note for the sake of this blog is that it is simply not feasible to fully calculate NP-Complete problems. Instead, we use heuristics that find good-enough solutions quickly, rather than optimal solutions slowly. This is, of course, a double-edged sword. What if "good-enough" isn't?

It's obvious that our bodies do not do everything perfectly. The existence of degenerative diseases makes it blatantly clear that algorithms break. One of the most fascinating and studied of these "breakable" biological algorithms is **protein folding**. The process of this algorithm is as such:

1. A string of amino acids come from the ribosome^2[Known as the "primary structure"]
1. Hydrogen bonds form to create helices and sheets^3["Secondary structure"]
1. Hydrophilic residues emerge on the outside, hydrophobic residues hide inside
1. Folding completes as the protein reaches its lowest energy configuration^4[The "native state"]

All things considered, its a pretty intuitive process driven completely by thermodynamics. However, the scale at which this happens in our bodies is massive, collecting hundreds of amino acids and folding in milliseconds. But still, a four-step process surely should be solved now? Despite the immense amount of time, money, and human capital thrown at protein folding, we still don't really understand how it works. Projects like [Alphafold](https://deepmind.google/science/alphafold/) can predict structures from sequences, but we still can't reliably simulate folding pathways from first principles—the computational cost remains prohibitive. To see why, let's crunch some numbers. Assuming each residue has exactly 3 discrete conformational states and some other simplifying ideas:

$$
3^{300} = (3^{10})^{30} \approx (59049)^{30} \approx (6 \times 10^4)^{30} = 6^{30} \times 10^{120}
$$

$$
6^{30} \approx (6^3)^{10} = 216^{10} \approx (2 \times 10^2)^{10} = 2^{10} \times 10^{20} \approx 10^3 \times 10^{20} = 10^{23}
$$

$$
\therefore 3^{300} \approx 10^{23} \times 10^{120} = 10^{143}
$$

To search this space exhaustively, checking one conformation per nanosecond, it would take roughly $10^{125}$ times the age of the universe. Yet proteins fold in milliseconds to seconds.

This is Levinthal's paradox: the search space is impossibly vast, yet proteins find their native state almost instantly. Evolution didn't solve the folding problem, it designed around it. The question isn't how proteins fold correctly. It's what happens when evolution's shortcuts break down.
