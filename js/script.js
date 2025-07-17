document.addEventListener('DOMContentLoaded', () => {
  /**
   * Creates a slider functionality for a given set of elements.
   * @param {string} type - The identifier for the slider (e.g., 'long', 'short').
   */
  const initializeSlider = (type) => {
    const slides = document.querySelectorAll(`#${type}-works .slide`);
    const prevButton = document.getElementById(`prev-${type}`);
    const nextButton = document.getElementById(`next-${type}`);
    const currentLabel = document.getElementById(`${type}-current`);
    
    if (slides.length === 0 || !prevButton || !nextButton || !currentLabel) {
      return; // Don't run if elements are missing
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateSlider = () => {
      slides.forEach(slide => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
      });
      currentLabel.textContent = `${currentIndex + 1}/${totalSlides}`;
    };

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    updateSlider(); // Initial render
  };

  /**
   * Sets up the mobile navigation menu toggle.
   */
  const setupMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
    }
  };

  /**
   * Sets up the "back to top" button visibility and click action.
   */
  const setupBackToTopButton = () => {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopButton.style.display = 'block';
        } else {
          backToTopButton.style.display = 'none';
        }
      });

      backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // Initialize all functionalities
  initializeSlider('long');
  initializeSlider('short');
  setupMobileMenu();
  setupBackToTopButton();
});