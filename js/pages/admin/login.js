// ============================================
// MATES.ARGENTINOS — Admin Login
// ============================================

window.PageAdminLogin = {
  render() {
    return `
      <div class="admin-login-page">
        <div class="glass-card login-card reveal fade-up">
          <div class="login-logo">
            <div style="display:flex; justify-content:center; margin-bottom:var(--space-2); color:var(--emerald-500);"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div>
            <h1 style="font-family:var(--font-display); font-size:var(--text-2xl); color:var(--text-primary);">
              Mates<span style="color:var(--emerald-500)">.</span>Admin
            </h1>
            <p style="font-size:var(--text-sm); color:var(--text-secondary); margin-top:var(--space-2);">Iniciá sesión para gestionar tu tienda</p>
          </div>

          <form id="admin-login-form" onsubmit="event.preventDefault(); window.handleAdminLogin();">
            <div class="form-group mb-4">
              <label class="form-label">Username</label>
              <input type="text" class="form-input" id="login_user" required value="admin">
            </div>
            <div class="form-group mb-8">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="login_pass" required value="admin123">
              <span class="text-xs text-muted mt-1">Hint: admin / admin123</span>
            </div>
            <button type="submit" class="btn btn--primary btn--block">Sign In</button>
          </form>
          
          <div class="text-center mt-6">
            <a href="#/" class="text-sm text-secondary hover:text-primary">&larr; Back to Store</a>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Hide main layout elements (navbar/footer) since this is a fullscreen page
    const navbar = document.getElementById('app-navbar');
    const footer = document.getElementById('app-footer');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    // Make sure to restore them if we navigate away via back button
    window.addEventListener('hashchange', function restoreLayout() {
      if (!window.location.hash.includes('/admin/login')) {
        if (navbar) navbar.style.display = '';
        if (footer) footer.style.display = '';
        window.removeEventListener('hashchange', restoreLayout);
      }
    });

    window.handleAdminLogin = () => {
      const user = document.getElementById('login_user').value;
      const pass = document.getElementById('login_pass').value;

      if (window.store.loginAdmin(user, pass)) {
        window.location.hash = '#/admin/dashboard';
      } else {
        window.store.emit('error', 'Invalid credentials');
      }
    };
  }
};
