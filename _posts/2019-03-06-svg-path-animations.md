---
layout: post
title:  "SVG Path Animations"
subtitle: "A look into how to create SVG path animations using CSS transitions and a bit of JavaScript."
---

<div class="maboi-drawself-container">
    <svg id="maboi-drawself" class="maboi-drawself" xmlns="http://www.w3.org/2000/svg" height="400" width="400" viewBox="0 0 400 400">
        <path id="hair" class="shade"
        style="fill:#312929;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4"
        d="M 49.002,255.376 C 44.861363,240.56032 42.726096,221.26752 39.96492,204.64867 33.569815,156.11234 34.53359,101.68969 66.273855,61.458738 77.379429,46.163821 94.193466,36.181281 112.35388,31.794302 c 4.10201,-0.682841 16.44015,-9.196305 10.37051,-0.208306 -4.33798,7.099864 -13.6935,34.169106 1.47761,20.591004 29.16454,-16.991298 61.45366,-29.523756 94.86517,-34.580937 13.57196,-0.812716 27.01177,1.747359 40.49383,2.900937 -8.25404,7.940706 -19.61107,13.359695 -25.92,22.72 38.0844,2.037556 72.17,23.177287 99.06212,48.939375 -6.85106,2.375814 -27.50231,-0.526068 -39.33625,3.16375 -17.32356,1.423837 -32.60892,10.383805 -46.28687,20.536875 -43.35668,30.73622 -94.29898,52.04884 -147.464,56.85 -6.661519,6.47001 -0.112366,27.96215 -5.256875,39.6668 -4.24141,22.26047 -23.144186,39.27185 -45.038125,43.6422 z"
        />
        <path id="face" class="shade"
        style="fill:#efcebd;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4"
        d="M 255.4,380.175 C 205.61418,378.39211 161.70408,352.22357 118.80975,329.68125 106.15381,324.13756 94.065321,344.16903 78.531547,340.45906 52.015012,340.03571 29.776678,316.70668 23.296371,292.14375 17.856575,273.21983 36.628843,260.35512 52.521,256.016 c 21.818632,-5.97249 41.416169,-23.43182 43.671484,-46.91352 3.292985,-15.19856 -6.56396,-41.39531 18.701646,-37.84398 37.54324,-5.74581 74.23201,-17.62722 106.47553,-37.98784 13.13589,-3.37221 30.04659,-28.98432 40.22076,-18.98366 5.07695,16.63334 20.3755,36.27496 11.3002,53.19344 -13.7542,18.3016 -23.23592,43.98202 -11.91312,65.79906 8.62032,17.49344 26.09654,28.75866 43.3825,36.8165 -8.00524,36.00398 -16.64594,72.30451 -31.80625,106.05625 -2.56307,6.59635 -11.83844,2.78543 -17.15375,4.02275 z m -1.28,-40 c 6.87656,-3.80189 19.38046,-19.27694 16.285,-21.26 -1.34943,12.9642 -26.34536,21.39606 -24.7,27.56 3.2373,-1.42346 5.49578,-4.37708 8.415,-6.3 z m -24.64,-34.56 c 30.43458,-24.38664 31.47486,-77.28873 -0.53375,-100.824 -23.77385,-21.23615 -60.60451,-14.53757 -83.62625,4.185 -19.83319,20.23263 -24.70309,54.38306 -10.02119,78.955 12.35248,25.0954 43.76697,33.37911 69.62969,28.77563 9.34801,-0.57952 17.61636,-5.01531 24.5515,-11.09163 z m -148.479,4.48 c 2.227747,-7.20227 -18.740834,13.69844 -23.48,-0.52 -17.171508,-22.97847 16.973403,-20.69895 28.145,-19.675 -13.86326,-5.56872 -45.87032,-4.51846 -31.065,17.595 5.737956,11.14121 17.872603,8.60518 26.4,2.6 z"
        />
        <path id="rightEyeLeftFill" class="shade"
        style="fill:#00adef;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4"
        d="m 324.84,264.976 c -16.38839,6.3829 -32.86852,-0.3136 -45.37445,-11.40078 -25.27378,-18.87186 -29.51628,-60.80327 -8.11805,-83.95203 10.42636,-11.11047 26.43123,-12.86892 40.6925,-15.04719 -11.60322,9.1473 -24.40134,19.32227 -28.53062,34.53356 -8.90241,26.51634 4.30469,61.16623 33.04554,68.38332 5.45359,1.68671 22.90341,3.58349 8.28508,7.48312 z"
        />
        <path id="leftEyeLeftFill" class="shade"
        style="fill:#00adef;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4"
        d="m 175.081,315.856 c -30.47073,-5.78363 -53.21739,-38.29544 -46.10938,-68.88313 1.83034,-21.24734 13.69355,-45.09311 37.00972,-48.24807 6.33065,-1.63343 12.64435,-3.33499 19.01966,-4.7888 -15.8413,9.98879 -28.45556,26.44469 -35.13969,43.90617 -9.85835,29.28995 7.64945,63.27929 36.29031,74.01071 15.11045,6.47177 -7.86793,4.43827 -11.07062,4.00312 z"
        />
        <path id="rightEyeRightFill" class="shade"
        style="fill:#4c7287;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4"
        d="m 353.32,247.696 c 20.69876,-24.01073 16.01899,-62.20314 -5.44,-84.16 -9.91216,-1.64986 -16.29898,-11.1305 -1.6,-7.04 23.74442,12.99025 41.81642,44.02961 28.54703,70.40148 -5.15136,12.63525 -13.11149,25.75207 -27.16548,29.23621 -5.38952,2.95993 5.52411,-7.28188 5.65845,-8.43769 z"
        />
        <path id="leftEyeFill" class="shade"
        style="fill:#8ccef7;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4"
        d="m 200.041,314.896 c -42.46211,-3.82902 -67.18093,-59.07024 -43.125,-93.84 11.64293,-18.21879 34.76459,-34.32047 56.76883,-23.88461 18.83143,6.89707 33.23115,23.57078 36.44367,43.53117 8.21601,30.4185 -10.22973,69.47686 -43.0475,74.51844 l -3.43,6.3e-4 z"
        />
        <path id="rightEyeFill" class="shade"
        style="fill:#8ccef7;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4"
        d="m 324.84,259.536 c -28.12357,-4.85494 -48.64871,-35.29858 -41.37813,-63.19023 4.40851,-19.56774 20.60949,-41.5661 42.37313,-41.09977 26.71271,4.89712 44.72392,32.1904 41.01777,58.62276 -2.05931,18.39389 -11.45918,40.06186 -30.60964,45.58599 -3.77715,0.49952 -7.61827,0.49618 -11.40313,0.0813 z"
        />
        <path id="leftEyeSmallTint" class="shade"
        style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:0.31999999;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 202.92,231.056 c -4.05314,24.23374 28.83188,-0.96837 2.155,-1.325 z"
        />
        <path id="leftEyeBigTint" class="shade"
        style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:0.31999999;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 181.481,215.696 c -13.62336,23.23239 34.20992,17.4479 14.93,-1.675 -4.7198,-3.42966 -10.9359,-2.38684 -14.93,1.675 z"
        />
        <path id="rightEyeSmallTint" class="shade"
        style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:0.63999999;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 332.2,183.697 c -18.08538,6.98785 7.09016,26.07096 8,6.72 -1.00515,-3.20344 -4.2826,-7.29425 -8,-6.72 z"
        />
        <path id="rightEyeBigTint" class="shade"
        style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:0.63999999;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 308.52,168.977 c -23.16535,13.48053 16.22355,36.19796 16.84,10.08 -0.55392,-8.7522 -8.80383,-13.74638 -16.84,-10.08 z"
        />
        <path id="jawShade" class="shade"
        style="fill:#9a8179;fill-opacity:1;fill-rule:nonzero;stroke:#9a8179;stroke-width:3.83999991;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 66.282,251.216 c -15.335601,4.76402 -33.864289,9.2884 -41.679968,24.89909 -5.630066,12.96044 1.357882,27.41901 8.668633,38.21253 10.412691,13.62351 25.841947,25.66249 43.568179,26.32365 13.918188,-0.0162 27.042376,-5.74363 39.055236,-12.28785 38.90017,22.65515 79.19694,46.85331 124.90796,51.60811 8.94433,0.89592 17.97474,0.9776 26.9281,0.15697 -10.80002,-5.52231 -23.5025,-6.24815 -34.83529,-10.63905 C 180.11467,354.54434 127.64144,330.07073 91.357665,287.67554 81.815433,276.40559 73.548011,264.05902 66.282,251.216 Z"
        />
        <path id="backheadShade" class="shade"
        style="fill:#171717;fill-opacity:1;fill-rule:nonzero;stroke:#181818;stroke-width:3.83999991;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="M 66.602,247.696 C 52.86568,196.53976 39.49361,141.80794 55.339838,89.465764 56.328552,83.465126 66.873595,59.107602 59.14075,75.457859 40.733199,108.14043 32.74117,146.07316 36.302,183.42158 c 1.652806,24.26835 6.008205,48.26766 11.42,71.95442 6.565374,-1.56175 14.10751,-2.3256 18.88,-7.68 z"
        />
        <path id="backHairShade" class="shade"
        style="fill:#181818;fill-opacity:1;fill-rule:nonzero;stroke:#181818;stroke-width:4.15999985;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 114.601,58.897 c 0.1567,5.96685 -1.64254,12.704661 4.48,16.32 13.93454,-19.529615 35.4829,-31.039227 54.72,-44.48 -14.4055,5.049599 -28.90882,9.885815 -41.74741,18.353305 -5.81753,3.268898 -11.63506,6.537797 -17.45259,9.806695 z"
        />
        <path id="frontHairShade" class="shade"
        style="fill:#181818;fill-opacity:1;fill-rule:nonzero;stroke:#181818;stroke-width:3.83999991;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 225.64,61.137 c 39.09517,-6.126087 72.62355,18.123963 106.88,32.32 -25.82848,-27.354253 -61.06978,-50.535279 -100.16,-48 -4.42206,3.958809 -6.50128,9.86066 -6.72,15.68 z"
        />
        <path id="foreheadShade" class="shade"
        style="fill:#9a8179;fill-opacity:1;fill-rule:nonzero;stroke:#9a8179;stroke-width:3.83999991;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 96.361,173.137 c 60.27617,3.32632 120.76577,-16.23383 168.639,-52.8 -3.07308,-8.8671 -5.96541,-17.69153 -13.99469,-5.41523 -43.38529,35.78347 -99.0328,54.17798 -154.64431,58.21523 z"
        />
        <path id="lines1" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 193.64,192.337 c 79.20475,7.78078 72.67773,114.43784 12.95405,123.33482 C 127.83871,309.95607 133.57164,213.79055 193.64,192.337 Z"
        />
        <path id="lines2" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="M 207.081,315.221 C 108.96484,334.08677 101.64531,190.69606 193.641,192.336"
        />
        <path id="lines3" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 320.04,153.616 c 78.17725,11.74101 42.79063,123.12265 -3.40512,104.49962 C 268.57093,235.80103 272.85535,169.95439 320.04,153.616 Z"
        />
        <path id="lines4" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 304.68,269.136 c 113.71622,-13.62889 73.00191,-125.21531 15.36,-115.52 -19.64316,1.13381 -31.95772,4.91189 -42.56,8"
        />
        <path id="lines5" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="M 305.96,269.776 C 253.85079,248.76171 246.28365,199.93508 277.48,161.616"
        />
        <path id="lines6" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 305.32,269.456 c -6.85062,38.10239 -19.40798,74.98511 -34.88,110.4"
        />
        <path id="lines7" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="M 115.89408,328.36342 C 161.4933,354.93893 216.5748,388.87558 269.48,380.496 c 2.13399,-0.17552 -2.11427,0.33904 0,0"
        />
        <path id="lines8" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 49.32,256.336 c -80.116072,39.6821 32.144579,116.2418 66.57408,72.02742"
        />
        <path id="lines9" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="M 49.32,256.336 C 15.949108,166.75216 27.447525,53.315743 127.72,25.618"
        />
        <path id="lines10" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 127.721,25.618 c -7.88338,8.403855 -10.68987,20.185097 -11.52,31.36"
        />
        <path id="lines11" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="M 116.201,56.978 C 159.65372,29.525504 212.04875,13.654188 263.719,19.537"
        />
        <path id="lines12" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 263.719,19.537 c -11.97359,5.249406 -21.96258,14.210197 -30.08,24.32"
        />
        <path id="lines13" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 233.64,43.858 c -3.90473,4.389221 -8.03837,9.474567 -8,15.68"
        />
        <path id="lines14" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 233.639,43.857 c 38.57084,1.082347 72.86725,22.973268 100.16,48.64"
        />
        <path id="lines15" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 333.799,92.497 c -25.28601,-0.93692 -51.05768,3.255847 -73.92,14.4"
        />
        <path id="lines16" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 96.361,173.137 c 59.65671,-4.58454 116.70526,-29.49885 163.52,-66.24"
        />
        <path id="lines17" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 49.32,256.336 c 43.44477,-16.54532 49.33323,-46.12996 47.04,-83.2"
        />
        <path id="lines18" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 277.48,161.616 c -3.31232,-18.70495 -9.16037,-37.22261 -17.92,-54.079"
        />
        <path id="lines19" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 86.122,290.576 c -53.064488,-13.54691 -29.237119,45.62389 -3.84,16.96"
        />
        <path id="lines20" class="line"
        style="fill:none;stroke:#000000;stroke-width:3.83999991;"
        d="m 243.561,345.936 c 11.44571,-6.73588 22.5173,-15.47232 28.159,-27.84"
        />
    </svg>
</div>
<style>
    .maboi-drawself {
        max-width: 400px;
        max-height: 400px;
        width: 100%;
        height: 100%;
    }
    .maboi-drawself-container{
        justify-self: center;
    }
</style>

Hey that animation was pretty cool, right? Just click on him again to re-run it. Today's post is on how to create awesome SVG line animations like the one above.

## SVG Paths
The SVG path format can seem rather cryptic:

```xml
<svg id="coffee" class="coffee" xmlns="http://www.w3.org/2000/svg" width="250" height="375" viewBox="0 0 250 375">
    <path style="fill:none;stroke:#000000;stroke-width:5;"
        d="m 19.892717,176.8917 1.190429,139.87515 c 3.078475,25.1789 11.076205,36.7905 41.069744,43.45065 21.81719,4.35025 40.50001,2.4318 60.11656,2.38085 29.56052,-2.41735 45.03841,-16.4321 47.61711,-41.06975 4.77735,-29.65355 -2.57891,-63.04595 2.3117,-95.7242 2.34095,-4.81735 1.6138,-10.7567 11.3782,-12.6047 4.893,-0.9099 8.9718,-0.73415 12.60465,0.035 7.01395,2.64455 11.4282,6.27795 13.7335,12.4634 2.27135,9.325 1.9101,18.65 1.04165,27.97505 -0.6871,6.0357 -2.34285,11.2697 -4.6129,15.32675 -5.56075,6.92775 -13.47125,11.10545 -19.3264,17.11985 -1.76685,2.77765 -1.1949,6.44065 -1.05965,9.21835 0.5008,3.07045 2.91735,4.2252 5.3569,5.3569 3.42525,0.73005 6.89725,1.2265 10.71385,0 7.5242,-2.499 12.99665,-7.5627 19.0468,-11.90425 4.9011,-5.3231 8.77275,-12.36185 12.4995,-19.64205 3.12195,-6.4744 3.27535,-14.4331 4.1665,-22.0229 -0.119,-7.5046 -0.4315,-14.9127 -1.33925,-22.02295 -4.8731,-19.68355 -18.54195,-35.8845 -38.54005,-39.28405 -5.1125,-0.42 -11.90225,0.1125 -20.622,-1.12135 -5.4145,-2.00515 -6.06795,-5.30365 -6.1265,-8.78685 0.78285,-7.14255 -0.6129,-14.4956 -4.20258,-21.63815 -6.66151,-9.72085 -18.17041,-13.45375 -31.54633,-14.88035 -22.53748,-3.28225 -43.72335,-3.05035 -64.28306,-1.1904 -9.30141,0.7866 -18.504954,1.1328 -28.570254,5.3569 -2.97607,1.27915 -5.95214,2.72185 -8.9282,5.95215 -1.224895,4.1665 -1.133765,8.333 2.38085,12.4995 7.77138,5.5689 15.83991,9.5035 24.403764,10.71385 15.9467,2.91015 32.12713,5.0412 49.25393,4.01765 13.53319,-1.55345 27.199,-2.84165 37.64724,-10.565 7.41696,-3.9148 9.57699,-9.80095 10.71385,-16.0708 -1.1491,-6.68715 -2.97648,-13.34485 -13.0947,-19.64205 -10.03057,-6.67185 -20.92652,-10.1706 -32.14153,-12.4995 -17.96892,-2.87915 -35.80275,-1.9664 -52.974,-4.46395 -16.962344,-2.0638 -17.978594,-7.64395 -17.558814,-14.582746 -1.55086,-4.59945 7.83395,-12.36765 13.68992,-12.2019 10.898904,-1.20005 22.995044,-2.5708 38.986494,-1.488 10.18657,2.1145 20.57079,4.03135 31.54631,5.3569 19.23428,-1.2312 23.56941,-6.5704 24.40375,-12.4995 0.76904,-5.48375 0.84257,-11.20525 -4.16649,-17.856405 -3.3469,-3.83015 -8.16664,-6.482 -15.47555,-7.14255 -25.80935,-0.76405 -51.29432,5.6476 -79.758614,5.95215 -18.34454,-0.4225 -32.777509,-4.74995 -38.837699,-15.4756 -0.686105,-6.3489 -1.214195,-12.99545 7.737779,-19.3444 7.163605,-5.637 17.07073,-10.58535 28.9326,-12.3071"
    />
</svg>
```

In reality nobody sane edits path elements by hand, and the best way to change them is with the use of an SVG editor like <a class="blue-link" href="https://inkscape.org/">Inkscape</a>. I create my SVGs in Inkscape then cut out the "bloat elements" Inkscape adds that aren't needed.

## Single Path Animations
We'll start with a simple single path SVG:

<div class="half-width-left">
    <svg id="coffee" class="coffee" xmlns="http://www.w3.org/2000/svg" width="250" height="375" viewBox="0 0 250 375">
        <path style="fill:none;stroke:#000000;stroke-width:5;"
            d="m 19.892717,176.8917 1.190429,139.87515 c 3.078475,25.1789 11.076205,36.7905 41.069744,43.45065 21.81719,4.35025 40.50001,2.4318 60.11656,2.38085 29.56052,-2.41735 45.03841,-16.4321 47.61711,-41.06975 4.77735,-29.65355 -2.57891,-63.04595 2.3117,-95.7242 2.34095,-4.81735 1.6138,-10.7567 11.3782,-12.6047 4.893,-0.9099 8.9718,-0.73415 12.60465,0.035 7.01395,2.64455 11.4282,6.27795 13.7335,12.4634 2.27135,9.325 1.9101,18.65 1.04165,27.97505 -0.6871,6.0357 -2.34285,11.2697 -4.6129,15.32675 -5.56075,6.92775 -13.47125,11.10545 -19.3264,17.11985 -1.76685,2.77765 -1.1949,6.44065 -1.05965,9.21835 0.5008,3.07045 2.91735,4.2252 5.3569,5.3569 3.42525,0.73005 6.89725,1.2265 10.71385,0 7.5242,-2.499 12.99665,-7.5627 19.0468,-11.90425 4.9011,-5.3231 8.77275,-12.36185 12.4995,-19.64205 3.12195,-6.4744 3.27535,-14.4331 4.1665,-22.0229 -0.119,-7.5046 -0.4315,-14.9127 -1.33925,-22.02295 -4.8731,-19.68355 -18.54195,-35.8845 -38.54005,-39.28405 -5.1125,-0.42 -11.90225,0.1125 -20.622,-1.12135 -5.4145,-2.00515 -6.06795,-5.30365 -6.1265,-8.78685 0.78285,-7.14255 -0.6129,-14.4956 -4.20258,-21.63815 -6.66151,-9.72085 -18.17041,-13.45375 -31.54633,-14.88035 -22.53748,-3.28225 -43.72335,-3.05035 -64.28306,-1.1904 -9.30141,0.7866 -18.504954,1.1328 -28.570254,5.3569 -2.97607,1.27915 -5.95214,2.72185 -8.9282,5.95215 -1.224895,4.1665 -1.133765,8.333 2.38085,12.4995 7.77138,5.5689 15.83991,9.5035 24.403764,10.71385 15.9467,2.91015 32.12713,5.0412 49.25393,4.01765 13.53319,-1.55345 27.199,-2.84165 37.64724,-10.565 7.41696,-3.9148 9.57699,-9.80095 10.71385,-16.0708 -1.1491,-6.68715 -2.97648,-13.34485 -13.0947,-19.64205 -10.03057,-6.67185 -20.92652,-10.1706 -32.14153,-12.4995 -17.96892,-2.87915 -35.80275,-1.9664 -52.974,-4.46395 -16.962344,-2.0638 -17.978594,-7.64395 -17.558814,-14.582746 -1.55086,-4.59945 7.83395,-12.36765 13.68992,-12.2019 10.898904,-1.20005 22.995044,-2.5708 38.986494,-1.488 10.18657,2.1145 20.57079,4.03135 31.54631,5.3569 19.23428,-1.2312 23.56941,-6.5704 24.40375,-12.4995 0.76904,-5.48375 0.84257,-11.20525 -4.16649,-17.856405 -3.3469,-3.83015 -8.16664,-6.482 -15.47555,-7.14255 -25.80935,-0.76405 -51.29432,5.6476 -79.758614,5.95215 -18.34454,-0.4225 -32.777509,-4.74995 -38.837699,-15.4756 -0.686105,-6.3489 -1.214195,-12.99545 7.737779,-19.3444 7.163605,-5.637 17.07073,-10.58535 28.9326,-12.3071"
        />
    </svg>
</div>
<style>
    .coffee {
        max-width: 250px;
        max-height: 375px;
        width: 100%;
        height: 100%;
    }
</style>
<div class="half-width-right">
    <svg id="coffee-dashed" class="coffee-dashed" xmlns="http://www.w3.org/2000/svg" width="250" height="375" viewBox="0 0 250 375">
        <path style="fill:none;stroke:#000000;stroke-width:5;"
            d="m 19.892717,176.8917 1.190429,139.87515 c 3.078475,25.1789 11.076205,36.7905 41.069744,43.45065 21.81719,4.35025 40.50001,2.4318 60.11656,2.38085 29.56052,-2.41735 45.03841,-16.4321 47.61711,-41.06975 4.77735,-29.65355 -2.57891,-63.04595 2.3117,-95.7242 2.34095,-4.81735 1.6138,-10.7567 11.3782,-12.6047 4.893,-0.9099 8.9718,-0.73415 12.60465,0.035 7.01395,2.64455 11.4282,6.27795 13.7335,12.4634 2.27135,9.325 1.9101,18.65 1.04165,27.97505 -0.6871,6.0357 -2.34285,11.2697 -4.6129,15.32675 -5.56075,6.92775 -13.47125,11.10545 -19.3264,17.11985 -1.76685,2.77765 -1.1949,6.44065 -1.05965,9.21835 0.5008,3.07045 2.91735,4.2252 5.3569,5.3569 3.42525,0.73005 6.89725,1.2265 10.71385,0 7.5242,-2.499 12.99665,-7.5627 19.0468,-11.90425 4.9011,-5.3231 8.77275,-12.36185 12.4995,-19.64205 3.12195,-6.4744 3.27535,-14.4331 4.1665,-22.0229 -0.119,-7.5046 -0.4315,-14.9127 -1.33925,-22.02295 -4.8731,-19.68355 -18.54195,-35.8845 -38.54005,-39.28405 -5.1125,-0.42 -11.90225,0.1125 -20.622,-1.12135 -5.4145,-2.00515 -6.06795,-5.30365 -6.1265,-8.78685 0.78285,-7.14255 -0.6129,-14.4956 -4.20258,-21.63815 -6.66151,-9.72085 -18.17041,-13.45375 -31.54633,-14.88035 -22.53748,-3.28225 -43.72335,-3.05035 -64.28306,-1.1904 -9.30141,0.7866 -18.504954,1.1328 -28.570254,5.3569 -2.97607,1.27915 -5.95214,2.72185 -8.9282,5.95215 -1.224895,4.1665 -1.133765,8.333 2.38085,12.4995 7.77138,5.5689 15.83991,9.5035 24.403764,10.71385 15.9467,2.91015 32.12713,5.0412 49.25393,4.01765 13.53319,-1.55345 27.199,-2.84165 37.64724,-10.565 7.41696,-3.9148 9.57699,-9.80095 10.71385,-16.0708 -1.1491,-6.68715 -2.97648,-13.34485 -13.0947,-19.64205 -10.03057,-6.67185 -20.92652,-10.1706 -32.14153,-12.4995 -17.96892,-2.87915 -35.80275,-1.9664 -52.974,-4.46395 -16.962344,-2.0638 -17.978594,-7.64395 -17.558814,-14.582746 -1.55086,-4.59945 7.83395,-12.36765 13.68992,-12.2019 10.898904,-1.20005 22.995044,-2.5708 38.986494,-1.488 10.18657,2.1145 20.57079,4.03135 31.54631,5.3569 19.23428,-1.2312 23.56941,-6.5704 24.40375,-12.4995 0.76904,-5.48375 0.84257,-11.20525 -4.16649,-17.856405 -3.3469,-3.83015 -8.16664,-6.482 -15.47555,-7.14255 -25.80935,-0.76405 -51.29432,5.6476 -79.758614,5.95215 -18.34454,-0.4225 -32.777509,-4.74995 -38.837699,-15.4756 -0.686105,-6.3489 -1.214195,-12.99545 7.737779,-19.3444 7.163605,-5.637 17.07073,-10.58535 28.9326,-12.3071"
        />
    </svg>
</div>
<style>
    .coffee-dashed {
        max-width: 250px;
        max-height: 375px;
        width: 100%;
        height: 100%;
    }
    .coffee-dashed path {
        stroke-dasharray: 20 20;
        stroke-dashoffset: 1547;
        animation: coffee-dash 20s linear infinite;
        animation-play-state: paused;
    }
    @keyframes coffee-dash {
        100% {
            stroke-dashoffset: 0;
        }
    }
</style>

```css
.coffee-dashed path {
    stroke-dasharray: 20 20;
    stroke-dashoffset: 1547;
    animation: coffee-dash 20s linear infinite;
}
@keyframes coffee-dash {
    100% {
        stroke-dashoffset: 0;
    }
}
```

We can add dashes to an SVG path with the use of the `stroke-dasharray` property, the first number gives the length of the dashes and the second gives the length of the gaps. The `stroke-dashoffset` property specifies where the dasharray starts. By changing the `stroke-dashoffset` from the path length to 0 using a `@keyframes` animation we can move the dashes about (try clicking on the dashed mug). 

Now imagine we made the dashes and gaps the length of the path, such that we only ever see one dash. To do this we increase the  `stroke-dasharray` values to the path length and we've got a coffee mug that draws itself:

<div style="justify-self: center;">
    <svg id="coffee-drawself" class="coffee-drawself" xmlns="http://www.w3.org/2000/svg" width="250" height="375" viewBox="0 0 250 375">
        <path style="fill:none;stroke:#000000;stroke-width:5;"
            d="m 19.892717,176.8917 1.190429,139.87515 c 3.078475,25.1789 11.076205,36.7905 41.069744,43.45065 21.81719,4.35025 40.50001,2.4318 60.11656,2.38085 29.56052,-2.41735 45.03841,-16.4321 47.61711,-41.06975 4.77735,-29.65355 -2.57891,-63.04595 2.3117,-95.7242 2.34095,-4.81735 1.6138,-10.7567 11.3782,-12.6047 4.893,-0.9099 8.9718,-0.73415 12.60465,0.035 7.01395,2.64455 11.4282,6.27795 13.7335,12.4634 2.27135,9.325 1.9101,18.65 1.04165,27.97505 -0.6871,6.0357 -2.34285,11.2697 -4.6129,15.32675 -5.56075,6.92775 -13.47125,11.10545 -19.3264,17.11985 -1.76685,2.77765 -1.1949,6.44065 -1.05965,9.21835 0.5008,3.07045 2.91735,4.2252 5.3569,5.3569 3.42525,0.73005 6.89725,1.2265 10.71385,0 7.5242,-2.499 12.99665,-7.5627 19.0468,-11.90425 4.9011,-5.3231 8.77275,-12.36185 12.4995,-19.64205 3.12195,-6.4744 3.27535,-14.4331 4.1665,-22.0229 -0.119,-7.5046 -0.4315,-14.9127 -1.33925,-22.02295 -4.8731,-19.68355 -18.54195,-35.8845 -38.54005,-39.28405 -5.1125,-0.42 -11.90225,0.1125 -20.622,-1.12135 -5.4145,-2.00515 -6.06795,-5.30365 -6.1265,-8.78685 0.78285,-7.14255 -0.6129,-14.4956 -4.20258,-21.63815 -6.66151,-9.72085 -18.17041,-13.45375 -31.54633,-14.88035 -22.53748,-3.28225 -43.72335,-3.05035 -64.28306,-1.1904 -9.30141,0.7866 -18.504954,1.1328 -28.570254,5.3569 -2.97607,1.27915 -5.95214,2.72185 -8.9282,5.95215 -1.224895,4.1665 -1.133765,8.333 2.38085,12.4995 7.77138,5.5689 15.83991,9.5035 24.403764,10.71385 15.9467,2.91015 32.12713,5.0412 49.25393,4.01765 13.53319,-1.55345 27.199,-2.84165 37.64724,-10.565 7.41696,-3.9148 9.57699,-9.80095 10.71385,-16.0708 -1.1491,-6.68715 -2.97648,-13.34485 -13.0947,-19.64205 -10.03057,-6.67185 -20.92652,-10.1706 -32.14153,-12.4995 -17.96892,-2.87915 -35.80275,-1.9664 -52.974,-4.46395 -16.962344,-2.0638 -17.978594,-7.64395 -17.558814,-14.582746 -1.55086,-4.59945 7.83395,-12.36765 13.68992,-12.2019 10.898904,-1.20005 22.995044,-2.5708 38.986494,-1.488 10.18657,2.1145 20.57079,4.03135 31.54631,5.3569 19.23428,-1.2312 23.56941,-6.5704 24.40375,-12.4995 0.76904,-5.48375 0.84257,-11.20525 -4.16649,-17.856405 -3.3469,-3.83015 -8.16664,-6.482 -15.47555,-7.14255 -25.80935,-0.76405 -51.29432,5.6476 -79.758614,5.95215 -18.34454,-0.4225 -32.777509,-4.74995 -38.837699,-15.4756 -0.686105,-6.3489 -1.214195,-12.99545 7.737779,-19.3444 7.163605,-5.637 17.07073,-10.58535 28.9326,-12.3071"
        />
    </svg>
</div>
<style>
    .coffee-drawself {
        max-width: 250px;
        max-height: 375px;
        width: 100%;
        height: 100%;
    }
    .coffee-drawself path {
        stroke-dasharray: 1547 1547;
        stroke-dashoffset: 1547;
        animation: draw 15s linear infinite;
    }
    @keyframes draw {
        0% {
            stroke-dashoffset: 1547;
          }
        75%, 100% {
            stroke-dashoffset: 0;
        }
    }
</style>

```css
.coffee-drawself path {
    stroke-dasharray: 1547 1547;
    stroke-dashoffset: 1547;
    animation: draw 15s linear infinite;
}
@keyframes draw {
    0% {
        stroke-dashoffset: 1547;
    }
    75%, 100% {
        stroke-dashoffset: 0; /* Pause for 75%-100% of animation */
    }
}
```

But wait, how do you know the path length? It turns out there is a handy JavaScript method `getTotalLength` that does this for you:

```javascript
var path = document.querySelector(".coffee-drawself path");
var length = path.getTotalLength(); // 1546.7664794921875
```

## Multi-path Animations

To do multi-path animations we can reproduce what we did for single line animations in JavaScript, then repeat that over all the paths in the SVG. Try clicking on this cupcake:

<div style="justify-self: center;">
    <svg id="cupcake-drawself" class="cupcake-drawself" xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250">
        <path style="fill:#ee65a4;fill-opacity:1;stroke:#000000;stroke-width:6.25"
        d="M 24.888864,136.58936 C 22.165239,124.8283 24.815734,113.31155 39.358301,102.3353 32.218181,84.05105 25.946861,65.91155 51.169991,53.02118 68.707801,31.32399 83.147491,6.2081747 122.63118,8.7271127 c 7.44662,0.431875 3.40325,7.2600623 3.40325,7.2600623 -8.29732,11.464005 -5.74994,21.503685 10.28462,29.043185 7.95788,3.72542 76.21159,9.48379 71.06144,57.00963 8.72581,3.0545 15.37144,9.85343 12.40237,33.95881"
        />
        <path style="fill:#f7e6c4;fill-opacity:1;stroke:#000000;stroke-width:6.25"
            d="M 39.062991,231.37874 18.305927,142.30586 c -0.2475,-1.91925 1.253437,-5.62831 6.135625,-5.52562 l 196.614558,-0.3475 c 9.52819,-0.36875 11.33825,3.89356 10.48475,9.75393 l -20.02625,83.42032 c -1.3895,7.466 -5.50068,11.43275 -12.40237,11.81175 H 52.055931 c -10.71863,0.455 -11.05069,-4.5555 -12.99294,-10.03994 z"
        />
        <path style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 51.169991,53.02118 C 97.879551,88.79786 151.54143,94.44186 207.38049,102.03999"
        />
        <path style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 81.880611,136.58936 C 67.256301,126.97205 52.463551,118.02849 39.358301,102.3353"
        />
        <path style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 68.592361,241.12342 57.666491,135.9988"
        />
        <path style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 105.79943,241.12342 101.96055,136.58936"
        />
        <path style="fill:none;stroke:#000000;stroke-width:6.25"
            d="m 143.8923,241.41874 3.54356,-104.53407"
        />
        <path style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 180.50874,241.12342 192.91111,136.58936"
        />
    </svg>
</div>
<style>
    .cupcake-drawself {
        max-width: 250px;
        max-height: 250px;
        width: 100%;
        height: 100%;
    }
</style>

```javascript
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
```

Finally if you want to make things really snazzy you can add fade effects by varying `fill-opacity` and adding path class names to differentiate between lines and shade:

<div style="justify-self: center;">
    <svg id="cupcake-drawself-fade" class="cupcake-drawself-fade" xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250">
        <path class="shade" style="fill:#f7e6c4;fill-opacity:1;"
            d="M 39.062991,231.37874 18.305927,142.30586 c -0.2475,-1.91925 1.253437,-5.62831 6.135625,-5.52562 l 196.614558,-0.3475 c 9.52819,-0.36875 11.33825,3.89356 10.48475,9.75393 l -20.02625,83.42032 c -1.3895,7.466 -5.50068,11.43275 -12.40237,11.81175 H 52.055931 c -10.71863,0.455 -11.05069,-4.5555 -12.99294,-10.03994 z"
        />
        <path class="shade" style="fill:#ee65a4;fill-opacity:1;"
        d="M 24.888864,136.58936 C 22.165239,124.8283 24.815734,113.31155 39.358301,102.3353 32.218181,84.05105 25.946861,65.91155 51.169991,53.02118 68.707801,31.32399 83.147491,6.2081747 122.63118,8.7271127 c 7.44662,0.431875 3.40325,7.2600623 3.40325,7.2600623 -8.29732,11.464005 -5.74994,21.503685 10.28462,29.043185 7.95788,3.72542 76.21159,9.48379 71.06144,57.00963 8.72581,3.0545 15.37144,9.85343 12.40237,33.95881"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
        d="M 24.888864,136.58936 C 22.165239,124.8283 24.815734,113.31155 39.358301,102.3353 32.218181,84.05105 25.946861,65.91155 51.169991,53.02118 68.707801,31.32399 83.147491,6.2081747 122.63118,8.7271127 c 7.44662,0.431875 3.40325,7.2600623 3.40325,7.2600623 -8.29732,11.464005 -5.74994,21.503685 10.28462,29.043185 7.95788,3.72542 76.21159,9.48379 71.06144,57.00963 8.72581,3.0545 15.37144,9.85343 12.40237,33.95881"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 39.062991,231.37874 18.305927,142.30586 c -0.2475,-1.91925 1.253437,-5.62831 6.135625,-5.52562 l 196.614558,-0.3475 c 9.52819,-0.36875 11.33825,3.89356 10.48475,9.75393 l -20.02625,83.42032 c -1.3895,7.466 -5.50068,11.43275 -12.40237,11.81175 H 52.055931 c -10.71863,0.455 -11.05069,-4.5555 -12.99294,-10.03994 z"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 51.169991,53.02118 C 97.879551,88.79786 151.54143,94.44186 207.38049,102.03999"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 81.880611,136.58936 C 67.256301,126.97205 52.463551,118.02849 39.358301,102.3353"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 68.592361,241.12342 57.666491,135.9988"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 105.79943,241.12342 101.96055,136.58936"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
            d="m 143.8923,241.41874 3.54356,-104.53407"
        />
        <path class="line" style="fill:none;stroke:#000000;stroke-width:6.25"
            d="M 180.50874,241.12342 192.91111,136.58936"
        />
    </svg>
</div>
<style>
    .cupcake-drawself {
        max-width: 250px;
        max-height: 250px;
        width: 100%;
        height: 100%;
    }
</style>

```javascript
var cupcakeFade = document.querySelector(".cupcake-drawself-fade");
var cupcakeLines = Array.from(cupcakeFade.querySelectorAll(".line"));
var cupcakeShades = Array.from(cupcakeFade.querySelectorAll(".shade"));
var cupcakeFadePaths = [...cupcakeLines, ...cupcakeShades]; // Run shades last.

var cupcakeFadeAnimations = cupcakeFadePaths.map(function(path){
    var pathLength = path.getTotalLength();
    var duration = Math.pow(pathLength, 0.5) * 0.03;
    return {path, pathLength, duration};
});

function runCupcakeFadeAnimations(){
    // Initial conditions
    cupcakeFadeAnimations.forEach(function(animation){
        animation.path.style.transition = "none"; // Clear previous transition => fast removal
        animation.path.style.strokeDasharray = `${animation.pathLength} ${animation.pathLength}`;
        animation.path.style.strokeDashoffset = animation.pathLength;
        animation.path.style.fillOpacity = "0";
        animation.path.getBoundingClientRect(); // Trigger reflow of each path
    });

    // Triggering a reflow on first path so we animate from here
    cupcakeFadeAnimations[0].path.getBoundingClientRect();

    // Run line animations
    var begin = 0;
    cupcakeFadeAnimations.forEach(function(animation) {
        animation.path.style.transition = `stroke-dashoffset ${animation.duration}s ${begin}s ease-in-out, fill-opacity ${animation.duration}s ${begin}s ease-in-out`;
        animation.path.style.strokeDashoffset = "0";
        animation.path.style.fillOpacity = "1.0";
        begin += animation.duration + 0.1; // Slight 0.1s delay for drawing effect
    });
}

cupcakeFade.addEventListener("click", runCupcakeFadeAnimations);
```

As always the full code for all these animations is on my <a href="https://github.com/george-pearson" class="blue-link">GitHub</a>.

## Further reading
* <a class="blue-link" href="https://jakearchibald.com/2013/animated-line-drawing-svg/">Jake Archibald's blog post on this in 2013!</a>
* <a class="blue-link" href="https://css-tricks.com/svg-line-animation-works/">CSS-Tricks on SVG line animation</a>