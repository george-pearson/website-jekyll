---
layout: post
title:  "Diamond-square Algorithm Cloud Images"
subtitle: "I show off some JavaScript code to make cool cloud images using the Diamond-square algorithm."
imageSrc: "/assets/images/cloudImage.jpg"
---

The <a href="https://en.wikipedia.org/wiki/Diamond-square_algorithm" class="blue-link">Diamond-square algorithm (DSA)</a> is a popular method used to generate realistic <a href="https://en.wikipedia.org/wiki/Heightmap" class="blue-link">heightmaps</a> which resemble clouds, terrain and/or plasma. The JavaScript code below can be used to generate square cloud images of size <code class="highlighter-rouge">N = 2<sup>n</sup> + 1</code>. The images make great unique backgrounds (I have one on my phone!) and look rather pretty in my opinion.

```javascript
var n = 9;
var N = Math.pow(2, n) + 1;
var arr;

function runDSA(N){
    // Initialise the array with random numbers at its corners
    arr = create2Darray(N,N);
    arr[0][0] = 2*Math.random()-1;
    arr[0][N-1] = 2*Math.random()-1;
    arr[N-1][0] = 2*Math.random()-1;
    arr[N-1][N-1] = 2*Math.random()-1;
    
    var side = N-1;
    var nSq = 1; // Number of Squares.
    var f = 1.0; // f scales the random numbers at each stage of the algorithm
    while(side > 1){
        var sideo2 = Math.round(side / 2);
        var x0,x1,y0,y1,xc,yc,tot,ntot,dx,dy,xs,ys;
        var diff = [[-1,0],[1,0],[0,-1],[0,1]];
        // Diamond step:
        for(var ix = 0; ix < nSq; ix++){
            for(var iy = 0; iy < nSq; iy++){
                x0 = ix*side;
                x1 = (ix+1)*side;
                y0 = iy*side;
                y1 = (iy+1)*side;
                xc = x0+sideo2;
                yc = y0+sideo2;
                // Set this pixel to the mean of its "diamond" neighbours plus
                // a random offset.
                arr[xc][yc] = (arr[y0][x0]+arr[y0][x1]+arr[y1][x0]+arr[y1][x1])/4;
                arr[xc][yc] += f*(2*Math.random()-1);
            }
        }
        
        //Square step:
        for(var ix = 0; ix < 2*nSq+1; ix++){
            xc = sideo2*ix;
            for(var iy = 0; iy < 2*nSq+1; iy++){
                yc = side*iy + sideo2*(1 - ix % 2);
                if(!(xc < N && xc > 0 && yc < N && yc > 0)){
                    continue;
                }
                tot = 0.0;
                ntot = 0;
                // Set this pixel to the mean of its "square" neighbours plus
                // a random offset. At the edges, it has only three neighbours.
                for(var ii = 0; ii < diff.length; ii++){
                    dx = diff[ii][0];
                    dy = diff[ii][1];
                    xs = xc + dx*sideo2;
                    ys = yc + dy*sideo2;
                    if(!(xs < N && xs > 0 && ys < N && ys > 0)){
                        continue;
                    }
                    else{
                        tot += arr[xs][ys];
                        ntot += 1;
                    }
                }
                arr[xc][yc] += tot / ntot + f*(2*Math.random()-1);
            }
        }
        side = sideo2;
        nSq = nSq*2;
        f = f/2;
    }
    return arr;
}
```

I've packaged the DSA code up into a easy to use tool with colour selectors below. This code:

1. Runs the DSA, for `n = 9`.
2. Scales the range from `[-1, +1]` to `[0, +1]`.
3. Creates a hidden <a href="https://www.w3schools.com/graphics/canvas_intro.asp" class="blue-link">Canvas</a> of size <code class="highlighter-rouge">2<sup>n</sup> + 1</code>. 
4. Adds pixels to the Canvas with <a href="https://en.wikipedia.org/wiki/RGBA_color_space" class="blue-link">RGBA</a> values scaled by the DSA output.
5. Converts the canvas to an image and displays it on the screen.

Just hit "Reload" below and you'll have your very own cloud image!

<canvas id="myCanvas" style="display: none;"></canvas>
<div id="divImg" style="overflow-x: scroll;"><img src='/assets/images/cloudImage.jpg'></div>
<div>
    <input id="color1" type="color" value="#3c69ff" class="form-control"/>
    <input id="color2" type="color" value="#ffffff" class="form-control"/>
    <button id="reload" class="button">Reload</button>
</div>

The full code for this is available on my <a href="https://github.com/george-pearson" class="blue-link">GitHub</a>. If you want a bigger image just increase `n`. Please bear in mind I've found `n > 11` tends to give my laptop a hard time and I haven't tested this on mobile so be careful (wouldn't want your browser to crash!).

<script src="/assets/scripts/cloud.min.js"></script>