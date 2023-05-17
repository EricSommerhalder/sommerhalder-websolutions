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
 anim.onEnterFrame = function(e){
   /**/
   if (e.currentTime > 120 && !done){
     const helper = document.getElementById("animationHelper");
     
     //animationDiv.classList.add("fade-out");
     anim.goToAndStop(120, true);
     helper.style.display="block";
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
  temp.addEventListener("animationend", function(){
    temp.style.display = "none";
    helper.style.display = "none";
  })
  document.body.appendChild(temp);
     console.log("Reached");
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
   }};
  anim.onComplete = function(){
    console.log("Reached");
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

function scrollToElement(id){
  window.scrollTo({
    top: document.getElementById(id).offsetTop - 133 ,
    behavior: 'smooth'
  });
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

 window.addEventListener("scroll", function() {
  const spinButton = document.querySelector("#spin-button");
  const spinButtonBottom = document.querySelector("#spin-button-bottom");
  const scrollPosition = window.scrollY;
  const scrollPositionBottom = -(document.documentElement.scrollHeight - window.innerHeight - window.scrollY);
  const spinIcon = document.getElementsByClassName("spin-icon")[0];
  const spinIconBottom = document.getElementsByClassName("spin-bottom-icon")[0];
  spinButton.style.transform = `rotate(${scrollPosition/2}deg)`;
  spinIcon.style.transform = `rotate(${-scrollPosition/2}deg)`;
  spinButtonBottom.style.transform = `rotate(${scrollPositionBottom/2}deg)`;
  spinIconBottom.style.transform = `rotate(${-scrollPositionBottom/2}deg)`;
});

/**
 * Sets up TagCloud
 */
const container = '.tagcloud';
const texts = [ 'Elm',
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
const options = {"radius": 300};

TagCloud(container, texts, options);

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