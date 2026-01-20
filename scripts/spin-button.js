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