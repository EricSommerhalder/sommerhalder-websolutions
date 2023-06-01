gsap.set(".ball", {xPercent: -50, yPercent: -50});

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.2;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

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
  .to(".ball", {
    scale: 2,
    transformOrigin: 'center',
  });

  let rotation = gsap.timeline({ paused: true })
  .to(".ball", {
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