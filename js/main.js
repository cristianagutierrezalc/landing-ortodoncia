// ═══════════════════════════════════════════
// Landing profesional v2 · Interacciones
// ═══════════════════════════════════════════

document.documentElement.classList.add('js');

// ── Aplicar configuración de la clínica ──
(function applyConfig() {
  const root = document.documentElement;
  if (CONFIG.colorPrimario) root.style.setProperty('--primary', CONFIG.colorPrimario);
  if (CONFIG.colorOscuro) root.style.setProperty('--primary-dark', CONFIG.colorOscuro);
  if (CONFIG.colorAcento) root.style.setProperty('--accent', CONFIG.colorAcento);

  document.querySelectorAll('[data-clinica]').forEach(el => el.textContent = CONFIG.clinica);
  document.querySelectorAll('[data-ciudad]').forEach(el => el.textContent = CONFIG.ciudad);
  document.querySelectorAll('[data-horario]').forEach(el => el.textContent = CONFIG.horario);
  document.querySelectorAll('[data-direccion]').forEach(el => el.textContent = CONFIG.direccion);
  document.querySelectorAll('[data-telefono]').forEach(el => el.textContent = '+' + CONFIG.telefono);
  document.querySelectorAll('[data-rating]').forEach(el => el.textContent = CONFIG.cifras.rating);
  document.title = `${CONFIG.clinica} · Ortodoncia en ${CONFIG.ciudad}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `Clínica de ortodoncia en ${CONFIG.ciudad}: brackets estéticos, alineadores invisibles y planes de pago fijos. Agenda tu valoración hoy.`;
  }

  document.querySelectorAll('[data-maps]').forEach(a => a.href = CONFIG.mapa);
  document.querySelectorAll('[data-phone-link]').forEach(a => a.href = 'tel:+' + CONFIG.telefono);

  // Actualizar JSON-LD con datos reales de la clínica
  const ld = document.querySelector('script[type="application/ld+json"]');
  if (ld) {
    try {
      const data = JSON.parse(ld.textContent);
      data.name = CONFIG.clinica;
      data.telephone = '+' + CONFIG.telefono;
      data.address.addressLocality = CONFIG.ciudad;
      ld.textContent = JSON.stringify(data, null, 2);
    } catch (err) { /* silencioso */ }
  }
})();

// ── Header con sombra al hacer scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

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

// ── Contadores animados ──
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10) || 0;
  const duration = 1300;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString('es-CO');
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if ('IntersectionObserver' in window && counters.length) {
  const cObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        cObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => cObserver.observe(el));
} else {
  counters.forEach(el => el.textContent = Number(el.dataset.target).toLocaleString('es-CO'));
}

// ── Slider antes/después (arrastrable) ──
(function initSlider() {
  const slider = document.getElementById('baSlider');
  if (!slider) return;
  const before = slider.querySelector('.ba-before');
  const handle = slider.querySelector('.ba-handle');
  let dragging = false;

  const setPos = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    pos = Math.max(2, Math.min(98, pos));
    before.style.width = pos + '%';
    handle.style.left = pos + '%';
    slider.setAttribute('aria-valuenow', Math.round(pos));
  };

  slider.addEventListener('pointerdown', (e) => {
    dragging = true;
    slider.setPointerCapture(e.pointerId);
    setPos(e.clientX);
  });
  slider.addEventListener('pointermove', (e) => {
    if (dragging) setPos(e.clientX);
  });
  slider.addEventListener('pointerup', () => dragging = false);
  slider.addEventListener('pointercancel', () => dragging = false);

  // Accesibilidad con teclado
  slider.addEventListener('keydown', (e) => {
    const current = parseFloat(before.style.width) || 50;
    if (e.key === 'ArrowLeft') setPosByValue(current - 5);
    if (e.key === 'ArrowRight') setPosByValue(current + 5);
    function setPosByValue(v) {
      v = Math.max(2, Math.min(98, v));
      before.style.width = v + '%';
      handle.style.left = v + '%';
      slider.setAttribute('aria-valuenow', Math.round(v));
    }
  });
})();

// ── Formulario → WhatsApp (sin servidor, sin correo) ──
const waForm = document.getElementById('waForm');
if (waForm) {
  waForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('fNombre').value.trim();
    const tel = document.getElementById('fTelefono').value.trim();
    const motivo = document.getElementById('fMotivo').value;
    const texto = `Hola, soy ${nombre}. Quiero información sobre: ${motivo}. Mi teléfono: ${tel}.`;
    const btn = waForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = '✓ Abriendo WhatsApp…';
      setTimeout(() => btn.textContent = 'Enviar por WhatsApp', 2600);
    }
    window.open(`https://wa.me/${CONFIG.telefono}?text=${encodeURIComponent(texto)}`, '_blank');
  });
}

// ── Año dinámico ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
