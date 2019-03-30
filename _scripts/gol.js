"use strict";
$(document).ready(function(){
  var ALIVE = 1;
  var DEAD = 0;
  var N = 250;
  var canvas = document.querySelector("#myCanvas");
  canvas.width = N;
  canvas.height = N;
  var ctx = canvas.getContext("2d");
  var arr = create2Darray(N, N);
  initialise_cross(arr);
  
  print_to_canvas(arr);
	
	//Buttons:
	var intervalID;
	$("#start").click(function(){
		intervalID = setInterval(rungame, 20);
		//update 50 times a second.
	});
	$("#stop").click(function(){
		clearInterval(intervalID);
	});
	$("#reload").click(function(){
    arr = create2Darray(arr.length,arr[0].length);
    initialise_cross(arr);
		print_to_canvas(arr);
	});
	$("#acorn").click(function(){
		arr = create2Darray(arr.length,arr[0].length);
		initialise_acorn();
		print_to_canvas(arr);
	});
	$("#cross").click(function(){
		arr = create2Darray(arr.length,arr[0].length);
		initialise_cross();
		print_to_canvas(arr);
	});
	
	//Run game:
	function rungame(){
		arr = iterate();
		print_to_canvas(arr);
	}
	
	//Initialise acorn on arr:
	function initialise_acorn(arr){
		var acorn = [[-3, -1],[-2, -1],[-2, 1],[1, -1],[2, -1],[3, -1]];
		var x = arr.length/2; //x_pos of acorn.
		var y = arr[0].length/2; //y_pos of acorn.
		arr[x][y]=ALIVE;
		for (var nn = 0; nn < 6; nn++){
            var dx = acorn[nn][0];
            var dy = acorn[nn][1];
            arr[pbcx(x + dx)][pbcy(y + dy)] = ALIVE;
        }
	}
	
	//Initialise cross on arr:
	function initialise_cross(arr){
		var Lx = arr.length;
    var Ly = arr[0].length;
    // Top left to bottom right
    for (var x = 0; x < Lx; x++) {
      var y = x;
      if (y >= 0 && y < Ly) {
        arr[x][y] = ALIVE;
      }
    }
    // Top right to botom left
    for (var x = Lx - 1; x >= 0; x--) {
      var y = Ly - x;
      if (y >= 0 && y < Ly) {
        arr[x][y] = ALIVE;
      }
    }
	}
	
	//Iterate next state of arr:
	function iterate(){
		var myNewArray = create2Darray(arr.length,arr[0].length);
		for(var x=0; x < arr.length; x++){
			for(var y=0; y < arr[0].length; y++){
				if(arr[x][y] === ALIVE){
					if (getneighcount(arr, x, y) < 2){
                            myNewArray[x][y] = DEAD; //underpopulation kills cell.
                        }
                    else if (getneighcount(arr, x, y) === 2 || getneighcount(arr, x, y) === 3){
                            myNewArray[x][y] = ALIVE; // surivies!
                        }
                    else if (getneighcount(arr, x, y)>3){
                            myNewArray[x][y] = DEAD; //overpopulation kills cell.
                    }
				}
				else if(arr[x][y] === DEAD){
					if(getneighcount(arr, x, y) == 3)
                        {
                            myNewArray[x][y] = ALIVE; //reproduction.
                        }
				}
			}
		}
		return myNewArray;
	}
	
	//Print array to screen:
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
	
	//Get number of ALIVE neighbours of point (x,y): 
	function getneighcount(arr,x,y){
		var neighbourhood = [[1, 0],[1, 1],[0, 1],[-1, 1],[-1, 0],[-1, -1],[0, -1],[1, -1]];
		var nc = 0;
		for (var nn = 0; nn < 8; nn++){
            var dx = neighbourhood[nn][0];
            var dy = neighbourhood[nn][1];

            if (arr[pbcx(x + dx, arr.length)][pbcy(y + dy, arr[x].length)] === ALIVE){
				nc++;
            }
        }
		return nc;
	}
	
	//Periodic boundary conditions in x-direction:
	function pbcx(ix, Lx){
        if (ix >= Lx){
            ix = ix - Lx;
        }
        if (ix < 0){
            ix = ix + Lx;
        }
        return ix;
    }
	
	//Periodic boundary conditions in y-direction:
	function pbcy(iy, Ly){
        if (iy >= Ly){
            iy = iy - Ly;
        }
        if (iy < 0){
            iy = iy + Ly;
        }
        return iy;
    }
	
	//Creates a 2D array, initialised to DEAD:
	function create2Darray(w,h){
		var arr = []
		for(var x=0; x < w; x++){
			arr[x] = [];
		}
		for(var x=0; x < w; x++){
			for(var y=0; y<h; y++){
				arr[x][y] = 0;
			}
		}
		return arr;
	}
});