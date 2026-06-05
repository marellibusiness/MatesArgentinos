// ============================================
// MATES.ARGENTINOS — Panel Administrador
// Resumen, Pedidos, Productos y Analíticas
// ============================================

window.PageAdminDashboard = {
  currentTab: 'overview',

  getTabTitle() {
    const titles = {
      overview: 'Resumen',
      orders: 'Pedidos',
      products: 'Productos',
      analytics: 'Analíticas',
      content: 'Contenido'
    };
    return titles[this.currentTab] || 'Resumen';
  },

  render(params) {
    const navbar = document.getElementById('app-navbar');
    const footer = document.getElementById('app-footer');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    const pendingCount = window.store.getOrders().filter(o => o.status === 'pending').length;

    return `
      <div class="admin-layout">

        <!-- Barra lateral -->
        <aside class="admin-sidebar" id="admin-sidebar">
          <div class="admin-sidebar__header">
            <div class="admin-sidebar__brand">
              <span class="admin-sidebar__brand-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></span>
              <span class="admin-sidebar__brand-name">Mates<span class="admin-sidebar__brand-dot">.</span>Admin</span>
            </div>
          </div>
          <nav class="admin-nav">
            <a href="#" class="admin-nav__item ${this.currentTab === 'overview' ? 'active' : ''}"
               data-tab="overview"
               onclick="event.preventDefault(); window.switchAdminTab('overview')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Resumen
            </a>
            <a href="#" class="admin-nav__item ${this.currentTab === 'orders' ? 'active' : ''}"
               data-tab="orders"
               onclick="event.preventDefault(); window.switchAdminTab('orders')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Pedidos
              ${pendingCount > 0 ? `<span class="admin-nav__badge">${pendingCount}</span>` : ''}
            </a>
            <a href="#" class="admin-nav__item ${this.currentTab === 'products' ? 'active' : ''}"
               data-tab="products"
               onclick="event.preventDefault(); window.switchAdminTab('products')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              Productos
            </a>
            <a href="#" class="admin-nav__item ${this.currentTab === 'analytics' ? 'active' : ''}"
               data-tab="analytics"
               onclick="event.preventDefault(); window.switchAdminTab('analytics')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              Analíticas
            </a>
            <a href="#" class="admin-nav__item ${this.currentTab === 'content' ? 'active' : ''}"
               data-tab="content"
               onclick="event.preventDefault(); window.switchAdminTab('content')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              Contenido
            </a>
          </nav>
          <div class="admin-sidebar__footer">
            <a href="#/" class="admin-nav__item" onclick="window.logoutAdmin()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Cerrar Sesión
            </a>
          </div>
        </aside>

        <!-- Contenido Principal -->
        <main class="admin-main">
          <header class="admin-header">
            <button class="btn btn--icon btn--ghost admin-mobile-toggle" onclick="document.getElementById('admin-sidebar').classList.toggle('open')" aria-label="Menú">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div style="flex:1; min-width:0;">
              <h2 class="admin-header__title" id="admin-page-title">${this.getTabTitle()}</h2>
              <div class="admin-header__subtitle">Panel de Administración</div>
            </div>
            <a href="#/" class="btn btn--outline btn--sm" style="flex-shrink:0;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Ver Tienda
            </a>
          </header>

          <div class="admin-content" id="admin-content-area">
            ${this.renderCurrentTab()}
          </div>
        </main>

        <div id="admin-modal-container"></div>
      </div>
    `;
  },

  renderCurrentTab() {
    if (this.currentTab === 'overview') return this.renderOverview();
    if (this.currentTab === 'orders') return this.renderOrders();
    if (this.currentTab === 'products') return this.renderProducts();
    if (this.currentTab === 'analytics') return this.renderAnalytics();
    if (this.currentTab === 'content') return this.renderContent();
    return '';
  },

  // ── RESUMEN ────────────────────────────────────────────────
  renderOverview() {
    const orders = window.store.getOrders();
    const products = window.store.getProducts();
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const recentOrders = orders.slice(0, 5);
    const lowStock = products.filter(p => p.stock < 10).length;
    const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;

    return `
      <div class="dashboard-grid">
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Ingresos Totales</div>
            <div class="stat-card__value">${window.formatPrice(totalRevenue)}</div>
            <div class="stat-card__change stat-card__change--up">↑ en tiempo real</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Pedidos Totales</div>
            <div class="stat-card__value">${orders.length}</div>
            <div class="stat-card__change" style="color:var(--text-secondary)">Todos los tiempos</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--gold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Valor Promedio</div>
            <div class="stat-card__value">${window.formatPrice(avgOrder)}</div>
            <div class="stat-card__change" style="color:var(--text-secondary)">Por pedido</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Stock Bajo</div>
            <div class="stat-card__value">${lowStock}</div>
            <div class="stat-card__change ${lowStock > 0 ? 'stat-card__change--down' : ''}" style="${lowStock === 0 ? 'color:var(--text-secondary)' : ''}">
              ${lowStock > 0 ? 'Requiere atención' : 'Stock normal'}
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-charts">
        <div class="chart-card">
          <div class="chart-card__header">
            <h3 class="font-display" style="font-size:var(--text-lg)">Pedidos Recientes</h3>
            <a href="#" onclick="event.preventDefault(); window.switchAdminTab('orders')" style="font-size:var(--text-sm);color:var(--emerald-400)">Ver Todos</a>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${recentOrders.length > 0
                  ? recentOrders.map(o => `
                    <tr>
                      <td style="font-weight:var(--weight-medium)">${o.id}</td>
                      <td>${o.customer.firstName} ${o.customer.lastName}</td>
                      <td>${new Date(o.date).toLocaleDateString('es-AR')}</td>
                      <td><span class="badge badge--${o.status}">${this.translateStatus(o.status)}</span></td>
                      <td>${window.formatPrice(o.total)}</td>
                    </tr>
                  `).join('')
                  : `<tr><td colspan="5" style="text-align:center;padding:var(--space-4);color:var(--text-secondary)">Aún no hay pedidos</td></tr>`
                }
              </tbody>
            </table>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-card__header">
            <h3 class="font-display" style="font-size:var(--text-lg)">Más Vendidos</h3>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-4)">
            ${window.store.getBestSellers(4).map((p, i) => {
              return `
              <div style="display:flex;align-items:center;gap:var(--space-3)">
                <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--text-secondary);width:28px;text-align:center;flex-shrink:0">#${i+1}</span>
                <div style="width:40px;height:40px;border-radius:var(--radius-md);background:var(--bg-tertiary);overflow:hidden;flex-shrink:0">
                  <img src="${p.image}" style="width:100%;height:100%;object-fit:cover" alt="${p.name}">
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:var(--text-sm);font-weight:var(--weight-medium);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-secondary)">${p._salesCount > 0 ? `${p._salesCount} vendido${p._salesCount !== 1 ? 's' : ''}` : 'Sin ventas aún'}</div>
                </div>
                <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--emerald-500)">${window.formatPrice(p.price)}</div>
              </div>
            `}).join('')}
          </div>
        </div>
      </div>
    `;
  },

  translateStatus(status) {
    const map = {
      pending: 'Pendiente',
      processing: 'En proceso',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return map[status] || status;
  },

  // ── PEDIDOS ────────────────────────────────────────────────
  renderOrders() {
    const orders = window.store.getOrders();

    return `
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Envío</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${orders.length > 0
              ? orders.map(o => `
                <tr>
                  <td style="font-weight:var(--weight-medium)">${o.id}</td>
                  <td>${new Date(o.date).toLocaleDateString('es-AR')}</td>
                  <td>${o.customer.firstName} ${o.customer.lastName}</td>
                  <td>${(() => { const m = o.shipping?.method; return m === 'pickup' ? 'Retiro en Local' : m === 'express' ? 'Express' : 'Estándar'; })()}</td>
                  <td>${window.formatPrice(o.total)}</td>
                  <td><span class="badge badge--${o.status}">${this.translateStatus(o.status)}</span></td>
                  <td>
                    <select class="form-input" style="font-size:var(--text-xs);padding:var(--space-1) var(--space-2);height:auto;width:auto;background:transparent;border:1px solid var(--glass-border);border-radius:var(--radius-md)" onchange="window.updateOrderStatus('${o.id}', this.value)">
                      <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                      <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>En proceso</option>
                      <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Enviado</option>
                      <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Entregado</option>
                      <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelado</option>
                    </select>
                  </td>
                </tr>
              `).join('')
              : `<tr><td colspan="7" style="text-align:center;padding:var(--space-8);color:var(--text-secondary)">Aún no hay pedidos</td></tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  },

  // ── PRODUCTOS ──────────────────────────────────────────────
  renderProducts() {
    const products = window.store.getProducts();

    return `
      <div style="display:flex;justify-content:flex-end;margin-bottom:var(--space-4)">
        <button class="btn btn--primary" onclick="window.openProductModal()">Agregar Producto</button>
      </div>

      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:var(--space-3)">
                    <div style="width:40px;height:40px;border-radius:var(--radius-md);background:var(--bg-tertiary);overflow:hidden;flex-shrink:0">
                      <img src="${p.image}" style="width:100%;height:100%;object-fit:cover" alt="${p.name}">
                    </div>
                    <span style="font-weight:var(--weight-medium)">${p.name}</span>
                  </div>
                </td>
                <td>${window.CATEGORIES.find(c => c.id === p.category)?.name || p.category}</td>
                <td>${window.formatPrice(p.price)}</td>
                <td><span style="${p.stock < 10 ? 'color:var(--color-error)' : ''}">${p.stock}</span></td>
                <td>
                  ${p.stock > 0
                    ? '<span class="badge badge--in-stock">Activo</span>'
                    : '<span class="badge badge--out-of-stock">Sin Stock</span>'}
                </td>
                <td>
                  <div class="data-table__actions">
                    <button class="btn btn--icon btn--ghost" onclick="window.openProductModal('${p.id}')" title="Editar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn btn--icon btn--ghost" style="color:var(--color-error)" onclick="window.deleteProduct('${p.id}')" title="Eliminar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ── CONTENIDO ──────────────────────────────────────────────
  renderContent() {
    const c = window.store.getContent();
    return `
      <div style="max-width:720px;margin:0 auto">
        <p class="text-secondary" style="margin-bottom:var(--space-8);font-size:var(--text-sm);">
          Editá el contenido de la tienda sin tocar el código. Los cambios se aplican de inmediato.
        </p>

        <!-- Banner Promocional -->
        <div class="chart-card" style="margin-bottom:var(--space-6)">
          <div class="chart-card__header" style="margin-bottom:var(--space-6)">
            <h3 class="font-display" style="font-size:var(--text-lg)">Banner Promocional</h3>
            <label class="form-toggle" style="margin-left:auto">
              <input type="checkbox" id="cnt_visible" ${c.bannerVisible ? 'checked' : ''} onchange="window.saveContent()">
              <div class="form-toggle__switch"></div>
              <span style="font-size:var(--text-sm);color:var(--text-secondary)">Visible</span>
            </label>
          </div>

          <div class="form-group" style="margin-bottom:var(--space-4)">
            <label class="form-label">Título del Banner</label>
            <input type="text" class="form-input" id="cnt_title" value="${c.bannerTitle}" oninput="window.previewBanner()">
          </div>

          <div class="form-group" style="margin-bottom:var(--space-4)">
            <label class="form-label">Descripción</label>
            <textarea class="form-input" id="cnt_desc" rows="3" oninput="window.previewBanner()">${c.bannerDescription}</textarea>
          </div>

          <div style="margin-bottom:var(--space-4)">
            <div class="form-group">
              <label class="form-label">Texto del Botón</label>
              <input type="text" class="form-input" id="cnt_btn_text" value="${c.bannerButtonText}" oninput="window.previewBanner()">
            </div>
          </div>

          <!-- Vista previa -->
          <div id="cnt_preview" style="background:linear-gradient(135deg,var(--bg-elevated),rgba(16,185,129,0.05));border:1px solid var(--glass-border);border-radius:var(--radius-xl);padding:2rem;text-align:center;margin-bottom:var(--space-6);max-width:560px;margin-left:auto;margin-right:auto">
            <h4 class="font-display" style="font-size:var(--text-2xl);margin-bottom:var(--space-3)" id="cnt_prev_title">${c.bannerTitle}</h4>
            <p style="color:var(--text-secondary);font-size:var(--text-sm);max-width:440px;margin:0 auto var(--space-4)" id="cnt_prev_desc">${c.bannerDescription}</p>
            <span class="btn btn--gold btn--sm" id="cnt_prev_btn">${c.bannerButtonText}</span>
          </div>

          <div style="display:flex;justify-content:flex-end">
            <button class="btn btn--primary" onclick="window.saveContent()">Guardar Cambios</button>
          </div>
        </div>

      </div>
    `;
  },

  // ── ANALÍTICAS ─────────────────────────────────────────────
  renderAnalytics() {
    const orders = window.store.getOrders();
    const products = window.store.getProducts();
    const summary = window.store.getSalesSummary();

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;

    const salesByProduct = summary.salesByProduct;
    const productRanking = summary.productRanking;

    const bestEntry = Object.entries(salesByProduct).sort((a, b) => b[1] - a[1])[0];
    const bestProduct = bestEntry ? window.store.getProduct(bestEntry[0]) : null;
    const lowStock = products.filter(p => p.stock < 10);
    const rankMedals = ['#1', '#2', '#3', '#4', '#5'];

    return `
      <!-- Métricas Clave -->
      <div class="dashboard-grid" style="margin-bottom:var(--space-8)">
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Ingresos Totales</div>
            <div class="stat-card__value">${window.formatPrice(totalRevenue)}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Pedidos Totales</div>
            <div class="stat-card__value">${orders.length}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--gold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Valor Promedio</div>
            <div class="stat-card__value">${window.formatPrice(avgOrder)}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          </div>
          <div class="stat-card__content">
            <div class="stat-card__label">Más Vendido</div>
            <div class="stat-card__value" style="font-size:var(--text-base)">${bestProduct ? bestProduct.name : '—'}</div>
          </div>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="analytics-grid">

        <!-- Ingresos Últimos 7 Días -->
        <div class="chart-card analytics-chart-wide">
          <div class="chart-card__header">
            <h3 class="font-display" style="font-size:var(--text-lg)">Ingresos — Últimos 7 días</h3>
          </div>
          <div class="chart-container">
            <canvas id="chart-revenue"></canvas>
          </div>
          ${orders.length === 0 ? '<p style="text-align:center;color:var(--text-secondary);font-size:var(--text-sm);margin-top:var(--space-4)">Aún no hay pedidos. Los gráficos se actualizarán automáticamente.</p>' : ''}
        </div>

        <!-- Distribución por Categoría -->
        <div class="chart-card">
          <div class="chart-card__header">
            <h3 class="font-display" style="font-size:var(--text-lg)">Ingresos por Categoría</h3>
          </div>
          <div class="chart-container">
            <canvas id="chart-categories"></canvas>
          </div>
        </div>

      </div>

      <!-- Segunda fila -->
      <div class="analytics-grid" style="margin-top:var(--space-6)">

        <!-- Ranking de Productos -->
        <div class="chart-card analytics-chart-wide">
          <div class="chart-card__header">
            <h3 class="font-display" style="font-size:var(--text-lg)">Ranking de Ventas por Producto</h3>
          </div>
          <div class="chart-container">
            <canvas id="chart-products"></canvas>
          </div>
        </div>

        <!-- Stock Bajo -->
        <div class="chart-card">
          <div class="chart-card__header">
            <h3 class="font-display" style="font-size:var(--text-lg)">Alertas de Stock</h3>
          </div>
          ${lowStock.length > 0
            ? `<div style="display:flex;flex-direction:column;gap:var(--space-3)">
                ${lowStock.map(p => `
                  <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);background:rgba(239,68,68,0.07);border-radius:var(--radius-md);border:1px solid rgba(239,68,68,0.2)">
                    <div style="width:36px;height:36px;border-radius:var(--radius-sm);background:var(--bg-tertiary);overflow:hidden;flex-shrink:0">
                      <img src="${p.image}" style="width:100%;height:100%;object-fit:cover">
                    </div>
                    <div style="flex:1;min-width:0">
                      <div style="font-size:var(--text-sm);font-weight:var(--weight-medium);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</div>
                      <div style="font-size:var(--text-xs);color:var(--color-error)">${p.stock} unidades restantes</div>
                    </div>
                  </div>
                `).join('')}
              </div>`
            : `<div style="text-align:center;padding:var(--space-8);color:var(--text-secondary)">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-400)" stroke-width="1.5" style="display:block;margin:0 auto var(--space-3)"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <p style="font-size:var(--text-sm)">Todos los productos tienen stock suficiente.</p>
              </div>`
          }
        </div>

      </div>

      <!-- Tabla Ranking Más Vendidos -->
      <div class="chart-card" style="margin-top:var(--space-6)">
        <div class="chart-card__header" style="margin-bottom:var(--space-4)">
          <h3 class="font-display" style="font-size:var(--text-lg)">Ranking de Más Vendidos</h3>
          <span style="font-size:var(--text-xs);color:var(--text-muted)">Basado en pedidos completados</span>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:48px">Pos.</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Unidades Vendidas</th>
                <th>Ingresos</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              ${productRanking.map((p, idx) => {
                const revenue = p.sales * p.price;
                const medal = rankMedals[idx] || `#${idx + 1}`;
                const barWidth = productRanking[0].sales > 0
                  ? Math.round((p.sales / productRanking[0].sales) * 100)
                  : 0;
                return `
                  <tr>
                    <td style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--text-secondary);text-align:center">${medal}</td>
                    <td>
                      <div style="display:flex;align-items:center;gap:var(--space-3)">
                        <div style="width:40px;height:40px;border-radius:var(--radius-md);background:var(--bg-tertiary);overflow:hidden;flex-shrink:0">
                          <img src="${p.image}" style="width:100%;height:100%;object-fit:cover" alt="${p.name}">
                        </div>
                        <span style="font-weight:var(--weight-medium)">${p.name}</span>
                      </div>
                    </td>
                    <td style="color:var(--text-secondary);font-size:var(--text-sm)">${window.CATEGORIES.find(c => c.id === p.category)?.name || p.category}</td>
                    <td>${window.formatPrice(p.price)}</td>
                    <td>
                      <div style="display:flex;align-items:center;gap:var(--space-3)">
                        <span style="font-weight:var(--weight-semibold);min-width:32px">${p.sales}</span>
                        <div style="flex:1;height:6px;background:var(--bg-tertiary);border-radius:999px;overflow:hidden;max-width:120px">
                          <div style="height:100%;width:${barWidth}%;background:var(--emerald-500);border-radius:999px"></div>
                        </div>
                      </div>
                    </td>
                    <td style="font-weight:var(--weight-semibold);color:var(--emerald-500)">${p.sales > 0 ? window.formatPrice(revenue) : '—'}</td>
                    <td><span style="${p.stock < 10 ? 'color:var(--color-error)' : 'color:var(--text-secondary)'}">${p.stock}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${orders.length === 0 ? `<p style="text-align:center;padding:var(--space-4);color:var(--text-secondary);font-size:var(--text-sm)">Aún no hay pedidos. El ranking se actualizará automáticamente cuando se registren ventas.</p>` : ''}
      </div>
    `;
  },

  // ── MODAL DE PRODUCTO ──────────────────────────────────────
  renderProductModal(product = null) {
    const isEdit = !!product;
    const p = product || { id: '', name: '', price: 0, stock: 0, category: 'mates', description: '', image: '', featured: false };

    return `
      <div class="modal-overlay modal-overlay--open" id="product-modal-overlay">
        <div class="modal-backdrop" onclick="window.closeProductModal()"></div>
        <div class="modal modal--lg">
          <div class="modal__header">
            <h3 class="modal__title">${isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <button class="modal__close" onclick="window.closeProductModal()">×</button>
          </div>
          <div class="modal__body">
            <form id="product-form" onsubmit="event.preventDefault(); window.saveProduct('${p.id}');">
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-6);margin-bottom:var(--space-4)">

                <!-- Columna Izquierda: Detalles -->
                <div>
                  <div class="form-group" style="margin-bottom:var(--space-4)">
                    <label class="form-label">Nombre del Producto</label>
                    <input type="text" class="form-input" id="pm_name" required value="${p.name}">
                  </div>

                  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-4);margin-bottom:var(--space-4)">
                    <div class="form-group">
                      <label class="form-label">Precio ($)</label>
                      <input type="number" class="form-input" id="pm_price" step="1" min="0" required value="${p.price}">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Stock</label>
                      <input type="number" class="form-input" id="pm_stock" min="0" required value="${p.stock}">
                    </div>
                  </div>

                  <div class="form-group" style="margin-bottom:var(--space-4)">
                    <label class="form-label">Categoría</label>
                    <select class="form-input" id="pm_category">
                      ${window.CATEGORIES.filter(c => c.id !== 'all').map(c => `
                        <option value="${c.id}" ${p.category === c.id ? 'selected' : ''}>${c.name}</option>
                      `).join('')}
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Descripción</label>
                    <textarea class="form-input" id="pm_description" required>${p.description}</textarea>
                  </div>
                </div>

                <!-- Columna Derecha: Imagen -->
                <div>
                  <label class="form-label" style="display:block;margin-bottom:var(--space-2)">Imagen del Producto</label>
                  <div class="image-upload ${p.image ? 'has-image' : ''}" id="pm_image_upload">
                    <input type="file" accept="image/*" onchange="window.handleImageUpload(this)">
                    <div style="margin-bottom:var(--space-2)">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-400)" stroke-width="2" style="display:block;margin:0 auto"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                    <p style="font-size:var(--text-sm);color:var(--text-secondary)">Clic o arrastrá para subir imagen</p>
                    <div class="image-upload__preview">
                      <img src="${p.image}" id="pm_image_preview" alt="">
                    </div>
                  </div>
                  <input type="hidden" id="pm_image_data" value="${p.image}">

                  <div style="margin-top:var(--space-6)">
                    <label class="form-toggle">
                      <input type="checkbox" id="pm_featured" ${p.featured ? 'checked' : ''}>
                      <div class="form-toggle__switch"></div>
                      Destacado en Inicio
                    </label>
                  </div>
                </div>

              </div>

              <div class="modal__footer" style="margin-top:var(--space-6)">
                <button type="button" class="btn btn--ghost" onclick="window.closeProductModal()">Cancelar</button>
                <button type="submit" class="btn btn--primary">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  // ── GRÁFICOS ANALÍTICAS ────────────────────────────────────
  initCharts() {
    if (typeof Chart === 'undefined') return;

    ['chart-revenue', 'chart-products', 'chart-categories'].forEach(id => {
      const canvas = document.getElementById(id);
      if (canvas) {
        const existing = Chart.getChart(canvas);
        if (existing) existing.destroy();
      }
    });

    const orders = window.store.getOrders();
    const products = window.store.getProducts();
    const emerald = '#10b981';
    const gold = '#d97706';
    const blue = '#6366f1';
    const rose = '#f43f5e';

    const gridColor = 'rgba(0,0,0,0.06)';
    const tickColor = '#6b7280';

    // ─ Ingresos últimos 7 días
    const revenueCtx = document.getElementById('chart-revenue');
    if (revenueCtx) {
      const labels = [];
      const data = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        labels.push(d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' }));
        data.push(orders.filter(o => o.date && o.date.startsWith(dateStr)).reduce((s, o) => s + o.total, 0));
      }
      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Ingresos',
            data,
            borderColor: emerald,
            backgroundColor: 'rgba(16,185,129,0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: emerald,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: tickColor } },
            y: { grid: { color: gridColor }, ticks: { color: tickColor, callback: v => '$' + Math.round(v).toLocaleString('es-AR') } }
          }
        }
      });
    }

    // ─ Ranking de productos (unidades vendidas)
    const productsCtx = document.getElementById('chart-products');
    if (productsCtx) {
      const salesCount = {};
      orders.forEach(o => o.items.forEach(item => {
        salesCount[item.productId] = (salesCount[item.productId] || 0) + item.quantity;
      }));

      const sorted = [...products]
        .map(p => ({ name: p.name.length > 22 ? p.name.substring(0, 22) + '…' : p.name, sold: salesCount[p.id] || 0 }))
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 6);

      new Chart(productsCtx, {
        type: 'bar',
        data: {
          labels: sorted.map(p => p.name),
          datasets: [{
            label: 'Unidades Vendidas',
            data: sorted.map(p => p.sold),
            backgroundColor: 'rgba(16,185,129,0.7)',
            borderColor: emerald,
            borderWidth: 1,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: tickColor } },
            y: { grid: { color: gridColor }, ticks: { color: tickColor, stepSize: 1 } }
          }
        }
      });
    }

    // ─ Distribución por categoría (ingresos)
    const categoriesCtx = document.getElementById('chart-categories');
    if (categoriesCtx) {
      const catRevenue = {};
      orders.forEach(o => o.items.forEach(item => {
        const p = products.find(pr => pr.id === item.productId);
        if (p) catRevenue[p.category] = (catRevenue[p.category] || 0) + p.price * item.quantity;
      }));

      const cats = window.CATEGORIES.filter(c => c.id !== 'all');
      const catData = cats.map(c => catRevenue[c.id] || 0);
      const hasData = catData.some(v => v > 0);

      new Chart(categoriesCtx, {
        type: 'doughnut',
        data: {
          labels: cats.map(c => c.name),
          datasets: [{
            data: hasData ? catData : [1, 1, 1, 1],
            backgroundColor: [emerald, gold, blue, rose],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: tickColor, padding: 16, font: { size: 12 } }
            },
            tooltip: {
              callbacks: {
                label: ctx => hasData
                  ? ` ${ctx.label}: $${Math.round(ctx.parsed).toLocaleString('es-AR')}`
                  : ` ${ctx.label}: sin datos`
              }
            }
          }
        }
      });
    }
  },

  // ── INIT & HANDLERS ────────────────────────────────────────
  init() {

    const renderContainer = () => {
      const contentArea = document.getElementById('admin-content-area');
      if (!contentArea) return;
      contentArea.innerHTML = this.renderCurrentTab();
      const sidebar = document.getElementById('admin-sidebar');
      if (sidebar) sidebar.classList.remove('open');
    };

    window.switchAdminTab = (tab) => {
      this.currentTab = tab;
      document.querySelectorAll('.admin-nav__item').forEach(el => {
        el.classList.toggle('active', el.dataset.tab === tab);
      });
      const titleEl = document.getElementById('admin-page-title');
      if (titleEl) titleEl.textContent = this.getTabTitle();
      renderContainer();
      if (tab === 'analytics') {
        requestAnimationFrame(() => this.initCharts());
      }
    };

    window.logoutAdmin = () => {
      window.store.logoutAdmin();
      window.location.hash = '#/admin/login';
    };

    window.updateOrderStatus = (id, status) => {
      window.store.updateOrderStatus(id, status);
      window.store.emit('success', 'Estado del pedido actualizado');
      if (this.currentTab === 'orders') renderContainer();
    };

    window.deleteProduct = (id) => {
      if (confirm('¿Estás seguro que querés eliminar este producto?')) {
        window.store.deleteProduct(id);
        window.store.emit('success', 'Producto eliminado');
        renderContainer();
      }
    };

    window.openProductModal = (id = null) => {
      const product = id ? window.store.getProduct(id) : null;
      const container = document.getElementById('admin-modal-container');
      if (container) container.innerHTML = this.renderProductModal(product);
    };

    window.closeProductModal = () => {
      const overlay = document.getElementById('product-modal-overlay');
      if (overlay) {
        overlay.classList.remove('modal-overlay--open');
        setTimeout(() => {
          const container = document.getElementById('admin-modal-container');
          if (container) container.innerHTML = '';
        }, 300);
      }
    };

    window.handleImageUpload = (input) => {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const preview = document.getElementById('pm_image_preview');
          const data = document.getElementById('pm_image_data');
          const upload = document.getElementById('pm_image_upload');
          if (preview) preview.src = e.target.result;
          if (data) data.value = e.target.result;
          if (upload) upload.classList.add('has-image');
        };
        reader.readAsDataURL(input.files[0]);
      }
    };

    window.saveProduct = (id) => {
      const nameEl = document.getElementById('pm_name');
      const priceEl = document.getElementById('pm_price');
      const stockEl = document.getElementById('pm_stock');
      const catEl = document.getElementById('pm_category');
      const descEl = document.getElementById('pm_description');
      const imgEl = document.getElementById('pm_image_data');
      const featEl = document.getElementById('pm_featured');

      if (!nameEl) return;

      const data = {
        name: nameEl.value,
        price: parseFloat(priceEl.value),
        stock: parseInt(stockEl.value),
        category: catEl.value,
        description: descEl.value,
        image: imgEl.value || 'assets/images/placeholder.png',
        featured: featEl.checked,
        isNew: !id
      };

      if (id) {
        window.store.updateProduct(id, data);
        window.store.emit('success', 'Producto actualizado');
      } else {
        window.store.addProduct(data);
        window.store.emit('success', 'Producto agregado');
      }

      window.closeProductModal();
      renderContainer();
    };

    if (this.currentTab === 'analytics') {
      requestAnimationFrame(() => this.initCharts());
    }

    window.previewBanner = () => {
      const title = document.getElementById('cnt_title')?.value || '';
      const desc = document.getElementById('cnt_desc')?.value || '';
      const btn = document.getElementById('cnt_btn_text')?.value || '';
      const titleEl = document.getElementById('cnt_prev_title');
      const descEl = document.getElementById('cnt_prev_desc');
      const btnEl = document.getElementById('cnt_prev_btn');
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (btnEl) btnEl.textContent = btn;
    };

    window.saveContent = () => {
      const titleEl = document.getElementById('cnt_title');
      const descEl = document.getElementById('cnt_desc');
      const btnTextEl = document.getElementById('cnt_btn_text');
      const visibleEl = document.getElementById('cnt_visible');

      if (!titleEl) return;

      const title = titleEl.value.trim();
      const desc = descEl.value.trim();
      const btnText = btnTextEl.value.trim();

      if (!title || !desc || !btnText) {
        window.store.emit('error', 'Todos los campos son obligatorios');
        return;
      }

      window.store.updateContent({
        bannerTitle: title,
        bannerDescription: desc,
        bannerButtonText: btnText,
        bannerButtonLink: window.store.getContent().bannerButtonLink || '#/catalog',
        bannerVisible: visibleEl.checked
      });

      window.store.emit('success', 'Contenido actualizado correctamente');
    };
  }
};
