---
title: "Gödel's Incompleteness Theorem and its Implications on the Human Condition"
date: "10-19-2025"
preview: "Is philosophy as a system consistent? Can it be solved?"
slug: "godels-incompleteness-theorem"
tags: ["Philosophy"]
---

## The Hilbert Program

David Hilbert is highly regarded as one of the most impactful thinkers and mathematicians of all time. In fact, if you were to look at the time he was alive, from 1862 to 1943, it would be difficult to find a mathematician with more influence than him. What makes Hilbert special is that he contributed to deep and complex topics and problems across a diverse set of disciplines. Hilbert spaces laid the foundation for future growth in quantum mechanics. He independently derived the equations of general relativity in the Hilbert action. His Zahlbericht reorganized the field of number theory into a collection of modern and abstract methods. Clearly, he was both a jack and master of all trades. To practically anyone else ever, this would be enough to retire as one of the greats. However, his greatest ambition was yet to come.

At the turn of the 20th century, mathematics was in an uncertain state. Paradoxes in set theory and foundational questions were shaking mathematicians' confidence in the field. In light of all of these developments and its shocks on the foundations of math^1[As well as almost assuredly a bit of hubris], Hilbert recognized the need for a modernized and solid foundation from which the field could advance, so he introduced the _Hilbert Program_. This program set out to prove that mathematics is perfect. To Hilbert, this could be proven by proving just three different ideas:

1. **Completeness**: Every true statement can be proven from a fixed set of axioms
1. **Consistency**: No contradiction can be derived from any statements
1. **Decidability**: There is a systematic procedure to determine if any statement is true or false

For nearly a decade, the questions remained open as mathematicians worked toward Hilbert's vision. Then in 1931, an unexpected source delivered devastating news.

## The First Incompleteness Theorem

Kurt Gödel was a 25-year-old Austrian logician who had just wrapped up his PhD at the University of Vienna. Even at this young age, Gödel published two groundbreaking papers to prove that Hilbert's Program was impossible. In his first paper he outlines the **first incompleteness theorem**, which says that any consistent formal system that's powerful enough to describe basic arithmetic contains true statements that cannot be proven true within that system. In the context of this problem, a **formal system** is a set of axioms and rules for deriving new statements. Gödel proves this statement via the self-reference trick, essentially finding a statement that cannot be proven in a given system.

Imagine you had a rule book for an arbitrary game where rule x says 'This rule cannot be verified using only this rule book'. Is this correct? It may seem like a silly example, but it gets to the heart of what Gödel is trying to say because this is unverifiable within the scope of our current system^2[The rule book]. However, Gödel didn't disappoint Hilbert with a one-sentence proof, he needed a more robust way to deliver his thesis. His genius lies in discovering that mathematical statements could be encoded as numbers. This trick, known as Gödel numbers, allowed him to setup a self-referencing system where mathematical propositions could make statements about themselves.

Generally, let $G$ be a true statement that equates to 'Statement $G$ can't be proved in this system', there are two cases to consider. If we suppose that $G$ is false, that means it is able to be proved since it is not true. However, this arrives at a contradiction as $G$ is said to be false, and proving a false statement to be true would result in the system being inconsistent. On the other hand, the trivial case is that if $G$ is true, it cannot be proven within the scope of the system. Note that this is **NOT** a paradox as $G$ is genuinely true, and we can see that from the outside, but it simply cannot be proven from within. Gödel argues that it must follow that any consistent formal system powerful enough for arithmetic^3[This matters because it allows support for the encoded statements as numbers. Simple systems that only express boolean logic are considered complete] is incomplete as there will always be true statements it cannot prove.

## The Second Incompleteness Theorem

The first incompleteness theorem killed Hilbert's dream of perfect mathematics, but Gödel wasn't done just yet. In his second published paper, Gödel started right where he left off. While the first theorem attacked completeness, the second theorem attacks consistency. As a reminder, for a system to be consistent, it cannot derive any contradictions. As a sort of corollary to the first, the second theorem says that no consistent system can prove its own consistency. If we revisit the idea of the self-referential statement $G$, we determined that $G$ is true but cannot be proved within the system. But here's the problem: to prove consistency, you need to step outside to a stronger system. And how do you prove THAT system is consistent? Well, we need a larger system to verify that one. Guess what, we'll need a larger system to verify THAT one. It's like trying to measure a ruler with itself, not possible. You need a longer ruler to verify the first one's length. But then how do you verify the longer ruler? You need an even longer one. And so on and so on. This is an infinite regress with clearly no solution. Hilbert wanted to prove mathematics rests on a consistent foundation. Gödel showed this is impossible, there is no ultimate foundation. Gödel proved that consistency cannot be proven from within a system.

## Beyond the Math

The notion that any system can not prove completeness or consistency within is a much larger and even scarier topic than its implications in mathematics.
