"use strict";
(function() {
  self.addEventListener('message', function(e) {
    var properties = e.data[0];
      var cicles = makeCircles(
          properties.imageData, 
          properties.circleColours, 
          properties.rmin, 
          properties.rmax,
          properties.n,
          properties.LX,
          properties.LY);
      self.postMessage([cicles]);
  }, false);

  function makeCircles(imageData, circleColours, rmin, rmax, n, LX, LY) {
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
        placeCircle(circles, radii[i], imageData, circleColours, LX, LY);
    }
    return circles;
  };

  function placeCircle(circles, radius, imageData, circleColours, LX, LY){
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

})();