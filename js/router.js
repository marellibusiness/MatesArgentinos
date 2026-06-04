// ============================================
// MATES.ARGENTINOS — Router
// Hash-based SPA Router with Animations
// ============================================

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.appContainer = document.getElementById('app-content');
    
    window.addEventListener('hashchange', () => this.handleRouteChange());
  }

  // Register a route
  // handler is an async function that returns the HTML string for the page
  // and optionally an init() function to run after rendering
  add(path, handler) {
    this.routes[path] = handler;
  }

  // Set up the container
  setContainer(elementId) {
    this.appContainer = document.getElementById(elementId);
  }

  // Navigate programmatically
  navigate(path) {
    window.location.hash = path;
  }

  // Extract path and params from hash
  parseHash() {
    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('?');
    const path = parts[0];
    
    // Parse query params
    const params = {};
    if (parts[1]) {
      parts[1].split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value);
      });
    }

    return { path, params };
  }

  // Handle the route change event
  async handleRouteChange() {
    const { path, params } = this.parseHash();

    // Check auth for admin routes
    if (path.startsWith('/admin') && path !== '/admin/login') {
      if (!window.store.isAdmin()) {
        this.navigate('/admin/login');
        return;
      }
    }

    // Match route (exact match or dynamic like /product/:id)
    let matchedRoute = null;
    let routeParams = { ...params };

    for (const routePath in this.routes) {
      if (routePath === path) {
        matchedRoute = this.routes[routePath];
        break;
      }

      // Very simple dynamic route matching (e.g., /product/:id)
      if (routePath.includes(':')) {
        const routeParts = routePath.split('/');
        const pathParts = path.split('/');

        if (routeParts.length === pathParts.length) {
          let isMatch = true;
          const dynamicParams = {};

          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              dynamicParams[routeParts[i].substring(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
              isMatch = false;
              break;
            }
          }

          if (isMatch) {
            matchedRoute = this.routes[routePath];
            routeParams = { ...routeParams, ...dynamicParams };
            break;
          }
        }
      }
    }

    // Fallback to 404 or Home
    if (!matchedRoute) {
      console.warn(`Route not found: ${path}`);
      this.navigate('/');
      return;
    }

    // Restore navbar/footer when leaving admin pages
    if (this.currentRoute && this.currentRoute.startsWith('/admin') && !path.startsWith('/admin')) {
      const navbar = document.getElementById('app-navbar');
      const footer = document.getElementById('app-footer');
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    }

    // Prepare page transition
    if (this.appContainer && this.appContainer.children.length > 0) {
      const oldContent = this.appContainer.firstElementChild;
      if (oldContent) {
        oldContent.classList.add('page-exit');
        await new Promise(resolve => setTimeout(resolve, 300)); // wait for animation
      }
    }

    // Render new route
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    try {
      if (this.appContainer) {
        // Build the HTML
        const html = typeof matchedRoute.render === 'function' 
          ? await matchedRoute.render(routeParams)
          : matchedRoute.render;
          
        this.appContainer.innerHTML = html;
        
        // Add entry animation class
        const newContent = this.appContainer.firstElementChild;
        if (newContent) {
          newContent.classList.add('page-transition');
        }

        // Initialize JS for the page
        if (typeof matchedRoute.init === 'function') {
          // slight delay to let DOM settle
          setTimeout(() => matchedRoute.init(routeParams), 50);
        }

        // Re-trigger global animations/observers if needed
        window.dispatchEvent(new Event('pageLoaded'));
      }
      
      this.currentRoute = path;
      
    } catch (error) {
      console.error('Error rendering route:', error);
      if (this.appContainer) {
        this.appContainer.innerHTML = `
          <div class="empty-state container">
            <h1 class="empty-state__title">Oops!</h1>
            <p class="empty-state__description">Something went wrong while loading this page.</p>
            <button class="btn btn--primary" onclick="window.location.hash='/'">Go Home</button>
          </div>
        `;
      }
    }
  }

  // Start the router
  start() {
    this.handleRouteChange();
  }
}

window.router = new Router();
