// ============================================
// MATES.ARGENTINOS — Catalog Page
// ============================================

window.PageCatalog = {
  currentCategory: 'all',
  searchQuery: '',

  render(params = {}) {
    this.currentCategory = params.cat || 'all';
    this.searchQuery = '';

    return `
      <div class="catalog-page-wrapper">

        <div class="catalog-header catalog-header--centered reveal fade-up">
          <h1 class="text-5xl font-display catalog-title">La Colección</h1>
          <p class="text-secondary">Descubrí nuestros mates artesanales, bombillas de alpaca y yerba premium. Cada pieza está diseñada para enriquecer tu ritual.</p>
        </div>

        <div class="catalog-filters catalog-filters--centered reveal fade-up delay-100">
          <div class="catalog-controls catalog-controls--centered">
            <!-- Categories -->
            <div class="category-tabs" id="category-tabs">
              ${window.CATEGORIES.map(cat => `
                <button class="category-tab ${this.currentCategory === cat.id ? 'category-tab--active' : ''}" data-cat="${cat.id}">
                  ${cat.name}
                </button>
              `).join('')}
            </div>

            <!-- Search -->
            <div class="search-bar">
              <span class="search-bar__icon">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input type="text" id="catalog-search" class="search-bar__input" placeholder="Buscar productos...">
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="catalog-grid" id="catalog-grid">
          <!-- Rendered by JS -->
        </div>

      </div>
    `;

  },

  init() {
    const tabs = document.querySelectorAll('.category-tab');
    const searchInput = document.getElementById('catalog-search');

    this.updateGrid();

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('category-tab--active'));
        e.target.classList.add('category-tab--active');
        this.currentCategory = e.target.getAttribute('data-cat');
        const newUrl = this.currentCategory === 'all' ? '#/catalog' : `#/catalog?cat=${this.currentCategory}`;
        history.replaceState(null, '', newUrl);
        this.updateGrid();
      });
    });

    let debounceTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        this.searchQuery = e.target.value;
        this.updateGrid();
      }, 300);
    });

    // Global helper for add-to-cart from card buttons
    window.addToCartFromCard = (id) => {
      window.store.addToCart(id, 1);
    };
  },

  updateGrid() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    const products = window.store.searchProducts(this.searchQuery, this.currentCategory);

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="catalog-empty empty-state">
          <div class="empty-state__icon">🔍</div>
          <h3 class="empty-state__title">No se encontraron productos</h3>
          <p class="empty-state__description">No pudimos encontrar nada con esos filtros. Probá ajustar tu búsqueda o categoría.</p>
          <button class="btn btn--primary btn--outline" onclick="document.getElementById('catalog-search').value=''; document.getElementById('catalog-search').dispatchEvent(new Event('input'))">Limpiar búsqueda</button>
        </div>
      `;
      return;
    }

    const topSeller = window.store.getBestSellers(1);
    const topSellerId = topSeller.length > 0 ? topSeller[0].id : null;

    let html = '';
    products.forEach((p, idx) => {
      const isBestSeller = p.id === topSellerId;
      const outOfStock = p.stock === 0;
      const catName = window.CATEGORIES.find(c => c.id === p.category)?.name || p.category;

      let badgeHtml = '';
      if (isBestSeller) {
        badgeHtml = '<span class="product-card__badge badge badge--mas-vendido">Más Vendido</span>';
      } else if (p.isNew) {
        badgeHtml = '<span class="product-card__badge badge badge--nuevo">Nuevo</span>';
      }

      let outOfStockBadge = '';
      if (outOfStock) {
        outOfStockBadge = `<span class="product-card__badge badge badge--out-of-stock ${isBestSeller || p.isNew ? 'product-card__badge--right' : ''}">Sin Stock</span>`;
      }

      const priceHtml = p.originalPrice
        ? `<div class="product-card__price">${window.formatPrice(p.price)}<span style="font-size:var(--text-sm);color:var(--text-muted);font-weight:var(--weight-regular);text-decoration:line-through;margin-left:var(--space-2)">${window.formatPrice(p.originalPrice)}</span></div>`
        : `<div class="product-card__price">${window.formatPrice(p.price)}</div>`;

      html += `
        <div class="product-card" style="opacity:0;animation:fadeUp 0.5s ease-out ${idx * 60}ms forwards" onclick="window.location.hash='#/product/${p.id}'">
          <div class="product-card__image">
            ${badgeHtml}
            ${outOfStockBadge}
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="product-card__overlay">
              <button class="btn btn--primary btn--sm" onclick="event.stopPropagation(); window.location.hash='#/product/${p.id}'" ${outOfStock ? 'disabled' : ''}>
                ${outOfStock ? 'Sin Stock' : 'Ver Producto'}
              </button>
            </div>
          </div>
          <div class="product-card__info">
            <span class="product-card__category">${catName}</span>
            <h3 class="product-card__name">${p.name}</h3>
            ${priceHtml}
            <div class="product-card__footer">
              <button class="btn btn--primary btn--sm" onclick="event.stopPropagation(); window.location.hash='#/product/${p.id}'" ${outOfStock ? 'disabled' : ''}>
                ${outOfStock ? 'Sin Stock' : 'Ver Producto'}
              </button>
              <button class="btn btn--icon btn--ghost" onclick="event.stopPropagation(); window.addToCartFromCard('${p.id}')" ${outOfStock ? 'disabled' : ''} title="Agregar al carrito">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }
};
