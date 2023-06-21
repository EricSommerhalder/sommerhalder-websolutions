gsap.registerPlugin(ScrollTrigger);

let container = document.querySelector(".panels-container");
let tween = gsap.to(container, {
  x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px", // amount to scroll
  ease: "none",
  scrollTrigger: {
    trigger: container,
    scrub: true,
    
    pin: true, // pin the container
    end: () => "+=" + (container.scrollWidth - document.documentElement.clientWidth),
    invalidateOnRefresh: true,
  }
});

LottieScrollTrigger({
    target: "#lottie-animation-1",
    path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/speech_animation.json",
    speed: "veryfast",
    scrub: 1, // seconds it takes for the playhead to "catch up"
    pin: false,
    insideContainer: false,
    trigger: "#panel1"
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
  });
  
  LottieScrollTrigger({
    target: "#lottie-animation-2",
    path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/design_animation.json",
    speed: "veryfast",
    scrub: 1, // seconds it takes for the playhead to "catch up"
    pin: false,
    insideContainer: true,
    trigger: "#panel2",
    mobileStart: "top bottom"
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
  });
  
  LottieScrollTrigger({
    target: "#lottie-animation-3",
    path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/contract_animation.json",
    speed: "fast",
    scrub: 1, // seconds it takes for the playhead to "catch up"
    pin: false,
    insideContainer: true,
    trigger: "#lottie-animation-3",
    start: "bottom bottom",
    mobileStart: "top bottom",
    mobileSpeed: "veryfast"
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
  });
  LottieScrollTrigger({
    target: "#lottie-animation-4",
    path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/programming_animation.json",
    speed: "veryfast",
    scrub: 1, // seconds it takes for the playhead to "catch up"
    pin: false,
    insideContainer: true,
    trigger: "#lottie-animation-4",
    start: "bottom bottom",
    mobileStart: "top bottom"
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
  });
  LottieScrollTrigger({
    target: "#lottie-animation-5",
    path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/beer_animation.json",
    speed: "veryfast",
    scrub: 1, // seconds it takes for the playhead to "catch up"
    pin: false,
    insideContainer: true,
    trigger: "#panel5",
    mobileStart: "top bottom"
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
  });
  function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500", veryfast: "+=300" },
      st = { trigger: [vars.trigger] || target, pin: false, start: "top center", end: speeds[vars.speed] || "+=1000", scrub: 1 },
      ctx = gsap.context && gsap.context(),
      animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        loop: false,
        autoplay: false,
        path: vars.path,
        rendererSettings: vars.rendererSettings || { preserveAspectRatio: 'xMidYMid slice' }
      });
    for (let p in vars) { // let users override the ScrollTrigger defaults
      st[p] = vars[p];
    }
    if (vars.insideContainer === true){
      st["containerAnimation"]= tween;
    }
    animation.addEventListener("DOMLoaded", function () {
      let createTween = function () {
        if (vars.mobileStart) {
          // Use ScrollTrigger matchMedia to define different start values
          ScrollTrigger.matchMedia({
            // For mobile screens (below 768px)
            "(max-width: 768px)": function () {
              st.start = vars.mobileStart;
            }
          });
        }
        if (vars.mobileSpeed) {
          // Use ScrollTrigger matchMedia to define different start values
          ScrollTrigger.matchMedia({
            // For mobile screens (below 768px)
            "(max-width: 768px)": function () {
              st.end = speeds[vars.mobileSpeed];
            }
          });
        }
        animation.frameTween = gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: "none",
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: st,
        });
        return () => animation.destroy && animation.destroy();
      };
      ctx && ctx.add ? ctx.add(createTween) : createTween();
      // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return animation;
  }