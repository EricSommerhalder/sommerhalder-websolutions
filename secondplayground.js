gsap.registerPlugin(ScrollTrigger);

const startLines = gsap.utils.toArray("#start line");
const finalValues = [
  { x1: 0, x2: 10, y1: 0, y2: 40 },
  { x1: 10, x2: 100, y1: 10, y2: 10 },
  { x1: 100, x2: 100, y1: 10, y2: 40 },
  { x1: 10, x2: 100, y1: 40, y2: 40 }
];

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".container",
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 0.5,
      markers: true
    }
  }).to("#start1", {x: "+=100", y: "+=100"})
  .to(startLines, {
    duration: 1,
    stagger: 0.1,
    attr: (i) => finalValues[i],
    ease: "none"
  })
  .to("#start1", {x: "-=100", y: "-=100"});

