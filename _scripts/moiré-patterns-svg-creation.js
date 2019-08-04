"use strict";
(function(){

  function createPolarExample(divElement){
    /*-------------------------------------------------------*\
    Creates two sets of lines using polar coordinates inside divElement.
    \*-------------------------------------------------------*/
    const width = 600; // image width.
    const height = 400; // image height.
    const smallestDimension = height < width ? height : width;
    const r = Math.round(smallestDimension / 2) - 1; // radius of lines circle
    const cx = width / 2; // x-cordinate of centre of lines circle
    const cy = height / 2; // y-cordinate of centre of lines circle
    const nl = 48; // number of lines
    const phis = 2*Math.PI / nl; // angle of seperation.
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("id", "polar-example");
    const group1 = document.createElementNS(svg.namespaceURI, "g");
    group1.setAttribute("id", "polar-example-group-1");
    let phioffset = 0;
    for(let iphi = 0; iphi < nl; iphi++){
      phioffset += phis;
      add_line(group1, cx, cy, cx + r*Math.cos(phioffset), cy + r*Math.sin(phioffset));
    }
    svg.appendChild(group1);
    const group2 = group1.cloneNode(true);
    group2.setAttribute("id", "polar-example-group-2");
    svg.appendChild(group2);
    divElement.appendChild(svg);
  }

  function createCirclesExample(divElement){
    /*-------------------------------------------------------*\
    Creates two sets of concentric circles inside divElement.
    \*-------------------------------------------------------*/
    const width = 600; // image width.
    const height = 400; // image height.
    const rs = 10; // radius spereation.
    const smallestDimension = height < width ? height : width;
    const nc = Math.round(smallestDimension / (2 * rs)) - 1; // Number of concentric circles.
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("id", "circle-example");
    const group1 = document.createElementNS(svg.namespaceURI, "g");
    group1.setAttribute("id", "circle-example-group-1");
    let roffset = 0;
    for(let ir = 0; ir < nc; ir++){
      roffset += rs;
      const circle = document.createElementNS(svg.namespaceURI, 'circle');
      circle.setAttribute('cx', width / 2);
      circle.setAttribute('cy', height / 2);
      circle.setAttribute('r', roffset);
      group1.appendChild(circle);
    }
    svg.appendChild(group1);
    const group2 = group1.cloneNode(true);
    group2.setAttribute("id", "circle-example-group-2");
    svg.appendChild(group2);
    divElement.appendChild(svg);
  }

  function createVerticalLinesExample(divElement){
    /*-------------------------------------------------------*\
    Creates two sets of vertical lines inside divElement.
    \*-------------------------------------------------------*/
    const width = 600; // image width.
    const height = 400; // image height.
    const ls = 10; // line spereation.
    const nx = Math.round(width / ls) - 1; // Number of veritical lines.
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("id", "line-example");
    const group1 = document.createElementNS(svg.namespaceURI, "g");
    group1.setAttribute("id", "line-example-group-1");
    let xoffset = 0;
    for(let ix = 0; ix < nx; ix++){
      xoffset += ls;
      add_line(group1, xoffset, 0, xoffset, height);
    }
    svg.appendChild(group1);
    const group2 = group1.cloneNode(true);
    group2.setAttribute("id", "line-example-group-2");
    svg.appendChild(group2);
    divElement.appendChild(svg);
  }

  function createHexagonExample(divElement){
    /*-------------------------------------------------------*\
    Creates two hexagonal lattice's inside divElement.
    The "unit cell" consists of the arrangement of lines: \ /
                                                           |
    centred at the vertex where they meet.
    \*-------------------------------------------------------*/
    const width = 600; // image width.
    const height = 400; // image height.
    const a = 10; // line length.
    const gx = a * Math.sqrt(3) * 0.5; // a.sin(60).
    const gy = a * 0.5; // a.cos(60).
    const nx = Math.round(width / (gx * 2)) + 1; // Number of unit cells vertically.
    const ny = Math.round(height / (a + gy)) + 1; // Number of unit cells horizontally.
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("id", "hexagon-example");
    const group1 = document.createElementNS(svg.namespaceURI, "g");
    group1.setAttribute("id", "hexagon-example-group-1");
    let xoffset = 0;
    for(let iy = 0; iy < ny; iy++){
      xoffset = xoffset == 0 ? gx : 0;
      for(let ix = 0; ix < nx; ix++){
        add_unit_cell(group1, ix * 2 * gx + xoffset, iy * (a + gy));
      }
    }
    svg.append(group1);
    const group2 = group1.cloneNode(true);
    group2.setAttribute("id", "hexagon-example-group-2");
    svg.append(group2);
    divElement.appendChild(svg);

    function add_unit_cell(svg, x, y){
      add_line(svg, x, y, x, y + a);
      add_line(svg, x, y, x - gx, y - gy);
      add_line(svg, x, y, x + gx, y - gy);
    }
  }

  function add_line(svg, x1, y1, x2, y2){
    var newLine = document.createElementNS(svg.namespaceURI,'line');
    newLine.setAttribute('x1', x1);
    newLine.setAttribute('y1', y1);
    newLine.setAttribute('x2', x2);
    newLine.setAttribute('y2', y2);
    svg.append(newLine);
  }

})();