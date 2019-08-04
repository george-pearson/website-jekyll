"use strict";
(function(){
    
    const groupPauseObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio <= 0) {
              // out of view
              const svg = entry.target;
              const groups = svg.querySelectorAll("g");
              groups.forEach((group)=>{
                group.style.animationPlayState = 'paused';
              });
          }
        });
    });

    const hexagonExample = document.querySelector("#hexagon-example");
    const hexagonExampleGroups = hexagonExample.querySelectorAll("g");
    hexagonExampleGroups.forEach((group)=> {
        hexagonExample.addEventListener("click", () => toggleAnimationPlayState(group));
    });
    groupPauseObserver.observe(hexagonExample);
    
    const lineExample = document.querySelector("#line-example");
    const lineExampleGroups = lineExample.querySelectorAll("g");
    lineExampleGroups.forEach((group)=> {
        lineExample.addEventListener("click", () => toggleAnimationPlayState(group));
    });
    groupPauseObserver.observe(lineExample);

    const circleExample = document.querySelector("#circle-example");
    const circleExampleGroups = circleExample.querySelectorAll("g");
    circleExampleGroups.forEach((group)=> {
        circleExample.addEventListener("click", () => toggleAnimationPlayState(group));
    });
    groupPauseObserver.observe(circleExample);

    function toggleAnimationPlayState(element){
        if (element.style.animationPlayState === 'running') {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    }
})();