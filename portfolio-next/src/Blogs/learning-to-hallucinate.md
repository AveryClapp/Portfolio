---
title: "Learning to Hallucinate"
date: "09-12-2025"
preview: "A brief overview of an OpenAI-led research paper on why LLMs hallucinate"
slug: "learning-to-hallucinate"
tags: ["Technical"]
subtopics: ["AI/ML", "Research"]
---

## How many 'R's in Strawberry?

Have you ever asked an LLM a relatively simple question and received some bogus response that clearly isn't true? Just today, I was working around with a CUDA [kernel tuner](https://github.com/KernelTuner/kernel_tuner) for my research project. Of course, my first thought was to get Claude to fully integrate it into my system in a way that I could easily benchmark and tune the targeted kernel. However, after trying over and over again and seeing Claude flip back and forth from one incorrect "thought-process" to another, it was time to get in and do it manually. But, this interaction had me wondering: why does Claude always think it has found the right approach to a problem when most of the time it just isn't accurate? Well, this is known as a **hallucination**.

Formally, hallucination, at least in the context of large language models, is defined as the confident generation of factually incorrect, ungrounded, or fabricated information that appears linguistically fluent and plausible. Perhaps the most well-known example of this is the simple prompt: "How many 'R's are in the word STRAWBERRY?". Nowadays, you will most likely get the correct answer, but older models were [notoriously unreliable](https://www.linkedin.com/pulse/limits-challenges-llms-how-many-rs-word-strawberry-mo-pcmee/) when answering this simple question. All of this begs the question: given the underlying statistics and algebra that these models rely on, what is the math behind hallucinations, and how can they be corrected? To answer this, we'll do a deep dive into a [research paper](https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf) published by OpenAI scientists just a few days ago.

## Why Base Models Can't Be Perfect: Pre-Training

In general, LLMs go through two main cycles: pre and post training. pre-training is the process of building the _base_ of the model by feeding in training data. What this really means is that it generates a probability distribution $\hat{p}$, or simply a probability distribution over the input data. Thus, errors are just a statistical property when it comes to language models. Theoretically, a model with a density $\hat{p} = {p}$^1[The density distribution matches exactly the true distribution] would be errorless. However, this is not a feasible solution as it would require the model to be pretrained on every theoretical interaction it could ever have.

By now, it should be clear that expecting a certain level of error in language models is reasonable. To illustrate even further, the paper explores this idea of an "Is-It-Valid" (IIV) reduction, where the model is treated as a binary classifier. In the context of this, a binary classifier simply means that models will classify statements as either true or false. The core insight that is derived with this is simple: if the model can't reliably distinguish valid outputs from plausible errors in a classification setting, then generating the outputs will be even harder. Expressed as an inequality:

$$
\text{Generation Error Rate} \geq 2 * \text{Classification Error Rate}
$$

Where does this $2$ come from? Well to figure that out we need to go deeper into the IIV reduction math, so if you trust me (or the OpenAI team) and want to skip this part, go ahead. Essentially, the authors generalize the idea of an IIV reduction to any sort of model, not just one that perform binary classification. Suppose you have a set $\mathcal{E}$ that contains errors and a set $\mathcal{V}$ that contains valid data. Then, assuming we have a distribution $D(x)$ that consists of a 50/50 mix between elements in $\mathcal{E}$ drawn randomly from a uniform distribution^2[This is important for the next step], and $\mathcal{V}$, we can derive the lower bound of the error rate: $\hat{p}(x)$. Let $\hat{f}(x)$ be the expected result given an input, it will be $+$ if the probability of observing that $x$ is above a threshold, and $-$ is the probability of observing that $x$ is at or below the threshold. Formally, using a threshold of $\frac{1}{|\mathcal{E}|}$:

$$
\hat{f}(x) := \begin{cases}
+ & \text{if } \hat{p}(x) > \frac{1}{|\mathcal{E}|} \\
- & \text{if } \hat{p}(x) \leq \frac{1}{|\mathcal{E}|}
\end{cases}
$$

Since we've established that the distribution contains 50% errors drawn uniformly from $\mathcal{E}$, then the probability that any given error is in distribution $D$ is $\frac{1}{2|\mathcal{E}|}$^3[$\frac{1}{2} * \frac{1}{|\mathcal{E}|}$]. And... since $\hat{p}(x) > \frac{1}{|\mathcal{E}|}$, we finally derive 2:

$$
\frac{\text{Generation contribution}}{\text{Classification contribution}} = \frac{\hat{p}(x)}{\frac{1}{2|\mathcal{E}|}} = 2|\mathcal{E}| \cdot \hat{p}(x) > 2|\mathcal{E}| \cdot \frac{1}{|\mathcal{E}|} = 2
$$

After all of this seemingly over-complicated math, we get back to our generalization previously established, that the rate of generating an error is at least two times as much as the rate of classifying an error. This notion extends past the base model into stages where contexts and prompts become involved^4[They prove this separately, but as the result does not differ and the proof is relatively similar, I've decided to forego a discussion on this]

It seems that, in the context of pre-training, the most important factor to look at are the statistical factors that propagate misclassifications. The most intuitive cause for misclassifications presents itself in the form of arbitrary facts, which the paper defines as a prompt that responds with either the fact or "IDK". A birthday is a great example of this, because there is no pattern to predict a person's birthday, the model would either need it in the training data or would get it correct randomly. The paper proves that the "singleton rate", the percentage of facts appearing exactly once in training, provides a mathematical lower bound on hallucination rates for that category of facts.

On the other hand, there are also just cases of bad models. Since the mainstream LLMs nowadays certainly would not be classified as bad; the gist of this section is that some models just can't represent the concept well. For example, if you were to ask a tokenizing model: "How many Ds in Deepseek?", it would first tokenize the word as: $\text{D/EEP/SEE/K}$, which is by no means the best way of going about this problem.

## Accentuating The Problem: Post-Training

Everything that happens after pre-training is, you guessed it: post-training. During this phase, the general goal is to refine the model in terms of accuracy. Something that I've neglected to discuss up to this point is the standard on how models are evaluated to determine accuracy. The industry-standard approach is known as binary evaluations. Sort of similar to the IIV process above, binary evaluations judge a model based on right-wrong decisions. However, the nature of these tests inherently bias the model towards making assumptions, unfounded guesses, and snowballed overconfidence. This stems from the fact that abstaining from a question that is not known is strategically sub-optimal, as the model would always be better off at least guessing the answer at an arbitrary positive success rate. Clearly then, binary classification must in itself be contributing to the hallucination problem as it encourages models to become overconfident in their best or even random guess.

While binary evaluations may be a new term to you, if you've ever seen a fear-mongering LinkedIn post, then you might be familiar with benchmarks like [Humanity's Last Exam](https://agi.safe.ai/) or [SWE Bench](https://www.swebench.com/). Benchmarks are essentially abstracted binary evaluations that target a specific type of problem. SWE Bench, for example, performs binary evaluation on software engineering related prompts. There are also generalized benchmarks like Humanity's Last Exam that provide evaluations on a wide array of various subjects^5[Humanity's Last Exam has questions ranging from Roman inscription translation to the anatomy of a hummingbird]. Regardless of the topic though, these are all just advanced binary evaluations.

So, if our methods of analyzing LLMs is fundamentally flawed, what are the logical ways of correcting this? Well, it's clear that creators of these popular benchmarks would want to devise a mechanism to penalize overconfidence and reward abstaining when the answer is not clear. The paper presents a potential solution in the inclusion of confidence thresholds within the prompt. Generally, this could look something like adding into a prompt: "Answer only if you are > t confident. Mistakes will be penalized $\frac{t}{(1-t)}$ points", where $t$ is the threshold confidence level of a model. This is a simple and straightforward approach but certainly an improvement on the status quo. Although there is no doubt that top AI labs are dumping resources into new models; additional research in how these LLMs actually get evaluated would certainly be beneficial.

## Quick Recap

I typically tend to forego a conclusion on my posts, partly because I'm lazy, and partly because by the time I get to the end, my interest in the topic is satisfied for the time being. However, given the intensely technical nature of this paper, I wanted to quickly tie the main points together. In pre-training, base models face unavoidable errors in classification as they can simply not be trained on enough data to guarantee perfection. Errors in classification will naturally lead to errors in generation from prompts, which we derived in the first section. On the other side of things, post-training yields its own problems. The binary nature of industry-standard evaluations and benchmarks propels models to guess and exude overconfidence, both traits that lead to longer term problems in hallucinations. I had a fun time reading through this paper and grappling with the logic and math behind it. Hopefully it is somewhat digestible, but as I've said before, there is no substitute for reading the [actual content](https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf).
