document.addEventListener('DOMContentLoaded', () => {
  /**
   * Creates a slider functionality for a given set of elements.
   * @param {string} type - The identifier for the slider (e.g., 'long', 'short').
   */
  const initializeSlider = (type) => {
    const container = document.getElementById(`${type}-works`);
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
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        slide.setAttribute('aria-hidden', index !== currentIndex ? 'true' : 'false');
      });
      currentLabel.textContent = `${currentIndex + 1}/${totalSlides}`;
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === totalSlides - 1;
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

    // Touch swipe support for mobile devices
    if (container) {
      let touchStartX = 0;
      container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0 && currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
          } else if (diff < 0 && currentIndex > 0) {
            currentIndex--;
            updateSlider();
          }
        }
      }, { passive: true });
    }

    updateSlider(); // Initial render
  };

  /**
   * Sets up the mobile navigation menu toggle.
   */
  const setupMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
      const toggleMenu = () => {
        const isActive = nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      };

      menuToggle.addEventListener('click', toggleMenu);
      menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu();
        }
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
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
