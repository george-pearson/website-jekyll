"use strict";
(function() {
  /*----------Greyscale----------*/
  var gsFigure = document.querySelector("#fig-greyscale");
  var gsImage = gsFigure.querySelector("img");
  var gsCanvas = gsFigure.querySelector("canvas");
  var gsbutton = gsFigure.querySelector(".button");
  gsCanvas.width = gsImage.width;
  gsCanvas.height = gsImage.height;
  var gsCtx = gsCanvas.getContext("2d");
  
  var gsApplied = false;
  gsbutton.addEventListener("click", () => {
    gsCtx.drawImage(gsImage, 0, 0);
    var gsImageData = gsCtx.getImageData(0, 0, gsCanvas.width, gsCanvas.height);
    if(!gsApplied){
      var id = greyScale(gsImageData);
      gsCtx.putImageData(id, 0, 0);
      gsbutton.innerHTML = 'Reload';
      gsImage.style = "display:none;";
      gsCanvas.style = "display:block;";
      gsApplied = true;
    }
    else{
      gsbutton.innerHTML = 'Apply';
      gsApplied = false;
    }
  });
  
  function greyScale (imageData) {
    var d = imageData.data;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
      var v = 0.2126*r + 0.7152*g + 0.0722*b;
      d[i] = d[i+1] = d[i+2] = v
    }
    return imageData;
  };

  /*----------Sobel----------*/
  var sobelFigure = document.querySelector("#fig-sobel");
  var sobelImage = sobelFigure.querySelector("img");
  var sobelCanvas = sobelFigure.querySelector("canvas");
  var sobelbutton = sobelFigure.querySelector(".button");
  sobelCanvas.width = sobelImage.width;
  sobelCanvas.height = sobelImage.height;
  var sobelCtx = sobelCanvas.getContext("2d");

  var sobelApplied = false;
  sobelbutton.addEventListener("click", () => {
    sobelCtx.drawImage(sobelImage, 0, 0);
    var sobelImageData = sobelCtx.getImageData(0, 0, sobelCanvas.width, sobelCanvas.height);
    if(!sobelApplied){
      var id = sobel(sobelImageData, sobelCanvas, 0);
      sobelCtx.putImageData(id, 0, 0);
      sobelbutton.innerHTML = 'Reload';
      sobelImage.style = "display:none;";
      sobelCanvas.style = "display:block;";
      sobelApplied = true;
    }
    else{
      sobelbutton.innerHTML = 'Apply';
      sobelApplied = false;
    }
  });

  /*----------Sobel Colour----------*/
  var sobelColourFigure = document.querySelector("#fig-sobel-colour");
  var sobelColourImage = sobelColourFigure.querySelector("img");
  var sobelColourCanvas = sobelColourFigure.querySelector("canvas");
  var sobelColourbutton = sobelColourFigure.querySelector(".button");
  sobelColourCanvas.width = sobelColourImage.width;
  sobelColourCanvas.height = sobelColourImage.height;
  var sobelColourCtx = sobelColourCanvas.getContext("2d");

  var sobelColourApplied = false;
  sobelColourbutton.addEventListener("click", () => {
    sobelColourCtx.drawImage(sobelColourImage, 0, 0);
    var sobelColourImageData = sobelColourCtx.getImageData(0, 0, sobelColourCanvas.width, sobelColourCanvas.height);
    if(!sobelColourApplied){
      var id = sobel(sobelColourImageData, sobelColourCanvas, 1);
      sobelColourCtx.putImageData(id, 0, 0);
      sobelColourbutton.innerHTML = 'Reload';
      sobelColourImage.style = "display:none;";
      sobelColourCanvas.style = "display:block;";
      sobelColourApplied = true;
    }
    else{
      sobelColourbutton.innerHTML = 'Apply';
      sobelColourApplied = false;
    }
  });

  /*----------Loader Tool----------*/
  var loaderTool = document.querySelector("#loader-tool");
  var ltSelectButton = loaderTool.querySelector("#select");
  var ltFileInput = loaderTool.querySelector("#fileInput");
  var ltCanvas = loaderTool.querySelector("canvas");
  var ltCtx = ltCanvas.getContext("2d");
  var ltSaturationInput = loaderTool.querySelector("#saturation");
  var ltSaturationValueDisplay = loaderTool.querySelector("#saturationValueDisplay");
  var ltbutton = loaderTool.querySelector("#apply");
  var ltImage;
  var ltMAX_IMAGE_SIZE = 600;

  ltSaturationInput.addEventListener("change", (e) => {ltSaturationValueDisplay.innerHTML = ltSaturationInput.value;});
  ltSelectButton.addEventListener("click", () => {ltFileInput.click();});
  ltFileInput.addEventListener("change", (e) => {
    var reader = new FileReader();
    reader.onload = function(event){
        ltImage = new Image();
        ltImage.onload = function(){
          drawImageToScale(ltImage, ltMAX_IMAGE_SIZE, ltCanvas, ltCtx);
        }
        ltImage.src = event.target.result;
        ltbutton.style = "display: inline;";
    }
    var file  = e.target.files[0];
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file); 
    }
  });

  var ltApplied = false;
  ltbutton.addEventListener("click", () => {
    var ltImageData = ltCtx.getImageData(0, 0, ltCanvas.width, ltCanvas.height);
    if(!ltApplied){
      var id = sobel(ltImageData, ltCanvas, ltSaturationInput.value);
      ltCtx.putImageData(id, 0, 0);
      ltbutton.innerHTML = 'Reload';
      ltApplied = true;
    }
    else{
      drawImageToScale(ltImage, ltMAX_IMAGE_SIZE, ltCanvas, ltCtx);
      ltbutton.innerHTML = 'Apply';
      ltApplied = false;
    }
  });

  function drawImageToScale(image, maxSize, canvas, ctx){
    var scale = 1;
    if(maxSize < image.width || maxSize < image.height){
      scale = Math.min(maxSize / image.width, maxSize / image.height);
    }
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  /*----------Helper Functions----------*/
  function sobel(imageData, canvas, saturation){
    var ctx = canvas.getContext("2d");
    var px = greyScale(imageData);
    var vertical = convolute(px,
      [-1,-2,-1,
        0, 0, 0,
        1, 2, 1]);
    var horizontal = convolute(px,
      [-1,0,1,
       -2,0,2,
       -1,0,1]);
    var magnitude = new Float32Array(px.width*px.height*4);
    var orientation =  new Float32Array(px.width*px.height*4);
    var maxMagnitude = -1;
    for (var i=0; i<px.data.length; i+=4) {
      var dy = vertical.data[i];
      var dx = horizontal.data[i];
      magnitude[i] = Math.sqrt(dx*dx + dy*dy);
      if(magnitude[i] > maxMagnitude){
        maxMagnitude = magnitude[i];
      }
      orientation[i] = Math.atan2(dy, dx) + Math.PI;
    }
    var id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i=0; i<id.data.length; i+=4) {
      var rgb = HSVtoRGB(orientation[i]/(2*Math.PI), saturation, magnitude[i]/maxMagnitude);
      id.data[i] = rgb.r;
      id.data[i+1] = rgb.g;
      id.data[i+2] = rgb.b;
      id.data[i+3] = 255;
    }
    return id;
  }

  function convolute(pixels, weights) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);

    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;

    var w = sw;
    var h = sh;
    var output = {
      width: w, height: h, data: new Float32Array(w*h*4)
    };
    var dst = output.data;

    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
            var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a;
      }
    }
    return output;
  };
  
  function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
  }

})();