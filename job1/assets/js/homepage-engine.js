/* Egypt America Center — homepage-only motion and partner hall */
(function () {
  'use strict';

  function renderPartnerHall() {
    const stage = document.getElementById('eac-partner-stage');
    // data.js declares a top-level const, so it is available by lexical name
    // rather than necessarily as a window property.
    const data = typeof EGYPT_AMERICAN_DATA !== 'undefined' && EGYPT_AMERICAN_DATA.brands;
    if (!stage || !Array.isArray(data)) return;

    stage.innerHTML = data.map((brand, index) => `
      <a class="eac-partner-card" href="#brand/${brand.id}" aria-label="Explore ${brand.name}">
        <div class="eac-partner-card__top"><span>${String(index + 1).padStart(2, '0')}</span><span>${brand.flag || ''} ${brand.country || ''}</span></div>
        <img class="eac-partner-card__logo" src="${brand.logo}" alt="${brand.name}" />
        <strong class="eac-partner-card__name">${brand.name}</strong>
        <span class="eac-partner-card__specialty">${brand.subName || brand.tagline || 'Textile technology'}</span>
        <span class="eac-partner-card__arrow" aria-hidden="true">↗</span>
      </a>`).join('');
  }

  function renderHeroBrandStream() {
    const stream = document.getElementById('eac-hero-brand-stream');
    const data = typeof EGYPT_AMERICAN_DATA !== 'undefined' && EGYPT_AMERICAN_DATA.brands;
    if (!stream || !Array.isArray(data)) return;

    const repeated = [...data, ...data, ...data, ...data, ...data, ...data];
    stream.innerHTML = repeated.map((brand) => `
      <div class="brand-logo-pill" title="${brand.name}">
        <img src="${brand.logo}" alt="${brand.name}" class="brand-pill-logo" />
        <span class="brand-pill-name">${brand.name}</span>
        <span class="brand-pill-flag">${brand.flag || ''}</span>
      </div>`).join('');
  }

  function initMotion() {
    if (typeof gsap === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = document.querySelector('.new-hero-section') || document.querySelector('.eac-hero');
    const machine = document.querySelector('.hero-machine-container') || document.querySelector('.eac-hero-machine');

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro.from('.hero-eyebrow, .eac-hero__eyebrow', { opacity: 0, y: 15, duration: 0.5 })
      .from('.hero-main-title .title-line, .eac-hero__title span', { opacity: 0, yPercent: 110, stagger: 0.12, duration: 0.95 }, '-=0.2')
      .from('.hero-description, .hero-action-buttons, .eac-hero__lede, .eac-hero .eac-actions', { opacity: 0, y: 24, stagger: 0.1, duration: 0.65 }, '-=0.45')
      .from('.hero-machine-container, .eac-hero__visual', { opacity: 0, scale: 0.9, x: 70, rotationY: -10, duration: 1.15 }, '-=1.0')
      .from('.hero-floating-brands .brand-item, .eac-hero-brand-pill', { opacity: 0, x: 65, stagger: 0.065, duration: 0.45 }, '-=0.7')
      .from('.hero-scroll-spy, .hero-bottom-stats-bar, .navbar', { opacity: 0, y: 18, stagger: 0.08, duration: 0.55 }, '-=0.55');

    if (!prefersReducedMotion && hero && machine) {
      const xTo = gsap.quickTo(machine, 'x', { duration: 0.8, ease: 'power3.out' });
      const yTo = gsap.quickTo(machine, 'y', { duration: 0.8, ease: 'power3.out' });
      const rotateTo = gsap.quickTo(machine, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const tiltTo = gsap.quickTo(machine, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const fabricStage = document.querySelector('.hero-fabric-bg-parallax');
      hero.addEventListener('pointermove', (event) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        xTo(x * 22); yTo(y * 18); rotateTo(x * 8); tiltTo(y * -5);
        if (fabricStage) {
          fabricStage.style.setProperty('--fabric-tilt-x', `${(-3 + x * -7).toFixed(2)}deg`);
          fabricStage.style.setProperty('--fabric-tilt-y', `${(y * 5).toFixed(2)}deg`);
          fabricStage.style.setProperty('--fabric-x', `${(x * -28).toFixed(1)}px`);
          fabricStage.style.setProperty('--fabric-y', `${(y * -20).toFixed(1)}px`);
        }
      });
    }

    if (typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.universe-header, .machine-pedestal-item, .eac-manifesto, .eac-showcase__heading, .eac-machine-feature, .eac-partners__intro, .eac-spares__content, .eac-closing').forEach((element) => {
      gsap.from(element, { scrollTrigger: { trigger: element, start: 'top 83%', once: true }, opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' });
    });
    gsap.from('.eac-partner-card', { scrollTrigger: { trigger: '.eac-partner-stage', start: 'top 80%', once: true }, opacity: 0, x: 50, stagger: 0.07, duration: 0.65, ease: 'power3.out' });
    gsap.to('.hero-machine-container, .eac-hero__visual', { scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }, y: 100, rotate: 2, ease: 'none' });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderPartnerHall();
    renderHeroBrandStream();
    // app.js activates the routed home view a moment after DOM readiness.
    // Start entrances only once that view is visible; otherwise GSAP would
    // finish the reveal while its parent is display:none.
    window.setTimeout(initMotion, 120);
  });
}());
