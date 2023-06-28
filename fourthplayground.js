gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
let tl = gsap.timeline({
  scrollTrigger: {
      trigger: "#container",
      start: `center center`,
      end: "bottom top",
      scrub: 1,
      pin: true
  }
});

let tween1 = gsap.to("#Linie1", {y: "-=80"});
let tween2 = gsap.to("#Linie2", {y: "-=80"});
let tween3 = gsap.to("#Linie3", {y: "-=80"});
let tween4 = gsap.to("#Linie5", {y: "-=80"});

let tween5 = gsap.to("#Linie14", {y: "+=80"});
let tween6 = gsap.to("#Linie15", {y: "+=80"});
let tween7 = gsap.to("#Linie16", {y: "+=80"});
let tween8 = gsap.to("#Linie17", {y: "+=80"});

// Add them to the timeline at the same position (0) so they start together
tl.add(tween1, 0);
tl.add(tween2, 0);
tl.add(tween3, 0);
tl.add(tween4, 0);
tl.add(tween5, 0);
tl.add(tween6, 0);
tl.add(tween7, 0);
tl.add(tween8, 0);

tl.addLabel("endOfPart1");
// Page 2 reached
let tween9 = gsap.to("#Linie1-copy", {x: "-=100", y: "-=100"});
let tween10 = gsap.to("#Linie6", {x: "-=100", y: "-=100"});
let tween11 = gsap.to("#Linie7", {x: "-=100", y: "-=100"});
let tween12 = gsap.to("#Linie8", {x: "-=100", y: "-=100"});

let tween13 = gsap.to("#Linie10", {x: "+=100", y: "+=100"});
let tween14 = gsap.to("#Linie13", {x: "+=100", y: "+=100"});
let tween15 = gsap.to("#Linie12", {x: "+=100", y: "+=100"});
let tween16 = gsap.to("#Linie16-copy", {x: "+=100", y: "+=100"});

tl.add(tween9, "endOfPart1");
tl.add(tween10, "endOfPart1");
tl.add(tween11, "endOfPart1");
tl.add(tween12, "endOfPart1");
tl.add(tween13, "endOfPart1");
tl.add(tween14, "endOfPart1");
tl.add(tween15, "endOfPart1");
tl.add(tween16, "endOfPart1");

tl.addLabel("endOfPart2");

//Page 3 reached

let tween17 = gsap.to("#Linie6", {
  scale: 0.5,       // Shrink to 50% of its original size
  rotation: 40,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=150"
});

let tween18 = gsap.to("#Linie8", {
  rotation: 10,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=50"
});

let tween19 = gsap.to("#Linie1-copy", {
  scale: 0.5,       // Shrink to 50% of its original size
  rotation: -140,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=250",
  y: "+=50"
});

let tween20 = gsap.to("#Linie7", {

  rotation: -50,    // Rotate 180 degrees clockwise
  transformOrigin: "center center"
});
tl.add(tween17, "endOfPart2");
tl.add(tween18, "endOfPart2");
tl.add(tween19, "endOfPart2");
tl.add(tween20, "endOfPart2");

tl.addLabel("endOfPart3");

//Page 4 reached
/*
TODO: end position of lines is completely arbitrary and weird af
*/

let currentX = document.getElementById("Linie6").getBoundingClientRect().x;
let currentY = document.getElementById("Linie6").getBoundingClientRect().y;
console.log(document.getElementById("Linie6").getBoundingClientRect());
console.log(currentX);
let tween21 = tl.to("#Linie6", {x: -currentX+125, y: currentY + 250});
tl.add(tween21, "endOfPart3");
/*let initialHeight = document.getElementById('Linie7').getBoundingClientRect().height;
let targetHeight = 64/3; //TODO do muesch denn no luege wägem kleinere fall bi kleinere screens
let targetScale = targetHeight/initialHeight;


let currentX = document.getElementById("Linie6").getBoundingClientRect().x;
let currentY = document.getElementById("Linie6").getBoundingClientRect().y;

let line6 = document.getElementById("Linie6");
let container = document.getElementById("container");
let container2 = document.getElementById("container2");
let topleft = document.getElementById("topleft");
//let coord = MotionPathPlugin.getRelativePosition(line6, topleft);
let coord = MotionPathPlugin.convertCoordinates(topleft, container2, {x: 0, y: 0});
console.log(coord);
coord = MotionPathPlugin.convertCoordinates(container2, line6, coord);
console.log(coord);
let tween21 = gsap.to("#Linie6", {
  scale: 2 * targetScale,       // Shrink to 50% of its original size
  rotation: 720,
  transformOrigin: "center center",
  x: coord.x ,
  y: coord.y
  /*x: -currentX - 210,
  y: -currentY - 150
});
currentX = document.getElementById("Linie1-copy").getBoundingClientRect().x;
currentY = document.getElementById("Linie1-copy").getBoundingClientRect().y;
let tween22 = gsap.to("#Linie1-copy", {
  scale: 2*targetScale,
  rotation: 720,
  transformOrigin: "center center",
  x: -currentX + 25,
  y: -currentY - 50

});

tl.add(tween21, "endOfPart3");
tl.add(tween22, "endOfPart3");
*/

/*tl.call(function() {
  let line6 = document.getElementById("Linie6");
  let container = document.getElementById("container");
  let container2 = document.getElementById("container2");
  let topleft = document.getElementById("topleft");

  let coord = MotionPathPlugin.convertCoordinates(container, container2, {x: 0, y: 0});
  console.log(coord);
  /*coord = MotionPathPlugin.convertCoordinates(container2, line6, coord);
  console.log(coord);
  let tween21 = gsap.to("#Linie6", {
           // Shrink to 50% of its original size
    rotation: 720,
    transformOrigin: "center center",
    x: "+=" + coord.x ,
    y: coord.y
  });

  tl.add(tween21, "endOfPart3");
}, null, "endOfPart3");*/



