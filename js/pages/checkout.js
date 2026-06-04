// ============================================
// MATES.ARGENTINOS — Página de Pago
// ============================================

window.PageCheckout = {
  render() {
    const cart = window.store.getCart();

    if (cart.length === 0) {
      return `
        <div class="container empty-state" style="padding-top: var(--space-32); min-height: 80vh;">
          <div class="empty-state__icon"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div>
          <h1 class="empty-state__title font-display">Tu carrito está vacío</h1>
          <p class="empty-state__description">Agregá productos a tu carrito antes de continuar al pago.</p>
          <a href="#/catalog" class="btn btn--primary btn--xl">Volver a la Tienda</a>
        </div>
      `;
    }

    return `
      <div class="container checkout-page">
        <div class="checkout-grid">

          <!-- Izquierda: Formularios -->
          <div>
            <!-- Indicador de Progreso -->
            <div class="progress-steps" id="checkout-progress">
              <div class="progress-step progress-step--active" data-step="1">
                <div class="progress-step__circle">1</div>
                <div class="progress-step__label">Información</div>
              </div>
              <div class="progress-step__line" id="line-1"></div>
              <div class="progress-step" data-step="2">
                <div class="progress-step__circle">2</div>
                <div class="progress-step__label">Envío</div>
              </div>
              <div class="progress-step__line" id="line-2"></div>
              <div class="progress-step" data-step="3">
                <div class="progress-step__circle">3</div>
                <div class="progress-step__label">Pago</div>
              </div>
            </div>

            <div class="checkout-form-container">

              <!-- Paso 1: Información -->
              <div class="checkout-step active" id="step-1">
                <h2 class="checkout-step__title font-display text-2xl">Información de Contacto</h2>
                <form id="form-info" onsubmit="event.preventDefault(); window.nextCheckoutStep(2);">
                  <div class="grid-2 gap-4 mb-4">
                    <div class="form-group">
                      <label class="form-label">Nombre</label>
                      <input type="text" class="form-input" id="c_fname" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Apellido</label>
                      <input type="text" class="form-input" id="c_lname" required>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="form-label">Correo Electrónico</label>
                    <input type="email" class="form-input" id="c_email" required>
                  </div>
                  <div class="form-group mb-6">
                    <label class="form-label">Teléfono (Opcional)</label>
                    <input type="tel" class="form-input" id="c_phone">
                  </div>

                  <div class="checkout-step__actions">
                    <a href="#/catalog" class="btn btn--ghost">&lt; Volver a la Tienda</a>
                    <button type="submit" class="btn btn--primary">Continuar al Envío</button>
                  </div>
                </form>
              </div>

              <!-- Paso 2: Envío -->
              <div class="checkout-step" id="step-2">
                <h2 class="checkout-step__title font-display text-2xl">Detalles de Envío</h2>
                <form id="form-shipping" onsubmit="event.preventDefault(); window.nextCheckoutStep(3);">

                  <h3 class="font-display text-xl mb-4">Método de Envío</h3>
                  <label class="shipping-method selected" onclick="window.selectShipping('standard')">
                    <div class="flex items-center gap-4">
                      <input type="radio" name="shipping" value="standard" checked>
                      <div class="shipping-method__content">
                        <div class="font-medium">Envío Estándar</div>
                        <div class="text-xs text-secondary">5–7 días hábiles</div>
                      </div>
                    </div>
                    <div class="font-medium">${window.formatPrice(10000)}</div>
                  </label>
                  <label class="shipping-method" onclick="window.selectShipping('express')">
                    <div class="flex items-center gap-4">
                      <input type="radio" name="shipping" value="express">
                      <div class="shipping-method__content">
                        <div class="font-medium">Envío Express</div>
                        <div class="text-xs text-secondary">2–3 días hábiles</div>
                      </div>
                    </div>
                    <div class="font-medium">${window.formatPrice(25000)}</div>
                  </label>
                  <label class="shipping-method" onclick="window.selectShipping('pickup')">
                    <div class="flex items-center gap-4">
                      <input type="radio" name="shipping" value="pickup">
                      <div class="shipping-method__content">
                        <div class="font-medium">Retiro en el Local</div>
                        <div class="text-xs text-secondary">Retirá cuando quieras</div>
                      </div>
                    </div>
                    <div class="font-medium" style="color:var(--emerald-500)">Gratis</div>
                  </label>

                  <!-- Pickup info box (hidden by default) -->
                  <div class="pickup-info-box" id="pickup-info" style="display:none;">
                    <div class="pickup-info-box__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div class="pickup-info-box__content">
                      <div class="pickup-info-box__title">Retirá tu pedido en nuestro local</div>
                      <div class="pickup-info-box__row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Rosario, Santa Fe, Argentina
                      </div>
                      <div class="pickup-info-box__row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Lun–Vie 9:00–18:00 · Sáb 9:00–13:00
                      </div>
                    </div>
                  </div>

                  <!-- Address fields (hidden when pickup is selected) -->
                  <div id="shipping-address-fields" style="margin-top:var(--space-6);">
                    <div class="form-group mb-4">
                      <label class="form-label">Dirección</label>
                      <input type="text" class="form-input" id="s_address" required>
                    </div>
                    <div class="form-group mb-4">
                      <label class="form-label">Piso / Depto (opcional)</label>
                      <input type="text" class="form-input" id="s_apt">
                    </div>
                    <div class="grid-3 gap-4 mb-6">
                      <div class="form-group">
                        <label class="form-label">Ciudad</label>
                        <input type="text" class="form-input" id="s_city" required>
                      </div>
                      <div class="form-group">
                        <label class="form-label">Provincia</label>
                        <input type="text" class="form-input" id="s_state" required>
                      </div>
                      <div class="form-group">
                        <label class="form-label">Código Postal</label>
                        <input type="text" class="form-input" id="s_zip" required>
                      </div>
                    </div>
                  </div>

                  <div class="checkout-step__actions">
                    <button type="button" class="btn btn--ghost" onclick="window.nextCheckoutStep(1)">&lt; Volver a Información</button>
                    <button type="submit" class="btn btn--primary">Continuar al Pago</button>
                  </div>
                </form>
              </div>

              <!-- Paso 3: Pago -->
              <div class="checkout-step" id="step-3">
                <h2 class="checkout-step__title font-display text-2xl">Pago</h2>
                <form id="form-payment" onsubmit="event.preventDefault(); window.completeOrder();">
                  <p class="text-sm text-secondary mb-6">Todas las transacciones son seguras y cifradas. (Demo — no ingreses datos reales de tarjeta)</p>

                  <div class="payment-card-preview">
                    <div class="flex justify-between items-start mb-8">
                      <svg width="40" height="24" viewBox="0 0 40 24" fill="none"><rect width="40" height="24" rx="4" fill="var(--glass-border)"/><circle cx="12" cy="12" r="6" fill="var(--emerald-500)" opacity="0.8"/><circle cx="20" cy="12" r="6" fill="var(--gold-500)" opacity="0.8"/></svg>
                    </div>
                    <div class="text-xl tracking-widest font-mono text-muted mb-4" id="card-preview-number">•••• •••• •••• ••••</div>
                    <div class="flex justify-between text-xs text-muted font-mono uppercase">
                      <div id="card-preview-name">NOMBRE DEL TITULAR</div>
                      <div id="card-preview-exp">MM/AA</div>
                    </div>
                  </div>

                  <div class="form-group mb-4">
                    <label class="form-label">Número de Tarjeta</label>
                    <input type="text" class="form-input font-mono" id="p_card" placeholder="0000 0000 0000 0000" maxlength="19" required oninput="window.updateCardPreview('p_card', 'card-preview-number')">
                  </div>
                  <div class="grid-2 gap-4 mb-4">
                    <div class="form-group">
                      <label class="form-label">Vencimiento (MM/AA)</label>
                      <input type="text" class="form-input font-mono" id="p_exp" placeholder="MM/AA" maxlength="5" required oninput="window.updateCardPreview('p_exp', 'card-preview-exp')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Código de Seguridad (CVV)</label>
                      <input type="text" class="form-input font-mono" id="p_cvv" placeholder="123" maxlength="4" required>
                    </div>
                  </div>
                  <div class="form-group mb-8">
                    <label class="form-label">Nombre en la Tarjeta</label>
                    <input type="text" class="form-input" id="p_name" required oninput="window.updateCardPreview('p_name', 'card-preview-name')">
                  </div>

                  <div class="checkout-step__actions checkout-step__actions--payment">
                    <button type="submit" class="btn btn--gold btn--xl btn--block" id="btn-pay">Pagar <span id="pay-btn-amount"></span></button>
                    <button type="button" class="checkout-back-link" onclick="window.nextCheckoutStep(2)">← Volver al Envío</button>
                  </div>
                </form>
              </div>

              <!-- Estado de Éxito -->
              <div class="checkout-step checkout-success" id="step-success">
                <div class="checkout-success__icon-wrap">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 class="font-display checkout-success__title">¡Pedido Confirmado!</h2>
                <p class="checkout-success__subtitle">Gracias por tu compra. Tu pedido está en camino.</p>
                <div class="checkout-success__order-box">
                  <span class="checkout-success__order-label">Número de Pedido</span>
                  <strong id="success-order-id" class="checkout-success__order-id"></strong>
                </div>
                <p class="checkout-success__note">Recibirás un correo de confirmación con los detalles de tu envío.</p>
                <a href="#/" class="btn btn--primary btn--lg hover-lift">Volver al Inicio</a>
              </div>

            </div>
          </div>

          <!-- Derecha: Resumen -->
          <div class="checkout-summary" id="checkout-summary-block">
            <h3 class="font-display text-xl mb-6">Resumen del Pedido</h3>
            <div class="flex flex-col gap-4 mb-6" id="co-items">
              <!-- Items inyectados por JS -->
            </div>

            <div class="border-t border-glass-border pt-4 mb-4 flex flex-col gap-2">
              <div class="summary-row">
                <span>Subtotal</span>
                <span id="co-subtotal">${window.formatPrice(0)}</span>
              </div>
              <div class="summary-row">
                <span>Envío <span id="co-shipping-label" class="text-xs ml-1">(Estándar)</span></span>
                <span id="co-shipping">${window.formatPrice(10000)}</span>
              </div>
              <div class="summary-row--total">
                <span>Total</span>
                <span id="co-total" class="text-emerald-400">${window.formatPrice(0)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  init() {
    if (window.store.getCart().length === 0) return;

    const itemsContainer = document.getElementById('co-items');
    const cart = window.store.getCart();
    let itemsHtml = '';

    cart.forEach(item => {
      const p = window.store.getProduct(item.productId);
      if (!p) return;
      itemsHtml += `
        <div class="co-summary-item" data-product-id="${p.id}">
          <div class="co-summary-item__thumb">
            <img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23FAFAF9%22/></svg>'">
            <span class="co-summary-item__qty-badge">${item.quantity}</span>
          </div>
          <div class="co-summary-item__details">
            <div class="co-summary-item__name">${p.name}</div>
            <div class="co-summary-item__unit-price">${window.formatPrice(p.price)} × ${item.quantity}</div>
          </div>
          <div class="co-summary-item__total">${window.formatPrice(p.price * item.quantity)}</div>
        </div>
      `;
    });
    itemsContainer.innerHTML = itemsHtml;

    let currentShippingCost = 10000;

    const SHIPPING_COSTS = { standard: 10000, express: 25000, pickup: 0 };
    const SHIPPING_LABELS = { standard: 'Estándar', express: 'Express', pickup: 'Retiro en Local' };

    window.selectShipping = (method) => {
      document.querySelectorAll('.shipping-method').forEach(el => el.classList.remove('selected'));
      document.querySelector(`input[value="${method}"]`).closest('.shipping-method').classList.add('selected');
      document.querySelector(`input[value="${method}"]`).checked = true;

      currentShippingCost = SHIPPING_COSTS[method] ?? 10000;
      document.getElementById('co-shipping-label').textContent = `(${SHIPPING_LABELS[method] || 'Estándar'})`;

      const isPickup = method === 'pickup';
      const addressFields = document.getElementById('shipping-address-fields');
      const pickupInfo = document.getElementById('pickup-info');

      addressFields.style.display = isPickup ? 'none' : 'block';
      pickupInfo.style.display = isPickup ? 'flex' : 'none';

      ['s_address', 's_city', 's_state', 's_zip'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          if (isPickup) el.removeAttribute('required');
          else el.setAttribute('required', '');
        }
      });

      window.updateTotals();
    };

    window.updateTotals = () => {
      const subtotal = window.store.getCartTotal();
      const total = subtotal + currentShippingCost;

      document.getElementById('co-subtotal').textContent = window.formatPrice(subtotal);
      document.getElementById('co-shipping').textContent = currentShippingCost === 0
        ? 'Gratis'
        : window.formatPrice(currentShippingCost);
      document.getElementById('co-total').textContent = window.formatPrice(total);
      document.getElementById('pay-btn-amount').textContent = window.formatPrice(total);
    };

    window.nextCheckoutStep = (step) => {
      document.querySelectorAll('.checkout-step').forEach(el => el.classList.remove('active'));
      document.getElementById(`step-${step}`).classList.add('active');

      document.querySelectorAll('.progress-step').forEach((el, index) => {
        const stepNum = parseInt(el.getAttribute('data-step'));
        if (stepNum < step) {
          el.classList.add('progress-step--completed');
          el.classList.remove('progress-step--active');
          if (index < 2) document.getElementById(`line-${stepNum}`).classList.add('progress-step__line--filled');
        } else if (stepNum === step) {
          el.classList.add('progress-step--active');
          el.classList.remove('progress-step--completed');
        } else {
          el.classList.remove('progress-step--active', 'progress-step--completed');
          if (index < 2) document.getElementById(`line-${stepNum}`).classList.remove('progress-step__line--filled');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.updateCardPreview = (inputId, targetId) => {
      const val = document.getElementById(inputId).value;
      document.getElementById(targetId).textContent = val || document.getElementById(inputId).placeholder || '...';
    };

    window.completeOrder = () => {
      const btn = document.getElementById('btn-pay');
      btn.innerHTML = '<div class="spinner border-t-white"></div> Procesando...';
      btn.disabled = true;

      setTimeout(() => {
        const customer = {
          firstName: document.getElementById('c_fname').value,
          lastName: document.getElementById('c_lname').value,
          email: document.getElementById('c_email').value,
          phone: document.getElementById('c_phone').value
        };

        const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
        const isPickup = shippingMethod === 'pickup';

        const shipping = {
          address: isPickup ? 'Retiro en el Local' : document.getElementById('s_address').value,
          city: isPickup ? 'Rosario' : document.getElementById('s_city').value,
          state: isPickup ? 'Santa Fe' : document.getElementById('s_state').value,
          zip: isPickup ? '' : document.getElementById('s_zip').value,
          method: shippingMethod
        };

        const payment = {
          method: 'credit_card',
          cardNumber: document.getElementById('p_card').value
        };

        const order = window.store.createOrder(customer, shipping, payment);

        if (order) {
          document.querySelectorAll('.checkout-step').forEach(el => el.classList.remove('active'));
          document.getElementById('step-success').classList.add('active');
          document.getElementById('success-order-id').textContent = order.id;
          document.getElementById('checkout-progress').style.display = 'none';
          document.getElementById('checkout-summary-block').style.display = 'none';

          // Collapse grid to single column and center success card
          const grid = document.querySelector('.checkout-grid');
          if (grid) grid.classList.add('checkout-grid--success');

          document.getElementById('cart-sidebar').classList.remove('cart-sidebar--open');
          window.store.emit('success', '¡Pedido realizado con éxito!');
        } else {
          btn.innerHTML = 'Pagar';
          btn.disabled = false;
          window.store.emit('error', 'Error al crear el pedido');
        }
      }, 1500);
    };

    window.updateTotals();
  }
};
