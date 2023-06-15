gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
/* Main navigation */
let panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  tween;

/* Panels */
const panels = gsap.utils.toArray("#panels-container .paneltino");
tween = gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#panels-container",
    pin: true,
    start: "center center",
    scrub: 1,
    /*
    snap: {
      snapTo: 1 / (panels.length - 1),
      inertia: false,
      duration: {min: 0.1, max: 0.1}
    },*/
    end: () => "+=" + (panelsContainer.offsetWidth)
  }
});