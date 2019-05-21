---
layout: post
title:  "The Game Of Life"
subtitle: "A post about Conway's Game Of Life, and some JavaScript code to simulate it."
---

<a class="blue-link" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">The Game of Life</a> is a <a class="blue-link" href="https://en.wikipedia.org/wiki/Cellular_automaton">cellular automataton</a> designed by the British mathematician <a class="blue-link" href="https://en.wikipedia.org/wiki/John_Horton_Conway">John Conway</a>. A cellular automataton is a mathematical model that consists of a grid of cells, with each cell having an finite number of states (e.g "on" or "off"). A new grid configuration (a new *generation*) is created according to a fixed set of rules that determine the state of each cell based on its current state and the state of the cells around it (its *neighbourhood*). Cellular automata can be used to simulate a variety of real-world systems, from the <a class="blue-link" href="https://en.wikipedia.org/wiki/Belousov%E2%80%93Zhabotinsky_reaction">Belousov–Zhabotinsky reaction</a> to <a class="blue-link" href="https://blogs.msdn.microsoft.com/calvin_hsia/2014/09/30/fish-vs-sharks-predator-prey-simulation/">predator prey relationships</a>.

In Conway's Game of Life, the grid is a 2D array of square cells each with two states *alive* and *dead*. Each cell interacts with its 8 neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent to it. The rules are:

* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

We can get the number of alive neighbours of a cell in 2D array with the code below. Note we are applying <a href="https://en.wikipedia.org/wiki/Periodic_boundary_conditions" class="blue-link">periodic boundary conditions</a> in both the x and y directions.

```javascript
var ALIVE = 1;
var DEAD = 0;
var N = 200;
var arr = create2Darray(N, N, DEAD); // Iitialises a new 2D array with array values set to 0.
var neighbourhood = [[1, 0],[1, 1],[0, 1],[-1, 1],[-1, 0],[-1, -1],[0, -1],[1, -1]];

// Get number of ALIVE neighbours for point (x,y)
function getneighcount(arr, x, y){
  var nc = 0;
  for (var nn = 0; nn < neighbourhood.length; nn++){
    var dx = neighbourhood[nn][0];
    var dy = neighbourhood[nn][1];
    if (arr[pbcz(x + dx, arr.length)][pbcz(y + dy, arr[x].length)] === ALIVE){
      nc++;
    }
  }
  return nc;
}

// Periodic boundary conditions in z-direction:
function pbcz(iz, Lz){
  if (iz >= Lz){
    iz = iz - Lz;
  }
  if (iz < 0){
    iz = iz + Lz;
  }
  return iz;
}
```

Then we can just turn the Game of Life rules into some simple JavaScript code:

```javascript
var ALIVE = 1;
var DEAD = 0;
var N = 200;
var arr = create2Darray(N, N, DEAD); // Iitialises a new 2D array with array values set to 0.
var requestId;
gameLoop();

// Runs forever, call window.cancelAnimationFrame(requestId) to stop.
function gameLoop() {
  arr = iterate(arr);
  print_to_canvas(arr);
  requestId = window.requestAnimationFrame(gameLoop);
}

// Iterate the next state of the array.
function iterate(oldArray){
  var newArray = clone2Darray(oldArray);
  for(var x = 0; x < oldArray.length; x++){
    for(var y = 0; y < oldArray[0].length; y++){
      var aliveNeighbourCount = getneighcount(oldArray, x, y);
      if(oldArray[x][y] === ALIVE){
        if (aliveNeighbourCount < 2){
          newArray[x][y] = DEAD; // Underpopulation kills cell.
        }
        else if (aliveNeighbourCount === 2 || aliveNeighbourCount === 3){
          newArray[x][y] = ALIVE; // Surivies!
        }
        else if (aliveNeighbourCount > 3){
          newArray[x][y] = DEAD; // Overpopulation kills cell.
        }
      }
      else if(oldArray[x][y] === DEAD && aliveNeighbourCount === 3){
        newArray[x][y] = ALIVE; // Reproduction.
      }
    }
  }
  return newArray;
}
```

I've packaged the Game of Life code up into interactive tool below.

<div style="overflow-x: scroll;">
    <canvas id="myCanvas"></canvas>
</div>
<div>
    <input id="color1" type="color" value="#00ff00" class="form-control"/>
    <input id="color2" type="color" value="#000000" class="form-control"/>
    <button aria-label="start" id="start" class="button"><i class="fas fa-play"></i></button>
    <button aria-label="stop" id="stop" class="button"><i class="fas fa-pause"></i></button>
    <button id="cross" class="button">Cross</button>
    <button id="acorn" class="button">Acorn</button>
</div>

The full code for this tool is available on my <a href="https://github.com/george-pearson" class="blue-link">GitHub</a>. In the future I'm going to work on a even more interactive version (with free drawing) - so if you like this one stay tuned!

<script src="/assets/scripts/gol.min.js"></script>