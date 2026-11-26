# 🦷 Landing profesional de ortodoncia

Landing page **profesional** para clínicas de ortodoncia: paleta teal/crema/ámbar, tipografía serif (Fraunces + Inter), casos reales, testimonios, proceso en 4 pasos, financiación, formulario que envía directo a WhatsApp y nota de privacidad de datos (Ley 1581).

**Objetivo del repo**: personalizar por clínica prospecto (solo `js/config.js`) → screenshot → **maqueta gratis** para el pitch de venta.

## 🗂️ Estructura

```
landing-ortodoncia/
├── index.html        → Página completa (7 secciones)
├── css/style.css     → Estilo clínica boutique
├── js/config.js      → ⚡ SE EDITA POR CLÍNICA
├── js/main.js        → Config dinámica, formulario→WhatsApp, reveal
└── README.md
```

## ⚡ Personalizar por clínica (30 min)

1. `js/config.js`: nombre, ciudad, teléfono, dirección, horarios, colores
2. `index.html`: precios si aplica, testimonios reales, textos propios (buscar `<!-- EDITAR -->`)
3. **Reemplazar los placeholders 📷 por fotos reales** (casos antes/después con autorización del paciente, fachada, consultorio)
4. Verificar en celular → screenshot → maqueta lista
5. Acepta → deploy (Vercel/GitHub Pages) + dominio propio

## 👀 Ver local

Doble clic en `index.html` — funciona sin servidor.

## 📝 Notas profesionales

- Los testimonios incluidos son **de ejemplo**: reemplazar por testimonios reales con autorización
- Las calificaciones/pacientes son editables: nunca inflar datos falsos
- El formulario no guarda datos: todo viaja por WhatsApp (privacidad por diseño)

---

Desarrollo web local · Cristian Gutiérrez
