gsap.registerPlugin(ScrollTrigger);
let tl = gsap.timeline({
  scrollTrigger: {
      trigger: "#container",
      start: `center center`,
      end: "bottom top",
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true
  }
});

tl.addLabel("endOfPart3");
let tween23, tween24;

function calculations(){
  console.log("called");
  let currentProgress = tl.progress();
  tl.progress(0);

  var svg = document.getElementById('container');
  svg.style.display = 'none';
  svg.offsetHeight; // Trigger reflow
  svg.style.display = '';
  var matrix = svg.getScreenCTM();
  var inverseMatrix = matrix.inverse();
  console.log("orig", inverseMatrix);
  
    let clonedSVG = svg.cloneNode(true);
    clonedSVG.style.visibility = 'hidden';
    document.body.appendChild(clonedSVG);

    // Perform calculations on clonedSVG
    var clonedMatrix = clonedSVG.getScreenCTM();
    var clonedInverseMatrix = clonedMatrix.inverse();
    console.log("clone", clonedInverseMatrix);

    // Perform other calculations here...

    // Remove the cloned SVG from the DOM when done
    document.body.removeChild(clonedSVG);

  var point = svg.createSVGPoint();
  point.x = 100;
  point.y = 100;
  point = point.matrixTransform(inverseMatrix);
  console.log("point", point);
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", point.x);
  circle.setAttribute("cy", point.y);
  circle.setAttribute("r", 5); // radius of the circle
  circle.setAttribute("fill", "red"); // color of the circle

  // Append the circle to the SVG
  svg.appendChild(circle);
  if (tween23) {
    tween23.kill();
  }

  // If tween24 exists, kill it to remove it from the timeline
  if (tween24) {
    tween24.kill();
  }

  // Create new tweens with updated values
  tween23 = gsap.to("#Linie1-copy", {
    attr: {
      x1: point.x,
      y1: point.y,
      x2: point.x - 36,
      y2: point.y +  21
    },
    ease: "none"
  });

  tween24 = gsap.to("#Linie1-copy", {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  });

  // Add the new tweens to the timeline
  tl.add(tween23, "endOfPart3");
  tl.add(tween24, "endOfPart3");
  tl.progress(currentProgress);
  console.log("tween23", tween23);
}


  calculations();

window.addEventListener("resize", calculations);

