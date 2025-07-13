---
title: "Fractals, Power Laws, and Wall Street"
date: "07-13-2025"
preview: ""
slug: "fractals-power-laws-and-wall-street"
tags: ["Physics", "Finance"]
---

## Introduction
When I was in elementary school growing up, our Art class had a whole "unit" on Snowflakes. We were taught that each Snowflake is unique and were shown a few cool looking ones on the whiteboard. But as 3rd graders that was the extent of our interest on the matter. In turns out, however, that Snowflakes are actually pretty cool. A **fractal** is any class of complex geometric shapes that contain a *fractal dimension*. These dimensions are characterized by *self-similarity*, or the property where component parts resemble the whole. In layman terms, each part of each part, when magnified, will look like a fixed-part of the whole object. Perhaps the most famous fractal is the Mandelbrot set, discovered by Benoit Mandelbrot (more on him later): ![Mandelbrot Set](/blog-images/fractals-power-laws-and-wall-street/mandelbrotset.jpeg)
If you haven't seen this before, you should [check it out](https://www.youtube.com/watch?v=b005iHf8Z3g). It get's a little trippy, but the coolest part is that this is all math. In fact, the fractal dimension is expressed at a non-integer number. The **Snowflake Curve** is a great example of this. Consisting of three different parts, each of which is made of four different scaled-down parts of the whole, Hegle von Koch^1[Swedish mathematician known for pioneering fractal understanding] was able to derive the fractal dimension. Intuitively, we have a scaling factor of three^2[Since each broken down component if one-third of the previous whole] and after scaling we are supposed to see four repeated components: 
$$
3^D=4
$$
$$
D = \frac{\log{4}}{\log{3}}
$$
$$
D = 1.26
$$
Thus, the fractal dimension of the Snowflake Curve is 1.26^3[An interesting idea about the value of the fractal dimension is that it is an indicator of the complexity of a figure]. This is cool and all, but you may be wondering: "Does this have any real-world use or are these things just cool shapes?"
