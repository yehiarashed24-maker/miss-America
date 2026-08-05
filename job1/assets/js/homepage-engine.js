/* Egypt America Center — homepage-only motion and partner hall */
(function () {
  'use strict';

  function renderPartnerHall() {
    try {
      const stage = document.getElementById('eac-partner-stage');
      const data = typeof EGYPT_AMERICAN_DATA !== 'undefined' && EGYPT_AMERICAN_DATA ? EGYPT_AMERICAN_DATA.brands : null;
      if (!stage || !Array.isArray(data)) return;

      stage.innerHTML = data.map((brand, index) => {
        if (!brand) return '';
        return `
        <a class="eac-partner-card" href="#brand/${brand.id}" aria-label="Explore ${brand.name || ''}">
          <div class="eac-partner-card__top"><span>${String(index + 1).padStart(2, '0')}</span><span>${brand.flag || ''} ${brand.country || ''}</span></div>
          <img class="eac-partner-card__logo" src="${brand.logo || ''}" alt="${brand.name || ''}" />
          <strong class="eac-partner-card__name">${brand.name || ''}</strong>
          <span class="eac-partner-card__specialty">${brand.subName || brand.tagline || 'Textile technology'}</span>
          <span class="eac-partner-card__arrow" aria-hidden="true">↗</span>
        </a>`;
      }).join('');
    } catch(e) {
      console.warn("renderPartnerHall notice:", e);
    }
  }

  function renderHeroBrandStream() {
    try {
      const stream = document.getElementById('eac-hero-brand-stream');
      const data = typeof EGYPT_AMERICAN_DATA !== 'undefined' && EGYPT_AMERICAN_DATA ? EGYPT_AMERICAN_DATA.brands : null;
      if (!stream || !Array.isArray(data)) return;

      const repeated = [...data, ...data, ...data, ...data, ...data, ...data];
      stream.innerHTML = repeated.map((brand) => {
        if (!brand) return '';
        return `
        <div class="brand-logo-pill" title="${brand.name || ''}">
          <img src="${brand.logo || ''}" alt="${brand.name || ''}" class="brand-pill-logo" />
          <span class="brand-pill-name">${brand.name || ''}</span>
          <span class="brand-pill-flag">${brand.flag || ''}</span>
        </div>`;
      }).join('');
    } catch(e) {
      console.warn("renderHeroBrandStream notice:", e);
    }
  }

  function initMotion() {
    try {
      if (typeof gsap === 'undefined') return;
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
          if (xTo) xTo(x * 22); 
          if (yTo) yTo(y * 18); 
          if (rotateTo) rotateTo(x * 8); 
          if (tiltTo) tiltTo(y * -5);
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
        if (!element || element.closest('.page-view:not(.active-view)')) return;
        gsap.from(element, { scrollTrigger: { trigger: element, start: 'top 83%', once: true }, opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' });
      });

      const partnerStage = document.querySelector('.eac-partner-stage');
      if (partnerStage) {
        gsap.from('.eac-partner-card', { scrollTrigger: { trigger: partnerStage, start: 'top 80%', once: true }, opacity: 0, x: 50, stagger: 0.07, duration: 0.65, ease: 'power3.out' });
      }
      if (hero) gsap.to('.hero-machine-container, .eac-hero__visual', { scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }, y: 100, rotate: 2, ease: 'none' });
    } catch(e) {
      console.warn("initMotion notice:", e);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    try {
      renderPartnerHall();
      renderHeroBrandStream();
      window.setTimeout(initMotion, 120);
    } catch(e) {
      console.warn("homepage-engine init notice:", e);
    }
  });
}());

