"use strict";
$(document).ready(function(){
    var svg = document.querySelector('#maboi-drawself');
    var lines = Array.from(svg.querySelectorAll('.line'));
    var shades = Array.from(svg.querySelectorAll('.shade'));
    var paths = [...lines, ...shades];
    
    var durations = paths.map(function(path) {
        var length = path.getTotalLength();
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.style.fillOpacity = '0';
        return Math.pow(length, 0.5) * 0.03;
    });

    // triggering a reflow so styles are calculated in their
    // start position, so they animate from here
    paths[0].getBoundingClientRect();
    var begin = 0;
    paths.forEach(function(path, i) {
        path.style.transition = `stroke-dashoffset ${durations[i]}s ${begin}s ease-in-out, fill-opacity ${durations[i]}s ${begin}s ease-in-out`;
        path.style.strokeDashoffset = '0';
        path.style.fillOpacity = '1.0';
        begin += durations[i] + 0.1;
    });
});