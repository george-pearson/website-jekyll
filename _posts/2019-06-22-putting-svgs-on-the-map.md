---
layout: post
title:  "Putting SVGs On The Map!"
subtitle: "Packing circles in a map using Javascript"
---

In the <a class="blue-link" href="{% post_url 2019-06-17-circles-everywhere %}">previous blog post</a> I showed how to generate Scalable Vector Graphics (SVGs) of small circles packed inside a larger circle using JavaScript. In todays post I'm packing circles inside a map of the UK and Ireland.

The first thing we will need is a black and white map of the UK and Ireland. This is suprisingly difficult to find online, but after some intense search engine work I was able to get one:

<figure style="justify-self: center;">
    <img id="uk_and_ireland" src="/assets/images/uk_and_ireland.png" />
</figure>

A black and white image is best, this allows us to easily check if a pixcel in the image is land (black) or sea (white).

The majority of the code is much the same as <a class="blue-link" href="{% post_url 2019-06-17-circles-everywhere %}">before</a>, we just need to change how the circles are placed:

```javascript
const image = document.querySelector("#uk_and_ireland");
const LX = image.width;
const LY = image.height;
const canvas = figure.querySelector("canvas");
canvas.width = LX;
canvas.height = LY;
const ctx = canvas.getContext("2d");
ctx.drawImage(image, 0, 0);
const imageData = (ctx.getImageData(0, 0, LX, LY)).data;

function placeCircle(circles, radius, imageData, circleColours){
    //The guard number: if we don't place a circle within this number of trials, we give up.
    let guard = 500;
    while(guard > 0){
        // Pick a random position on the image.
        const cx = randomIntFromInterval(0, LX-1);
        const cy = randomIntFromInterval(0, LY-1);
        const index = (cx+cy*LX)*4;
        const red = imageData[index + 0];
        const green = imageData[index + 1];
        const blue = imageData[index + 2];
        const average = (red + green + blue) / 3;
        if(average < 255/2 && !circles.some((existingCircle) => overlapWith(cx, cy, radius, existingCircle.cx, existingCircle.cy, existingCircle.r))){
            const circle = {'cx': cx,'cy': cy, 'r':radius, 'colour':circleColours[randomIntFromInterval(0,3)]};
            circles.push(circle);
            return;
        }
        guard -= 1;
    }
  }
```
White, RGB(255, 255, 255), pixcels will have an average RGB (Red, Green Blue) of around 255 depending on the shade; whereas black, RGB(0, 0, 0), pixcels will have an average RGB of around 0. We can therefore use the half way point between 0 and 255 (128) to determine if a pixcel is black or white. If the pixcel is black and the circle doesn't overlap with any of the others then we place it otherwise we find a different location on the image.

Here's the finished result:

<figure id="fig-circles" style="justify-self: center;">
    <img id="uk_and_ireland_circles" src="/assets/images/uk_and_ireland_circles.png" />
    <canvas style="display:None" id="myCanvas"></canvas>
    <div style="padding:1em 0 1em 0;">
        <label for="rmin">Min radius:</label>
        <input id="rmin" type="range" step="1" min="1" max="5" value="2"/>
        <span style="padding:0 1em 0 1em;" id="rminValueDisplay">2</span>
        <label for="rmax">Max radius:</label>
        <input id="rmax" type="range" step="1" min="5" max="8" value="6"/>
        <span style="padding:0 1em 0 1em;" id="rmaxValueDisplay">6</span>
    </div>
    <div>
        <input id="colour1" type="color" value="#993300" class="form-control"/>
        <input id="colour2" type="color" value="#a5c916" class="form-control"/>
        <input id="colour3" type="color" value="#00AA66" class="form-control"/>
        <input id="colour4" type="color" value="#FF9900" class="form-control"/>
        <button class="button">Reload</button>
    </div>
</figure>

As always all of the code is available on my <a href="https://github.com/george-pearson" class="blue-link">GitHub</a>. 

<script src="/assets/scripts/circles-in-a-map.min.js"></script>