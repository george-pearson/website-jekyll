"use strict";
$(document).ready(function(){
  var ALIVE = 1;
  var DEAD = 0;
  var N = 250;
  var arr = create2Darray(N, N, DEAD);
  var canvas = document.querySelector("#myCanvas");
  canvas.width = arr.length;
  canvas.height = arr[0].length;
  var ctx = canvas.getContext("2d");
  initialise_cross(arr);
  print_to_canvas(arr);
  
  var requestId;
  document.querySelector("#start-stop").addEventListener('click', () => {
    if (!requestId) {
      requestId = window.requestAnimationFrame(gameLoop);
    }
    else {
      window.cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  });

  function gameLoop() {
    arr = iterate(arr);
    print_to_canvas(arr);
    requestId = window.requestAnimationFrame(gameLoop);
  }

  document.querySelector("#acorn").addEventListener('click', () => {
    arr = create2Darray(arr.length,arr[0].length, DEAD);
    initialise_acorn(arr);
    print_to_canvas(arr);
  });

  document.querySelector("#cross").addEventListener('click', () => {
    arr = create2Darray(arr.length,arr[0].length, DEAD);
    initialise_cross(arr);
    print_to_canvas(arr);
  });
  
  function initialise_acorn(arr){
    var Lx = arr.length;
    var Ly = arr[0].length;
    var acorn = [[0, 0],[-3, -1],[-2, -1],[-2, 1],[1, -1],[2, -1],[3, -1]];
    for (var i = 0; i < acorn.length; i++){
      var dx = acorn[i][0];
      var dy = acorn[i][1];
      arr[Lx/2 + dx][Ly/2 + dy] = ALIVE;
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
      var y = Ly - x;
      if (y >= 0 && y < Ly) {
        arr[x][y] = ALIVE;
      }
    }
}

  // Iterate next state of arr
  function iterate(oldArray){
    var Lx = oldArray.length;
    var Ly = oldArray[0].length;
    var newArray = create2Darray(Lx, Ly, DEAD);
    for(var x = 0; x < oldArray.length; x++){
      for(var y = 0; y < oldArray[0].length; y++){
        if(oldArray[x][y] === ALIVE){
          if (getneighcount(oldArray, x, y) < 2){
            newArray[x][y] = DEAD; // Underpopulation kills cell.
          }
          else if (getneighcount(oldArray, x, y) === 2 || getneighcount(oldArray, x, y) === 3){
            newArray[x][y] = ALIVE; // Surivies!
          }
          else if (getneighcount(oldArray, x, y) > 3){
            newArray[x][y] = DEAD; // Overpopulation kills cell.
          }
        }
        else if(arr[x][y] === DEAD){
          if(getneighcount(oldArray, x, y) === 3)
          {
            newArray[x][y] = ALIVE; // Reproduction.
          }
        }
      }
    }
    return newArray;
  }

  function print_to_canvas(arr){
    var myImageData = ctx.getImageData(0,0,arr.length, arr[0].length);
    for(var x=0; x < arr.length; x++){
      for(var y=0; y < arr[0].length; y++){
        var index = (x+y*arr.length)*4
        if(arr[x][y] === DEAD){
          myImageData.data[index+0] = 0; //r
          myImageData.data[index+1] = 0; // g
          myImageData.data[index+2] = 0; //b
          myImageData.data[index+3] = 255; //a
        }
        if(arr[x][y] === ALIVE){
          myImageData.data[index+0] = 0; //r
          myImageData.data[index+1] = 255; // g
          myImageData.data[index+2] = 0; //b
          myImageData.data[index+3] = 255; //a
        }
      }
    }
    ctx.putImageData(myImageData, 0, 0);
  }

  // Get number of ALIVE neighbours for point (x,y)
  function getneighcount(arr, x, y){
    var neighbourhood = [[1, 0],[1, 1],[0, 1],[-1, 1],[-1, 0],[-1, -1],[0, -1],[1, -1]];
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

});