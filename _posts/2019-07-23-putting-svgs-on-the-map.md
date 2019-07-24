---
layout: post
title:  "Putting SVGs On The Map"
subtitle: "Packing circles in a map of the UK and Ireland using Javascript."
imageSrc: "/assets/images/uk_and_ireland_circles.png"
---

In the <a class="blue-link" href="{% post_url 2019-06-17-circles-everywhere %}">previous blog post</a> I showed how to generate Scalable Vector Graphics (SVGs) of small circles packed inside a larger circle using JavaScript. In today's post I'm packing circles inside a map of the UK and Ireland.

The first thing we will need is a black and white map of the UK and Ireland. This is surprisingly difficult to find online, but after some intense search engine work I was able to get one:

<figure style="justify-self: center;">
    <img id="uk_and_ireland" style="width:100%;" src="/assets/images/uk_and_ireland.png" />
</figure>

A black and white image allows us to easily check whether a pixel in the image is land (black) or sea (white), using its RGB(Red, Green, Blue) values. White, RGB(255, 255, 255), pixels will have an average RGB of 255 whereas black, RGB(0, 0, 0), pixels will have an average RGB of 0.

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

function placeCircle(circles, radius, imageData, circleColours, LX, LY){
    //The guard number: if we don't place a circle within this number of trials, we give up.
    let guard = 500;
    while(guard > 0){
        // Pick a random position on the image.
        const cx = randomIntFromInterval(0, LX-1);
        const cy = randomIntFromInterval(0, LY-1);
        const index = (cx + cy*LX)*4;
        const red = imageData[index + 0];
        const green = imageData[index + 1];
        const blue = imageData[index + 2];
        const average = (red + green + blue) / 3;
        if(average < 255/2 && !circles.some((existingCircle) => overlapWith(cx, cy, radius, existingCircle.cx, existingCircle.cy, existingCircle.r))){
          const circle = {'cx': cx, 'cy': cy, 'r': radius, 'colour': circleColours[randomIntFromInterval(0,3)]};
          circles.push(circle);
          return;
        }
        guard -= 1;
    }
  }
```
We can use the half way point between 0 and 255 (128) to determine if a pixel is black or white. If the pixel is black and the circle doesn't overlap with any of the others then we place it otherwise we find a different location on the image.

The finished result (with 3000 circle place attempts!) looks pretty good:

<figure style="justify-self: center;">
    <img id="uk_and_ireland_circles" style="width:100%;" src="/assets/images/uk_and_ireland_circles.png">
</figure>

Here's a smaller interactive version, so you can make your own:
<div style="overflow-x: scroll;">
    <img id="uk_and_ireland_small" style="display:block;" src="/assets/images/uk_and_ireland_small.png" />
    <canvas id="myCanvas" style="display:none;"></canvas>
<div>
<div style="padding:1em 0 1em 0;">
    <label for="rmin">Min radius:</label>
    <input id="rmin" type="range" step="0.25" min="2" max="5" value="2"/>
    <span style="padding-left:0.5em;" id="rminValueDisplay"></span>
</div>
<div style="padding:1em 0 1em 0;">
    <label for="rmax">Max radius:</label>
    <input id="rmax" type="range" step="0.25" min="5" max="8" value="8"/>
    <span style="padding-left:0.5em;" id="rmaxValueDisplay"></span>
</div>
<div style="padding-bottom:1em;">
    <input id="colour1" type="color" value="#993300" class="form-control"/>
    <input id="colour2" type="color" value="#a5c916" class="form-control"/>
    <input id="colour3" type="color" value="#00AA66" class="form-control"/>
    <input id="colour4" type="color" value="#FF9900" class="form-control"/>
    <button id="btnRun" class="button">Run</button>
</div>

As always all of the code is available on my <a href="https://github.com/george-pearson" class="blue-link">GitHub</a>.

<script src="/assets/scripts/circles-in-a-map.worker.min.js"></script>
<script src="/assets/scripts/circles-in-a-map.min.js"></script>