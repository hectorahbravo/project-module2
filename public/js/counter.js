(function () {
  "use trict";
  const animationDuration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(animationDuration / frameDuration);
  const easeOutQuad = (t) => t * (2 - t);

  const numberWithCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const animateCountUp = (el) => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentCount = Math.round(countTo * progress);

      // If the current count has changed, update the element
      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = numberWithCommas(currentCount);
      }

      // If we’ve reached our last frame, stop the animation
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  // Run the animation on all elements with a class of ‘countup’
  const runAnimations = () => {
    const countupEls = document.querySelectorAll(".countup");
    countupEls.forEach(animateCountUp);
  };

  // In Viewed
  var elements;
  var windowHeight;

  function init() {
    elements = document.querySelectorAll(".section-counter");
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    var i;
    for (i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        if (!element.classList.contains("viewed")) {
          element.classList.add("viewed");
          runAnimations();
        } else {
          if (element.classList.contains("viewed")) {
          }
        }
      }
    }
  }

  window.addEventListener("scroll", checkPosition);
  window.addEventListener("resize", init);

  init();
  checkPosition();
})();
