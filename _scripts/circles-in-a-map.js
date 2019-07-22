"use strict";
(function() {
  const figure = document.querySelector("#fig-circles");
  const image = document.querySelector("#uk_and_ireland");
  const circlesImage = document.querySelector("#uk_and_ireland_circles");
  const canvas = figure.querySelector("canvas");
  const btnReload = figure.querySelector("button");
  const ctx = canvas.getContext("2d");
  const LX = image.width;
  const LY = image.height;
  canvas.width = LX;
  canvas.height = LY;
  const n = 3000; // n is the maximum number of circles
  const colour1 = document.querySelector('#colour1');
  const colour2 = document.querySelector('#colour2');
  const colour3 = document.querySelector('#colour3');
  const colour4 = document.querySelector('#colour4');
  const rminInput = figure.querySelector("#rmin");
  const rminValueDisplay = figure.querySelector("#rminValueDisplay");
  rminValueDisplay.innerHTML = rminInput.value
  rminInput.addEventListener("change", (e) => {rminValueDisplay.innerHTML = rminInput.value;});
  const rmaxInput = figure.querySelector("#rmax");
  const rmaxValueDisplay = figure.querySelector("#rmaxValueDisplay");
  rmaxValueDisplay.innerHTML = rmaxInput.value;
  rmaxInput.addEventListener("change", (e) => {rmaxValueDisplay.innerHTML = rmaxInput.value;});
  ctx.drawImage(image, 0, 0);

  btnReload.addEventListener('click', ()=> {
    enableDiableUI(false);
    ctx.drawImage(image, 0, 0);
    const imageData = (ctx.getImageData(0, 0, LX, LY)).data;
    const circleColours = [colour1.value, colour2.value, colour3.value, colour4.value];
    const rmin = parseFloat(rminInput.value);
    const rmax = parseFloat(rmaxInput.value);
    const worker = new Worker('/assets/scripts/circles-in-a-map.worker.min.js');
    worker.addEventListener('message', onCirclesComplete, false);
    const params = {
      'imageData': imageData, 
      'circleColours': circleColours,
      'rmin': rmin, 
      'rmax': rmax,
      'n': n,
      'LX': LX,
      'LY': LY
    }
    worker.postMessage([params]);
  });

  function onCirclesComplete(e){
    const circles = e.data[0];
    const svg = createSVGFromCircles(circles, LX, LY);
    ctx.clearRect(0, 0, LX, LY);
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type:"image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const svgImg = new Image();
    svgImg.onload = function() {
        ctx.drawImage(svgImg, 0, 0);
        URL.revokeObjectURL(url);
        enableDiableUI(true);
    }
    svgImg.src = url;
}

  function createSVGFromCircles(circles, LX, LY){
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", LX);
    svg.setAttribute("height", LY);
    for(let i = 0; i < circles.length; i++){
      const circle = document.createElementNS(svg.namespaceURI, 'circle');
      circle.setAttribute('cx', circles[i].cx);
      circle.setAttribute('cy', circles[i].cy);
      circle.setAttribute('r', circles[i].r);
      circle.setAttribute('fill', circles[i].colour);
      svg.appendChild(circle);
    }
    return svg;
  }

  function enableDiableUI(enable){
    if(enable){
      btnReload.innerHTML = 'Run';
      btnReload.disabled = false;
      rminInput.disabled = false;
      rmaxInput.disabled = false;
      colour1.disabled = false;
      colour2.disabled = false;
      colour3.disabled = false;
      colour4.disabled = false;
    }
    else{
      btnReload.innerHTML = 'Working on it...';
      btnReload.disabled = true;
      rminInput.disabled = true;
      rmaxInput.disabled = true;
      colour1.disabled = true;
      colour2.disabled = true;
      colour3.disabled = true;
      colour4.disabled = true;
      circlesImage.style.display = "none";
      canvas.style.display = "block";
    }
  }

})();