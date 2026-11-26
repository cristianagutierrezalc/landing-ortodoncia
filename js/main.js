// ═══════════════════════════════════════════
// Landing profesional · Interacciones
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
  document.querySelectorAll('[data-pacientes]').forEach(el => el.textContent = CONFIG.pacientes);
  document.querySelectorAll('[data-telefono]').forEach(el => el.textContent = '+' + CONFIG.telefono);
  document.title = `${CONFIG.clinica} · Ortodoncia en ${CONFIG.ciudad}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `Clínica de ortodoncia en ${CONFIG.ciudad}: brackets estéticos, alineadores invisibles y planes de pago fijos. Agenda tu valoración hoy.`;
  }

  document.querySelectorAll('[data-maps]').forEach(a => a.href = CONFIG.mapa);

  // Enlaces tel: con el número de la clínica
  document.querySelectorAll('[data-phone-link]').forEach(a => a.href = 'tel:+' + CONFIG.telefono);
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

// ── Formulario → WhatsApp (sin servidor, sin correo) ──
const waForm = document.getElementById('waForm');
if (waForm) {
  waForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('fNombre').value.trim();
    const tel = document.getElementById('fTelefono').value.trim();
    const motivo = document.getElementById('fMotivo').value;
    const texto = `Hola, soy ${nombre}. Quiero información sobre: ${motivo}. Mi teléfono: ${tel}.`;
    window.open(`https://wa.me/${CONFIG.telefono}?text=${encodeURIComponent(texto)}`, '_blank');
  });
}

// ── Año dinámico ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
