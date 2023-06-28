gsap.registerPlugin(ScrollTrigger);
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

let initialHeight = document.getElementById('Linie7').getBoundingClientRect().height;
let targetHeight = 64/3; //TODO do muesch denn no luege wägem kleinere fall bi kleinere screens
let targetScale = targetHeight/initialHeight;

  var svg = document.getElementById('container');
  let l6 = document.getElementById('Linie6');
  let l1c = document.getElementById('Linie1-copy');
  let l7 = document.getElementById('Linie7');
  let l8 = document.getElementById('Linie8');
  var matrix = l6.getScreenCTM();
  var inverseMatrix = matrix.inverse();

  var point = svg.createSVGPoint();
  point.x = 81;
  point.y = 25;
  point = point.matrixTransform(inverseMatrix);

  const deltaX6 = (l6.getAttribute('x2') - l6.getAttribute('x1'))*targetScale;
  const deltaY6 = (l6.getAttribute('y2') - l6.getAttribute('y1'))*targetScale;
  const deltaX1c = (l1c.getAttribute('x2') - l1c.getAttribute('x1'))*targetScale;
  const deltaY1c = (l1c.getAttribute('y2') - l1c.getAttribute('y1'))*targetScale;
  const deltaX7 = (l7.getAttribute('x2') - l7.getAttribute('x1'))*targetScale;
  const deltaY7 = (l7.getAttribute('y2') - l7.getAttribute('y1'))*targetScale;
  const deltaX8 = (l8.getAttribute('x2') - l8.getAttribute('x1'))*targetScale;
  const deltaY8 = (l8.getAttribute('y2') - l8.getAttribute('y1'))*targetScale;



let tween24 = gsap.to("#Linie1-copy", {x: 0, y: 0, scale: 1, rotation: 0});
let tween23 = gsap.to("#Linie1-copy", {attr: {x1: point.x, y1: point.y, x2: point.x + deltaX1c, y2: point.y + deltaY1c}, ease: "none"});
tl.add(tween23, "endOfPart3");
tl.add(tween24, "endOfPart3");

let tween22 = gsap.to("#Linie6", {x: 0, y: 0, scale: 1, rotation: 0});
let tween21 = gsap.to("#Linie6", {attr: {x1: point.x + deltaX1c, y1: point.y + deltaY1c, x2: point.x + deltaX1c + deltaX6, y2: point.y + deltaY1c + deltaY6}, ease: "none"});
tl.add(tween21, "endOfPart3");
tl.add(tween22, "endOfPart3");

let tween25 = gsap.to("#Linie7", {x: 0, y: 0, scale: 1, rotation: 0});
let tween26 = gsap.to("#Linie7", {attr: {x1: point.x, y1: point.y, x2: point.x - deltaX7, y2: point.y - deltaY7}, ease: "none"});
tl.add(tween25, "endOfPart3");
tl.add(tween26, "endOfPart3");

let tween27 = gsap.to("#Linie8", {x: 0, y: 0, scale: 1, rotation: 0});
let tween28 = gsap.to("#Linie8", {attr: {x1: point.x - deltaX7, y1: point.y - deltaY7, x2: point.x - deltaX7 + deltaX8, y2: point.y - deltaY7 + deltaY8}, ease: "none"});
tl.add(tween27, "endOfPart3");
tl.add(tween28, "endOfPart3");

let tween29 = gsap.to("#Linie1", {
  scale: 0.6,       // Shrink to 50% of its original size
  rotation: 25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=100"
});
tl.add(tween29, "endOfPart3");

let tween30 = gsap.to("#Linie2", {
  x: "-=200"
});
tl.add(tween30, "endOfPart3");

let tween31 = gsap.to("#Linie5", {
  scale: 0.6,       // Shrink to 50% of its original size
  rotation: 20,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=80"
});
tl.add(tween31, "endOfPart3");

let tween32 = gsap.to("#Linie3", {
  scale: 0.7,
  rotation: 20,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=250",
  y: "-=100"
});
tl.add(tween32, "endOfPart3");

tl.addLabel("endOfPart4");

let l1 = document.getElementById('Linie1');
let l2 = document.getElementById('Linie2');
let l5 = document.getElementById('Linie5');
let l3 = document.getElementById('Linie3');

const deltaX1 = (l1.getAttribute('x2') - l1.getAttribute('x1'))*targetScale;
const deltaY1 = (l1.getAttribute('y2') - l1.getAttribute('y1'))*targetScale;
const deltaX2 = (l2.getAttribute('x2') - l2.getAttribute('x1'))*targetScale;
const deltaY2 = (l2.getAttribute('y2') - l2.getAttribute('y1'))*targetScale;
const deltaX5 = (l5.getAttribute('x2') - l5.getAttribute('x1'))*targetScale;
const deltaY5 = (l5.getAttribute('y2') - l5.getAttribute('y1'))*targetScale;
const deltaX3 = (l3.getAttribute('x2') - l3.getAttribute('x1'))*targetScale;
const deltaY3 = (l3.getAttribute('y2') - l3.getAttribute('y1'))*targetScale;

let tween33 = gsap.to("#Linie1", {x: 0, y: 0, scale: 1, rotation: 0});
let tween34 = gsap.to("#Linie1", {attr: {x1: point.x, y1: point.y, x2: point.x + deltaX1, y2: point.y + deltaY1}, ease: "none"});
tl.add(tween33, "endOfPart4");
tl.add(tween34, "endOfPart4");

let tween35 = gsap.to("#Linie2", {x: 0, y: 0, scale: 1, rotation: 0});
let tween36 = gsap.to("#Linie2", {attr: {x1: point.x - deltaX2, y1: point.y - deltaY2, x2: point.x, y2: point.y}, ease: "none"});
tl.add(tween35, "endOfPart4");
tl.add(tween36, "endOfPart4");

let tween37 = gsap.to("#Linie5", {x: 0, y: 0, scale: 1, rotation: 0});
let tween38 = gsap.to("#Linie5", {attr: {x1: point.x + deltaX1, y1: point.y + deltaY1, x2: point.x + deltaX1 + deltaX5, y2: point.y + deltaY1 + deltaY5}, ease: "none"});
tl.add(tween37, "endOfPart4");
tl.add(tween38, "endOfPart4");

let tween39 = gsap.to("#Linie3", {x: 0, y: 0, scale: 1, rotation: 0});
let tween40 = gsap.to("#Linie3", {attr: {x1: point.x - deltaX2 - deltaX3, y1: point.y - deltaY2 - deltaY3, x2: point.x - deltaX2, y2: point.y - deltaY2}, ease: "none"});
tl.add(tween39, "endOfPart4");
tl.add(tween40, "endOfPart4");

let tween41 = gsap.to("#Linie8-copy", {
  scale: 0.5,       // Shrink to 50% of its original size
  rotation: -25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=100"
});
tl.add(tween41, "endOfPart4");

let tween42 = gsap.to("#Linie9", {
  scale: 0.8,       // Shrink to 50% of its original size
  rotation: 25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=100"
});
tl.add(tween42, "endOfPart4");

let tween43 = gsap.to("#Linie10-copy", {
    // Shrink to 50% of its original size
  rotation: -25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center"
});
tl.add(tween43, "endOfPart4");

let tween44 = gsap.to("#Linie11", {
  // Shrink to 50% of its original size
rotation: 25,    // Rotate 180 degrees clockwise
transformOrigin: "center center"
});
tl.add(tween44, "endOfPart4");

tl.addLabel("endOfPart5");

let l8c = document.getElementById('Linie8-copy');
let l9 = document.getElementById('Linie9');
let l10c = document.getElementById('Linie10-copy');
let l11 = document.getElementById('Linie11');

const deltaX8c = (l8c.getAttribute('x2') - l8c.getAttribute('x1'))*targetScale;
const deltaY8c = (l8c.getAttribute('y2') - l8c.getAttribute('y1'))*targetScale;
const deltaX9 = (l9.getAttribute('x2') - l9.getAttribute('x1'))*targetScale;
const deltaY9 = (l9.getAttribute('y2') - l9.getAttribute('y1'))*targetScale;
const deltaX10c = (l10c.getAttribute('x2') - l10c.getAttribute('x1'))*targetScale;
const deltaY10c = (l10c.getAttribute('y2') - l10c.getAttribute('y1'))*targetScale;
const deltaX11 = (l11.getAttribute('x2') - l11.getAttribute('x1'))*targetScale;
const deltaY11 = (l11.getAttribute('y2') - l11.getAttribute('y1'))*targetScale;

let tween45 = gsap.to("#Linie8-copy", {x: 0, y: 0, scale: 1, rotation: 0});
let tween46 = gsap.to("#Linie8-copy", {attr: {x1: point.x - deltaX7, y1: point.y - deltaY7, x2: point.x - deltaX7 + deltaX8c, y2: point.y - deltaY7 + deltaY8c}, ease: "none"});
tl.add(tween45, "endOfPart5");
tl.add(tween46, "endOfPart5");

let tween47 = gsap.to("#Linie9", {x: 0, y: 0, scale: 1, rotation: 0});
let tween48 = gsap.to("#Linie9", {attr: {x2: point.x - deltaX7, y2: point.y - deltaY7, x1: point.x - deltaX7 - deltaX9, y1: point.y - deltaY7 - deltaY9}, ease: "none"});
tl.add(tween47, "endOfPart5");
tl.add(tween48, "endOfPart5");

let tween49 = gsap.to("#Linie11", {x: 0, y: 0, scale: 1, rotation: 0});
let tween50 = gsap.to("#Linie11", {attr: {x1: point.x - deltaX7  + deltaX8c, y1: point.y - deltaY7  + deltaY8c, x2: point.x - deltaX7  + deltaX8c + deltaX11, y2: point.y - deltaY7  + deltaY8c + deltaY11}, ease: "none"});
tl.add(tween49, "endOfPart5");
tl.add(tween50, "endOfPart5");

let tween51 = gsap.to("#Linie10-copy", {x: 0, y: 0, scale: 1, rotation: 0});
let tween52 = gsap.to("#Linie10-copy", {attr: {x2: point.x - deltaX7 - deltaX9, y2: point.y - deltaY7 - deltaY9, x1: point.x - deltaX7 - deltaX9 - deltaX10c, y1: point.y - deltaY7 - deltaY9 - deltaY10c}, ease: "none"});
tl.add(tween51, "endOfPart5");
tl.add(tween52, "endOfPart5");

let tween53 = gsap.to("#Linie10", {
  scale: 0.7,       // Shrink to 50% of its original size
  rotation: -40,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=400",
  y: "-=300"
});
tl.add(tween53, "endOfPart5");

let tween54 = gsap.to("#Linie12", {
  rotation: -20,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=400",
  y: "-=300"
});
tl.add(tween54, "endOfPart5");

let tween55 = gsap.to("#Linie16-copy", {
  rotation: -50,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=100",
  y: "-=80"
});
tl.add(tween55, "endOfPart5");

let tween56 = gsap.to("#Linie13", {
  rotation: -30,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=500",
  y: "-=400"
});
tl.add(tween56, "endOfPart5");

tl.addLabel("endOfPart6");

let l10 = document.getElementById('Linie10');
let l12 = document.getElementById('Linie12');
let l16c = document.getElementById('Linie16-copy');
let l13 = document.getElementById('Linie13');

const deltaX10 = (l10.getAttribute('x2') - l10.getAttribute('x1'))*targetScale;
const deltaY10 = (l10.getAttribute('y2') - l10.getAttribute('y1'))*targetScale;
const deltaX12 = (l12.getAttribute('x2') - l12.getAttribute('x1'))*targetScale;
const deltaY12 = (l12.getAttribute('y2') - l12.getAttribute('y1'))*targetScale;
const deltaX16c = (l16c.getAttribute('x2') - l16c.getAttribute('x1'))*targetScale;
const deltaY16c = (l16c.getAttribute('y2') - l16c.getAttribute('y1'))*targetScale;
const deltaX13 = (l13.getAttribute('x2') - l13.getAttribute('x1'))*targetScale;
const deltaY13 = (l13.getAttribute('y2') - l13.getAttribute('y1'))*targetScale;

let tween57 = gsap.to("#Linie10", {x: 0, y: 0, scale: 1, rotation: 0});
let tween58 = gsap.to("#Linie10", {attr: {x2: point.x - deltaX7 - deltaX9, y2: point.y - deltaY7 - deltaY9, x1: point.x - deltaX7 - deltaX9 - deltaX10, y1: point.y - deltaY7 - deltaY9 - deltaY10}, ease: "none"});
tl.add(tween57, "endOfPart6");
tl.add(tween58, "endOfPart6");

let tween59 = gsap.to("#Linie13", {x: 0, y: 0, scale: 1, rotation: 0});
let tween60 = gsap.to("#Linie13", {attr: {x1: point.x - deltaX7 - deltaX9 - deltaX10, y1: point.y - deltaY7 - deltaY9 - deltaY10, x2: point.x - deltaX7 - deltaX9 - deltaX10 + deltaX13, y2: point.y - deltaY7 - deltaY9 - deltaY10 + deltaY13}, ease: "none"});
tl.add(tween59, "endOfPart6");
tl.add(tween60, "endOfPart6");

let tween61 = gsap.to("#Linie12", {x: 0, y: 0, scale: 1, rotation: 0});
let tween62 = gsap.to("#Linie12", {attr: {x2: point.x - deltaX7 - deltaX9, y2: point.y - deltaY7 - deltaY9, x1: point.x - deltaX7 - deltaX9 - deltaX12, y1: point.y - deltaY7 - deltaY9 - deltaY12}, ease: "none"});
tl.add(tween61, "endOfPart6");
tl.add(tween62, "endOfPart6");

let tween63 = gsap.to("#Linie16-copy", {x: 0, y: 0, scale: 1, rotation: 0});
let tween64 = gsap.to("#Linie16-copy", {attr: {x2: point.x - deltaX7 - deltaX9 - deltaX12, y2: point.y - deltaY7 - deltaY9 - deltaY12, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16c, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16c}, ease: "none"});
tl.add(tween63, "endOfPart6");
tl.add(tween64, "endOfPart6");

let tween65 = gsap.to("#Linie14", {
  scale: 0.7,       // Shrink to 50% of its original size
  rotation: -40,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=300",
  y: "-=400"
});
tl.add(tween65, "endOfPart6");

let tween66 = gsap.to("#Linie15", {
  scale: 0.8,       // Shrink to 50% of its original size
  rotation: -10,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=200"
});
tl.add(tween66, "endOfPart6");

let tween67 = gsap.to("#Linie17", {
  scale: 0.9,       // Shrink to 50% of its original size
  transformOrigin: "center center",
  x: "-=100",
  y: "-=100"
});
tl.add(tween67, "endOfPart6");

let tween68 = gsap.to("#Linie16", {
  scale: 0.9,       // Shrink to 50% of its original size
  rotation: 40,
  transformOrigin: "center center",
  x: "-=300",
  y: "-=300"
});
tl.add(tween68, "endOfPart6");

tl.addLabel("endOfPart7");

let l15 = document.getElementById('Linie15');
let l17 = document.getElementById('Linie17');
let l16 = document.getElementById('Linie16');
let l14 = document.getElementById('Linie14');

const deltaX15 = (l15.getAttribute('x2') - l15.getAttribute('x1'))*targetScale;
const deltaY15 = (l15.getAttribute('y2') - l15.getAttribute('y1'))*targetScale;
const deltaX17 = (l17.getAttribute('x2') - l17.getAttribute('x1'))*targetScale;
const deltaY17 = (l17.getAttribute('y2') - l17.getAttribute('y1'))*targetScale;
const deltaX16 = (l16.getAttribute('x2') - l16.getAttribute('x1'))*targetScale;
const deltaY16 = (l16.getAttribute('y2') - l16.getAttribute('y1'))*targetScale;
const deltaX14 = (l14.getAttribute('x2') - l14.getAttribute('x1'))*targetScale;
const deltaY14 = (l14.getAttribute('y2') - l14.getAttribute('y1'))*targetScale;

let tween69 = gsap.to("#Linie16", {x: 0, y: 0, scale: 1, rotation: 0});
let tween70 = gsap.to("#Linie16", {attr: {x2: point.x - deltaX7 - deltaX9 - deltaX12, y2: point.y - deltaY7 - deltaY9 - deltaY12, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16}, ease: "none"});
tl.add(tween69, "endOfPart7");
tl.add(tween70, "endOfPart7");

let tween71 = gsap.to("#Linie17", {x: 0, y: 0, scale: 1, rotation: 0});
let tween72 = gsap.to("#Linie17", {attr: {x2: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16, y2: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17}, ease: "none"});
tl.add(tween71, "endOfPart7");
tl.add(tween72, "endOfPart7");

let tween73 = gsap.to("#Linie14", {x: 0, y: 0, scale: 1, rotation: 0});
let tween74 = gsap.to("#Linie14", {attr: {x2: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17, y2: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17 - deltaX14, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17 - deltaY14}, ease: "none"});
tl.add(tween73, "endOfPart7");
tl.add(tween74, "endOfPart7");

let tween75 = gsap.to("#Linie15", {x: 0, y: 0, scale: 1, rotation: 0});
let tween76 = gsap.to("#Linie15", {attr: {x2: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17 - deltaX14, y2: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17 - deltaY14, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17 - deltaX14 - deltaX15, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17 - deltaY14 - deltaY15}, ease: "none"});
tl.add(tween75, "endOfPart7");
tl.add(tween76, "endOfPart7");