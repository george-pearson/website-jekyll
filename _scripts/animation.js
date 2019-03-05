"use strict";
$(document).ready(function(){
    /*----------Maboi----------*/
    var maboi = document.querySelector(".maboi-drawself");
    var maboiLines = Array.from(maboi.querySelectorAll(".line"));
    var maboiShades = Array.from(maboi.querySelectorAll(".shade"));
    var maboiPaths = [...maboiLines, ...maboiShades];
    var maboiAnimations = maboiPaths.map(function(path){
        var pathLength = path.getTotalLength();
        var duration = Math.pow(pathLength, 0.5) * 0.03;
        return {path, pathLength, duration};
    });

    function runMaboiAnimations(){
        // Initial conditions
        maboiAnimations.forEach(function(animation){
            animation.path.style.transition = "none";
            animation.path.style.strokeDasharray = `${animation.pathLength} ${animation.pathLength}`;
            animation.path.style.strokeDashoffset = animation.pathLength;
            animation.path.style.fillOpacity = "0";
            animation.path.getBoundingClientRect();
        });

        // Triggering a reflow so we animate from first path
        maboiAnimations[0].path.getBoundingClientRect();

        // Run line animations
        var begin = 0;
        maboiAnimations.forEach(function(animation) {
            animation.path.style.transition = `stroke-dashoffset ${animation.duration}s ${begin}s ease-in-out, fill-opacity ${animation.duration}s ${begin}s ease-in-out`;
            animation.path.style.strokeDashoffset = "0";
            animation.path.style.fillOpacity = "1.0";
            begin += animation.duration + 0.1;
        });
    }
    maboi.addEventListener("click", runMaboiAnimations);
    runMaboiAnimations();

    /*----------Coffee----------*/

    function toggleAnimationPlayState(element){
        if (element.style.animationPlayState === 'running') {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    }
    var coffeeDashed = document.querySelector(".coffee-dashed");
    var coffeeDashedPath = document.querySelector(".coffee-dashed path");
    coffeeDashed.addEventListener("click", () => toggleAnimationPlayState(coffeeDashedPath));

    var coffeeDrawSelf = document.querySelector(".coffee-drawself");
    var coffeeDrawSelfPath = document.querySelector(".coffee-drawself path");
    coffeeDrawSelf.addEventListener("click", () => toggleAnimationPlayState(coffeeDrawSelfPath));

    /*----------Cupcake----------*/
    var cupcake = document.querySelector(".cupcake-drawself");
    var cupcakePaths = Array.from(cupcake.querySelectorAll("path"));
    var cupcakeAnimations = cupcakePaths.map(function(path){
        var pathLength = path.getTotalLength();
        var duration = Math.pow(pathLength, 0.5) * 0.03;
        return {path, pathLength, duration};
    });

    function runCupcakeAnimations(){
        // Initial conditions
        cupcakeAnimations.forEach(function(animation){
            animation.path.style.transition = "none"; // Clear previous transition => fast removal
            animation.path.style.strokeDasharray = `${animation.pathLength} ${animation.pathLength}`;
            animation.path.style.strokeDashoffset = animation.pathLength;
            animation.path.getBoundingClientRect(); // Trigger reflow of each path
        });

        // Triggering a reflow on first path so we animate from here
        cupcakeAnimations[0].path.getBoundingClientRect();

        // Run line animations
        var begin = 0;
        cupcakeAnimations.forEach(function(animation) {
            animation.path.style.transition = `stroke-dashoffset ${animation.duration}s ${begin}s ease-in-out`;
            animation.path.style.strokeDashoffset = "0";
            begin += animation.duration + 0.1; // Slight 0.1s delay for drawing effect
        });
    }

    cupcake.addEventListener("click", runCupcakeAnimations);
});