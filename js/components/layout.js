// ============================================
// MATES.ARGENTINOS — Components
// Global UI Components (Navbar, Footer, Toast)
// ============================================

// ── TOAST NOTIFICATIONS ──────────────────────────────────
window.Toast = {
  container: null,

  init() {
    if (!document.getElementById('toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('toast-container');
    }

    // Listen to store events
    window.store.subscribe('success', msg => this.show(msg, 'success'));
    window.store.subscribe('error', msg => this.show(msg, 'error'));
    window.store.subscribe('info', msg => this.show(msg, 'info'));
  },

  show(message, type = 'info', title = null) {
    if (!this.container) this.init();

    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    };

    const defaultTitles = {
      success: 'Éxito',
      error: 'Error',
      info: 'Info',
      warning: 'Advertencia'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    toast.innerHTML = `
      <div class="toast__icon">${icons[type]}</div>
      <div class="toast__content">
        <div class="toast__title">${title || defaultTitles[type]}</div>
        <div class="toast__message">${message}</div>
      </div>
      <div class="toast__progress"></div>
    `;

    this.container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      toast.classList.add('toast--exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300); // Wait for exit animation
    }, 4000);
  }
};

// ── NAVBAR & CART SIDEBAR ────────────────────────────────
window.Layout = {
  renderNavbar() {
    return `
      <nav class="navbar" id="main-navbar">
        <div class="container navbar__inner">
          <a href="#/" class="navbar__logo">
            Mates<span class="text-dot">.</span>Argentinos
          </a>
          
          <div class="navbar__links">
            <a href="#/" class="navbar__link">Inicio</a>
            <a href="#/catalog" class="navbar__link">Tienda</a>
            <a href="#" onclick="event.preventDefault(); window.scrollToSection('contacto')" class="navbar__link">Contacto</a>
          </div>

          <div class="navbar__actions">
            <a href="#/admin/login" class="navbar__admin-btn" id="nav-admin-btn" title="Panel Admin">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </a>
            <button class="navbar__cart-btn" id="nav-cart-btn" aria-label="Abrir Carrito">
              <svg viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span class="navbar__cart-badge" id="nav-cart-badge">0</span>
            </button>
            <div class="navbar__menu-btn" id="mobile-menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu__backdrop" id="mobile-menu-close-bg"></div>
        <div class="mobile-menu__panel">
          <div class="flex justify-end mb-8">
            <button class="btn btn--icon btn--ghost" id="mobile-menu-close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <a href="#/" class="mobile-menu__link">Inicio</a>
          <a href="#/catalog" class="mobile-menu__link">Ver Todo</a>
          <a href="#/catalog?cat=mates" class="mobile-menu__link">Mates</a>
          <a href="#/catalog?cat=bombillas" class="mobile-menu__link">Bombillas</a>
          <a href="#/catalog?cat=yerba" class="mobile-menu__link">Yerba Mate</a>
          <a href="#" onclick="event.preventDefault(); window.scrollToSection('contacto')" class="mobile-menu__link">Contacto</a>
        </div>
      </div>

      <!-- Cart Sidebar -->
      <div class="cart-sidebar" id="cart-sidebar">
        <div class="cart-sidebar__backdrop" id="cart-sidebar-close-bg"></div>
        <div class="cart-sidebar__panel">
          <div class="cart-sidebar__header">
            <h3 class="cart-sidebar__title">Tu Carrito</h3>
            <button class="cart-sidebar__close" id="cart-sidebar-close">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="cart-sidebar__items" id="cart-sidebar-items">
            <!-- Items injected by JS -->
          </div>
          <div class="cart-sidebar__footer" id="cart-sidebar-footer">
            <div class="summary-row">
              <span>Subtotal</span>
              <span class="price" id="cart-sidebar-total">—</span>
            </div>
            <p class="text-xs text-muted mb-4">Envío calculado al momento de pagar.</p>
            <a href="#/checkout" class="btn btn--primary btn--block btn--lg" id="cart-checkout-btn">Pagar Ahora</a>
          </div>
        </div>
      </div>
    `;
  },

  renderFooter() {
    return `
      <footer class="footer-simple">
        <div class="container">
          <div class="footer-simple__inner">
            <a href="#/" class="footer-simple__brand">
              Mates<span class="footer-simple__dot">.</span>Argentinos
            </a>
            <div class="footer-simple__contact">
              <a href="https://maps.google.com/?q=Los+Pumas+2690,+Funes,+Santa+Fe,+Argentina" class="footer-simple__link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Los Pumas 2690, Funes, Santa Fe
              </a>
              <a href="https://www.instagram.com/mates.argentinos.rosario" class="footer-simple__link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                @mates.argentinos.rosario
              </a>
              <a href="https://wa.me/5493415486390" class="footer-simple__link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="mailto:contacto@matesargentinos.com" class="footer-simple__link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                contacto@matesargentinos.com
              </a>
              <a href="tel:+5493415486390" class="footer-simple__link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +54 9 3415 48-6390
              </a>
            </div>
          </div>
          <div class="footer-simple__bottom">
            <p>&copy; ${new Date().getFullYear()} Mates Argentinos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    `;
  },

  init() {
    // Inject Layout
    document.getElementById('app-navbar').innerHTML = this.renderNavbar();
    document.getElementById('app-footer').innerHTML = this.renderFooter();

    // DOM Elements
    const navbar = document.getElementById('main-navbar');
    const cartBtn = document.getElementById('nav-cart-btn');
    const cartBadge = document.getElementById('nav-cart-badge');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartClose = document.getElementById('cart-sidebar-close');
    const cartCloseBg = document.getElementById('cart-sidebar-close-bg');
    
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('mobile-menu-close');
    const menuCloseBg = document.getElementById('mobile-menu-close-bg');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }, { passive: true });

    // Active Link Highlighting
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash || '#/';
      document.querySelectorAll('.navbar__link').forEach(link => {
        if (link.getAttribute('href') === hash || (hash.startsWith('#/catalog') && link.getAttribute('href') === '#/catalog')) {
          link.classList.add('navbar__link--active');
        } else {
          link.classList.remove('navbar__link--active');
        }
      });
      // Close mobile menu on navigate
      mobileMenu.classList.remove('mobile-menu--open');
      menuBtn.classList.remove('navbar__menu-btn--open');
      // Close cart on navigate (except maybe cart page)
      cartSidebar.classList.remove('cart-sidebar--open');
    });

    // Cart Sidebar Toggle
    const toggleCart = (e) => {
      if(e) e.preventDefault();
      cartSidebar.classList.toggle('cart-sidebar--open');
      this.updateCartSidebar();
    };

    cartBtn.addEventListener('click', toggleCart);
    cartClose.addEventListener('click', toggleCart);
    cartCloseBg.addEventListener('click', toggleCart);

    // Mobile Menu Toggle
    const toggleMenu = () => {
      mobileMenu.classList.toggle('mobile-menu--open');
      menuBtn.classList.toggle('navbar__menu-btn--open');
    };

    menuBtn.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);
    menuCloseBg.addEventListener('click', toggleMenu);

    // Subscribe to Cart Updates
    const updateBadge = () => {
      const count = window.store.getCartCount();
      cartBadge.textContent = count;
      if (count > 0) {
        cartBadge.classList.add('navbar__cart-badge--visible');
        cartBadge.classList.add('navbar__cart-badge--bump');
        setTimeout(() => cartBadge.classList.remove('navbar__cart-badge--bump'), 300);
      } else {
        cartBadge.classList.remove('navbar__cart-badge--visible');
      }
      
      // Update sidebar if open
      if (cartSidebar.classList.contains('cart-sidebar--open')) {
        this.updateCartSidebar();
      }
    };

    window.store.subscribe('cart_updated', updateBadge);
    updateBadge(); // Initial call

    // Smooth-scroll to a homepage section by ID, navigating home first if needed
    window.scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window._pendingScrollId = id;
        window.location.hash = '#/';
      }
    };

    // After a route renders, honour any pending scroll request
    window.addEventListener('pageLoaded', () => {
      if (window._pendingScrollId) {
        const pending = window._pendingScrollId;
        window._pendingScrollId = null;
        setTimeout(() => {
          const el = document.getElementById(pending);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    });

    // Expose toggleCart to window for external use (e.g. Add to Cart button)
    window.openCart = () => {
      if (!cartSidebar.classList.contains('cart-sidebar--open')) {
        cartSidebar.classList.add('cart-sidebar--open');
      }
      this.updateCartSidebar();
    };

    // Attach global window handlers for cart actions inside sidebar
    window.sidebarUpdateQty = (id, change) => {
      const item = window.store.getCart().find(i => i.productId === id);
      if (item) {
        window.store.updateCartQuantity(id, item.quantity + change);
      }
    };

    window.sidebarSetQty = (id, qty) => {
      const product = window.store.getProduct(id);
      const clamped = Math.max(1, Math.min(qty, product ? product.stock : qty));
      window.store.updateCartQuantity(id, clamped);
    };

    window.sidebarRemoveItem = (id) => {
      window.store.removeFromCart(id);
    };
  },

  updateCartSidebar() {
    const itemsContainer = document.getElementById('cart-sidebar-items');
    const totalEl = document.getElementById('cart-sidebar-total');
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    const footer = document.getElementById('cart-sidebar-footer');
    
    const cart = window.store.getCart();

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="empty-state" style="padding: 2rem 1rem;">
          <div class="empty-state__icon"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div>
          <h4 class="font-display text-xl mb-2">Tu carrito está vacío</h4>
          <p class="text-sm text-secondary mb-6">Parece que aún no has añadido nada.</p>
          <a href="#/catalog" class="btn btn--primary btn--outline" onclick="document.getElementById('cart-sidebar-close').click()">Comenzar a Comprar</a>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'flex';
    
    let html = '';
    cart.forEach(item => {
      const product = window.store.getProduct(item.productId);
      if (!product) return;

      html += `
        <div class="cart-item">
          <div class="cart-item__image">
            <img src="${product.image}" alt="${product.name}" onerror="this.style.opacity='.3'">
          </div>
          <div class="cart-item__info">
            <div class="cart-item__name">${product.name}</div>
            <div class="cart-item__price">${window.formatPrice(product.price)}</div>
            <div class="cart-item__actions">
              <div class="qty-selector">
                <button class="qty-selector__btn" onclick="sidebarUpdateQty('${product.id}', -1)" aria-label="Disminuir">−</button>
                <input
                  class="qty-selector__input"
                  type="number"
                  value="${item.quantity}"
                  min="1"
                  max="${product.stock}"
                  aria-label="Cantidad"
                  onchange="sidebarSetQty('${product.id}', parseInt(this.value) || 1)"
                  onblur="sidebarSetQty('${product.id}', parseInt(this.value) || 1)"
                >
                <button class="qty-selector__btn" onclick="sidebarUpdateQty('${product.id}', 1)" aria-label="Aumentar">+</button>
              </div>
              <div style="flex:1"></div>
              <button class="cart-item__remove" onclick="sidebarRemoveItem('${product.id}')">Eliminar</button>
            </div>
          </div>
        </div>
      `;
    });

    itemsContainer.innerHTML = html;
    totalEl.textContent = window.formatPrice(window.store.getCartTotal());
  }
};
