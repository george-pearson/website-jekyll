"use strict";
$(document).ready(function(){
    var n = 9;
	var N = Math.pow(2, n) + 1;
	var arr;

	$("#color1").on("change", function(){
		if(!arr){
			arr = runDSA(N);
		}
		print_to_canvas(arr);
	});
	$("#color2").on("change", function(){
		if(!arr){
			arr = runDSA(N);
		}
		print_to_canvas(arr);
	});
	
	$("#reload").click(function(){
		arr = runDSA(N);
		print_to_canvas(arr);
	});
	
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

        // Scale range to 0 to +1 and cut off outliers.
        for(var ix = 0; ix < N; ix++){
            for(var iy = 0; iy < N; iy++){
                arr[ix][iy] = (arr[ix][iy] + 1.0)/(2.0);
                if(arr[ix][iy] < 0.0){
                    arr[ix][iy] = 0;
                }
                if(arr[ix][iy] > 1.0){
                    arr[ix][iy] = 1.0;
                }
            }
        }
		return arr;
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
				myImageData.data[index+0] = rgb.r*arr[x][y]; //r
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
    
    function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
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