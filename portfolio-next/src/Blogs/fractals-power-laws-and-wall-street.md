---
title: "Fractals, Power Laws, and Wall Street"
date: "07-13-2025"
preview: ""
slug: "fractals-power-laws-and-wall-street"
tags: ["Physics", "Finance"]
---

## Introduction
When I was in elementary school growing up, our Art class had a whole "unit" on Snowflakes. We were taught that each Snowflake is unique and were shown a few cool looking ones on the whiteboard. But as 3rd graders that was the extent of our interest on the matter. It turns out, however, that Snowflakes are actually pretty cool. A **fractal** is any class of complex geometric shapes that contain a *fractal dimension*. These dimensions are characterized by *self-similarity*, or the property where component parts resemble the whole. In layman terms, each part of each part, when magnified, will look like a fixed-part of the whole object. Perhaps the most famous fractal is the Mandelbrot set, discovered by Benoit Mandelbrot (more on him later): ![Mandelbrot Set](/blog-images/fractals-power-laws-and-wall-street/mandelbrotset.jpeg)
If you haven't seen this before, you should [check it out](https://www.youtube.com/watch?v=b005iHf8Z3g). It gets a little trippy, but the coolest part is that this is all math. In fact, the fractal dimension is expressed at a non-integer number. The **Snowflake Curve** is a great example of this. Consisting of three different parts, each of which is made of four different scaled-down parts of the whole, Hegle von Koch^1[Swedish mathematician known for pioneering fractal understanding] was able to derive the fractal dimension. Intuitively, we have a scaling factor of $\frac{1}{3}$^2[Since each broken down component if one-third of the previous whole] and after scaling we are supposed to see four repeated components: 
$$
\frac{1}{3}^D=\frac{1}{4}
$$
$$
D = \frac{\log{4}}{\log{3}}
$$
$$
D \approx 1.26
$$
Thus, the fractal dimension of the Snowflake Curve is 1.26^3[An interesting interpretation of the value of the fractal dimension is that it is an indicator of the complexity of a figure]. This is cool and all, but you may be wondering: "Does this have any real-world use or are these things just cool shapes?"

## Fractals Applied: Power Laws
To examine the true power that Fractals possess, we need to examine **power laws**. At its core, a power law is a relationship where a relative change in one quantity gives rise to a proportional relative change in another quantity. The general form of the power law equation is: $y(x) = C \cdot x^{-n}$. While it might sound and/or look simple, it does have some interesting implications. Zipf's law is one such implication, where it states that the frequency, $f$, of a word is inversely-proportional to its rank, $r$, in the frequency table^4[Or how many times it is used compared to all of the other words in the language]. So let's say the most common word is used $10,000$ times in a given instance, here is what we can derive based on power laws:
$$
f(2) = \frac{10000}{2^1}
$$
$$
f(3) = \frac{10000}{3^1}
$$
So, the second-most frequent word appears $5,000$ times, the third-most frequent word appears $3,333$ times, and so on. This is cool and all, but we still don't know what the exponent term really means. In the example of above it is just 1, which seems inconsequential. Here is what is interesting: the exponent actually reveals a lot of information about the underlying structure of the system. Different exponents tell us about the scaling behavior, or how the system responds when we change the scale of measurement. Whether it is city populations, earthquake frequencies, or stock market movements, the same power law relationship appears across completely unrelated phenomena. When dealing with fractal structures in particular, we can construct a **unified equation** that combines fractals and power laws. This process lies in the log-log relationship of the general power law equation.
$$
\log{y(x)} = -n \log{x}
$$
Through this transformation, we can plot the data and see the scaling behavior as a straight line, where the slope directly gives us the scaling exponent. As a corollary, this reveals that power laws possess **scale invariance**, or the fact that the same patterns repeat at different scales. When we express this relationship as a self-similar function $A(x)$^5[A(x) here is not necessarily a fractal, but a function that describes some property of a fractal]
$$
A(\lambda x) = \lambda^s A(x)
$$
This is known as the **scaling equation**, where $\lambda$ is a constant factor and $s$ is the scaling component. When analyzing fractal structures with this framework, the scaling component becomes the fractal dimension, directly linking the geometric properties of fractals with its mathematical scaling behavior. The connection arises because both the scaling component and the fractal dimension represent the same thing: how the content of a structure scale when we change our measurement scale.

## From Theory to Reality
