---
layout: post
title:  "The Game Of Life"
subtitle: "A post about Conway's Game Of Life"
date:   2019-03-12 11:00:00 +0000
---

<a class="blue-link" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">The Game of Life</a> is a <a class="blue-link" href="https://en.wikipedia.org/wiki/Cellular_automaton">cellular automataton</a> designed by the British mathematician <a class="blue-link" href="https://en.wikipedia.org/wiki/John_Horton_Conway">John Conway</a>. A cellular automataton is a mathematical model that consists of a grid of cells, with each cell having an finite number of states (e.g "on" or "off"). A new grid configuration (a new *generation*) is created according to a fixed set of rules that determine the state of each cell based on it's current state the state of the cells around it (its *neighbourhood*). Cellular automata can be used to simulate a variety of real-world systems, from the <a class="blue-link" href="https://en.wikipedia.org/wiki/Belousov%E2%80%93Zhabotinsky_reaction">Belousov–Zhabotinsky reaction</a> to <a class="blue-link" href="https://blogs.msdn.microsoft.com/calvin_hsia/2014/09/30/fish-vs-sharks-predator-prey-simulation/">predator prey relationships</a>.

In Conway's Game of Life, the grid is a 2d array of square cells each with two states *alive* and *dead*. Each cell interacts with its 8 neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent to it. The rules are:

* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Here's some javascript code simulating the Game of Life:

<canvas id="myCanvas" style="display: none;"></canvas>
<div id="divImg" style="overflow-x: scroll;"></div>
<div style="margin-top:1em;">
    <input id="color1" type="color" value="#00ff00" class="form-control"/>
    <input id="color2" type="color" value="#000000" class="form-control"/>
    <a aria-label="start" id="start" class="button"><i class="fas fa-play"></i></a><a aria-label="stop" id="stop" class="button"><i class="fas fa-pause"></i></a>
    <a id="cross" class="button">Cross</a>
    <a id="acorn" class="button">Acorn</a>
</div>