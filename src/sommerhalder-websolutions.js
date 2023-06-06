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
  spinIconBottom.style.transform = `rotate(${-scrollPositionBottom / 2}deg)`;
});

/**
 * Sets up TagCloud
 */
const container = '.tagcloud';
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
let tg = TagCloud(container, texts, options);
setUpTagCloud();
window.addEventListener("resize", setUpTagCloud);

function setUpTagCloud(){
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (screenWidth <= 517 && options.radius == 300) {
    options.radius = 150;
    tg.destroy();
    tg =TagCloud(container, texts, options);
  } else if (screenWidth > 517 && options.radius == 150){
    options.radius = 300;
    tg.destroy();
    tg = TagCloud(container, texts, options);
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

LottieInteractivity.create({
  player: "#lottie-lampe",
  mode:"scroll",
  actions: [
      {
          visibility: [0.2, 0.7],
          type: 'seek',
          frames: [0, 180],
      },
  ]
});

/** cursor stuff */
gsap.set(".cursor", {xPercent: -50, yPercent: -50});

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
  scale.play(0);
  setTimeout(() => {
    scale.reverse();
  }, 200);
});

let scale = gsap.timeline({ paused: true })
  .to(".cursor", {
    scale: 2,
    transformOrigin: 'center',
  });

  let rotation = gsap.timeline({ paused: true })
  .to(".cursor", {
    rotation: 45,
    transformOrigin: 'center',
    duration: 0.2,
  });

  let clickables = document.querySelectorAll('.clickable');
  clickables.forEach(clickable => {
    clickable.addEventListener("mouseover", () => {
      rotation.play();
    });
  
    clickable.addEventListener("mouseout", () => {
      rotation.reverse();
    });
  });

  /**
   * burger menu 
   */
  function toggleMenu(){
    document.documentElement.classList.toggle("mobile-menu-active");
    document.documentElement.classList.toggle("dark-mode");
  }
function calcMenuFontSize(){
  console.log("hi");

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
