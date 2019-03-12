"use strict";
$(document).ready(function(){
  var canvas = document.querySelector("#myCanvas");
  var ctx = canvas.getContext("2d");
  var ALIVE = 1;
  var DEAD = 0;
  var N = 250;
  var arr = create2Darray(N, N);
  print_to_canvas(arr);
  
  //Iterate next state of myArray:
  function iterate(){
    var myNewArray = create2Darray(canvasWidth,canvasHeight);
    for(var x=0; x < canvasWidth; x++){
      for(var y=0; y < canvasHeight; y++){
        if(myArray[x][y] === ALIVE){
          if (getneighcount(myArray, x, y) < 2){
            myNewArray[x][y] = DEAD; //underpopulation kills cell.
          }
          else if (getneighcount(myArray, x, y) === 2 || getneighcount(myArray, x, y) === 3){
            myNewArray[x][y] = ALIVE; // surivies!
          }
          else if (getneighcount(myArray, x, y)>3){
            myNewArray[x][y] = DEAD; //overpopulation kills cell.
          }
        }
        else if(myArray[x][y] === DEAD){
          if(getneighcount(myArray, x, y) == 3)
          {
            myNewArray[x][y] = ALIVE; //reproduction.
          }
        }
      }
    }
    return myNewArray;
  }
  
  //Get number of ALIVE neighbours of point (x,y): 
  function getneighcount(myArray,x,y){
    var neighbourhood = [[1, 0],[1, 1],[0, 1],[-1, 1],[-1, 0],[-1, -1],[0, -1],[1, -1]];
    var nc = 0;
    for (var nn = 0; nn < 8; nn++){
      var dx = neighbourhood[nn][0];
      var dy = neighbourhood[nn][1];
      if (myArray[pbcx(x + dx)][pbcy(y + dy)] === ALIVE){
        nc++;
      }
    }
    return nc;
  }
  
  //Periodic boundary conditions in x-direction:
  function pbcx(ix){
    if (ix >= canvasWidth){
      ix = ix - canvasWidth;
    }
    if (ix < 0){
      ix = ix + canvasWidth;
    }
    return ix;
  }
  
  //Periodic boundary conditions in y-direction:
  function pbcy(iy){
    if (iy >= canvasHeight){
      iy = iy - canvasHeight;
    }
    if (iy < 0){
      iy = iy + canvasHeight;
    }
      return iy;
  }
  
  //Print array to screen:
  function print_to_canvas(arr){
    var canvas = $("#myCanvas")[0];
    var ctx = canvas.getContext("2d");
    var myImageData = ctx.getImageData(0,0, arr.length, arr.length);
    var rgb = hexToRgb($("#color1").val());
    for(var x = 0; x < arr.length; x++){
      for(var y = 0; y < arr.length; y++){
        var index = (x+y*arr.length)*4
        myImageData.data[index+0] = rgb.r*arr[x][y]; // r
        myImageData.data[index+1] = rgb.g*arr[x][y]; // g
        myImageData.data[index+2] = rgb.b*arr[x][y]; //b
        myImageData.data[index+3] = 255*arr[x][y] //a
      }
    }
    ctx.canvas.width = arr.length;
    ctx.canvas.height = arr.length;
    ctx.putImageData(myImageData, 0, 0);
    
    var imgUrl = canvasToImage(canvas, $("#color2").val());
    $("#divImg").empty();
    $("#divImg").append("<img src='"+imgUrl+"'>");
  }
  
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  function create2Darray(w,h){
    var arr = []
    for(var x = 0; x < w; x++){
      arr[x] = [];
    }
    for(var x = 0; x < w; x++){
      for(var y = 0; y < h; y++){
        arr[x][y] = 0;
      }
    }
    return arr;
  }
  
  // http://www.mikechambers.com/blog/2011/01/31/setting-the-background-color-when-generating-images-from-canvas-todataurl/
  function canvasToImage(canvas, backgroundColor)
  {
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var data;
    if(backgroundColor)
    {
      data = ctx.getImageData(0, 0, w, h);
      var compositeOperation = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0,0,w,h);
    }
    var imageData = canvas.toDataURL("image/jpeg");
    if(backgroundColor){
      ctx.clearRect (0,0,w,h);
      ctx.putImageData(data, 0,0);    
      ctx.globalCompositeOperation = compositeOperation;
    }
    return imageData;
  }
});