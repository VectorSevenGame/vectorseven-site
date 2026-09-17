// Vector Seven — küçük etkileşimler: kaydırınca belirme, sayaç, e-posta kutusu
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------ gece / gündüz modu */
  const docEl = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const paint = (theme) => {
    docEl.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e1016' : '#f5f5f1');
    document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(theme === 'light')));
  };
  paint(docEl.getAttribute('data-theme') || 'dark');
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      paint(next);
      try {
        localStorage.setItem('v7-theme', next);
      } catch {}
    }),
  );

  /* ---------------------------------------------- kaydırınca belirme */
  const reveals = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---------------------------------------------------- sayan rakamlar */
  const counters = document.querySelectorAll('[data-count]');
  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduce || !target) return;
    const start = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          run(e.target);
          co.unobserve(e.target);
        }
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => co.observe(el));
  }

  /* ------------------------------------------------------ e-posta kutusu */
  // mailto: her cihazda e-posta uygulaması açmaz; bu yüzden adresi göster ve kopyalat
  document.querySelectorAll('[data-mail]').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      if (!open) panel.querySelector('button')?.focus();
    });
    const copy = panel.querySelector('[data-copy]');
    const done = panel.querySelector('[data-done]');
    copy?.addEventListener('click', async () => {
      const text = copy.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const t = document.createElement('textarea');
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
      }
      if (done) {
        done.hidden = false;
        clearTimeout(copy._t);
        copy._t = setTimeout(() => (done.hidden = true), 2400);
      }
    });
  });

  /* ------------------------------------- kahraman kartları fareyi izlesin */
  const stack = document.querySelector('.stack');
  if (stack && !reduce && window.matchMedia('(pointer: fine)').matches) {
    const hero = stack.closest('.hero');
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.setProperty('--px', `${x * 14}px`);
      stack.style.setProperty('--py', `${y * 14}px`);
    });
    hero.addEventListener('pointerleave', () => {
      stack.style.setProperty('--px', '0px');
      stack.style.setProperty('--py', '0px');
    });
  }
})();
