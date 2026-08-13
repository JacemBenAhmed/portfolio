/*============================================================
  PORTFOLIO — MAIN SCRIPT
============================================================*/

const THEME_STORAGE_KEY = 'portfolio-theme';

// Replace this with your real email (used by the contact form)
const CONTACT_EMAIL = 'jacem.benahmed@example.com';

/*===== THEME =====*/
function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }
  }
}

function initTheme() {
  applyTheme(getPreferredTheme());

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const syncWithSystemTheme = event => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  };

  if (colorSchemeQuery.addEventListener) {
    colorSchemeQuery.addEventListener('change', syncWithSystemTheme);
  } else if (colorSchemeQuery.addListener) {
    colorSchemeQuery.addListener(syncWithSystemTheme);
  }
}

/*===== RESUME DROPDOWN =====*/
function toggleDropdown(button) {
  document.querySelectorAll('.resume-dropdown-content').forEach(dropdown => {
    dropdown.classList.remove('show');
  });
  const dropdown = button.nextElementSibling;
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

document.addEventListener('click', event => {
  if (!event.target.closest('.resume-btn')) {
    document.querySelectorAll('.resume-dropdown-content').forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
});

/*===== BUTTON RIPPLE =====*/
function attachRipple(container) {
  container.querySelectorAll('.button').forEach(button => {
    if (button.dataset.rippleAttached) return;
    button.dataset.rippleAttached = 'true';
    button.addEventListener('click', e => {
      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - diameter / 2;
      const y = e.clientY - rect.top - diameter / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple-ink';
      ripple.style.width = diameter + 'px';
      ripple.style.height = diameter + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/*===== CONTACT FORM =====*/
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.className = 'contact__form-status show err';
      status.textContent = 'Please fill in all the fields.';
      return;
    }

    const subject = encodeURIComponent('Portfolio contact — ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;

    status.className = 'contact__form-status show ok';
    status.textContent = 'Thanks! Your email client should open now.';
    form.reset();
  });
}

/*===== NAV / HEADER =====*/
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-menu');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
      });
    });
  }

  const header = document.querySelector('.l-header');
  const scrollTop = document.getElementById('scroll-top');

  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
    if (scrollTop) scrollTop.classList.toggle('show', window.scrollY > 400);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/*===== ACTIVE LINK =====*/
function initActiveLinks() {
  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];

  const setByPath = () => {
    document.querySelectorAll('.nav__menu a.nav__link').forEach(link => {
      const href = (link.getAttribute('href') || '').split('#')[0] || 'index.html';
      link.classList.toggle('active-link', href === currentFile);
    });
  };

  const isHome = currentFile === '' || currentFile === 'index.html';

  const scrollActive = () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 80;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);
      if (link) {
        link.classList.toggle('active-link', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
      }
    });
  };

  if (isHome) {
    window.addEventListener('scroll', scrollActive, { passive: true });
    scrollActive();
  } else {
    setByPath();
  }
}

/*===== SMOOTH SCROLL FOR IN-PAGE ANCHORS =====*/
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/*===== SCROLL REVEAL =====*/
function initScrollReveal() {
  if (typeof ScrollReveal === 'undefined') return;

  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '28px',
    duration: 700,
    easing: 'ease-out',
    reset: false
  });

  sr.reveal('.home__data', { origin: 'bottom', distance: '28px' });
  sr.reveal('.about__panel', { interval: 90 });
  sr.reveal('.experience__item', { interval: 140 });
  sr.reveal('.education__card', { interval: 140 });
  sr.reveal('.project-card', { interval: 140 });
  sr.reveal('.tech-item', { interval: 40 });
  sr.reveal('.cp-stat-item, .cp-achievements', { interval: 120 });
  sr.reveal('.cp-platform, .cp-featured', { interval: 120 });
  sr.reveal('.contact__info-item, .contact__form', { interval: 120 });
}

/*===== ANIMATED BACKGROUND — PARTICLES =====*/
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  const rootStyle = getComputedStyle(document.documentElement);
  const color = rootStyle.getPropertyValue('--first-color').trim() || '#7c3aed';

  let particles = [];
  let rafId = null;
  let running = false;
  const mouse = { x: null, y: null };

  function seed() {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const count = Math.min(Math.floor((width * height) / 16000), 90);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function draw() {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.55;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - dist / 130) * 0.16;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (mouse.x !== null) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.05;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!running) return;
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function onMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  function onVisibilityChange() {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
    } else {
      running = true;
      loop();
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);

  resize();
  running = true;
  loop();
}

/*===== HERO TYPING =====*/
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Full-stack Engineer',
    'DevOps Enthusiast',
    'Competitive Programmer',
    'Problem Solver'
  ];

  const typeSpeed = 70;
  const deleteSpeed = 40;
  const pauseBetween = 1600;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = current.slice(0, charIndex);

    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && charIndex === current.length) {
      delay = pauseBetween;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/*===== SCROLL PROGRESS BAR =====*/
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = progress + '%';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/*===== CP STATS MODALS =====*/
function initCpModals() {
  const modals = document.querySelectorAll('.cp-modal');
  if (!modals.length) return;

  function openModal(modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modal);
      if (modal) openModal(modal);
    });
  });

  modals.forEach(modal => {
    modal.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('is-open')) closeModal(modal);
      });
    }
  });
}

/*===== INIT =====*/
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initActiveLinks();
  initSmoothScroll();
  initContactForm();
  initScrollReveal();
  attachRipple(document);
  initTyping();
  initParticles();
  initScrollProgress();
  initCpModals();
});
