# 🦷 OrtoQuest — Landing neobrutal para clínicas de ortodoncia

Landing page de una sola página con concepto de **videojuego**: el tratamiento de ortodoncia se presenta como niveles (Valoración → Brackets → Ajustes → BOSS FINAL: la sonrisa). Incluye un **simulador interactivo de sonrisa** con confetti, ticker animado, FAQ con humor y todos los CTA apuntando a WhatsApp.

**El objetivo comercial de este repo**: personalizar esta plantilla para cada clínica prospecto, tomarle screenshot y usarla como **maqueta gratis** en el pitch de venta.

## 🎨 Identidad visual

- Estilo: **neobrutalismo juguetón** (bordes gruesos, sombras duras, colores eléctricos)
- Paleta base: violeta `#7C3AED` · lima `#B6F34D` · rosa `#FF7AC3` · crema `#FFF7EC`
- Tipografías: Archivo Black (títulos) + Space Grotesk (texto)

## 🗂️ Estructura

```
landing-ortodoncia/
├── index.html        → Página completa
├── css/style.css     → Todo el estilo neobrutal
├── js/config.js      → ⚡ EL ARCHIVO QUE SE EDITA POR CLÍNICA
├── js/main.js        → Interacciones (simulador, confetti, menú, reveal)
└── README.md
```

## ⚡ Personalizar para una clínica (flujo de 30 minutos)

1. Edita **`js/config.js`**: nombre de la clínica, ciudad, teléfono WhatsApp, colores de marca, link de Maps
2. Opcional en `index.html`: ajusta los precios de los planes (busca `<!-- EDITAR -->`) y reemplaza los emojis de servicios si la clínica lo pide
3. Abre `index.html` en el navegador → verifica que todo se vea con la marca de la clínica
4. **Screenshot** de las secciones principales → esa es la maqueta para el pitch
5. Si la clínica acepta: cambia el teléfono real, genera su dominio y despliega

## 👀 Ver local

Abre `index.html` con doble clic en el navegador (funciona sin servidor).

## 🌐 Desplegar

- **Vercel**: [vercel.com/new](https://vercel.com/new) → importa el repo → Deploy
- **GitHub Pages**: Settings → Pages → rama `main` → root

## ✅ Checklist por clínica

- [ ] `config.js`: nombre, ciudad, teléfono, colores, Maps
- [ ] Precios de planes confirmados con la clínica
- [ ] Fotos reales de la clínica (si las da) reemplazando stickers
- [ ] Probar en celular
- [ ] Deploy + dominio propio
- [ ] Google Search Console / verificación de negocio en Maps

---

Hecho por Cristian Gutiérrez · desarrollo web local 🦷
