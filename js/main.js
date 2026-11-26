// ═══════════════════════════════════════════
// OrtoQuest · Interacciones
// ═══════════════════════════════════════════

document.documentElement.classList.add('js');

// ── Aplicar la configuración de la clínica (config.js) ──
(function applyConfig() {
  const root = document.documentElement;
  if (CONFIG.colorPrimario) root.style.setProperty('--violet', CONFIG.colorPrimario);
  if (CONFIG.colorLima) root.style.setProperty('--lime', CONFIG.colorLima);
  if (CONFIG.colorRosa) root.style.setProperty('--pink', CONFIG.colorRosa);

  document.querySelectorAll('[data-clinica]').forEach(el => el.textContent = CONFIG.clinica);
  document.querySelectorAll('[data-ciudad]').forEach(el => el.textContent = CONFIG.ciudad);
  document.title = `${CONFIG.clinica} · Ortodoncia en ${CONFIG.ciudad}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `Ortodoncia en ${CONFIG.ciudad}: brackets, alineadores y retenciones con un proceso claro y cero aburrido. Agenda tu valoración por WhatsApp.`;
  }

  const waBase = `https://wa.me/${CONFIG.telefono}`;
  document.querySelectorAll('[data-wa]').forEach(a => {
    const text = a.dataset.waText || '¡Hola! Quiero información sobre ortodoncia 🦷';
    a.href = `${waBase}?text=${encodeURIComponent(text)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  document.querySelectorAll('[data-maps]').forEach(a => a.href = CONFIG.mapa);
})();

// ── Menú móvil ──
const burger = document.getElementById('navBurger');
const links = document.getElementById('navLinks');

if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );
}

// ── Reveal al hacer scroll ──
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── Simulador de sonrisa ──
const smiley = document.getElementById('smiley');
const transformBtn = document.getElementById('transformBtn');
const countEl = document.getElementById('smileyCount');
const confettiZone = document.getElementById('confettiZone');

if (smiley && transformBtn) {
  let transforms = 0;
  transformBtn.addEventListener('click', () => {
    const isCrooked = smiley.classList.contains('stage-crooked');
    if (isCrooked) {
      smiley.classList.remove('stage-crooked');
      smiley.classList.add('stage-perfect');
      transformBtn.textContent = '↩️ Volver al pasado';
      transforms++;
      if (countEl) countEl.textContent = String(transforms);
      spawnConfetti();
    } else {
      smiley.classList.remove('stage-perfect');
      smiley.classList.add('stage-crooked');
      transformBtn.textContent = '✨ Transformar sonrisa';
    }
  });
}

// ── Confetti ──
function spawnConfetti() {
  if (!confettiZone) return;
  const colors = ['#7C3AED', '#B6F34D', '#FF7AC3', '#FFD23F', '#7DD3FC'];
  for (let i = 0; i < 42; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = (Math.random() * 96 + 2) + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (7 + Math.random() * 7) + 'px';
    piece.style.height = (10 + Math.random() * 8) + 'px';
    piece.style.animationDuration = (1.6 + Math.random() * 1.2) + 's';
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    confettiZone.appendChild(piece);
    setTimeout(() => piece.remove(), 3200);
  }
}

// ── Año dinámico ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
