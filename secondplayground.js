function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle scroll events
  function handleScroll() {
    var elements = document.querySelectorAll('.animated-element');
  
    elements.forEach(function(element) {
      if (isInViewport(element)) {
        element.classList.add('animate');
      }
    });
  }
  
  // Attach scroll event listener
  window.addEventListener('scroll', handleScroll);