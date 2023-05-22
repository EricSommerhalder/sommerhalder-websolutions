gsap.registerPlugin(ScrollTrigger);
LottieScrollTrigger({
    target: "#animationWindow",
    path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/beer_animation.json",
    speed: "fast",
    scrub: 1, // seconds it takes for the playhead to "catch up"
    pin: false
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
   });
   
   function LottieScrollTrigger(vars) {
       let playhead = {frame: 0},
           target = gsap.utils.toArray(vars.target)[0],
           speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
           st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
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
       animation.addEventListener("DOMLoaded", function() {
         let createTween = function() {
            animation.frameTween = gsap.to(playhead, {
               frame: animation.totalFrames - 1,
               ease: "none",
               onUpdate: () => animation.goToAndStop(playhead.frame, true),
               scrollTrigger: st
           });
           return () => animation.destroy && animation.destroy();
         };
         ctx && ctx.add ? ctx.add(createTween) : createTween();
         // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
         ScrollTrigger.sort();
         ScrollTrigger.refresh();    
       });
       return animation;}