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