// ============================================
// MATES.ARGENTINOS — Main Application Entry
// Initializes routing, store, and global UI
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Global Components
  window.Toast.init();
  window.Layout.init();
  window.Animations.init();

  // Global cart helper used by product cards across all pages
  window.addToCartFromCard = (id) => {
    window.store.addToCart(id, 1);
  };

  // 2. Register Routes (reading from globals)
  window.router.add('/', window.PageHero);
  window.router.add('/catalog', window.PageCatalog);
  window.router.add('/product/:id', window.PageProductDetail);
  window.router.add('/checkout', window.PageCheckout);
  
  // Admin Routes
  window.router.add('/admin/login', window.PageAdminLogin);
  window.router.add('/admin/dashboard', window.PageAdminDashboard);

  // 3. Start Router
  window.router.start();
});

// For debugging in console
window.__STORE__ = window.store;
