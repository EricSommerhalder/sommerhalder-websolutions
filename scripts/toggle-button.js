/**
 * Sets up event listener for the toggle button
 */
 const toggleSwitch = document.querySelector('#toggle');
 toggleSwitch.addEventListener('change', switchTheme);
 
 function switchTheme() {
    document.documentElement.classList.toggle("dark-mode");
 }
 