/**
 * TODO: impromve performance, spezifisch durch gschiidere loop im hero logo
 */
//smoothscroll.polyfill();
/**
 * Loads animation into its div and plays it.
 */

const animationDiv = document.getElementById("loadAnimation");
let anim = lottie.loadAnimation({
  container: animationDiv, // the dom element that will contain the animation
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/loading_animation.json', // the path to the animation json
  rendererSettings: {
    className: 'anim'
  }
});
let done = false;
anim.onEnterFrame = function (e) {
  /**/
  if (e.currentTime > 120 && !done) {
    const helper = document.getElementById("animationHelper");

    //animationDiv.classList.add("fade-out");
    anim.goToAndStop(120, true);
    helper.style.display = "block";
    const rect = document.getElementById("rect").getBoundingClientRect();
    const temp = document.createElement('div');
    temp.style.pointerEvents = "none";
    temp.style.width = (rect.width - 10) + "px";
    temp.style.position = "fixed";
    temp.style.height = (rect.height - 10) + "px";
    temp.style.left = (rect.left + 5) + "px";
    temp.style.top = (rect.top + 5) + "px";
    temp.style.zIndex = "5";
    temp.style.boxShadow = "0px 0px 0px 999999px black";
    temp.style.animation = "expand 2s ease-in-out forwards";
    temp.addEventListener("animationend", function () {
      temp.style.display = "none";
      helper.style.display = "none";
    })
    document.body.appendChild(temp);
    animationDiv.style.display = 'none';
    window.scrollTo({
      top: 0
    });

    /*const svgData = anim.renderer.svgElement.outerHTML;
    console.log(svgData);
    const squareDiv = document.createElement('div');
    squareDiv.innerHTML = `
    <svg viewBox="${anim.renderer.svgElement.getAttribute('viewBox')}" width="${anim.renderer.svgElement.getAttribute('width')}" height="${anim.renderer.svgElement.getAttribute('height')}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="100%" fill-opactiy="0"/>
      ${svgData.replace('fill-opacity="1"', 'fill-opacity="0"')}
    </svg>
  `;
  squareDiv.style.zIndex = 11;
  squareDiv.style.position = 'fixed';
  squareDiv.style.top = `0`;
squareDiv.style.left = `0`;
  document.body.appendChild(squareDiv);
    done = true;
    const square = document.getElementsByTagName('g')[2];
    
    const box = square.getBoundingClientRect();
    console.log(box);
    //const svg = document.createElement('svg');
    //svg.appendChild(square);
    //helper.appendChild(svg);
    var styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = `#animationHelper::before {top: ${box.top}px; left: ${box.left}px; width: ${box.width}px; height: ${box.height}px;}`;*/
  }
};
anim.onComplete = function () {
  animationDiv.style.display = 'none';
  window.scrollTo({
    top: 0
  });
}
/*window.addEventListener('animationend', function() {
  console.log("reached");
 animationDiv.style.display = 'none';
});*/

/**
 * scrolls a particular element into the viewport
 * @param id id of the html element to scroll to.
 */

function scrollToElement(id) {
  window.scrollTo({
    top: document.getElementById(id).offsetTop - document.getElementById("navbar").offsetHeight,
    behavior: 'smooth'
  });
}

function redirect(url) {
  window.open(url, "_blank");
}

/**
 * Sets up event listener for the toggle button
 */
const toggleSwitch = document.querySelector('#toggle');
toggleSwitch.addEventListener('change', switchTheme);

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
}

/**
 * Sets up event listener for the spin button
 */

window.addEventListener("scroll", function () {
  const spinButton = document.querySelector("#spin-button");
  const spinButtonBottom = document.querySelector("#spin-button-bottom");
  const scrollPosition = window.scrollY;
  const scrollPositionBottom = -(document.documentElement.scrollHeight - window.innerHeight - window.scrollY);
  const spinIcon = document.getElementsByClassName("spin-icon")[0];
  const spinIconBottom = document.getElementsByClassName("spin-bottom-icon")[0];
  spinButton.style.transform = `rotate(${scrollPosition / 2}deg)`;
  spinIcon.style.transform = `rotate(${-scrollPosition / 2}deg)`;
  spinButtonBottom.style.transform = `rotate(${scrollPositionBottom / 2}deg)`;
  spinIconBottom.style.transform = `rotate(${-scrollPositionBottom / 2 + 180}deg)`;
});

/**
 * Sets up TagCloud
 */
const tagcloudcontainer = '.tagcloud';
const texts = ['Elm',
  'React',
  'Angular',
  'Typescript',
  'Javascript',
  'CSS',
  'HTML',
  'Svelte',
  'Python',
  'C++',
  'C#',
  'C',
  'Java',
  'SQL',
  'PHP'

];
const options = { "radius": 300 };
let tg = TagCloud(tagcloudcontainer, texts, options);
setUpTagCloud();
window.addEventListener("resize", setUpTagCloud);

function setUpTagCloud() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (screenWidth <= 517 && options.radius == 300) {
    options.radius = 150;
    tg.destroy();
    tg = TagCloud(tagcloudcontainer, texts, options);
  } else if (screenWidth > 517 && options.radius == 150) {
    options.radius = 300;
    tg.destroy();
    tg = TagCloud(tagcloudcontainer, texts, options);
  }
}
/**
 * Micro animations
 */
const elements = document.querySelectorAll('.animated-element');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('animate', entry.isIntersecting);
  });
});

elements.forEach(element => {
  observer.observe(element);
});

/**
 * tv tilting animation
 */
/*
 const tv = document.getElementById('tv');
 const projects = document.getElementById('projects');
 const THRESHOLD = 7;
 tv.style.transformOrigin = "center"; 
 function tvHandleHover(e){
    const {clientX, clientY, currentTarget} = e;
    const {clientWidth, clientHeight, offsetLeft, offsetTop} = currentTarget;
    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);
    
    tv.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
  }

  function handleTvOrientation(event) {
    const { beta, gamma } = event;
    const rotateX = (beta * THRESHOLD / 90).toFixed(2);
    const rotateY = (gamma * THRESHOLD / 90).toFixed(2);
  
    tv.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
  }
 function resetTvStyles(e){
  tv.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
 }

 tv.addEventListener("mousemove", tvHandleHover);
 tv.addEventListener("mouseleave", resetTvStyles);
 window.addEventListener("deviceorientation", handleTvOrientation);
 */

/**
 * ablauf scrolling
 */

/*function debounce(callback, delay) {
  let timerId = null;
  let shouldExecuteImmediately = true;
 
  return function(...args) {
    clearTimeout(timerId);
 
    if (shouldExecuteImmediately) {
      callback.apply(this, args);
      shouldExecuteImmediately = false;
    }
 
    timerId = setTimeout(() => {
      shouldExecuteImmediately = true;
    }, delay);
  };
}
 
var ablaufDiv = document.getElementById("ablauf");
console.log(getHorizontalScrollAmount(document.getElementById("ablauf2")));
var currentFrame = 1;
 
const handleAblaufScroll = debounce((event) => {
  event.preventDefault();
  event.stopPropagation();
 
  if (event.deltaY < 0 && currentFrame > 1){
    event.preventDefault();
    currentFrame--;
    console.log("scrolled to", currentFrame);
  } else if (event.deltaY > 0 && currentFrame < 4){
    event.preventDefault();
    currentFrame++;
    console.log("scrolled to", currentFrame);
  } 
}, 40);
 
ablaufDiv.addEventListener("wheel", (event) => {
  handleAblaufScroll(event);
});

 
ablaufDiv.addEventListener("wheel", (event) => {handleAblaufScroll(event);});

function getHorizontalScrollAmount(element) {
  var rect = element.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  return rect.left + scrollLeft;
}*/

/**
 * beer animation
 */
/*const anim1Div = document.getElementById("lottie-animation-1");
let anim1 = lottie.loadAnimation({
    container: anim1Div, // the dom element that will contain the animation
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/beer_animation.json', // the path to the animation json
    rendererSettings: {
 }
   });

   /**
    * Scrolling
    */
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

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
  if (vars.insideContainer === true) {
    st["containerAnimation"] = tween;
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
/*
let panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  tween;


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
    },
    end: () => "+=" + (panelsContainer.offsetWidth - innerWidth)
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
  speed: "fast",
  scrub: 1, // seconds it takes for the playhead to "catch up"
  pin: false,
  insideContainer: true,
  trigger: "#panel2"
  // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
});
LottieScrollTrigger({
  target: "#lottie-animation-3",
  path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/contract_animation.json",
  speed: "fast",
  scrub: 1, // seconds it takes for the playhead to "catch up"
  pin: false,
  insideContainer: true,
  trigger: "#panel3"
  // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
});
LottieScrollTrigger({
  target: "#lottie-animation-4",
  path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/programming_animation.json",
  speed: "veryfast",
  scrub: 1, // seconds it takes for the playhead to "catch up"
  pin: false,
  insideContainer: true,
  trigger: "#panel4"
  // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
});
LottieScrollTrigger({
  target: "#lottie-animation-5",
  path: "https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/beer_animation.json",
  speed: "veryfast",
  scrub: 1, // seconds it takes for the playhead to "catch up"
  pin: false,
  insideContainer: true,
  trigger: "#panel5"
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
*/
LottieInteractivity.create({
  player: "#lottie-lampe",
  mode: "scroll",
  actions: [
    {
      visibility: [0.2, 0.7],
      type: 'seek',
      frames: [0, 180],
    },
  ]
});

/** cursor stuff */
let cursorDiv = document.getElementById("cursor");
let cursorAnim = lottie.loadAnimation({
  container: cursorDiv,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/cursor1.json'
});
gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

const cursor = document.querySelector(".cursor");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.2;

const xSet = gsap.quickSetter(cursor, "x", "px");
const ySet = gsap.quickSetter(cursor, "y", "px");

window.addEventListener("pointermove", e => {
  if (e.pointerType === "mouse") {
    cursor.style.display = "block";
    mouse.x = e.x;
    mouse.y = e.y;
  } else {
    cursor.style.display = "none";
  }
});
window.addEventListener("touchstart", () => {
  cursor.style.display = "none";
})

gsap.ticker.add(() => {

  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

window.addEventListener("click", e => {
  cursorAnim.playSegments([0, 27], true);
});

/*let scale = gsap.timeline({ paused: true })
  .to(".cursor", {
    scale: 2,
    transformOrigin: 'center',
  });*/

let rotation = gsap.timeline({ paused: true })
  .to(".cursor", {
    rotation: 45,
    transformOrigin: 'center',
    duration: 0.2,
  });

let clickables = document.querySelectorAll('.clickable');
clickables.forEach(clickable => {
  clickable.addEventListener("mouseover", () => {
    rotation.reverse();

  });

  clickable.addEventListener("mouseout", () => {
    rotation.play();
  });
});

/**
 * burger menu 
 */

const burgerDiv = document.getElementById('burger-menu');
let burgerAnim = lottie.loadAnimation({
  container: burgerDiv,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/mobile-button-animation.json'
});

function toggleMenu() {


  document.documentElement.classList.toggle("mobile-menu-active");
  document.documentElement.classList.toggle("dark-mode");
  if (document.documentElement.classList.contains("mobile-menu-active")) {
    burgerAnim.playSegments([0, 27], true);
  } else {
    burgerAnim.playSegments([30, 60], true);
  }
}
function calcMenuFontSize() {

  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var desiredSpanCount = 5;
  // Define the longest term in your mobile menu
  var longestTerm = "Über mich"; // Replace this with your actual longest term

  // Set the maximum width you want the longest term to occupy (in pixels)
  var maxWidth = 0.8 * screenWidth; // You can adjust the value (0.9) based on your requirements
  var tempSpan = document.createElement("span");
  tempSpan.style.visibility = "hidden";
  tempSpan.style.position = "absolute";
  tempSpan.style.whiteSpace = "nowrap";
  tempSpan.style.fontFamily = "Arial"; // Replace with your desired font family
  tempSpan.style.fontSize = "1px"; // Initial font size to measure the width

  // Set the text content of the span to the longest term
  tempSpan.textContent = longestTerm;

  // Append the span element to the document body
  document.body.appendChild(tempSpan);

  // Measure the width of the span element
  var longestTermWidth = tempSpan.getBoundingClientRect().width;
  var spanHeight = tempSpan.getBoundingClientRect().height * 1.4; // factor because of space around text
  // Remove the temporary span element from the document body
  document.body.removeChild(tempSpan);
  const maxFontSizeWidth = Math.floor(maxWidth / longestTermWidth);


  // Calculate the desired font size based on the maximum width and maximum font size
  // Apply the calculated font size to your mobile menu


  var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var availableHeight = screenHeight - 88;
  var maxFontSizeHeight = Math.floor(availableHeight / (spanHeight * desiredSpanCount));
  var fontSize = Math.min(maxFontSizeHeight, maxFontSizeWidth);

  var mobileMenu = document.getElementById("mobile-menu"); // Replace "your-mobile-menu-id" with the ID of your mobile menu
  mobileMenu.style.fontSize = fontSize + "px";
}

calcMenuFontSize();

window.addEventListener("resize", calcMenuFontSize);

/**
 * mobile button
 */

/**
 * hero icon
 */
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#home",
    start: `bottom bottom`,
    end: "bottom top",
    onLeave: () => {

      let spacers = document.getElementsByClassName("pin-spacer");
      spacers[0].style.zIndex = 1;
      document.getElementById("home").style.zIndex = 1;

      let img = document.getElementsByClassName('navbar-img');
      for (const i of img) {
        i.style.display = "unset";
      }
      document.getElementById("home-logo").style.display = "none";
      document.getElementById("text-only").style.display = "none";
    },
    onEnterBack: () => {
      document.getElementsByClassName("pin-spacer")[0].style.zIndex = 3;
      document.getElementById("home").style.zIndex = 3;
      document.getElementById("text-only").style.display = "unset";
      let img2 = document.getElementsByClassName('navbar-img');
      for (const i of img2) {
        i.style.display = "none";
      }
      document.getElementById("home-logo").style.display = "unset";
      buildHeroTimeline()
    },
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true
  }
});

let tween23;
function buildHeroTimeline(){
  let currentProgress = tl.progress();
  tl.progress(0);
  tl.clear();
let tween1 = gsap.to("#Linie1", { y: "-=80" });
let tween2 = gsap.to("#Linie2", { y: "-=80" });
let tween3 = gsap.to("#Linie3", { y: "-=80" });
let tween4 = gsap.to("#Linie5", { y: "-=80" });

let tween5 = gsap.to("#Linie14", { y: "+=80" });
let tween6 = gsap.to("#Linie15", { y: "+=80" });
let tween7 = gsap.to("#Linie16", { y: "+=80" });
let tween8 = gsap.to("#Linie17", { y: "+=80" });

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
let tween9 = gsap.to("#Linie1-copy", { x: "-=100", y: "-=100" });
let tween10 = gsap.to("#Linie6", { x: "-=100", y: "-=100" });
let tween11 = gsap.to("#Linie7", { x: "-=100", y: "-=100" });
let tween12 = gsap.to("#Linie8", { x: "-=100", y: "-=100" });

let tween13 = gsap.to("#Linie10", { x: "+=100", y: "+=100" });
let tween14 = gsap.to("#Linie13", { x: "+=100", y: "+=100" });
let tween15 = gsap.to("#Linie12", { x: "+=100", y: "+=100" });
let tween16 = gsap.to("#Linie16-copy", { x: "+=100", y: "+=100" });

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
// GROUP 1 DESTRUCTION
let tween17 = gsap.to("#Linie6", {
  scale: 0.5,       // Shrink to 50% of its original size
  rotation: 20,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  y: "-=100"
});

let tween18 = gsap.to("#Linie8", {
  rotation: 10,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  y: "-=100"
});

let tween19 = gsap.to("#Linie1-copy", {
  scale: 0.5,       // Shrink to 50% of its original size
  rotation: 40,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  y: "-=50"
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

if (initialHeight === 0){
  return;
}
let targetHeight = 64/3; //TODO do muesch denn no luege wägem kleinere fall bi kleinere screens
let targetScale = targetHeight/initialHeight;
let strokeWidth = 2;
  var svg = document.getElementById('home-logo');
  let l6 = document.getElementById('Linie6');
  let l1c = document.getElementById('Linie1-copy');
  let l7 = document.getElementById('Linie7');
  let l8 = document.getElementById('Linie8');
  var matrix = l6.getScreenCTM();
  var inverseMatrix = matrix.inverse();

  var point = svg.createSVGPoint();
  point.x = 81;
  
  point.y = 22;

  if (window.innerWidth <= 1160){
    targetScale = targetScale * 1/2;
    point.x = 40;
    point.y = 19;
    strokeWidth = 1;
  }
  else if (window.innerWidth <= 1643){
    targetScale = targetScale * 3/4;
    point.x = 61;
    point.y = 34;
  }
  point = point.matrixTransform(inverseMatrix);
  console.log("point", point);
  /*var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", point.x);
  circle.setAttribute("cy", point.y);
  circle.setAttribute("r", 5); // radius of the circle
  circle.setAttribute("fill", "red"); // color of the circle
  svg.appendChild(circle);*/
  let deltaX6 = (l6.getAttribute('x2') - l6.getAttribute('x1'))*targetScale;
  let deltaY6 = (l6.getAttribute('y2') - l6.getAttribute('y1'))*targetScale;
  let deltaX1c = (l1c.getAttribute('x2') - l1c.getAttribute('x1'))*targetScale;
  let deltaY1c = (l1c.getAttribute('y2') - l1c.getAttribute('y1'))*targetScale;
  let deltaX7 = (l7.getAttribute('x2') - l7.getAttribute('x1'))*targetScale;
  let deltaY7 = (l7.getAttribute('y2') - l7.getAttribute('y1'))*targetScale;
  let deltaX8 = (l8.getAttribute('x2') - l8.getAttribute('x1'))*targetScale;
  let deltaY8 = (l8.getAttribute('y2') - l8.getAttribute('y1'))*targetScale;

//GROUP 1 HEALING
/*if (tween23){
  //tween23.kill();
}*/

let tween24 = gsap.to("#Linie1-copy", {x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth});
tween23 = gsap.to("#Linie1-copy", {attr: {x1: point.x, y1: point.y, x2: point.x + deltaX1c, y2: point.y + deltaY1c}, ease: "none"});
//36 und 21
console.log(tween23.vars);

tl.add(tween23, "endOfPart3");
tl.add(tween24, "endOfPart3");

let tween22 = gsap.to("#Linie6", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween21 = gsap.to("#Linie6", { attr: { x1: point.x + deltaX1c, y1: point.y + deltaY1c, x2: point.x + deltaX1c + deltaX6, y2: point.y + deltaY1c + deltaY6 }, ease: "none" });
tl.add(tween21, "endOfPart3");
tl.add(tween22, "endOfPart3");

let tween25 = gsap.to("#Linie7", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween26 = gsap.to("#Linie7", { attr: { x2: point.x, y2: point.y, x1: point.x - deltaX7, y1: point.y - deltaY7 }, ease: "none" });
tl.add(tween25, "endOfPart3");
tl.add(tween26, "endOfPart3");

let tween27 = gsap.to("#Linie8", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween28 = gsap.to("#Linie8", { attr: { x1: point.x - deltaX7, y1: point.y - deltaY7, x2: point.x - deltaX7 + deltaX8, y2: point.y - deltaY7 + deltaY8 }, ease: "none" });
tl.add(tween27, "endOfPart3");
tl.add(tween28, "endOfPart3");

//GROUP 2 DESTRUCTION 
let tween29 = gsap.to("#Linie1", {
  scale: 0.6,       // Shrink to 50% of its original size
  rotation: 25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=100"
});
tl.add(tween29, "endOfPart2+=0.2");

let tween30 = gsap.to("#Linie2", {
  x: "-=200"
});
tl.add(tween30, "endOfPart2+=0.2");

let tween31 = gsap.to("#Linie5", {
  scale: 0.6,       // Shrink to 50% of its original size
  rotation: 20,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=80"
});
tl.add(tween31, "endOfPart2+=0.2");

let tween32 = gsap.to("#Linie3", {
  scale: 0.7,
  rotation: 20,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=250",
  y: "-=100"
});
tl.add(tween32, "endOfPart2+=0.2");

tl.addLabel("endOfPart4");

let l1 = document.getElementById('Linie1');
let l2 = document.getElementById('Linie2');
let l5 = document.getElementById('Linie5');
let l3 = document.getElementById('Linie3');

const deltaX1 = (l1.getAttribute('x2') - l1.getAttribute('x1')) * targetScale;
const deltaY1 = (l1.getAttribute('y2') - l1.getAttribute('y1')) * targetScale;
const deltaX2 = (l2.getAttribute('x2') - l2.getAttribute('x1')) * targetScale;
const deltaY2 = (l2.getAttribute('y2') - l2.getAttribute('y1')) * targetScale;
const deltaX5 = (l5.getAttribute('x2') - l5.getAttribute('x1')) * targetScale;
const deltaY5 = (l5.getAttribute('y2') - l5.getAttribute('y1')) * targetScale;
const deltaX3 = (l3.getAttribute('x2') - l3.getAttribute('x1')) * targetScale;
const deltaY3 = (l3.getAttribute('y2') - l3.getAttribute('y1')) * targetScale;
//GROUP 2 HEALING
let tween33 = gsap.to("#Linie1", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween34 = gsap.to("#Linie1", { attr: { x1: point.x, y1: point.y, x2: point.x + deltaX1, y2: point.y + deltaY1 }, ease: "none" });
tl.add(tween33, "endOfPart3+=0.2");
tl.add(tween34, "endOfPart3+=0.2");

let tween35 = gsap.to("#Linie2", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween36 = gsap.to("#Linie2", { attr: { x1: point.x - deltaX2, y1: point.y - deltaY2, x2: point.x, y2: point.y }, ease: "none" });
tl.add(tween35, "endOfPart3+=0.2");
tl.add(tween36, "endOfPart3+=0.2");

let tween37 = gsap.to("#Linie5", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween38 = gsap.to("#Linie5", { attr: { x1: point.x + deltaX1, y1: point.y + deltaY1, x2: point.x + deltaX1 + deltaX5, y2: point.y + deltaY1 + deltaY5 }, ease: "none" });
tl.add(tween37, "endOfPart3+=0.2");
tl.add(tween38, "endOfPart3+=0.2");

let tween39 = gsap.to("#Linie3", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween40 = gsap.to("#Linie3", { attr: { x1: point.x - deltaX2 - deltaX3, y1: point.y - deltaY2 - deltaY3, x2: point.x - deltaX2, y2: point.y - deltaY2 }, ease: "none" });
tl.add(tween39, "endOfPart3+=0.2");
tl.add(tween40, "endOfPart3+=0.2");
//GROUP 3 DESTRUCTION
let tween41 = gsap.to("#Linie8-copy", {
  scale: 0.5,       // Shrink to 50% of its original size
  rotation: -25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=100"
});
tl.add(tween41, "endOfPart2+=0.4");

let tween42 = gsap.to("#Linie9", {
  scale: 0.8,       // Shrink to 50% of its original size
  rotation: 25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=100"
});
tl.add(tween42, "endOfPart2+=0.4");

let tween43 = gsap.to("#Linie10-copy", {
  // Shrink to 50% of its original size
  rotation: -25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center"
});
tl.add(tween43, "endOfPart2+=0.4");

let tween44 = gsap.to("#Linie11", {
  // Shrink to 50% of its original size
  rotation: 25,    // Rotate 180 degrees clockwise
  transformOrigin: "center center"
});
tl.add(tween44, "endOfPart2+=0.4");

tl.addLabel("endOfPart5");
//GROUP 3 HEALING
let l8c = document.getElementById('Linie8-copy');
let l9 = document.getElementById('Linie9');
let l10c = document.getElementById('Linie10-copy');
let l11 = document.getElementById('Linie11');

const deltaX8c = (l8c.getAttribute('x2') - l8c.getAttribute('x1')) * targetScale;
const deltaY8c = (l8c.getAttribute('y2') - l8c.getAttribute('y1')) * targetScale;
const deltaX9 = (l9.getAttribute('x2') - l9.getAttribute('x1')) * targetScale;
const deltaY9 = (l9.getAttribute('y2') - l9.getAttribute('y1')) * targetScale;
const deltaX10c = (l10c.getAttribute('x2') - l10c.getAttribute('x1')) * targetScale;
const deltaY10c = (l10c.getAttribute('y2') - l10c.getAttribute('y1')) * targetScale;
const deltaX11 = (l11.getAttribute('x2') - l11.getAttribute('x1')) * targetScale;
const deltaY11 = (l11.getAttribute('y2') - l11.getAttribute('y1')) * targetScale;

let tween45 = gsap.to("#Linie8-copy", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween46 = gsap.to("#Linie8-copy", { attr: { x1: point.x - deltaX7, y1: point.y - deltaY7, x2: point.x - deltaX7 + deltaX8c, y2: point.y - deltaY7 + deltaY8c }, ease: "none" });
tl.add(tween45, "endOfPart3+=0.4");
tl.add(tween46, "endOfPart3+=0.4");

let tween47 = gsap.to("#Linie9", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween48 = gsap.to("#Linie9", { attr: { x2: point.x - deltaX7, y2: point.y - deltaY7, x1: point.x - deltaX7 - deltaX9, y1: point.y - deltaY7 - deltaY9 }, ease: "none" });
tl.add(tween47, "endOfPart3+=0.4");
tl.add(tween48, "endOfPart3+=0.4");

let tween49 = gsap.to("#Linie11", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween50 = gsap.to("#Linie11", { attr: { x1: point.x - deltaX7 + deltaX8c, y1: point.y - deltaY7 + deltaY8c, x2: point.x - deltaX7 + deltaX8c + deltaX11, y2: point.y - deltaY7 + deltaY8c + deltaY11 }, ease: "none" });
tl.add(tween49, "endOfPart3+=0.4");
tl.add(tween50, "endOfPart3+=0.4");

let tween51 = gsap.to("#Linie10-copy", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween52 = gsap.to("#Linie10-copy", { attr: { x2: point.x - deltaX7 - deltaX9, y2: point.y - deltaY7 - deltaY9, x1: point.x - deltaX7 - deltaX9 - deltaX10c, y1: point.y - deltaY7 - deltaY9 - deltaY10c }, ease: "none" });
tl.add(tween51, "endOfPart3+=0.4");
tl.add(tween52, "endOfPart3+=0.4");
//GROUP 4 DESTRUCTION
let tween53 = gsap.to("#Linie10", {
  scale: 0.7,       // Shrink to 50% of its original size
  rotation: -40,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=400",
  y: "-=300"
});
tl.add(tween53, "endOfPart2+=0.6");

let tween54 = gsap.to("#Linie12", {
  rotation: -20,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=400",
  y: "-=300"
});
tl.add(tween54, "endOfPart2+=0.6");

let tween55 = gsap.to("#Linie16-copy", {
  rotation: -50,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=100",
  y: "-=80"
});
tl.add(tween55, "endOfPart2+=0.6");

let tween56 = gsap.to("#Linie13", {
  rotation: -30,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=500",
  y: "-=400"
});
tl.add(tween56, "endOfPart2+=0.6");

tl.addLabel("endOfPart6");
//GROUP 4 HEALING
let l10 = document.getElementById('Linie10');
let l12 = document.getElementById('Linie12');
let l16c = document.getElementById('Linie16-copy');
let l13 = document.getElementById('Linie13');

const deltaX10 = (l10.getAttribute('x2') - l10.getAttribute('x1')) * targetScale;
const deltaY10 = (l10.getAttribute('y2') - l10.getAttribute('y1')) * targetScale;
const deltaX12 = (l12.getAttribute('x2') - l12.getAttribute('x1')) * targetScale;
const deltaY12 = (l12.getAttribute('y2') - l12.getAttribute('y1')) * targetScale;
const deltaX16c = (l16c.getAttribute('x2') - l16c.getAttribute('x1')) * targetScale;
const deltaY16c = (l16c.getAttribute('y2') - l16c.getAttribute('y1')) * targetScale;
const deltaX13 = (l13.getAttribute('x2') - l13.getAttribute('x1')) * targetScale;
const deltaY13 = (l13.getAttribute('y2') - l13.getAttribute('y1')) * targetScale;
console.log(targetScale);
let tween57 = gsap.to("#Linie10", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween58 = gsap.to("#Linie10", { attr: { x2: point.x - deltaX7 - deltaX9, y2: point.y - deltaY7 - deltaY9, x1: point.x - deltaX7 - deltaX9 - deltaX10, y1: point.y - deltaY7 - deltaY9 - deltaY10 }, ease: "none" });
tl.add(tween57, "endOfPart3+=0.6");
tl.add(tween58, "endOfPart3+=0.6");

let tween59 = gsap.to("#Linie13", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween60 = gsap.to("#Linie13", { attr: { x1: point.x - deltaX7 - deltaX9 - deltaX10, y1: point.y - deltaY7 - deltaY9 - deltaY10, x2: point.x - deltaX7 - deltaX9 - deltaX10 + deltaX13, y2: point.y - deltaY7 - deltaY9 - deltaY10 + deltaY13 }, ease: "none" });
tl.add(tween59, "endOfPart3+=0.6");
tl.add(tween60, "endOfPart3+=0.6");

let tween61 = gsap.to("#Linie12", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween62 = gsap.to("#Linie12", { attr: { x2: point.x - deltaX7 - deltaX9, y2: point.y - deltaY7 - deltaY9, x1: point.x - deltaX7 - deltaX9 - deltaX12, y1: point.y - deltaY7 - deltaY9 - deltaY12 }, ease: "none" });
tl.add(tween61, "endOfPart3+=0.6");
tl.add(tween62, "endOfPart3+=0.6");

let tween63 = gsap.to("#Linie16-copy", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween64 = gsap.to("#Linie16-copy", { attr: { x2: point.x - deltaX7 - deltaX9 - deltaX12, y2: point.y - deltaY7 - deltaY9 - deltaY12, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16c, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16c }, ease: "none" });
tl.add(tween63, "endOfPart3+=0.6");
tl.add(tween64, "endOfPart3+=0.6");
//GROUP 5 DESTRUCTION
let tween65 = gsap.to("#Linie14", {
  scale: 0.7,       // Shrink to 50% of its original size
  rotation: -40,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=300",
  y: "-=400"
});
tl.add(tween65, "endOfPart2+=0.8");

let tween66 = gsap.to("#Linie15", {
  scale: 0.8,       // Shrink to 50% of its original size
  rotation: -10,    // Rotate 180 degrees clockwise
  transformOrigin: "center center",
  x: "-=200",
  y: "-=200"
});
tl.add(tween66, "endOfPart2+=0.8");

let tween67 = gsap.to("#Linie17", {
  scale: 0.9,       // Shrink to 50% of its original size
  transformOrigin: "center center",
  x: "-=100",
  y: "-=100"
});
tl.add(tween67, "endOfPart2+=0.8");

let tween68 = gsap.to("#Linie16", {
  scale: 0.9,       // Shrink to 50% of its original size
  rotation: 40,
  transformOrigin: "center center",
  x: "-=300",
  y: "-=300"
});
tl.add(tween68, "endOfPart2+=0.8");

tl.addLabel("endOfPart7");
//GROUP 5 HEALING
let l15 = document.getElementById('Linie15');
let l17 = document.getElementById('Linie17');
let l16 = document.getElementById('Linie16');
let l14 = document.getElementById('Linie14');

const deltaX15 = (l15.getAttribute('x2') - l15.getAttribute('x1')) * targetScale;
const deltaY15 = (l15.getAttribute('y2') - l15.getAttribute('y1')) * targetScale;
const deltaX17 = (l17.getAttribute('x2') - l17.getAttribute('x1')) * targetScale;
const deltaY17 = (l17.getAttribute('y2') - l17.getAttribute('y1')) * targetScale;
const deltaX16 = (l16.getAttribute('x2') - l16.getAttribute('x1')) * targetScale;
const deltaY16 = (l16.getAttribute('y2') - l16.getAttribute('y1')) * targetScale;
const deltaX14 = (l14.getAttribute('x2') - l14.getAttribute('x1')) * targetScale;
const deltaY14 = (l14.getAttribute('y2') - l14.getAttribute('y1')) * targetScale;

let tween69 = gsap.to("#Linie16", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween70 = gsap.to("#Linie16", { attr: { x2: point.x - deltaX7 - deltaX9 - deltaX12, y2: point.y - deltaY7 - deltaY9 - deltaY12, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 }, ease: "none" });
tl.add(tween69, "endOfPart3+=0.8");
tl.add(tween70, "endOfPart3+=0.8");

let tween71 = gsap.to("#Linie17", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween72 = gsap.to("#Linie17", { attr: { x2: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16, y2: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17 }, ease: "none" });
tl.add(tween71, "endOfPart3+=0.8");
tl.add(tween72, "endOfPart3+=0.8");

let tween73 = gsap.to("#Linie14", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween74 = gsap.to("#Linie14", { attr: { x2: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17, y2: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17 - deltaX14, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17 - deltaY14 }, ease: "none" });
tl.add(tween73, "endOfPart3+=0.8");
tl.add(tween74, "endOfPart3+=0.8");

let tween75 = gsap.to("#Linie15", { x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth });
let tween76 = gsap.to("#Linie15", { attr: { x2: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17 - deltaX14, y2: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17 - deltaY14, x1: point.x - deltaX7 - deltaX9 - deltaX12 - deltaX16 - deltaX17 - deltaX14 - deltaX15, y1: point.y - deltaY7 - deltaY9 - deltaY12 - deltaY16 - deltaY17 - deltaY14 - deltaY15 }, ease: "none" });
tl.add(tween75, "endOfPart3+=0.8");
tl.add(tween76, "endOfPart3+=0.8");
tl.progress(currentProgress);
}
buildHeroTimeline();

let resizeTimeout;
window.addEventListener("resize", function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    buildHeroTimeline();
  }, 100);
  
}
  );
/*let l1cTweens = { killingtween: undefined, tween: undefined};

function updateSVGAttributes() {
  let initialHeight = document.getElementById('Linie7').getBoundingClientRect().height;
  let targetHeight = 64 / 3; //TODO do muesch denn no luege wägem kleinere fall bi kleinere screens
  let targetScale = targetHeight / initialHeight;



  let l6 = document.getElementById('Linie6');
  let l1c = document.getElementById('Linie1-copy');
  let l7 = document.getElementById('Linie7');
  let l8 = document.getElementById('Linie8');

  var svg = document.getElementById('home-logo');
  var matrix = l6.getScreenCTM();
  var inverseMatrix = matrix.inverse();
  var point = svg.createSVGPoint();
  point.x = 81;
  point.y = 22;
  point = point.matrixTransform(inverseMatrix);
  console.log("point", point);
  let deltaX6 = (l6.getAttribute('x2') - l6.getAttribute('x1')) * targetScale;
  let deltaY6 = (l6.getAttribute('y2') - l6.getAttribute('y1')) * targetScale;
  let deltaX1c = (l1c.getAttribute('x2') - l1c.getAttribute('x1')) * targetScale;
  let deltaY1c = (l1c.getAttribute('y2') - l1c.getAttribute('y1')) * targetScale;
  let deltaX7 = (l7.getAttribute('x2') - l7.getAttribute('x1')) * targetScale;
  let deltaY7 = (l7.getAttribute('y2') - l7.getAttribute('y1')) * targetScale;
  let deltaX8 = (l8.getAttribute('x2') - l8.getAttribute('x1')) * targetScale;
  let deltaY8 = (l8.getAttribute('y2') - l8.getAttribute('y1')) * targetScale;
  healingHelper("#Linie1-copy",
    { x1: point.x, y1: point.y, x2: point.x + deltaX1c, y2: point.y + deltaY1c },
    l1cTweens,
    "endOfPart3");
}

function healingHelper(element, attrs, tweens, timing) {
  if (attrs.x2 == -Infinity){
    return;
  }
  console.log(attrs);
  if (tweens.killingtween === undefined || tweens.tween === undefined) {
    tweens.killingtween = gsap.to(element, {x: 0, y: 0, scale: 1, rotation: 0, strokeWidth: strokeWidth});
    tweens.tween = gsap.to(element, { attr: attrs, ease: "none" });
    tl.add(tweens.killingtween, timing);
    tl.add(tweens.tween, timing);
  } else {
    tweens.tween.vars.attr = attrs;
    /*tweens.tween.invalidate();
    tweens.killingtween.invalidate();
  }
}
// Initial call
updateSVGAttributes();

// Listen for resize event
window.addEventListener("resize", updateSVGAttributes);*/