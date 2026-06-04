// ============================================
// MATES.ARGENTINOS — State Management
// Simple Pub/Sub Store with LocalStorage
// ============================================

const DATA_VERSION = '3';

class Store {
  constructor() {
    this.state = {
      products: [],
      cart: [],
      orders: [],
      user: null,
      isAdmin: false
    };

    this.listeners = {};

    this.init();
  }

  // Initialize from LocalStorage or Seed Data
  init() {
    const savedState = localStorage.getItem('mates_arg_state');

    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Reset products & cart when data version changes
        if (parsed._version !== DATA_VERSION) {
          this.state.products = [...window.INITIAL_PRODUCTS];
          this.state.cart = [];
          if (parsed.orders) this.state.orders = parsed.orders;
          if (parsed.isAdmin !== undefined) this.state.isAdmin = parsed.isAdmin;
        } else {
          this.state = { ...this.state, ...parsed };
          if (!this.state.products || this.state.products.length === 0) {
            this.state.products = [...window.INITIAL_PRODUCTS];
          }
        }
      } catch (e) {
        console.error('Failed to parse saved state:', e);
        this.state.products = [...window.INITIAL_PRODUCTS];
      }
    } else {
      this.state.products = [...window.INITIAL_PRODUCTS];
    }

    this.save();
  }

  // Save to LocalStorage
  save() {
    localStorage.setItem('mates_arg_state', JSON.stringify({ ...this.state, _version: DATA_VERSION }));
  }

  // Subscribe to changes
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  // Emit event
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  // ── CART METHODS ────────────────────────────────────────

  getCart() {
    return this.state.cart;
  }

  getCartTotal() {
    return this.state.cart.reduce((total, item) => {
      const product = this.getProduct(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getCartCount() {
    return this.state.cart.reduce((count, item) => count + item.quantity, 0);
  }

  addToCart(productId, quantity = 1) {
    const product = this.getProduct(productId);
    if (!product || product.stock < quantity) {
      this.emit('error', 'Stock insuficiente');
      return false;
    }

    const existingItem = this.state.cart.find(item => item.productId === productId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        this.emit('error', 'No podés agregar más del stock disponible');
        return false;
      }
      existingItem.quantity = newQuantity;
    } else {
      this.state.cart.push({ productId, quantity });
    }

    this.save();
    this.emit('cart_updated', this.state.cart);
    this.emit('success', `${product.name} agregado al carrito`);
    return true;
  }

  updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }

    const product = this.getProduct(productId);
    if (!product || product.stock < quantity) {
      this.emit('error', 'Stock insuficiente');
      return false;
    }

    const item = this.state.cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.save();
      this.emit('cart_updated', this.state.cart);
    }
    return true;
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(item => item.productId !== productId);
    this.save();
    this.emit('cart_updated', this.state.cart);
    return true;
  }

  clearCart() {
    this.state.cart = [];
    this.save();
    this.emit('cart_updated', this.state.cart);
  }

  // ── PRODUCT METHODS ──────────────────────────────────────

  getProducts() {
    return this.state.products;
  }

  getProduct(id) {
    return this.state.products.find(p => p.id === id);
  }

  getFeaturedProducts() {
    return this.state.products.filter(p => p.featured).slice(0, 4);
  }

  getBestSellers(limit = 3) {
    const salesCount = {};
    this.state.orders.forEach(order => {
      order.items.forEach(item => {
        salesCount[item.productId] = (salesCount[item.productId] || 0) + item.quantity;
      });
    });

    const hasSales = Object.keys(salesCount).length > 0;
    if (!hasSales) {
      // Fall back: mostSold flag first, then featured products
      return [...this.state.products]
        .sort((a, b) => (b.mostSold ? 1 : 0) - (a.mostSold ? 1 : 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        .slice(0, limit)
        .map(p => ({ ...p, _isBestSeller: false, _salesCount: 0 }));
    }

    return [...this.state.products]
      .sort((a, b) => (salesCount[b.id] || 0) - (salesCount[a.id] || 0))
      .slice(0, limit)
      .map((p, i) => ({ ...p, _isBestSeller: i === 0, _salesCount: salesCount[p.id] || 0 }));
  }

  getSalesSummary() {
    const orders = this.getOrders();
    const products = this.state.products;

    const salesByProduct = {};
    const revenueByCategory = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        salesByProduct[item.productId] = (salesByProduct[item.productId] || 0) + item.quantity;
        const product = products.find(p => p.id === item.productId);
        if (product) {
          revenueByCategory[product.category] = (revenueByCategory[product.category] || 0) + (product.price * item.quantity);
        }
      });
    });

    const last7Days = [];
    const last7Labels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      last7Labels.push(d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' }));
      last7Days.push(
        orders.filter(o => o.date && o.date.startsWith(dateStr)).reduce((sum, o) => sum + o.total, 0)
      );
    }

    const productRanking = [...products]
      .map(p => ({ ...p, sales: salesByProduct[p.id] || 0 }))
      .sort((a, b) => b.sales - a.sales);

    return { salesByProduct, revenueByCategory, last7Days, last7Labels, productRanking };
  }

  searchProducts(query, category = 'all') {
    let filtered = this.state.products;
    
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }

  // Admin Product Methods
  addProduct(productData) {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    this.state.products.push(newProduct);
    this.save();
    this.emit('products_updated', this.state.products);
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.state.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.state.products[index] = { ...this.state.products[index], ...updates };
      this.save();
      this.emit('products_updated', this.state.products);
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    this.state.products = this.state.products.filter(p => p.id !== id);
    // Also remove from cart
    this.state.cart = this.state.cart.filter(item => item.productId !== id);
    
    this.save();
    this.emit('products_updated', this.state.products);
    this.emit('cart_updated', this.state.cart);
  }

  // ── ORDER METHODS ────────────────────────────────────────

  createOrder(customerData, shippingData, paymentData) {
    if (this.state.cart.length === 0) return null;

    // Calculate totals
    const subtotal = this.getCartTotal();
    const shippingCosts = { express: 25000, standard: 10000, pickup: 0 };
    const shipping = shippingCosts[shippingData.method] ?? 10000;
    const total = subtotal + shipping;

    const order = {
      id: `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      date: new Date().toISOString(),
      status: 'pending',
      customer: customerData,
      shipping: shippingData,
      payment: { method: paymentData.method, last4: paymentData.cardNumber?.slice(-4) || 'XXXX' },
      items: [...this.state.cart],
      subtotal,
      shippingCost: shipping,
      total
    };

    // Update stock
    this.state.cart.forEach(item => {
      const product = this.getProduct(item.productId);
      if (product) {
        this.updateProduct(product.id, { stock: product.stock - item.quantity });
      }
    });

    this.state.orders.push(order);
    this.clearCart(); // Save happens in clearCart, but let's be safe
    this.save();
    
    this.emit('order_created', order);
    return order;
  }

  getOrders() {
    return this.state.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  updateOrderStatus(orderId, status) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.save();
      this.emit('orders_updated', this.state.orders);
      return true;
    }
    return false;
  }

  // ── CONTENT MANAGEMENT ──────────────────────────────────

  getContent() {
    if (!this.state.content) {
      this.state.content = {
        bannerTitle: 'El Regalo de la Conexión',
        bannerDescription: 'El mate es más que una bebida; es un ritual de compartir y conexión. Descubrí nuestros kits de regalo perfectos para presentarle la tradición a alguien especial.',
        bannerButtonText: 'Explorar Kits de Regalo',
        bannerButtonLink: '#/catalog?cat=sets',
        bannerVisible: true
      };
    }
    return this.state.content;
  }

  updateContent(updates) {
    this.state.content = { ...this.getContent(), ...updates };
    this.save();
    this.emit('content_updated', this.state.content);
  }

  // ── ADMIN AUTH ───────────────────────────────────────────

  loginAdmin(username, password) {
    // Simple mock auth
    if (username === 'admin' && password === 'admin123') {
      this.state.isAdmin = true;
      this.save();
      this.emit('auth_changed', true);
      return true;
    }
    return false;
  }

  logoutAdmin() {
    this.state.isAdmin = false;
    this.save();
    this.emit('auth_changed', false);
  }

  isAdmin() {
    return this.state.isAdmin;
  }
}

// Export a singleton instance
window.store = new Store();

// Global price formatter — Argentine peso style: $45.000
window.formatPrice = (price) => {
  const n = Math.round(price);
  return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
