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
  const rmin = 1.25; // The minimum packing circle radius.
  const rmax = 6.25; // The maximum packing circle radius.
  const colour1 = document.querySelector('#colour1');
  const colour2 = document.querySelector('#colour2');
  const colour3 = document.querySelector('#colour3');
  const colour4 = document.querySelector('#colour4');
  ctx.drawImage(image, 0, 0);

  btnReload.addEventListener('click', ()=> {
    circlesImage.style.display = "none";
    canvas.style.display = "block";
    btnReload.disabled = true;
    ctx.drawImage(image, 0, 0);
    const imageData = (ctx.getImageData(0, 0, LX, LY)).data;
    const circleColours = [colour1.value, colour2.value, colour3.value, colour4.value];
    const circles = makeCircles(imageData, circleColours);
    const svg = createSVGFromCircles(circles, LX, LY);
    ctx.clearRect(0, 0, LX, LY);
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type:"image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const svgImg = new Image();
    svgImg.onload = function() {
        ctx.drawImage(svgImg, 0, 0);
        URL.revokeObjectURL(url);
        btnReload.disabled = false;
    }
    svgImg.src = url;
  });
  
  function makeCircles(imageData, circleColours) {
    const circles = [];
    const radii = [];
    // First choose a set of n random radii and sort them. We use
    // Math.random()*Math.random() to favour small circles.
    for(let i = 0; i < n; i++){
        const radius = rmin + (rmax - rmin)*(Math.random()*Math.random())
        radii.push(radius);
    }
    radii.sort().reverse();
    // Do our best to place the circles, larger ones first.
    for(let i = 0; i < n; i++){
        placeCircle(circles, radii[i], imageData, circleColours);
    }
    return circles;
  };

  function placeCircle(circles, radius, imageData, circleColours){
    //The guard number: if we don't place a circle within this number of trials, we give up.
    let guard = 500;
    while(guard > 0){
        // Pick a random position, uniformly on the image.
        const cx = randomIntFromInterval(0, LX-1);
        const cy = randomIntFromInterval(0, LY-1);
        const index = (cx+cy*LX)*4;
        const red = imageData[index + 0];
        const green = imageData[index + 1];
        const blue = imageData[index + 2];
        const average = (red + green + blue) / 3;
        if(average < 255/2 && !circles.some((existingCircle) => overlapWith(cx, cy, radius, existingCircle.cx, existingCircle.cy, existingCircle.r))){
          const circle = {'cx': cx,'cy': cy, 'r':radius, 'colour':circleColours[randomIntFromInterval(0,3)]};
          circles.push(circle);
          return;
        }
        guard -= 1;
    }
    console.log("Guard reached");
  }

  function randomIntFromInterval(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function overlapWith(cx1, cy1, r1, cx2, cy2, r2){
    const d = Math.hypot(cx1-cx2, cy1-cy2);
    return d < r1 + r2;
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

})();