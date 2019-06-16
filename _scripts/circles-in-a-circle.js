"use strict";
var svgWidth = 600, svgHeight = 600;
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", svgWidth);
svg.setAttribute("height", svgHeight);
var R=250; // R is the radius of the large circle within which the small circles are to fit.
var CX = svgWidth / 2; // The x-coordinate of centre of the large circle.
var CY = svgHeight / 2; // The y-coordinate of centre of the large circle.
var n=2000; // n is the maximum number of circles to pack inside the large circle.
var rho_min=0.005; // rho_min is rmin/R, where rmin is the minimum packing circle radius.
var rho_max=0.05; // rho_max is rmax/R, where rmax is the maximum packing circle radius.
var rmin = R * rho_min; // The minimum packing circle radius.
var rmax = R * rho_max; // The maximum packing circle radius.
var circleColours = ['#993300', '#a5c916', '#00AA66', '#FF9900'];
var circles = makeCircles();
for(var i=0; i< circles.length; i++){
    var circle = document.createElementNS(svg.namespaceURI,'circle');
    circle.setAttribute('cx', circles[i].cx);
    circle.setAttribute('cy', circles[i].cy);
    circle.setAttribute('r', circles[i].r);
    circle.setAttribute('fill', circles[i].colour);
    svg.appendChild(circle);
}
var svgDiv = document.querySelector('.myDiv');
svgDiv.appendChild(svg);


function makeCircles(){
    var circles = [];
    var radii = [];
    // First choose a set of n random radii and sort them. We use
    // Math.random()*Math.random() to favour small circles.
    for(var i=0; i<n; i++){
        var r = rmin + (rmax - rmin)*(Math.random()*Math.random())
        radii.push(r);
    }
    radii.sort().reverse();
    // Do our best to place the circles, larger ones first.
    for(var i=0; i<n; i++){
        placeCircle(circles, radii[i]);
    }
    return circles;
}

function placeCircle(circles, r){
    //The guard number: if we don't place a circle within this number of trials, we give up.
    var guard = 500;
    while(guard > 0){
        // Pick a random position, uniformly on the larger circle's interior.
        var cr = R * Math.sqrt(Math.random());
        var cphi = 2*Math.PI * Math.random();
        var cx = cr * Math.cos(cphi);
        var cy = cr * Math.sin(cphi);
        
        if(cr + r < R){
            // The circle fits inside the larger circle.
            if(!circles.some((existingCircle) => overlapWith(CX+cx, CY+cy, r, existingCircle.cx, existingCircle.cy, existingCircle.r))){
                var circle = {'cx':CX+cx,'cy':CY+cy, 'r':r, 'colour':circleColours[randomIntFromInterval(0,3)]};
                circles.push(circle);
                return;
            }
        }
        guard -= 1;
    }
}

function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function overlapWith(cx1, cy1, r1, cx2, cy2, r2){
    var d = Math.hypot(cx1-cx2, cy1-cy2);
    return d < r1 + r2;
}