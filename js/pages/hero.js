// ============================================
// MATES.ARGENTINOS — Hero Page
// ============================================

window.PageHero = {

  render() {
    const bestSellers = window.store.getBestSellers(3);
    const reviews = window.REVIEWS || [];
    const content = window.store.getContent();

    // ── Más Vendidos Cards (premium home section)
    const rankBadges = [
      '<span class="mv-card__rank mv-card__rank--1">MÁS VENDIDO</span>',
      '<span class="mv-card__rank mv-card__rank--2">#2</span>',
      '<span class="mv-card__rank mv-card__rank--3">#3</span>',
    ];
    let masVendidosHtml = '';
    bestSellers.forEach((p, idx) => {
      masVendidosHtml += `
        <div class="mv-card stagger-item" style="animation-delay:${idx * 100}ms" onclick="window.location.hash='#/product/${p.id}'">
          <div class="mv-card__image-wrap">
            ${rankBadges[idx] || ''}
            <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.4'">
          </div>
          <div class="mv-card__body">
            <span class="mv-card__category">${window.CATEGORIES.find(c => c.id === p.category)?.name || p.category}</span>
            <h3 class="mv-card__name">${p.name}</h3>
            <div class="mv-card__price">${window.formatPrice(p.price)}</div>
            <button class="btn btn--primary btn--sm mv-card__btn" onclick="event.stopPropagation(); window.location.hash='#/product/${p.id}'">Ver Producto</button>
          </div>
        </div>
      `;
    });

    // ── Reviews Marquee (infinite, duplicated)
    const marqueeItems = [...reviews, ...reviews].map(r => `
      <div class="marquee-review-card">
        <div class="review-card__inner">
          <div class="review-card__stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          <p class="review-card__text">"${r.review}"</p>
          <div class="review-card__footer">
            <div class="review-card__name">${r.name}</div>
            ${r.date ? `<div class="review-card__date">${r.date}</div>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // ── Promotional Banner
    const bannerHtml = content.bannerVisible ? `
      <section class="section promo-banner-section">
        <div class="container">
          <div class="promo-banner-card">
            <div class="promo-banner-card__bg"></div>
            <div class="promo-banner-card__content">
              <div class="promo-banner-card__eyebrow">Oferta Especial</div>
              <h2 class="promo-banner-card__title font-display">${content.bannerTitle}</h2>
              <p class="promo-banner-card__desc">${content.bannerDescription}</p>
              <a href="${content.bannerButtonLink}" class="btn btn--gold btn--lg hover-lift">${content.bannerButtonText}</a>
            </div>
          </div>
        </div>
      </section>
    ` : '';

    return `
      <!-- ══ HERO ══════════════════════════════════ -->
      <section class="hero-section">
        <div class="hero-section__decoration hero-section__decoration--1"></div>
        <div class="hero-section__decoration hero-section__decoration--2"></div>
        <div class="hero-section__decoration hero-section__decoration--3"></div>

        <div class="container hero-section__content">
          <div class="hero-section__text">
            <div class="hero-section__badge reveal fade-down">✦ Calidad Artesanal Argentina</div>
            <h1 class="hero-section__title reveal fade-up delay-100">El Auténtico<br><span class="text-gradient">Ritual del Mate</span></h1>
            <p class="hero-section__description reveal fade-up delay-200">
              Elevá tu ritual diario con mates, bombillas y yerba seleccionadas artesanalmente. La esencia de Argentina, en tus manos.
            </p>
            <div class="hero-section__actions reveal fade-up delay-300">
              <a href="#/catalog" class="btn btn--primary btn--xl hover-lift">Ver Colección</a>
              <a href="#" onclick="event.preventDefault(); window.scrollToSection('contacto')" class="btn btn--secondary btn--xl hover-lift">Contacto</a>
            </div>

            <div class="hero-section__features reveal fade-up delay-400">
              <div class="hero-section__feature">
                <div class="hero-section__feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                Hecho a Mano
              </div>
              <div class="hero-section__feature">
                <div class="hero-section__feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                Envíos a Todo el País
              </div>
              <div class="hero-section__feature">
                <div class="hero-section__feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                Calidad Garantizada
              </div>
            </div>
          </div>
        </div>

        <div class="hero-section__scroll-indicator">
          Scroll
          <div class="hero-section__scroll-line"></div>
        </div>
      </section>

      <!-- ══ TRUST BAR ══════════════════════════════ -->
      <section class="trust-bar-section">
        <div class="container">
          <div class="trust-bar">
            <div class="trust-bar__item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-500)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Piezas únicas 100% artesanales</span>
            </div>
            <div class="trust-bar__sep"></div>
            <div class="trust-bar__item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-500)" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Envíos a todo el país</span>
            </div>
            <div class="trust-bar__sep"></div>
            <div class="trust-bar__item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-500)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>Calidad garantizada</span>
            </div>
            <div class="trust-bar__sep"></div>
            <div class="trust-bar__item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-500)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Origen Argentina</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ MÁS VENDIDOS ═══════════════════════════ -->
      <section class="mas-vendidos-section">
        <div class="container">
          <div class="text-center reveal fade-up" style="margin-bottom: var(--space-14);">
            <div class="section-eyebrow">Selección Premium</div>
            <h2 class="font-display mas-vendidos-title">Más <em>Vendidos</em></h2>
            <p class="text-secondary" style="margin-top: var(--space-3);">Los productos más elegidos por nuestra comunidad matera.</p>
          </div>
          <div class="mv-grid stagger-children reveal visible">
            ${masVendidosHtml}
          </div>
          <div class="text-center reveal fade-up" style="margin-top: var(--space-12);">
            <a href="#/catalog" class="btn btn--outline btn--lg hover-lift">Ver Toda la Colección &rarr;</a>
          </div>
        </div>
      </section>

      <!-- ══ BANNER PROMOCIONAL ═════════════════════ -->
      ${bannerHtml}

      <!-- ══ REVIEWS ════════════════════════════════ -->
      <section class="reviews-section">
        <div class="container">
          <div class="reviews-trust-banner reveal fade-up">
            <div class="reviews-trust-banner__item">
              <span class="reviews-trust-banner__stars">★★★★★</span>
              <span>5.0 de calificación promedio</span>
            </div>
            <div class="reviews-trust-banner__sep"></div>
            <div class="reviews-trust-banner__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>+100 reseñas verificadas</span>
            </div>
            <div class="reviews-trust-banner__sep"></div>
            <div class="reviews-trust-banner__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span>Clientes de toda Argentina</span>
            </div>
            <div class="reviews-trust-banner__sep"></div>
            <div class="reviews-trust-banner__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Envíos a todo el país</span>
            </div>
          </div>

          <div class="text-center reveal fade-up" style="margin-bottom: var(--space-12);">
            <div class="section-eyebrow">Testimonios</div>
            <h2 class="reviews-section__title">Lo que dicen nuestros <em>clientes</em></h2>
            <p class="text-secondary" style="margin-top: var(--space-3);">Más de 100 clientes satisfechos nos recomiendan.</p>
          </div>

          <!-- Infinite Marquee Carousel -->
          <div class="reviews-marquee-wrapper reveal fade-up">
            <div class="reviews-marquee-track" id="reviews-marquee-track">
              ${marqueeItems}
            </div>
          </div>
        </div>
      </section>

      <!-- ══ CONTACTO ══════════════════════════════ -->
      <section class="contact-section" id="contacto">
        <div class="container">
          <div class="text-center reveal fade-up" style="margin-bottom: var(--space-12);">
            <div class="section-eyebrow">Contacto</div>
            <h2 class="font-display contact-section__title">¿Tenés alguna <em>consulta?</em></h2>
            <p class="text-secondary" style="margin-top: var(--space-3); max-width: 48ch; margin-left: auto; margin-right: auto;">
              Completá el formulario y nos ponemos en contacto a la brevedad.
            </p>
          </div>
          <form class="contact-form reveal fade-up" id="contact-form" onsubmit="event.preventDefault(); window.submitContactForm();">
            <div class="contact-form__grid">
              <div class="form-group">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-input" id="ct_nombre" required placeholder="Tu nombre">
              </div>
              <div class="form-group">
                <label class="form-label">Apellido</label>
                <input type="text" class="form-input" id="ct_apellido" required placeholder="Tu apellido">
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="ct_email" required placeholder="tu@email.com">
              </div>
              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input type="tel" class="form-input" id="ct_telefono" placeholder="+54 9 11 0000-0000">
              </div>
            </div>
            <div class="form-group" style="margin-top: var(--space-4);">
              <label class="form-label">Mensaje</label>
              <textarea class="form-input" id="ct_mensaje" rows="5" required placeholder="¿En qué podemos ayudarte?"></textarea>
            </div>
            <div class="text-center" style="margin-top: var(--space-8);">
              <button type="submit" class="btn btn--primary btn--lg hover-lift">Enviar Consulta</button>
            </div>
          </form>
        </div>
      </section>
    `;
  },

  init() {
    window.submitContactForm = () => {
      const nombre = document.getElementById('ct_nombre')?.value.trim();
      const apellido = document.getElementById('ct_apellido')?.value.trim();
      const email = document.getElementById('ct_email')?.value.trim();
      const mensaje = document.getElementById('ct_mensaje')?.value.trim();
      if (!nombre || !apellido || !email || !mensaje) return;

      const form = document.getElementById('contact-form');
      const btn = form?.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Enviando...'; btn.disabled = true; }

      setTimeout(() => {
        window.store.emit('success', '¡Consulta enviada! Te contactamos a la brevedad.');
        if (form) form.reset();
        if (btn) { btn.textContent = 'Enviar Consulta'; btn.disabled = false; }
      }, 800);
    };
  }
};
