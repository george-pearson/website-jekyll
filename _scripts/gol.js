"use strict";
$(document).ready(function(){
  var ALIVE = 1;
  var DEAD = 0;
  var N = 200;
  var arr = create2Darray(N, N, DEAD);
  var cellSize = 3;
  var canvas = document.querySelector("#myCanvas");
  canvas.width = arr.length*cellSize;
  canvas.height = arr[0].length*cellSize;
  var ctx = canvas.getContext("2d");
  var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var imageData = image.data;
  var color1 = document.querySelector("#color1");
  var color2 = document.querySelector("#color2");
  var neighbourhood = [[1, 0],[1, 1],[0, 1],[-1, 1],[-1, 0],[-1, -1],[0, -1],[1, -1]];
  initialise_acorn(arr);
  print_to_canvas(arr);
  
  $('#stop').hide();
  var requestId;
  document.querySelector("#start").addEventListener('click', () => {
    if (!requestId) {
      requestId = window.requestAnimationFrame(gameLoop);
      $('#start').hide();
      $('#stop').show();
    }
  });

  document.querySelector("#stop").addEventListener('click', () => {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
    $('#start').show();
    $('#stop').hide();
  })

  function gameLoop() {
    arr = iterate(arr);
    print_to_canvas(arr);
    requestId = window.requestAnimationFrame(gameLoop);
  }

  document.querySelector("#acorn").addEventListener('click', () => {
    arr = create2Darray(arr.length, arr[0].length, DEAD);
    initialise_acorn(arr);
    print_to_canvas(arr);
  });

  document.querySelector("#cross").addEventListener('click', () => {
    arr = create2Darray(arr.length, arr[0].length, DEAD);
    initialise_cross(arr);
    print_to_canvas(arr);
  });

  document.querySelector("#color1").addEventListener("change", () => {
    print_to_canvas(arr);
  });
  
  document.querySelector("#color2").addEventListener("change", () => {
    print_to_canvas(arr);
  });
  
  function initialise_acorn(arr){
    var cx = Math.round(arr.length / 2);
    var cy = Math.round(arr[0].length / 2);
    var acorn = [[0, 0],[-3, -1],[-2, -1],[-2, 1],[1, -1],[2, -1],[3, -1]];
    for (var i = 0; i < acorn.length; i++){
      var dx = acorn[i][0];
      var dy = acorn[i][1];
      arr[cx + dx][cy + dy] = ALIVE;
    }
  }

  function initialise_cross(arr){
    var Lx = arr.length;
    var Ly = arr[0].length;
    for (var x = 0; x < Lx; x++) {
      var y = x;
      if (y >= 0 && y < Ly) {
        arr[x][y] = ALIVE;
      }
    }
    for (var x = Lx - 1; x >= 0; x--) {
      var y = Ly - (x + 1);
      if (y >= 0 && y < Ly) {
        arr[x][y] = ALIVE;
      }
    }
  }

  // Iterate next state of arr
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

  // Get number of ALIVE neighbours for point (x,y)
  function getneighcount(arr, x, y){
    var nc = 0;
    for (var nn = 0; nn < 8; nn++){
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
  
  // Scales and prints the input array to canvas.
  function print_to_canvas(arr){
    var rgb1 = hexToRgb(color1.value);
    var rgb2 = hexToRgb(color2.value);
    for(var x=0; x < arr.length; x++){
      for(var y=0; y < arr[0].length; y++){
        var isAlive = arr[x][y] === ALIVE;
        for(var i = 0; i < cellSize; i++) {
          for(var j = 0; j < cellSize; j++) {
            var row = x * cellSize + i;
            var col = y * cellSize + j;
            var index = (row + col*arr.length*cellSize)*4
            imageData[index + 0] = isAlive ? rgb1.r : rgb2.r;
            imageData[index + 1] = isAlive ? rgb1.g : rgb2.g;
            imageData[index + 2] = isAlive ? rgb1.b : rgb2.b;
            imageData[index + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(image, 0, 0);
  }
  
  // Converts a hex color string to rgb.
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Creates a 2D array, initialised to value
  function create2Darray(w, h, value){
    var arr = []
    for(var x=0; x < w; x++){
      arr[x] = [];
    }
    for(var x=0; x < w; x++){
      for(var y=0; y<h; y++){
        arr[x][y] = value;
      }
    }
    return arr;
  }

  function clone2Darray(oldArray){
    var newArray = oldArray.map((i) => {
      return i.slice(0);
    });
    return newArray;
  }

});