/**
 * BloodConnect Technical Presentation
 * Controls slide navigation and animations
 */

class Presentation {
    constructor() {
      this.currentSlide = 1;
      // Find all slides; default to 12 only if none are found (fallback)
      this.slides = document.querySelectorAll('.slide');
      this.totalSlides = this.slides.length || 12;
      this.progressBar = document.getElementById('progress-bar');
      this.prevButton = document.getElementById('prev-slide');
      this.nextButton = document.getElementById('next-slide');
      this.isAnimating = false;
  
      console.log(`Presentation initialized with ${this.totalSlides} slides`);
      this.init();
    }
  
    init() {
      // Show the first slide
      this.showSlide(this.currentSlide);
      this.updateProgress();
  
      // Add event listeners for navigation buttons
      if (this.prevButton) {
        this.prevButton.addEventListener('click', () => this.prevSlide());
        console.log('Prev button listener added');
      } else {
        console.warn('Prev button not found');
      }
  
      if (this.nextButton) {
        this.nextButton.addEventListener('click', () => this.nextSlide());
        console.log('Next button listener added');
      } else {
        console.warn('Next button not found');
      }
  
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          this.nextSlide();
        } else if (e.key === 'ArrowLeft') {
          this.prevSlide();
        }
      });
      console.log('Keyboard navigation enabled');
  
      // Mouse wheel navigation
      document.addEventListener('wheel', (e) => {
        if (this.isAnimating) return;
        if (e.deltaY > 0) {
          this.nextSlide();
        } else if (e.deltaY < 0) {
          this.prevSlide();
        }
      }, { passive: true });
      console.log('Mouse wheel navigation enabled');
  
      // Touch swipe navigation
      let touchStartX = 0;
      let touchEndX = 0;
      document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      }, { passive: true });
      console.log('Touch navigation enabled');
    }
  
    handleSwipe(touchStartX, touchEndX) {
      if (touchEndX < touchStartX - 50) {
        this.nextSlide();
      } else if (touchEndX > touchStartX + 50) {
        this.prevSlide();
      }
    }
  
    showSlide(slideNumber) {
        console.log(`Showing slide ${slideNumber}`);
        
        // First, hide ALL slides completely
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none'; // Force hide all slides
        });
    
        // Find and show the target slide by its data-slide attribute
        const currentSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
        if (currentSlide) {
            currentSlide.style.display = ''; // Reset display property
            // Small delay before adding active class for transition
            setTimeout(() => {
                currentSlide.classList.add('active');
            }, 50);
            console.log(`Slide ${slideNumber} activated`);
            // Trigger any slide-specific animations
            this.triggerSlideAnimations(slideNumber);
        } else {
            console.warn(`Slide ${slideNumber} not found`);
        }
    }
  
    nextSlide() {
      if (this.isAnimating || this.currentSlide >= this.totalSlides) return;
      this.isAnimating = true;
      this.currentSlide++;
      console.log(`Moving to next slide: ${this.currentSlide}`);
      this.showSlide(this.currentSlide);
      this.updateProgress();
      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    }
  
    prevSlide() {
      if (this.isAnimating || this.currentSlide <= 1) return;
      this.isAnimating = true;
      this.currentSlide--;
      console.log(`Moving to previous slide: ${this.currentSlide}`);
      this.showSlide(this.currentSlide);
      this.updateProgress();
      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    }
  
    updateProgress() {
      if (!this.progressBar) {
        console.warn('Progress bar not found');
        return;
      }
      const progress = (this.currentSlide / this.totalSlides) * 100;
      this.progressBar.style.width = `${progress}%`;
      console.log(`Progress updated: ${progress.toFixed(1)}%`);
  
      // Update navigation button states
      if (this.prevButton) {
        this.currentSlide === 1 ? this.prevButton.classList.add('opacity-50', 'cursor-not-allowed')
          : this.prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
      if (this.nextButton) {
        this.currentSlide === this.totalSlides ? this.nextButton.classList.add('opacity-50', 'cursor-not-allowed')
          : this.nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  
    triggerSlideAnimations(slideNumber) {
      console.log(`Triggering animations for slide ${slideNumber}`);
      // Generic animations for every slide
      this.animateGenericSlide(slideNumber);
  
      // Slide-specific animations
      switch (slideNumber) {
        case 3:
          if (typeof initTechStackVisualization === 'function') {
            console.log('Initializing tech stack visualization');
            setTimeout(() => initTechStackVisualization(), 300);
          }
          break;
        case 6:
          if (typeof initDataFlowVisualization === 'function') {
            console.log('Initializing data flow visualization');
            setTimeout(() => initDataFlowVisualization(), 300);
          }
          break;
        // Add additional cases if needed for other slides
      }
    }
  
    animateGenericSlide(slideNumber) {
      const slide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
      if (!slide) return;
  
      // Animate headings using GSAP
      const heading = slide.querySelector('h1, h2');
      if (heading) {
        try {
          gsap.fromTo(heading,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        } catch (e) {
          console.warn('GSAP animation failed for heading:', e);
        }
      }
  
      // Animate paragraphs, lists, code blocks, and images
      const animateElements = (selector, fromVars, toVars) => {
        const elements = slide.querySelectorAll(selector);
        if (elements.length > 0) {
          try {
            gsap.fromTo(elements, fromVars, toVars);
          } catch (e) {
            console.warn(`GSAP animation failed for ${selector}:`, e);
          }
        }
      };
  
      animateElements('p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.3, stagger: 0.2, ease: "power2.out" });
      animateElements('li', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.5, stagger: 0.1, ease: "power2.out" });
      animateElements('pre', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: "power2.out" });
      animateElements('img', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: "power2.out" });
    }
  }
  
  // Initialize presentation when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing presentation');
  
    // Initialize code highlighting if available
    if (window.hljs) {
      console.log('Initializing code highlighting');
      try {
        hljs.highlightAll();
      } catch (e) {
        console.error('Error in code highlighting:', e);
      }
    } else {
      console.warn('Highlight.js not loaded');
    }
  
    // Initialize the presentation
    new Presentation();
  });
  