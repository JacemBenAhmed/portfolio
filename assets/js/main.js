/*============================================================
  PORTFOLIO — APP
  Theme · navigation · data rendering · role lens · skill
  inspector · command palette (Ctrl/⌘+K) · lightbox · toasts.
============================================================*/
(function () {
  'use strict';

  const D = window.PORTFOLIO;
  if (!D) { console.warn('data.js not loaded'); return; }

  const THEME_KEY = 'portfolio-theme';
  const SI_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/';
  const SCRIPT = document.currentScript;
  const ROOT = SCRIPT ? new URL('../../', SCRIPT.src).href : location.href;
  const PATH = location.pathname.replace(/\/+$/, '/');
  const IS_HOME = /(^|\/)(index\.html)?$/.test(PATH);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  function url(p) { return p ? new URL(p, ROOT).href : '#'; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function projectById(id) { return D.PROJECTS.find(p => p.id === id); }


  /*================ THEME ================*/
  function getTheme() {
    let stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.colorScheme = t;
    const btn = $('#theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      const i = $('i', btn);
      if (i) i.className = t === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }
  }
  function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyTheme(next);
  }
  function initTheme() {
    applyTheme(getTheme());
    const btn = $('#theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', e => {
      let stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch (err) {}
      if (!stored) applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  /*================ TOPBAR / NAV ================*/
  function initTopbar() {
    const bar = $('#topbar');
    const nav = $('#topnav');
    const toggle = $('#nav-toggle');
    const progress = $('#scroll-progress');

    const onScroll = () => {
      const y = window.scrollY;
      if (bar) bar.classList.toggle('is-scrolled', y > 8);
      if (progress) {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && nav) {
      const setOpen = open => {
        nav.classList.toggle('is-open', open);
        bar && bar.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        const i = $('i', toggle);
        if (i) i.className = open ? 'bx bx-x' : 'bx bx-menu';
      };
      toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
      $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    }

    // Active section highlight (home)
    const links = $$('#topnav a[href^="#"]');
    if (links.length && 'IntersectionObserver' in window) {
      const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            links.forEach(l => l.classList.remove('is-active'));
            const l = map.get(en.target.id);
            if (l) l.classList.add('is-active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /*================ REVEAL ================*/
  let revealIO = null;
  function reveal(root = document) {
    const els = $$('[data-reveal]:not(.is-in)', root);
    if (prefersReduced || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    }
    els.forEach(e => revealIO.observe(e));
  }

  /*================ SMALL UI ================*/
  let toastTimer;
  function toast(msg, icon = 'bx-check') {
    let t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = `<i class='bx ${icon}'></i>${esc(msg)}`;
    t.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-shown'), 2200);
  }

  function copyEmail() {
    const email = D.profile.email;
    const done = () => toast('Email copied to clipboard');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(done, () => fallbackCopy(email, done));
    } else fallbackCopy(email, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast(text, 'bx-envelope'); }
    ta.remove();
  }

  function initLocalTime() {
    const els = $$('[data-local-time]');
    if (!els.length) return;
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: D.profile.timezone });
    const tick = () => els.forEach(el => { el.textContent = `${fmt.format(new Date())} in Tunisia`; });
    tick();
    setInterval(tick, 30000);
  }

  function initSpotlight(root = document) {
    $$('.pcard', root).forEach(card => {
      if (card.dataset.spot) return;
      card.dataset.spot = '1';
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /*================ IMAGE + PLACEHOLDERS ================*/
  function placeholder(p, note = 'Screenshots coming soon') {
    return `<div class="ph"><div class="ph__inner"><span class="ph__icon"><i class='bx ${esc(p.icon || 'bx-code-alt')}'></i></span><span class="ph__name">${esc(p.name)}</span><span class="ph__note">${esc(note)}</span></div></div>`;
  }
  function phone(p, src, alt, extra = '') {
    return `<div class="phone"><div class="phone__screen"><img src="${esc(url(src))}" alt="${esc(alt)}" ${extra ? extra : 'loading="lazy"'} decoding="async" data-ph="${esc(p.id)}"></div></div>`;
  }
  // Cover for mobile-only apps: three phones on an accent background
  function phoneCover(p, extra = '') {
    const shots = (p.covers || [p.cover]).filter(Boolean).slice(0, 3);
    if (!shots.length) return frame(p, null, '');
    return `<div class="frame frame--phones"><div class="frame__view"><div class="phones">${shots.map((s, i) => phone(p, s, `${p.name} screen ${i + 1}`, i === 0 ? extra : '')).join('')}</div></div></div>`;
  }
  function cover(p, alt, extra = '') {
    return p.device === 'phone' ? phoneCover(p, extra) : frame(p, p.cover, alt, extra);
  }
  function frame(p, src, alt, extra = '') {
    const host = (p.id || 'app') + (p.id === 'evalia' ? '.tn' : '.app');
    const inner = src
      ? `<img src="${esc(url(src))}" alt="${esc(alt)}" ${extra ? extra : 'loading="lazy"'} decoding="async" data-ph="${esc(p.id)}">`
      : placeholder(p);
    return `<div class="frame"><div class="frame__bar"><i></i><i></i><i></i><span class="frame__url">${esc(host)}</span></div><div class="frame__view">${inner}</div></div>`;
  }
  function logo(p) {
    const fallback = `<i class='bx ${esc(p.icon || 'bx-code-alt')}'></i>`;
    if (!p.logo) return `<span class="pcard__logo">${fallback}</span>`;
    return `<span class="pcard__logo"><img src="${esc(url(p.logo))}" alt="" loading="lazy" data-logo-fallback="${esc(p.icon || 'bx-code-alt')}"></span>`;
  }
  // Swap broken images for designed placeholders (images added later just appear)
  document.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    if (img.dataset.logoFallback) {
      const span = img.parentElement;
      span.innerHTML = `<i class='bx ${esc(img.dataset.logoFallback)}'></i>`;
    } else if (img.dataset.ph) {
      const p = projectById(img.dataset.ph);
      if (p) img.outerHTML = placeholder(p);
    } else if (img.closest('.xp__logo')) {
      img.remove();
    }
  }, true);

  /*================ PROJECT CARDS ================*/
  function projectCard(p, opts = {}) {
    const wide = opts.wide ? ' pcard--wide' : '';
    const href = url(p.url);
    const tags = p.tech.slice(0, opts.wide ? 8 : 5).map(t => `<span class="tag" data-tech="${esc(norm(t))}">${esc(t)}</span>`).join('');
    const more = p.tech.length > (opts.wide ? 8 : 5) ? `<span class="tag">+${p.tech.length - (opts.wide ? 8 : 5)}</span>` : '';
    const hl = (p.highlights || []).slice(0, 3).map(h => `<li>${esc(h)}</li>`).join('');
    return `
      <article class="pcard${wide}" style="--pc:${esc(p.accent || 'var(--accent)')}" data-id="${esc(p.id)}" data-cats="${esc((p.categories || []).join(' '))}" data-reveal>
        <a class="pcard__media" href="${esc(href)}" tabindex="-1" aria-hidden="true">${cover(p, p.name + ' interface', opts.wide ? 'fetchpriority="high"' : '')}</a>
        <div class="pcard__body">
          <div class="pcard__meta">${logo(p)}<span class="pcard__name">${esc(p.name)}</span><span class="dot-sep"></span><span>${esc(p.context)}</span>${p.isNew ? '<span class="badge badge--new">New</span>' : ''}<span class="badge badge--fit" hidden><i class='bx bx-check'></i> Fit</span></div>
          <h3 class="pcard__title"><a href="${esc(href)}">${esc(p.tagline)}</a></h3>
          <p class="pcard__desc">${esc(p.summary)}</p>
          ${hl ? `<ul class="pcard__hl">${hl}</ul>` : ''}
          <div class="pcard__foot"><div class="tags">${tags}${more}</div><span class="pcard__go" aria-hidden="true"><i class='bx bx-right-arrow-alt'></i></span></div>
        </div>
      </article>`;
  }

  function renderWork() {
    const home = $('#work-grid');
    if (home) {
      const list = D.PROJECTS.filter(p => p.featured);
      home.innerHTML = list.map((p, i) => projectCard(p, { wide: i === 0 })).join('');
    }
    const all = $('#all-grid');
    if (all) all.innerHTML = D.PROJECTS.map((p, i) => projectCard(p, { wide: i === 0 })).join('');
    initSpotlight();
  }

  /*================ EXPERIENCE ================*/
  function renderExperience() {
    const el = $('#xp-list');
    if (!el) return;
    el.innerHTML = D.EXPERIENCE.map((x, i) => {
      const p = projectById(x.project);
      const pts = x.points.map(t => `<li>${esc(t)}</li>`).join('');
      return `
        <article class="xp__item" data-cats="${esc(x.categories.join(' '))}" data-reveal>
          <div class="xp__period">${esc(x.period)}</div>
          <div class="xp__logo"><img src="${esc(url(x.logo))}" alt="${esc(x.company)} logo" loading="lazy"></div>
          <div class="xp__main">
            <h3 class="xp__role">${esc(x.role)} <span class="xp__co">· ${esc(x.company)}</span></h3>
            <p class="xp__sum">${esc(x.summary)}</p>
            <button class="xp__more" type="button" aria-expanded="false" aria-controls="xp-pts-${i}">What I did <i class='bx bx-chevron-down'></i></button>
            <ul class="xp__points" id="xp-pts-${i}" hidden>${pts}</ul>
            <div class="xp__links">
              <div class="tags">${x.tech.map(t => `<span class="tag" data-tech="${esc(norm(t))}">${esc(t)}</span>`).join('')}</div>
              ${p ? `<a class="link-arrow" href="${esc(url(p.url))}">${esc(p.name)} case study <i class='bx bx-right-arrow-alt'></i></a>` : ''}
            </div>
          </div>
        </article>`;
    }).join('');
    $$('.xp__more', el).forEach(btn => btn.addEventListener('click', () => {
      const item = btn.closest('.xp__item');
      const list = $('#' + btn.getAttribute('aria-controls'));
      const open = list.hidden;
      list.hidden = !open;
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    }));
    // Open the first one by default
    const first = $('.xp__more', el);
    if (first) first.click();
  }

  /*================ SKILLS + INSPECTOR ================*/
  function skillMatches(skill) {
    const keys = (skill.match || [skill.name]).map(norm);
    const hit = list => list.some(t => keys.includes(norm(t)));
    return {
      projects: D.PROJECTS.filter(p => hit(p.tech)),
      roles: D.EXPERIENCE.filter(x => hit(x.tech))
    };
  }
  function skillIcon(s) {
    if (s.icon) return `<span class="si" style="--si:url('${SI_CDN}${esc(s.icon)}.svg')" aria-hidden="true"></span>`;
    return `<i class='bx ${esc(s.bx || 'bx-code-alt')}' aria-hidden="true"></i>`;
  }
  function renderSkills() {
    const el = $('#skills-grid');
    if (!el) return;
    el.innerHTML = D.SKILLS.map(g => `
      <div class="skill-group" data-lens="${esc(g.lens.join(' '))}" data-reveal>
        <h3><span>${esc(g.group)}</span><span>${g.items.length}</span></h3>
        <div class="skill-list">
          ${g.items.map(s => {
            const n = skillMatches(s).projects.length;
            return `<button class="skill" type="button" aria-pressed="false" data-skill="${esc(s.name)}">${skillIcon(s)}${esc(s.name)}${n ? `<span class="skill__n">${n}</span>` : ''}</button>`;
          }).join('')}
        </div>
      </div>`).join('');

    const insp = $('#inspector');
    const all = D.SKILLS.flatMap(g => g.items);
    const idle = insp ? insp.innerHTML : '';
    $$('.skill', el).forEach(btn => btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      $$('.skill', el).forEach(b => b.setAttribute('aria-pressed', 'false'));
      if (pressed) { if (insp) { insp.innerHTML = idle; insp.classList.remove('is-active'); } highlightTech(null); return; }
      btn.setAttribute('aria-pressed', 'true');
      const s = all.find(x => x.name === btn.dataset.skill);
      selectSkill(s);
    }));

    function selectSkill(s) {
      const m = skillMatches(s);
      highlightTech(s);
      if (!insp) return;
      insp.classList.add('is-active');
      if (!m.projects.length) {
        const cos = [...new Set(m.roles.map(x => x.company))];
        insp.innerHTML = cos.length
          ? `<span><b>${esc(s.name)}</b> — used during my internship${m.roles.length > 1 ? 's' : ''} at ${cos.map(esc).join(' and ')}.</span>`
          : `<span><b>${esc(s.name)}</b> — used in university and personal projects.</span>`;
        return;
      }
      const roles = m.roles.length ? ` and <b>${m.roles.length} internship${m.roles.length > 1 ? 's' : ''}</b>` : '';
      insp.innerHTML = `<span><b>${esc(s.name)}</b> is used in <b>${m.projects.length} project${m.projects.length > 1 ? 's' : ''}</b>${roles}:</span>
        ${m.projects.map(p => `<a class="chip" href="${esc(url(p.url))}">${esc(p.name)} <i class='bx bx-right-arrow-alt'></i></a>`).join('')}`;
    }
    window.__selectSkill = name => {
      const btn = $$('.skill', el).find(b => norm(b.dataset.skill) === norm(name));
      if (btn) { if (btn.getAttribute('aria-pressed') !== 'true') btn.click(); btn.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    };
  }
  function highlightTech(skill) {
    const keys = skill ? (skill.match || [skill.name]).map(norm) : [];
    $$('.tag[data-tech]').forEach(t => t.classList.toggle('is-hit', keys.includes(t.dataset.tech)));
  }

  /*================ MARQUEE + CP ================*/
  function renderMarquee() {
    const el = $('#marquee');
    if (!el) return;
    const items = D.SKILLS.flatMap(g => g.items).filter(s => s.icon);
    const html = items.map(s => `<span class="marquee__item">${skillIcon(s)}${esc(s.name)}</span>`).join('');
    el.innerHTML = `<div class="marquee__track">${html}${html.replace(/class="marquee__item"/g, 'class="marquee__item" aria-hidden="true"')}</div>`;
  }
  function renderCP() {
    const s = $('#cp-stats');
    if (s) s.innerHTML = D.CP.stats.map(x => `<div><b>${esc(x.value)}</b><span>${esc(x.label)}</span></div>`).join('');
    const a = $('#cp-achv');
    if (a) a.innerHTML = D.CP.achievements.map(x => `<li><i class='bx ${esc(x.icon)}'></i><span>${esc(x.text)}</span></li>`).join('');
    const e = $('#edu-list');
    if (e) e.innerHTML = D.EDUCATION.map(x => `<li><span>${esc(x.degree)} · ${esc(x.school)}</span><span>${esc(x.period)}</span></li>`).join('')
      + D.profile.languages.map(l => `<li><span>${esc(l.name)}</span><span>${esc(l.level)}</span></li>`).join('');
  }

  /*================ ROLE LENS ================*/
  let currentLens = 'all';
  function lensSummary(id) {
    if (id === 'all') return `Showing everything — <b>${D.PROJECTS.length} projects</b> across AI, full-stack, DevOps and mobile. Pick a role to re-rank.`;
    const label = D.lenses.find(l => l.id === id).label;
    const ps = D.PROJECTS.filter(p => p.categories.includes(id));
    const xs = D.EXPERIENCE.filter(x => x.categories.includes(id));
    const freq = {};
    ps.forEach(p => p.tech.forEach(t => { freq[t] = (freq[t] || 0) + 1; }));
    const top = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 4).map(e => e[0]);
    return `For <b>${esc(label)}</b>: <b>${ps.length} relevant project${ps.length !== 1 ? 's' : ''}</b> and <b>${xs.length} internship${xs.length !== 1 ? 's' : ''}</b>, mostly with ${top.map(esc).join(', ')}.`;
  }
  function applyLens(id, opts = {}) {
    currentLens = id;
    $$('.seg [data-lens]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lens === id)));
    $$('.pcard[data-cats]').forEach(c => {
      const fit = id === 'all' || c.dataset.cats.split(' ').includes(id);
      c.classList.toggle('is-dimmed', !fit);
      const badge = $('.badge--fit', c);
      if (badge) badge.hidden = !(fit && id !== 'all');
    });
    // Re-rank: matching projects first (keep first card wide only when it still matches)
    ['#work-grid', '#all-grid'].forEach(sel => {
      const grid = $(sel);
      if (!grid) return;
      const cards = $$('.pcard', grid);
      const ordered = D.PROJECTS.map(p => cards.find(c => c.dataset.id === p.id)).filter(Boolean);
      const fits = ordered.filter(c => !c.classList.contains('is-dimmed'));
      const rest = ordered.filter(c => c.classList.contains('is-dimmed'));
      [...fits, ...rest].forEach((c, i) => { grid.appendChild(c); c.classList.toggle('pcard--wide', i === 0); });
    });
    $$('.xp__item[data-cats]').forEach(x => x.classList.toggle('is-dimmed', id !== 'all' && !x.dataset.cats.split(' ').includes(id)));
    $$('.skill-group[data-lens]').forEach(g => g.classList.toggle('is-hit', id !== 'all' && g.dataset.lens.split(' ').includes(id)));
    const note = $('#lens-note');
    if (note) note.innerHTML = lensSummary(id);
    filterAll();
    if (!opts.silent) {
      const u = new URL(location.href);
      if (id === 'all') u.searchParams.delete('for'); else u.searchParams.set('for', id);
      history.replaceState(null, '', u);
    }
  }
  function initLens() {
    const seg = $('#lens-seg');
    if (!seg) return;
    seg.innerHTML = D.lenses.map(l => `<button type="button" data-lens="${esc(l.id)}" aria-pressed="false">${esc(l.label)}</button>`).join('');
    $$('button', seg).forEach(b => b.addEventListener('click', () => applyLens(b.dataset.lens)));
    const fromUrl = new URLSearchParams(location.search).get('for');
    applyLens(D.lenses.some(l => l.id === fromUrl) ? fromUrl : 'all', { silent: true });
  }

  /*================ PROJECTS PAGE SEARCH ================*/
  function filterAll() {
    const grid = $('#all-grid');
    const input = $('#project-search');
    if (!grid || !input) return;
    const q = norm(input.value.trim());
    let shown = 0;
    $$('.pcard', grid).forEach(card => {
      const p = projectById(card.dataset.id);
      const hay = norm([p.name, p.tagline, p.summary, p.context, p.tech.join(' '), (p.highlights || []).join(' ')].join(' '));
      const ok = !q || q.split(/\s+/).every(w => hay.includes(w));
      card.hidden = !ok;
      if (ok) shown++;
    });
    const empty = $('#empty');
    if (empty) empty.classList.toggle('is-shown', shown === 0);
  }
  function initSearch() {
    const input = $('#project-search');
    if (!input) return;
    const q = new URLSearchParams(location.search).get('q');
    if (q) input.value = q;
    input.addEventListener('input', filterAll);
    filterAll();
  }

  /*================ CASE STUDY (data-driven) ================*/
  function shot(p, g, i) {
    const cap = g.title ? `${g.title} — ${g.text || ''}` : (g.caption || p.name);
    const media = p.device === 'phone' ? phone(p, g.src, cap) : frame(p, g.src, cap);
    return `<figure class="shot" data-reveal>
        <button type="button" data-lb="case" data-lb-index="${i}" data-src="${esc(url(g.src))}" data-cap="${esc(cap)}" aria-label="View ${esc(g.title || 'screen')} full size">${media}</button>
        <figcaption class="shot__cap">${g.icon ? `<i class='bx ${esc(g.icon)}' aria-hidden="true"></i>` : ''}<div><b>${esc(g.title || '')}</b><span>${esc(g.text || g.caption || '')}</span></div></figcaption>
      </figure>`;
  }

  function renderCase() {
    const root = $('#case');
    if (!root) return;
    const p = projectById(root.dataset.project);
    if (!p) return;
    document.title = `${p.name} — ${p.tagline} | Jacem Ben Ahmed`;
    const idx = D.PROJECTS.indexOf(p);
    const next = D.PROJECTS[(idx + 1) % D.PROJECTS.length];
    const gallery = (p.gallery || []).filter(g => g && g.src);
    const galleryHtml = gallery.length
      ? `<div class="gallery${p.device === 'phone' ? ' gallery--phone' : ''}">${gallery.map((g, i) => shot(p, g, i)).join('')}</div>`
      : `<div class="gallery"><figure data-reveal>${frame(p, null, '')}<figcaption>Screenshots coming soon.</figcaption></figure></div>`;

    root.style.setProperty('--pc', p.accent || 'var(--accent)');
    root.innerHTML = `
      <section class="case-hero wrap">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="${esc(url('index.html'))}">Home</a><i class='bx bx-chevron-right'></i><a href="${esc(url('projects.html'))}">Projects</a><i class='bx bx-chevron-right'></i><span>${esc(p.name)}</span></nav>
        <div class="case-id" data-reveal>${logo(p)}${p.isNew ? '<span class="badge badge--new">New project</span>' : ''}</div>
        <h1 class="case-title" data-reveal>${esc(p.name)}</h1>
        <p class="case-tagline" data-reveal>${esc(p.tagline)}.</p>
        <p class="hero__lead" data-reveal>${esc(p.summary)}</p>
        <div class="hero__cta" data-reveal>
          ${gallery.length ? `<a class="btn btn--primary" href="#screens"><i class='bx bx-image'></i> See the screens</a>` : ''}
          <a class="btn btn--ghost" href="#features"><i class='bx bx-layer'></i> Features</a>
        </div>
        <div class="case-meta" data-reveal>
          <div><span>Role</span><b>${esc(p.role)}</b></div>
          <div><span>Context</span><b>${esc(p.context)}</b></div>
          <div><span>Platforms</span><b>${esc(p.platforms || (p.categories.includes('mobile') ? 'Web · Android' : 'Web'))}</b></div>
          <div><span>Year</span><b>${esc(p.year || '')}</b></div>
        </div>
        <div class="case-cover" style="--pc:${esc(p.accent)}" data-reveal>${cover(p, p.name + ' cover', 'fetchpriority="high"')}</div>
      </section>

      ${p.problem ? `<section class="sec--tight wrap">
        <div class="sh"><div><p class="eyebrow">Overview</p><h2>Why I built it</h2></div></div>
        <div class="ps">
          <div class="card" data-reveal><h3><i class='bx bx-error-circle' aria-hidden="true"></i> The problem</h3><p>${esc(p.problem)}</p></div>
          <div class="card" data-reveal><h3><i class='bx bx-check-circle' aria-hidden="true"></i> The solution</h3><p>${esc(p.solution || '')}</p></div>
        </div>
        ${p.metrics ? `<div class="stats">${p.metrics.map(m => `<div class="stat"><div class="stat__v">${esc(m.value)}</div><div class="stat__l">${esc(m.label)}</div></div>`).join('')}</div>` : ''}
      </section>` : ''}

      ${gallery.length ? `<section class="sec--tight wrap" id="screens">
        <div class="sh"><div><p class="eyebrow">Screens</p><h2>Inside the app</h2></div><p>Each screen with what it does. Click one to see it full size.</p></div>
        ${galleryHtml}
      </section>` : ''}

      ${p.features ? `<section class="sec--tight wrap" id="features">
        <div class="sh"><div><p class="eyebrow">Features</p><h2>What it does</h2></div></div>
        <div class="feat-grid">${p.features.map((f, i) => `<div class="feat" style="--d:${i * 0.05}s" data-reveal><i class='bx ${esc(f.icon)}'></i><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join('')}</div>
      </section>` : ''}

      ${p.architecture ? `<section class="sec--tight wrap">
        <div class="sh"><div><p class="eyebrow">Architecture</p><h2>How it fits together</h2></div></div>
        <div class="flow" data-reveal>${p.architecture.map(n => `<span class="flow__node">${esc(n)}</span>`).join('<i class="bx bx-right-arrow-alt flow__arrow" aria-hidden="true"></i>')}</div>
      </section>` : ''}

      <section class="sec--tight wrap">
        <div class="sh"><div><p class="eyebrow">Stack</p><h2>Built with</h2></div></div>
        <div class="tags" style="gap:8px">${p.tech.map(t => `<span class="tag" style="font-size:14px;padding:8px 12px">${esc(t)}</span>`).join('')}</div>
      </section>

      <section class="sec--tight wrap">
        <a class="next-case" href="${esc(url(next.url))}" data-reveal><div><small>Next project</small><strong>${esc(next.name)} — ${esc(next.tagline)}</strong></div><span class="pcard__go"><i class='bx bx-right-arrow-alt'></i></span></a>
      </section>`;
  }


  /*================ LIGHTBOX ================*/
  function initLightbox() {
    const lb = document.createElement('div');
    lb.className = 'lb'; lb.id = 'site-lb';
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML = `<button class="lb__btn lb__close" type="button" aria-label="Close"><i class='bx bx-x'></i></button>
      <button class="lb__btn lb__prev" type="button" aria-label="Previous"><i class='bx bx-chevron-left'></i></button>
      <figure style="margin:0"><img alt=""><figcaption></figcaption></figure>
      <button class="lb__btn lb__next" type="button" aria-label="Next"><i class='bx bx-chevron-right'></i></button>`;
    document.body.appendChild(lb);
    let items = [], i = 0, lastFocus = null;
    const img = $('img', lb), cap = $('figcaption', lb);
    const show = () => { const it = items[i]; img.src = it.dataset.src; img.alt = it.dataset.cap; cap.textContent = it.dataset.cap; };
    const close = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-lb]');
      if (!t) return;
      items = $$(`[data-lb="${t.dataset.lb}"]`);
      i = items.indexOf(t); lastFocus = t;
      show(); lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
      $('.lb__close', lb).focus();
    });
    $('.lb__close', lb).addEventListener('click', close);
    $('.lb__prev', lb).addEventListener('click', () => { i = (i - 1 + items.length) % items.length; show(); });
    $('.lb__next', lb).addEventListener('click', () => { i = (i + 1) % items.length; show(); });
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') $('.lb__prev', lb).click();
      if (e.key === 'ArrowRight') $('.lb__next', lb).click();
    });
  }

  /*================ OVERLAY + DELEGATED ACTIONS ================*/
  let overlay;
  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => closeCmdk());
  }

  document.addEventListener('click', e => {
    const copy = e.target.closest('[data-copy-email]');
    if (copy) { e.preventDefault(); copyEmail(); }
    const ck = e.target.closest('[data-cmdk]');
    if (ck) { e.preventDefault(); openCmdk(); }
  });

  /*================ COMMAND PALETTE ================*/
  let cmdk, cmdkInput, cmdkList, cmdkItems = [], cmdkIndex = 0;
  function cmdkSource() {
    const items = [];
    const sec = (label, hash, icon) => items.push({ group: 'Navigate', label, icon, run: () => { location.href = (IS_HOME ? '' : url('index.html')) + hash; } });
    sec('Home', '#home', 'bx-home-alt');
    sec('Experience', '#experience', 'bx-briefcase');
    sec('Projects', '#work', 'bx-grid-alt');
    sec('Skills', '#skills', 'bx-chip');
    sec('About & achievements', '#about', 'bx-user');
    sec('Contact', '#contact', 'bx-envelope');
    items.push({ group: 'Navigate', label: 'All projects', icon: 'bx-folder', run: () => { location.href = url('projects.html'); } });
    D.PROJECTS.forEach(p => items.push({ group: 'Projects', label: p.name, hint: p.tagline, icon: p.icon || 'bx-code-alt', keywords: p.tech.join(' ') + ' ' + p.summary, run: () => { location.href = url(p.url); } }));
    D.lenses.filter(l => l.id !== 'all').forEach(l => items.push({ group: 'Hiring for…', label: `Show ${l.label} work`, icon: 'bx-filter-alt', run: () => {
      if ($('#lens-seg')) { applyLens(l.id); (document.getElementById('work') || document.getElementById('all-grid')).scrollIntoView({ behavior: 'smooth' }); }
      else location.href = url('index.html') + '?for=' + l.id + '#work';
    } }));
    items.push({ group: 'Actions', label: 'Toggle light / dark theme', icon: 'bx-adjust', keywords: 'dark light mode', run: toggleTheme });
    items.push({ group: 'Actions', label: 'Copy email address', hint: D.profile.email, icon: 'bx-copy', run: copyEmail });
    items.push({ group: 'Actions', label: 'Download CV (PDF)', icon: 'bx-download', keywords: 'resume', run: () => { const a = document.createElement('a'); a.href = url(D.profile.cv); a.download = ''; a.click(); } });
    items.push({ group: 'Actions', label: 'Open GitHub', icon: 'bxl-github', run: () => open(D.profile.links.github, '_blank', 'noopener') });
    items.push({ group: 'Actions', label: 'Open LinkedIn', icon: 'bxl-linkedin', run: () => open(D.profile.links.linkedin, '_blank', 'noopener') });
    D.SKILLS.flatMap(g => g.items).forEach(s => items.push({ group: 'Skills', label: s.name, hint: `${skillMatches(s).projects.length} projects`, icon: 'bx-purchase-tag-alt', run: () => {
      if (IS_HOME && window.__selectSkill) window.__selectSkill(s.name);
      else location.href = url('projects.html') + '?q=' + encodeURIComponent((s.match || [s.name])[0]);
    } }));
    return items;
  }
  function score(item, q) {
    if (!q) return item.group === 'Skills' ? 0 : 1;
    const label = norm(item.label), hay = norm(item.label + ' ' + (item.hint || '') + ' ' + (item.keywords || '') + ' ' + item.group);
    if (label.startsWith(q)) return 100;
    if (label.includes(q)) return 80;
    if (q.split(/\s+/).every(w => hay.includes(w))) return 50;
    // subsequence
    let i = 0;
    for (const ch of label) if (ch === q[i]) i++;
    return i === q.length ? 20 : 0;
  }
  function renderCmdk() {
    const raw = cmdkInput.value.trim();
    const q = norm(raw);
    const src = cmdkSource();
    let list = src.map(it => ({ it, s: score(it, q) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.it);
    if (!q) list = list.slice(0, 18);
    cmdkItems = list;
    cmdkIndex = 0;
    if (!list.length) { cmdkList.innerHTML = `<div class="cmdk__empty">No results</div>`; return; }
    let html = '', g = null;
    list.forEach((it, i) => {
      if (it.group !== g) { g = it.group; html += `<div class="cmdk__group">${esc(g)}</div>`; }
      html += `<button class="cmdk__item${i === 0 ? ' is-active' : ''}" type="button" role="option" data-i="${i}"><i class='bx ${esc(it.icon)}'></i><span>${esc(it.label)}</span>${it.hint ? `<small>${esc(it.hint)}</small>` : ''}</button>`;
    });
    cmdkList.innerHTML = html;
  }
  function moveCmdk(d) {
    if (!cmdkItems.length) return;
    cmdkIndex = (cmdkIndex + d + cmdkItems.length) % cmdkItems.length;
    $$('.cmdk__item', cmdkList).forEach((b, i) => b.classList.toggle('is-active', i === cmdkIndex));
    const act = $('.cmdk__item.is-active', cmdkList);
    act && act.scrollIntoView({ block: 'nearest' });
  }
  function runCmdk(i) {
    const it = cmdkItems[i];
    if (!it) return;
    closeCmdk();
    it.run();
  }
  function buildCmdk() {
    cmdk = document.createElement('div');
    cmdk.className = 'cmdk';
    cmdk.setAttribute('role', 'dialog');
    cmdk.setAttribute('aria-modal', 'true');
    cmdk.setAttribute('aria-label', 'Command menu');
    cmdk.innerHTML = `<div class="cmdk__input"><i class='bx bx-search'></i><input type="text" placeholder="Search projects, skills, actions" aria-label="Search" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="cmdk-list"><kbd>Esc</kbd></div>
      <div class="cmdk__list" id="cmdk-list" role="listbox"></div>
      <div class="cmdk__foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>Esc</kbd> close</span></div>`;
    document.body.appendChild(cmdk);
    cmdkInput = $('input', cmdk);
    cmdkList = $('.cmdk__list', cmdk);
    cmdkInput.addEventListener('input', renderCmdk);
    cmdkInput.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveCmdk(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveCmdk(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); runCmdk(cmdkIndex); }
    });
    cmdkList.addEventListener('click', e => { const b = e.target.closest('.cmdk__item'); if (b) runCmdk(+b.dataset.i); });
    cmdkList.addEventListener('mousemove', e => {
      const b = e.target.closest('.cmdk__item');
      if (b && +b.dataset.i !== cmdkIndex) { cmdkIndex = +b.dataset.i; $$('.cmdk__item', cmdkList).forEach((x, i) => x.classList.toggle('is-active', i === cmdkIndex)); }
    });
  }
  function openCmdk() {
    cmdk.classList.add('is-open');
    overlay.classList.add('is-open');
    cmdkInput.value = '';
    renderCmdk();
    setTimeout(() => cmdkInput.focus(), 20);
  }
  function closeCmdk() {
    if (!cmdk) return;
    cmdk.classList.remove('is-open');
    overlay && overlay.classList.remove('is-open');
  }

  function initShortcuts() {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    $$('[data-kbd-mod]').forEach(k => { k.textContent = isMac ? '⌘ K' : 'Ctrl K'; });
    document.addEventListener('keydown', e => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdk.classList.contains('is-open') ? closeCmdk() : openCmdk(); return; }
      if (e.key === 'Escape') { closeCmdk(); return; }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') { e.preventDefault(); openCmdk(); }
    });
  }

  /*================ CONTACT FORM ================*/
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim(), email = form.email.value.trim(), message = form.message.value.trim();
      if (!name || !email || !message) { toast('Please fill in every field', 'bx-error-circle'); return; }
      const subject = encodeURIComponent('Portfolio — message from ' + name);
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      location.href = `mailto:${D.profile.email}?subject=${subject}&body=${body}`;
      toast('Opening your email app…', 'bx-envelope');
      form.reset();
    });
  }

  /*================ INIT ================*/
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTopbar();
    renderWork();
    renderExperience();
    renderSkills();
    renderMarquee();
    renderCP();
    renderCase();
    initLens();
    initSearch();
    buildOverlay();
    buildCmdk();
    initShortcuts();
    initLightbox();
    initLocalTime();
    initContactForm();
    initSpotlight();
    reveal();
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
    // Respect deep links after dynamic content renders
    if (location.hash && document.getElementById(location.hash.slice(1))) {
      setTimeout(() => document.getElementById(location.hash.slice(1)).scrollIntoView(), 60);
    }
  });
})();
