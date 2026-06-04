// ============================================
// MATES.ARGENTINOS — Product Detail Page
// ============================================

window.PageProductDetail = {
  currentProductId: null,

  render(params) {
    const product = window.store.getProduct(params.id);

    if (!product) {
      return `
        <div class="container empty-state" style="padding-top: var(--space-32);">
          <div class="empty-state__icon"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div>
          <h1 class="empty-state__title">Producto no encontrado</h1>
          <p class="empty-state__description">El producto que buscás no existe o fue eliminado.</p>
          <a href="#/catalog" class="btn btn--primary">Volver a la Tienda</a>
        </div>
      `;
    }

    this.currentProductId = product.id;
    const isOutOfStock = product.stock === 0;

    const categoryLabel = window.CATEGORIES.find(c => c.id === product.category)?.name || product.category;

    let featuresHtml = '';
    if (product.features && product.features.length > 0) {
      featuresHtml = product.features.map(f => `
        <div class="product-feature">
          <div class="product-feature__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span class="text-sm font-medium">${f}</span>
        </div>
      `).join('');
    }

    // Dynamic best-seller badge based on actual sales
    const topSeller = window.store.getBestSellers(1);
    const isBestSeller = topSeller.length > 0 && topSeller[0]._isBestSeller && topSeller[0].id === product.id;

    const badgeHtml = isBestSeller
      ? '<span class="badge badge--mas-vendido" style="position:absolute;top:20px;left:20px;z-index:2;">Más Vendido</span>'
      : product.isNew
        ? '<span class="badge badge--nuevo" style="position:absolute;top:20px;left:20px;z-index:2;">Nuevo</span>'
        : '';

    return `
      <div class="container product-detail">

        <!-- Breadcrumbs -->
        <div class="mb-8 text-sm text-secondary reveal">
          <a href="#/" class="hover:text-primary">Inicio</a> &nbsp;/&nbsp;
          <a href="#/catalog" class="hover:text-primary">Tienda</a> &nbsp;/&nbsp;
          <span class="text-primary">${product.name}</span>
        </div>

        <div class="product-detail__grid">
          <!-- Left: Image -->
          <div class="product-detail__gallery reveal fade-right">
            <div class="product-detail__main-image">
              ${badgeHtml}
              <img src="${product.image}" alt="${product.name}" id="main-image">
            </div>
          </div>

          <!-- Right: Info -->
          <div class="product-detail__info reveal fade-left">
            <div class="product-detail__category">${categoryLabel}</div>
            <h1 class="product-detail__title font-display">${product.name}</h1>

            <div class="product-detail__price">
              ${window.formatPrice(product.price)}
              ${product.originalPrice ? `<span class="price__original">${window.formatPrice(product.originalPrice)}</span>` : ''}
            </div>

            <p class="product-detail__description">${product.description}</p>

            <div class="mb-8">
              <div class="form-label mb-2">Cantidad</div>
              <div class="flex items-center gap-4">
                <div class="qty-selector qty-selector--lg">
                  <button class="qty-selector__btn" id="pd-qty-minus" type="button">−</button>
                  <input class="qty-selector__input" id="pd-qty-val" type="number" value="1" min="1" max="${product.stock}" aria-label="Cantidad">
                  <button class="qty-selector__btn" id="pd-qty-plus" type="button">+</button>
                </div>
                <span class="text-sm text-secondary">${product.stock} en stock</span>
              </div>
            </div>

            <div class="product-detail__actions">
              ${isOutOfStock
                ? `<button class="btn btn--xl btn--block glass-card--strong" disabled>Sin Stock</button>`
                : `
                  <button class="btn btn--primary btn--xl hover-lift" id="pd-add-to-cart" style="flex: 2;">
                    Agregar al Carrito
                  </button>
                  <button class="btn btn--secondary btn--xl hover-lift" id="pd-buy-now" style="flex: 1;">
                    Comprar Ahora
                  </button>
                `
              }
            </div>

            ${featuresHtml ? `
              <div class="mt-8">
                <h4 class="font-display text-xl mb-4">Características</h4>
                <div class="product-detail__features">
                  ${featuresHtml}
                </div>
              </div>
            ` : ''}

          </div>
        </div>
      </div>
    `;
  },

  init() {
    if (!this.currentProductId) return;

    const qtyMinus = document.getElementById('pd-qty-minus');
    const qtyPlus = document.getElementById('pd-qty-plus');
    const qtyInput = document.getElementById('pd-qty-val');
    const addToCartBtn = document.getElementById('pd-add-to-cart');
    const buyNowBtn = document.getElementById('pd-buy-now');

    if (!qtyInput) return;

    const product = window.store.getProduct(this.currentProductId);

    const clamp = (val) => Math.max(1, Math.min(val, product.stock));

    const getQty = () => clamp(parseInt(qtyInput.value) || 1);

    const setQty = (val) => {
      qtyInput.value = clamp(val);
    };

    qtyMinus.addEventListener('click', () => setQty(getQty() - 1));
    qtyPlus.addEventListener('click', () => setQty(getQty() + 1));

    qtyInput.addEventListener('change', () => setQty(parseInt(qtyInput.value) || 1));
    qtyInput.addEventListener('blur', () => setQty(parseInt(qtyInput.value) || 1));
    qtyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') setQty(parseInt(qtyInput.value) || 1);
    });

    addToCartBtn?.addEventListener('click', () => {
      const success = window.store.addToCart(product.id, getQty());
      if (success) window.openCart();
    });

    buyNowBtn?.addEventListener('click', () => {
      const success = window.store.addToCart(product.id, getQty());
      if (success) window.location.hash = '#/checkout';
    });
  }
};
