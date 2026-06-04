// ============================================
// MATES.ARGENTINOS — Animation Utils
// IntersectionObserver for Scroll Reveals
// ============================================

window.Animations = {
  observer: null,

  init() {
    // Initialize IntersectionObserver
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Trigger slightly before it comes into view
      threshold: 0.1
    });

    this.scan();

    // Listen for custom pageLoaded event to rescan
    window.addEventListener('pageLoaded', () => this.scan());
  },

  scan() {
    // Find all elements with reveal classes
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    
    elements.forEach(el => {
      el.classList.remove('visible'); 
      this.observer.observe(el);
      
      // If element is already in viewport, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTimeout(() => el.classList.add('visible'), 100);
      }
    });
  }
};
