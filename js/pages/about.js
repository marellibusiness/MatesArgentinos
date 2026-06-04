// ============================================
// MATES.ARGENTINOS — Página Nosotros
// ============================================

window.PageAbout = {
  render() {
    return `
      <div style="padding-top: var(--space-32); padding-bottom: var(--space-24); overflow: hidden;">

        <!-- Intro -->
        <div class="container">
          <div class="reveal fade-up" style="text-align:center; max-width:680px; margin: 0 auto var(--space-20);">
            <div class="hero-section__badge" style="margin-bottom: var(--space-4);">Artesanía Argentina</div>
            <h1 class="font-display mb-6" style="font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.15;">Nuestra Historia</h1>
            <p class="text-lg text-secondary" style="max-width: 55ch; margin: 0 auto;">Nacidos de la pasión por la tradición y el deseo por la calidad excepcional. Mates.Argentinos está dedicado a llevar la auténtica experiencia del mate argentino al mundo moderno.</p>
          </div>

          <!-- Historia: centrada -->
          <div class="about-grid mb-32 reveal fade-up">
            <div class="about-grid__text">
              <h2 class="font-display mb-6" style="font-size: clamp(1.8rem, 3.5vw, 2.5rem);">Arraigados en la Tradición</h2>
            </div>

            <div class="about-image">
              <img
                src="assets/images/products/mate_traditional.png"
                alt="Mate artesanal argentino de alpaca cincelada"
                style="width:100%; height:100%; object-fit:contain; padding: 1rem;"
              >
            </div>

            <div class="about-grid__body">
              <p class="text-secondary mb-4" style="max-width: 60ch; margin-left:auto; margin-right:auto;">El ritual de tomar mate es un pilar fundamental de la cultura argentina. Representa la amistad, el compartir y la conexión. Nuestro camino comenzó cuando nos dimos cuenta de que el resto del mundo se estaba perdiendo la verdadera esencia de esta tradición.</p>
              <p class="text-secondary mb-8" style="max-width: 60ch; margin-left:auto; margin-right:auto;">Recorremos Argentina para abastecernos directamente de maestros artesanos y productores orgánicos. Cada calabaza está seleccionada a mano, cada bombilla es probada para asegurar el flujo perfecto, y nuestra yerba es estacionada de forma natural.</p>

              <div class="about-stats">
                <div class="about-stat">
                  <div class="about-stat__number">10+</div>
                  <div class="about-stat__label">Socios Artesanos</div>
                </div>
                <div class="about-stat">
                  <div class="about-stat__number">100%</div>
                  <div class="about-stat__label">Yerba Orgánica</div>
                </div>
                <div class="about-stat">
                  <div class="about-stat__number">500+</div>
                  <div class="about-stat__label">Clientes Felices</div>
                </div>
                <div class="about-stat">
                  <div class="about-stat__number">5★</div>
                  <div class="about-stat__label">Calificación Media</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Franja de proceso artesanal -->
        <div class="about-process-band">
          <div class="container">
            <div class="text-center mb-16 reveal fade-up">
              <h2 class="font-display text-4xl mb-4" style="color:#fff; font-size: clamp(1.8rem, 3.5vw, 2.5rem);">El Arte Detrás de Cada Pieza</h2>
              <p style="color:rgba(255,255,255,0.75); max-width: 52ch; margin: 0 auto;">Cada mate pasa por manos expertas que dedican horas de trabajo artesanal antes de llegar a vos.</p>
            </div>
            <div class="about-process-steps stagger-children reveal visible">
              <div class="about-process-step">
                <div class="about-process-step__number">01</div>
                <h3 class="about-process-step__title">Selección</h3>
                <p class="about-process-step__desc">Elegimos cada calabaza a mano en las regiones productoras de Argentina, buscando forma, densidad y curado natural perfectos.</p>
              </div>
              <div class="about-process-step">
                <div class="about-process-step__number">02</div>
                <h3 class="about-process-step__title">Artesanía</h3>
                <p class="about-process-step__desc">Nuestros maestros artesanos cincelan, graban y montan cada virola de alpaca con herramientas tradicionales y décadas de experiencia.</p>
              </div>
              <div class="about-process-step">
                <div class="about-process-step__number">03</div>
                <h3 class="about-process-step__title">Control de Calidad</h3>
                <p class="about-process-step__desc">Cada pieza es inspeccionada antes de salir: sellado, estética, flujo de la bombilla y resistencia de los acabados.</p>
              </div>
              <div class="about-process-step">
                <div class="about-process-step__number">04</div>
                <h3 class="about-process-step__title">Envío Cuidado</h3>
                <p class="about-process-step__desc">Empacamos con materiales de protección premium para que tu mate llegue perfecto desde Buenos Aires hasta donde estés.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Valores -->
        <div class="container" style="padding-top: var(--space-24);">
          <div class="text-center mb-12 reveal fade-up">
            <h2 class="font-display text-4xl mb-4" style="font-size: clamp(1.8rem, 3.5vw, 2.5rem);">Nuestros Valores</h2>
            <p class="text-secondary">Los principios que guían todo lo que hacemos.</p>
          </div>

          <div class="grid-3 gap-8 stagger-children reveal visible mb-20">
            <div class="glass-card text-center">
              <div style="width:64px; height:64px; border-radius:50%; margin: 0 auto var(--space-6); display:flex; align-items:center; justify-content:center; background:rgba(16,185,129,0.1); color:var(--emerald-500);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3 class="font-display text-xl mb-3">Calidad Sin Compromiso</h3>
              <p class="text-sm text-secondary" style="max-width: 100%;">Nunca tomamos atajos. Nuestros materiales son premium, nuestra artesanía es meticulosa y nuestros estándares son absolutos.</p>
            </div>

            <div class="glass-card text-center">
              <div style="width:64px; height:64px; border-radius:50%; margin: 0 auto var(--space-6); display:flex; align-items:center; justify-content:center; background:rgba(16,185,129,0.1); color:var(--emerald-500);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 class="font-display text-xl mb-3">Abastecimiento Sustentable</h3>
              <p class="text-sm text-secondary" style="max-width: 100%;">Nuestra yerba se cultiva sin pesticidas en entornos biodiversos, y nuestras calabazas son recursos naturales y renovables.</p>
            </div>

            <div class="glass-card text-center">
              <div style="width:64px; height:64px; border-radius:50%; margin: 0 auto var(--space-6); display:flex; align-items:center; justify-content:center; background:rgba(16,185,129,0.1); color:var(--emerald-500);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 class="font-display text-xl mb-3">La Comunidad Primero</h3>
              <p class="text-sm text-secondary" style="max-width: 100%;">Pagamos precios justos a nuestros artesanos y productores, construyendo relaciones de largo plazo que apoyan a sus comunidades.</p>
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center reveal fade-up">
            <a href="#/catalog" class="btn btn--primary btn--lg hover-lift">Explorar la Colección</a>
          </div>
        </div>

      </div>
    `;
  }
};
