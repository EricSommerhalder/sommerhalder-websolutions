// const animationDiv = document.getElementById("loadAnimation"); // dom element that contains the animation
// let anim = lottie.loadAnimation({ //call lottie method to load the animation and play it
//   container: animationDiv,
//   renderer: 'svg',
//   loop: false,
//   autoplay: true,
//   path: 'https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/loading_animation.json', // the path to the animation json
//   rendererSettings: {
//     className: 'anim'
//   }
// });

// anim.onEnterFrame = function (e) {
//   if (e.currentTime > 120) { //at this frame we need to stop the animation and animate the helper, to get the see through effect
//     const helper = document.getElementById("animationHelper");
//     anim.goToAndStop(120, true);
//     helper.style.display = "block";

//     const rect = document.getElementById("rect").getBoundingClientRect(); //get the dimensions of the rectangle in the middle
//     const temp = document.createElement('div'); //create a temp div with similar dimensions as the white rectangle and give it a huge box-shadow to create the black borders around the white seethrough div
//     temp.style.pointerEvents = "none";
//     temp.style.width = (rect.width - 10) + "px";
//     temp.style.position = "fixed";
//     temp.style.height = (rect.height - 10) + "px";
//     temp.style.left = (rect.left + 5) + "px";
//     temp.style.top = (rect.top + 5) + "px";
//     temp.style.zIndex = "5";
//     temp.style.boxShadow = "0px 0px 0px 999999px black";
//     temp.style.animation = "expand 2s ease-in-out forwards"; //animation to expand the see through square to the whole screen
    
//     temp.addEventListener("animationend", function () { //cleanup after animation end
//       temp.style.display = "none";
//       helper.style.display = "none";
//     });

//     document.body.appendChild(temp);
//     animationDiv.style.display = 'none';
    
//     /*window.scrollTo({ //scroll to top position during animation
//       top: 0
//     });*/
//   }
// };