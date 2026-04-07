/* ══════════════════════════════════════════════
   LIGHTNING MCLEAN — script.js
   ══════════════════════════════════════════════ */

'use strict';

/* ── SCROLL ANIMATION (Intersection Observer) ── */
(function initFadeUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
})();


/* ── NAVBAR SCROLL SHADOW ── */
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();


/* ── MOBILE HAMBURGER MENU ── */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ── SMOOTH SCROLL (fallback for older browsers) ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ── ACTIVE NAV LINK HIGHLIGHT ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              if (!link.classList.contains('nav-cta')) {
                link.style.color = 'var(--pink)';
              }
            }
          });
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));
})();


/* ── TICKER PAUSE ON HOVER ── */
(function initTickerHover() {
  const ticker = document.querySelector('.ticker-track');
  if (!ticker) return;

  ticker.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  ticker.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });
})();


/* ── GALLERY HOVER EXPAND ── */
(function initGalleryHover() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      items.forEach((i) => {
        i.style.flex = i === item ? '2' : '0.75';
      });
    });
    item.addEventListener('mouseleave', () => {
      items.forEach((i) => { i.style.flex = ''; });
    });
  });
})();


/* ── STATS COUNTER ANIMATION ── */
(function initCounters() {
  const chips = document.querySelectorAll('.chip-num');
  if (!chips.length) return;

  chips.forEach((chip) => {
    const text = chip.textContent.trim();
    const numMatch = text.match(/(\d+)/);
    if (!numMatch) return;

    const target = parseInt(numMatch[1], 10);
    const suffix = text.replace(numMatch[0], '');
    const duration = 1200;
    const start = performance.now();

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        const animate = (now) => {
          const elapsed = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          chip.textContent = Math.round(eased * target) + suffix;
          if (elapsed < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    observer.observe(chip);
  });
})();
