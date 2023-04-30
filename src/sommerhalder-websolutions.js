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
  const spinIcon = document.getElementsByClassName("spin-icon")[0];
  const spinIconBottom = document.getElementsByClassName("spin-bottom-icon")[0];
  spinButton.style.transform = `rotate(${scrollPosition/2}deg)`;
  spinIcon.style.transform = `rotate(${-scrollPosition/2}deg)`;
  spinButtonBottom.style.transform = `rotate(${scrollPosition/2}deg)`;
  spinIconBottom.style.transform = `rotate(${-scrollPosition/2}deg)`;
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