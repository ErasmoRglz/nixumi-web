# Rediseño nixumi-web → concordancia con app.nixumi.lat — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la landing `nixumi-web` para que concuerde visualmente con la plataforma `app.nixumi.lat` (dark-first, acento teal, fuente Aptos/IBM Plex Sans, radios chicos) y actualizar el contenido al modelo híbrido (Plataforma self-serve gratis + Servicio gestionado), sin claims multi-canal/multi-tenant.

**Architecture:** Astro + Tailwind v4. Se sustituye el sistema de tokens de `src/styles/global.css` por el del bridge `AuthLayout` de la plataforma, se reskinea el sistema de botones (`.btn-nx`) y el fondo (`aurora.css`), y se actualizan los componentes uno por uno reutilizando los `--color-*` heredados como alias de los nuevos roles para tocar el markup lo menos posible. Dark es el tema por defecto; la clase `.dark` se mantiene presente por defecto para no romper las utilidades `dark:` de Tailwind ya existentes.

**Tech Stack:** Astro 6, Tailwind CSS v4, vanilla JS (`<script is:inline>`), pnpm, Vercel.

**Spec de referencia:** `docs/superpowers/specs/2026-06-07-sitio-concordancia-plataforma-design.md`

---

## Reglas de implementación (obligatorias en todas las fases)

- Cambios **pequeños por fase**; un `pnpm build` y un commit al cierre de cada fase. **Nunca** un rediseño masivo en un solo commit.
- Mantener compatibilidad con clases existentes (`.btn-nx`, `.aurora-*`, `--color-*`) cuando sea posible.
- **No** romper responsive. Respetar `prefers-reduced-motion`.
- **No** tocar credenciales, variables de entorno, GTM, Pixel ni contenido de páginas legales (solo estilos heredados).
- Validación principal: **`pnpm build`** tras cada fase. **Sin lint** salvo que el proyecto lo tenga estable y sea necesario.
- **Dark** queda como default.
- **Sin** claims "multi-canal" ni "multi-tenant" en copy público. **Sí** usar "Meta Tech Provider verificado por Meta".
- Enlaces a la app **absolutos**: `https://app.nixumi.lat/register` y `https://app.nixumi.lat/login`.

## Comando de build (confirmar en Fase 0)

Probable: `pnpm --dir <root> build` o `pnpm build` desde la raíz del paquete. Confirmar en Fase 0.

---

## Mapa de archivos (qué se toca)

| Archivo | Responsabilidad | Fase |
|---|---|---|
| `src/styles/global.css` | Tokens, tema dark-first, alias legacy, fuente | 1 |
| `src/pages/index.astro` (head) | `<link>` IBM Plex Sans, script anti-FOUC dark-first, SEO | 1, 3 |
| `src/styles/aurora.css` | Botones `.btn-nx` + fondo calmado | 2 |
| `src/components/Header.astro` | Nav "Plataforma"/"Entrar", CTA, logo dark | 3 |
| `src/components/Hero.astro` | Subhead dual, CTAs teal/violeta, badge Meta | 3 |
| `src/components/DosFormas.astro` (**nuevo**) | Sección "Dos formas de trabajar" | 4 |
| `src/components/Services.astro` | 6 tarjetas reframe (sin multi-tenant) | 5 |
| `src/components/Cases.astro` | Restyle panel + "corre sobre la plataforma" | 5 |
| `src/components/Process.astro` | Reencuadre "Servicio gestionado" | 5 |
| `src/components/Pricing.astro` | Eje 1 Plataforma gratis + Eje 2 | 6 |
| `src/components/FAQ.astro` | Nuevas Q&A | 6 |
| `src/components/CTAFinal.astro` | Recolor + badge Meta + `.btn-wa` | 7 |
| `src/components/Footer.astro` | Tagline, enlaces, badge, contactos correctos | 7 |
| `public/brand/*` | Logos Nixumi + `meta-tech-provider.png` | 7 |

---

## Fase 0 — Inventario actual y resguardo

**Objetivo:** fotografía técnica del estado actual antes de tocar estilos.

**Files:** ninguno (solo lectura + build).

- [ ] **Step 1: Confirmar estructura y package root.** Localizar `package.json`, `astro.config.mjs`, `src/`. Anotar si la raíz del paquete es el repo o un subdirectorio.
- [ ] **Step 2: Confirmar comando de build.** Leer `package.json` → script `build`. Anotar el comando exacto (`pnpm build` o `pnpm --dir <root> build`).
- [ ] **Step 3: Build inicial de referencia.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build` (o el confirmado)
Expected: build OK. Si falla, anotar el error y **detener** (no empezar Fase 1 sobre un build roto).

- [ ] **Step 4: Listar componentes/páginas afectados** (ver mapa de archivos arriba) y confirmar que existen con esos nombres.
- [ ] **Step 5: Confirmar ubicación de tokens/tema actual:** `src/styles/global.css` (`@theme`, `.dark`), `src/styles/aurora.css`.
- [ ] **Step 6: Confirmar assets disponibles** en `public/`: logos Nixumi (`nixumi-logo*.webp`, etc.), favicon, y que existan los de la carpeta `platform-design-ref/brand/` para copiar; ubicar `C:\Users\USUARIO\Downloads\Tech Provider.png`.
- [ ] **Step 7: Inventariar enlaces actuales.** Buscar todas las ocurrencias de `wa.me`, `app.nixumi.lat`, `/register`, `/login`. Anotar qué número usa cada CTA (ventas vs soporte).

Run: `git -C "C:/Users/USUARIO/nixumi-workspace/nixumi-web" grep -n "wa.me\|app.nixumi.lat" -- src`

- [ ] **Step 8: Inventariar uso de clases legacy.** Buscar `.btn-nx`, `.btn-primary`, `.btn-secondary`, `.aurora-`, `--color-` para dimensionar el impacto del reskin.

Run: `git -C "C:/Users/USUARIO/nixumi-workspace/nixumi-web" grep -n "btn-primary\|btn-secondary\|aurora-\|--color-" -- src`

- [ ] **Step 9: Entregable de Fase 0.** Redactar en el PR/issue: (a) lista de archivos afectados, (b) riesgos detectados, (c) confirmación de build inicial OK, (d) **resolver la discrepancia de ruteo WhatsApp ventas vs soporte con el dueño** (§9 del spec), (e) recomendación final antes de Fase 1.
- [ ] **Step 10: Commit** (solo si se generó algún doc de inventario; no se modificó código).

**Validación:** `pnpm build` OK + entregable escrito. **No se modifica contenido legal ni archivos fuera de alcance.**

---

## Fase 1 — Tokens, fuentes, tema dark-first y aliases legacy

**Objetivo:** sustituir el sistema de diseño base. Tras esta fase el sitio ya se ve dark-first con la paleta de la consola, sin tocar aún botones ni componentes.

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/pages/index.astro` (head: fuente + script de tema)

- [ ] **Step 1: Reemplazar el bloque de tokens de `src/styles/global.css`.** Sustituir el `@theme`/`.dark` actual por:

```css
@import "tailwindcss";

/* Dark es default. La clase .dark se mantiene presente por defecto para que las
   utilidades dark: de Tailwind ya existentes sigan aplicando. Light = ausencia de
   .dark + [data-theme='light']. */
@variant dark (.dark &);

/* ── Roles de color: DARK (default) ── */
:root,
html[data-theme='dark'] {
  color-scheme: dark;
  --background: #0F1419;
  --foreground: #fbf7ff;
  --card: rgba(15, 18, 27, 0.82);
  --popover: rgba(15, 18, 27, 0.92);
  --primary: #31e6a2;
  --primary-foreground: #03140d;
  --accent: #9c6cff;
  --accent-foreground: #ffffff;
  --secondary: rgba(255, 255, 255, 0.08);
  --secondary-foreground: #fbf7ff;
  --muted-foreground: #b9b0c4;
  --border: rgba(255, 255, 255, 0.14);
  --input: rgba(255, 255, 255, 0.16);
  --ring: #b98cff;
  --pink: #f472b6;
  --wa: #25D366;
  --grid-line: rgba(255, 255, 255, 0.03);
  --panel-glow: rgba(49, 230, 162, 0.06);
  --shadow-card: 0 28px 90px rgba(0, 0, 0, 0.32);
}

/* ── Roles de color: LIGHT ── */
html[data-theme='light'] {
  color-scheme: light;
  --background: #F5F7F8;
  --foreground: #162033;
  --card: rgba(255, 255, 255, 0.92);
  --popover: rgba(255, 255, 255, 0.96);
  --primary: #13a06e;
  --primary-foreground: #ffffff;
  --accent: #7c5cff;
  --accent-foreground: #ffffff;
  --secondary: rgba(255, 255, 255, 0.72);
  --secondary-foreground: #243044;
  --muted-foreground: #617087;
  --border: rgba(48, 59, 77, 0.16);
  --input: rgba(48, 59, 77, 0.22);
  --ring: #7c5cff;
  --pink: #ec6eb5;
  --wa: #1FA855;
  --grid-line: rgba(54, 45, 61, 0.045);
  --panel-glow: rgba(124, 58, 237, 0.05);
  --shadow-card: 0 26px 80px rgba(69, 54, 94, 0.16);
}

/* ── Escalas mode-agnostic (de la plataforma) ── */
:root {
  --font-sans: "Aptos", "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
  --font-mono: "Cascadia Code", "SFMono-Regular", Consolas, ui-monospace, monospace;
  --radius-sm: 6px;  --radius: 8px;  --radius-md: 10px;  --radius-lg: 12px;  --radius-pill: 999px;
  --dur-fast: 140ms; --dur-base: 200ms; --dur-slow: 320ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);

  /* ── Alias legacy → nuevos roles (para no reescribir todo el markup) ── */
  --color-smoke: var(--background);
  --color-navy: var(--foreground);
  --color-slate: var(--muted-foreground);
  --color-purple: var(--accent);
  --color-lavender: var(--accent);
  --color-green: var(--primary);
}

/* Tailwind theme: expone fuente y marca a las utilidades */
@theme {
  --font-sans: "Aptos", "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
}

html { scroll-behavior: smooth; }
section[id] { scroll-margin-top: 6rem; }

body {
  font-family: var(--font-sans);
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 300ms ease, color 300ms ease;
}

.header-scrolled {
  background-color: color-mix(in srgb, var(--background) 92%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
}

/* fade-in scroll (se conserva) */
.fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease-out, transform 0.65s ease-out; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
.fade-d1 { transition-delay: 80ms; } .fade-d2 { transition-delay: 160ms; }
.fade-d3 { transition-delay: 240ms; } .fade-d4 { transition-delay: 320ms; }
.fade-d5 { transition-delay: 400ms; } .fade-d6 { transition-delay: 480ms; }

@media (prefers-reduced-motion: reduce) {
  .fade-in { transition: none; opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Cambiar la fuente y el SEO en `src/pages/index.astro` (head).** Reemplazar el `<link>` de Inter por IBM Plex Sans:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Y actualizar el SEO al modelo híbrido (conservar `facebook-domain-verification`, canonical y OG image existentes):

```html
<title>Nixumi — Plataforma de WhatsApp con IA + chatbots · Meta Tech Provider</title>
<meta name="description" content="Plataforma de WhatsApp Business con IA: conecta tu canal gratis y automatiza con tus herramientas, o deja que Nixumi diseñe y opere tu chatbot. Meta Tech Provider verificado." />
<meta property="og:title" content="Nixumi — Plataforma de WhatsApp con IA · Meta Tech Provider" />
<meta property="og:description" content="Conecta tu WhatsApp gratis y automatiza con tus herramientas, o contrata el servicio gestionado. Meta Tech Provider verificado." />
<meta name="twitter:title" content="Nixumi — Plataforma de WhatsApp con IA · Meta Tech Provider" />
<meta name="twitter:description" content="Plataforma self-serve gratis + servicio gestionado de WhatsApp con IA." />
```

- [ ] **Step 3: Tema dark-first en el script anti-FOUC de `index.astro`.** Reemplazar el `<script is:inline>` de tema por (mantiene `.dark` ⟺ `data-theme` sincronizados, sesgo a dark):

```html
<script is:inline>
  (function () {
    var stored = null;
    try { stored = localStorage.getItem('nixumi-theme'); } catch (e) {}
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle('dark', theme === 'dark');
  })();
</script>
```

- [ ] **Step 4: Asegurar que el toggle de tema actualiza ambos.** En `src/scripts/theme.ts`, donde se hace `classList.toggle('dark', ...)`, añadir también `document.documentElement.dataset.theme = next;` y persistir en `localStorage('nixumi-theme')`. (Confirmar el nombre real del archivo/funciones en Fase 0; el import en `index.astro` es `../scripts/theme` → `initTheme`.)
- [ ] **Step 5: Build.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build`
Expected: build OK.

- [ ] **Step 6: Revisión visual rápida** (`pnpm dev`): el sitio abre **dark** por defecto, fondos `#0F1419`, texto claro, el toggle cambia a light `#F5F7F8` y persiste al recargar.
- [ ] **Step 7: Commit.**

```bash
git add src/styles/global.css src/pages/index.astro src/scripts/theme.ts
git commit -m "feat(ui): tokens dark-first + IBM Plex Sans + alias legacy (concordancia plataforma)"
```

**Validación:** build OK; default dark; toggle light persiste; `dark:` utilities siguen aplicando (porque `.dark` está presente por defecto).

---

## Fase 2 — Sistema de botones y fondo/aurora calmado

**Objetivo:** botones estilo consola (teal/violeta/`.btn-wa`) y fondo tranquilo.

**Files:**
- Modify: `src/styles/aurora.css`

- [ ] **Step 1: Reescribir el sistema de botones en `aurora.css`** (sección `SISTEMA DE BOTONES`):

```css
.btn-nx {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 0.5rem; font-weight: 700; border-radius: var(--radius);
  padding: 0.8rem 1.4rem; font-size: 0.95rem; line-height: 1.2;
  text-decoration: none; border: 1px solid transparent; cursor: pointer;
  white-space: nowrap;
  transition: transform .16s var(--ease-out), box-shadow .16s var(--ease-out),
              background-color .16s var(--ease-out), border-color .16s var(--ease-out),
              color .16s var(--ease-out);
}
.btn-nx:hover  { transform: translateY(-1px); }
.btn-nx:active { transform: translateY(0); }

/* Primary = TEAL (marca) */
.btn-nx.btn-primary {
  background-color: var(--primary); color: var(--primary-foreground);
  box-shadow: 0 8px 22px color-mix(in srgb, var(--primary) 18%, transparent);
}
/* Secondary = VIOLETA (acento) */
.btn-nx.btn-secondary {
  background-color: var(--accent); color: var(--accent-foreground);
  box-shadow: 0 8px 22px color-mix(in srgb, var(--accent) 18%, transparent);
}
/* WhatsApp explícito */
.btn-nx.btn-wa {
  background-color: var(--wa); color: #fff;
  box-shadow: 0 8px 22px color-mix(in srgb, var(--wa) 22%, transparent);
}
/* Outline */
.btn-nx.btn-outline {
  background-color: color-mix(in srgb, var(--card) 64%, transparent);
  color: var(--foreground); border-color: var(--border);
}
.btn-nx.btn-outline:hover { border-color: var(--primary); color: var(--primary); }

.btn-nx.btn-sm { padding: 0.55rem 1rem; font-size: 0.85rem; border-radius: var(--radius-sm); }
.btn-nx.btn-xl { padding: 1rem 1.8rem; font-size: 1.05rem; border-radius: var(--radius-lg); font-weight: 700; }
.btn-nx.btn-full { width: 100%; }
.btn-nx .btn-arrow { transition: transform .2s var(--ease-out); }
.btn-nx:hover .btn-arrow { transform: translateX(4px); }
.btn-nx .btn-arrow-down { transition: transform .2s var(--ease-out); }
.btn-nx:hover .btn-arrow-down { transform: translateY(4px); }

@media (prefers-reduced-motion: reduce) {
  .btn-nx, .btn-nx:hover, .btn-nx:active { transform: none; transition: none; }
}
```

- [ ] **Step 2: Calmar el fondo en `aurora.css`.** Sustituir los 3 beams saturados por un backdrop tranquilo: rejilla tenue + un glow radial suave. Reemplazar `.ap-beam-*` y sus variantes `.dark` por:

```css
.aurora-global {
  position: fixed; inset: 0; width: 100vw; height: 100vh;
  pointer-events: none; z-index: 0; overflow: hidden;
  background:
    radial-gradient(60% 50% at 78% 12%, var(--panel-glow), transparent 70%),
    radial-gradient(50% 45% at 12% 88%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%);
}
.aurora-global .ap-beam { display: none; }   /* se desactivan los beams animados */

/* Capas por sección (recoloreadas sobre el background actual) */
.aurora-showcase { background: transparent !important; position: relative; }
.aurora-medium  { background: color-mix(in srgb, var(--background) 70%, transparent) !important; position: relative; }
.aurora-subtle  { background: color-mix(in srgb, var(--background) 88%, transparent) !important; position: relative; }
```

(Opcional: mantener una rejilla `--grid-line` con `background-image` de líneas si se desea; no es requisito.)

- [ ] **Step 3: Build.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build`
Expected: build OK.

- [ ] **Step 4: Revisión visual:** botones primarios teal, secundarios violeta; fondo calmado sin beams; `prefers-reduced-motion` sin animación.
- [ ] **Step 5: Commit.**

```bash
git add src/styles/aurora.css
git commit -m "feat(ui): botones tipo consola (teal/violeta/.btn-wa) + fondo calmado"
```

**Validación:** build OK; botones y fondo concuerdan con la consola; sin claims tocados aún.

---

## Fase 3 — Header + Hero + claims Meta Tech Provider

> **Bloqueante:** confirmar con el dueño el ruteo WhatsApp ventas (`238 123 8389`) vs soporte (`236 112 5488`) — §9 del spec. Default de este plan: CTAs comerciales → **ventas**.

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Hero.astro`
- Add: `public/brand/meta-tech-provider.png` (copia de `Tech Provider.png`)

- [ ] **Step 1: Copiar el badge** `C:\Users\USUARIO\Downloads\Tech Provider.png` → `public/brand/meta-tech-provider.png`.
- [ ] **Step 2: Header nav.** En `navLinks` añadir `{ href: '#plataforma', label: 'Plataforma' }`. Añadir un enlace **"Entrar"** a `https://app.nixumi.lat/login` (estilo `.btn-outline.btn-sm`, target opcional). Cambiar el CTA principal del header a **"Crear cuenta gratis"** → `https://app.nixumi.lat/register` (`.btn-primary.btn-sm`). Mantener el logo: usar la variante clara del wordmark sobre el header dark.
- [ ] **Step 3: Hero copy/CTAs.** En `Hero.astro`:
  - Eyebrow: "Plataforma de WhatsApp con IA".
  - Subhead: "Opera tu WhatsApp con IA desde nuestra consola — o deja que lo montemos y lo operemos por ti."
  - CTA primario teal: **"Crear cuenta gratis"** → `https://app.nixumi.lat/register` (`.btn-nx.btn-primary`).
  - CTA secundario violeta: **"Agendar diagnóstico"** → WhatsApp **ventas** (`.btn-nx.btn-secondary`), `data-wa-event="wa_click_hero"`.
- [ ] **Step 4: Trust row del Hero — badge Meta.** Añadir el badge dentro de un chip claro legible sobre dark:

```html
<div class="inline-flex items-center gap-2 rounded-lg px-3 py-1.5"
     style="background:rgba(255,255,255,0.92)">
  <img src="/brand/meta-tech-provider.png" alt="Meta Tech Provider verificado por Meta"
       width="150" height="38" class="h-6 w-auto" />
</div>
```

- [ ] **Step 5: Recolor del mockup de teléfono** del Hero a los roles nuevos (burbujas: entrante `var(--card)`, saliente `color-mix(in srgb, var(--primary) 16%, var(--card))`), sin cambiar la estructura.
- [ ] **Step 6: Build.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build`
Expected: build OK.

- [ ] **Step 7: Revisión visual** dark/light + móvil: nav con "Plataforma"/"Entrar", CTAs correctos, badge legible.
- [ ] **Step 8: Commit.**

```bash
git add src/components/Header.astro src/components/Hero.astro public/brand/meta-tech-provider.png
git commit -m "feat(landing): header/hero dark + CTAs app + badge Meta Tech Provider"
```

**Validación:** build OK; enlaces absolutos a `/register` y `/login`; badge legible sobre dark; CTAs comerciales al número confirmado.

---

## Fase 4 — Nueva sección "Dos formas de trabajar con Nixumi"

**Files:**
- Create: `src/components/DosFormas.astro`
- Modify: `src/pages/index.astro` (import + colocar tras `<ProblemSolution />`)

- [ ] **Step 1: Crear `src/components/DosFormas.astro`** con el copy exacto del spec (Panel A self-serve + Panel B gestionado), estilo panel consola (borde `--border`, fondo `--card`, radio `--radius-lg`, sombra `--shadow-card`):

```astro
---
const WA_VENTAS = 'https://wa.me/5212381238389?text=Hola%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20con%20Nixumi';
const REGISTER = 'https://app.nixumi.lat/register';
const panelA = {
  title: 'Plataforma gratis',
  subtitle: 'Conecta un canal de WhatsApp y construye tus automatizaciones con tus herramientas',
  bullets: [
    'Un canal incluido',
    'API de coexistencia o Meta Cloud API',
    'Inbox y operación desde consola',
    'Compatible con n8n, agentes IA y herramientas externas',
    'Tú controlas el chatbot y los flujos',
  ],
};
const panelB = {
  title: 'Servicio gestionado',
  subtitle: 'Nosotros diseñamos, construimos y operamos tu solución',
  bullets: [
    'Diagnóstico del negocio',
    'Diseño de flujos conversacionales',
    'Integración con WhatsApp',
    'Automatizaciones y soporte',
    'Puesta en marcha acompañada',
  ],
};
---
<section id="plataforma" class="aurora-medium py-20 md:py-28">
  <div class="max-w-6xl mx-auto px-4 md:px-6">
    <div class="text-center mb-12 fade-in">
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style="color:var(--foreground)">
        Dos formas de trabajar con Nixumi
      </h2>
      <p class="text-base md:text-lg max-w-2xl mx-auto" style="color:var(--muted-foreground)">
        Úsala tú mismo o deja que la montemos por ti.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Panel A -->
      <article class="fade-in fade-d1 rounded-xl p-7"
        style="background:var(--card); border:1px solid var(--border); box-shadow:var(--shadow-card)">
        <p class="text-xs font-bold uppercase tracking-wider mb-2" style="color:var(--primary)">Self-serve</p>
        <h3 class="text-xl font-extrabold mb-1" style="color:var(--foreground)">{panelA.title}</h3>
        <p class="text-sm mb-5" style="color:var(--muted-foreground)">{panelA.subtitle}</p>
        <ul class="space-y-2.5 mb-7" role="list">
          {panelA.bullets.map(b => (
            <li class="flex items-start gap-2.5 text-sm" style="color:var(--foreground)">
              <span style="color:var(--primary)">✓</span>{b}
            </li>
          ))}
        </ul>
        <a href={REGISTER} class="btn-nx btn-primary btn-full" data-wa-event="cta_register_dosformas">
          Crear cuenta gratis
        </a>
      </article>
      <!-- Panel B -->
      <article class="fade-in fade-d2 rounded-xl p-7"
        style="background:var(--card); border:1px solid var(--border); box-shadow:var(--shadow-card)">
        <p class="text-xs font-bold uppercase tracking-wider mb-2" style="color:var(--accent)">Done-for-you</p>
        <h3 class="text-xl font-extrabold mb-1" style="color:var(--foreground)">{panelB.title}</h3>
        <p class="text-sm mb-5" style="color:var(--muted-foreground)">{panelB.subtitle}</p>
        <ul class="space-y-2.5 mb-7" role="list">
          {panelB.bullets.map(b => (
            <li class="flex items-start gap-2.5 text-sm" style="color:var(--foreground)">
              <span style="color:var(--accent)">✓</span>{b}
            </li>
          ))}
        </ul>
        <a href={WA_VENTAS} target="_blank" rel="noopener noreferrer"
           class="btn-nx btn-secondary btn-full" data-wa-event="wa_click_dosformas">
          Agendar diagnóstico
        </a>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Importar y colocar** en `index.astro`: `import DosFormas from '../components/DosFormas.astro';` y `<DosFormas />` justo después de `<ProblemSolution />`.
- [ ] **Step 3: Build.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build`
Expected: build OK.

- [ ] **Step 4: Revisión visual:** la sección ancla en `#plataforma` (link del Header funciona), 2 paneles legibles dark/light/móvil, CTA A → `/register`, CTA B → WhatsApp ventas.
- [ ] **Step 5: Commit.**

```bash
git add src/components/DosFormas.astro src/pages/index.astro
git commit -m "feat(landing): sección 'Dos formas de trabajar con Nixumi'"
```

**Validación:** build OK; copy exacto del spec; sin claims multi-canal/multi-tenant.

---

## Fase 5 — Services + Cases + Process

**Files:**
- Modify: `src/components/Services.astro`
- Modify: `src/components/Cases.astro`
- Modify: `src/components/Process.astro`

- [ ] **Step 1: Services — reemplazar las 6 tarjetas** por (sin multi-tenant/multi-canal). Mantener la grilla/markup; solo cambian `services[]`, íconos y colores (`iconBg`/`iconStroke` → roles `--primary`/`--accent`). Eyebrow teal. Copy exacto:

```js
const services = [
  { title: 'Chatbots de Ventas con IA',
    description: 'Atienden, cotizan y cierran ventas en WhatsApp 24/7, conectados a la información real de tu negocio.' },
  { title: 'Consola / Inbox unificado',
    description: 'Todas tus conversaciones en una bandeja, agrupadas por canal, con pausa manual del bot cuando lo necesites.' },
  { title: 'Coexistencia con n8n',
    description: 'Tus automatizaciones y las nuestras conviven: responde desde la API de coexistencia o desde tu flujo de n8n.' },
  { title: 'API de coexistencia / Meta Cloud API',
    description: 'Conecta y automatiza WhatsApp con las herramientas que ya usas. Tú controlas los flujos.' },
  { title: 'Conexión de WhatsApp Business',
    description: 'Conecta tu número con Embedded Signup, gestiona plantillas y canales desde la consola.' },
  { title: 'Human Takeover',
    description: 'El bot atiende, pero tu equipo toma el control de cualquier chat con un comando, y lo devuelve al bot.' },
];
```
- [ ] **Step 2: Cases — restyle a panel consola** (borde `--border`, fondo `--card`, radio `--radius-lg`); métricas con `font-family: var(--font-mono)`; añadir línea "Graciela corre sobre la plataforma Nixumi" en la descripción. El stack ya lista n8n — se conserva.
- [ ] **Step 3: Process — reencuadrar** como track del **Servicio gestionado**: encabezado "Así lo montamos, llave en mano" + una nota ("La plataforma self-serve no requiere esperar setup"). Mantener los 4 pasos; estilo de tarjeta/numeración alineado a `--primary`.
- [ ] **Step 4: Build.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build`
Expected: build OK.

- [ ] **Step 5: Revisión visual** dark/light/móvil de las 3 secciones.
- [ ] **Step 6: Commit.**

```bash
git add src/components/Services.astro src/components/Cases.astro src/components/Process.astro
git commit -m "feat(landing): services reframe (sin multi-tenant) + cases/process concordancia"
```

**Validación:** build OK; Services sin claims prohibidos; Process posicionado como servicio gestionado.

---

## Fase 6 — Pricing + FAQ

**Files:**
- Modify: `src/components/Pricing.astro`
- Modify: `src/components/FAQ.astro`

- [ ] **Step 1: Pricing — añadir Eje 1 (Plataforma).** Antes de la grilla de planes actuales, añadir un bloque "Plataforma" con copy exacto del spec: "Gratis", "Incluye 1 canal", "API de coexistencia o Meta Cloud API", "Construye tu chatbot con tus herramientas", "Ideal para equipos técnicos, agencias o negocios que ya tienen automatizaciones", CTA **"Crear cuenta gratis"** → `https://app.nixumi.lat/register` (`.btn-primary`).
- [ ] **Step 2: Pricing — Eje 2 (Servicio/Setup).** Mantener Arranque/Crecimiento/Enterprise, promo Fundadores y Puebla-Veracruz. Restyle a panel consola; plan destacado con borde `--primary`; precios con `var(--font-mono)`; el CTA de cada plan → WhatsApp **ventas**. Conservar el toggle MXN/USD (no romper su script).
- [ ] **Step 3: FAQ — añadir/corregir las 5 Q&A** del spec (¿plataforma gratis? / ¿quién construye el chatbot? / ¿puedo usar n8n? / ¿cuántos canales? / ¿qué es Meta Tech Provider?). Ajustar la de "tiempo activo" (self-serve = minutos / gestionado = 5–15 días). Conservar la de "pruébalo ahora" (WhatsApp). Restyle acordeón a roles nuevos.
- [ ] **Step 4: Build.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build`
Expected: build OK.

- [ ] **Step 5: Revisión visual:** toggle de moneda sigue funcionando; Eje 1 gratis visible; FAQ con nuevas preguntas.
- [ ] **Step 6: Commit.**

```bash
git add src/components/Pricing.astro src/components/FAQ.astro
git commit -m "feat(landing): pricing dos ejes (plataforma gratis) + FAQ actualizado"
```

**Validación:** build OK; copy exacto; "gratis con 1 canal" (no ilimitado); toggle intacto.

---

## Fase 7 — CTAFinal + Footer + assets Meta/Nixumi

**Files:**
- Modify: `src/components/CTAFinal.astro`
- Modify: `src/components/Footer.astro`
- Add: `public/brand/` logos Nixumi (desde `platform-design-ref/brand/`) si difieren

- [ ] **Step 1: Copiar logos** de `platform-design-ref/brand/` a `public/brand/` (los que el sitio vaya a usar: wordmark claro/oscuro). Solo si difieren de los `.webp` actuales.
- [ ] **Step 2: CTAFinal.** Recolorear a roles nuevos (ya es showcase dark). CTA primario "Hablar con Nixumi ahora" → WhatsApp **ventas** con `.btn-wa`. Añadir badge Meta Tech Provider (chip claro) en la trust row. Mantener el segundo CTA "Reserva demo".
- [ ] **Step 3: Footer.** Tagline → "Plataforma de WhatsApp con IA + servicio gestionado". Añadir enlaces "Plataforma" (`#plataforma`) y "Entrar" (`https://app.nixumi.lat/login`). **Corregir canales de contacto:**
  - **Ventas / atención:** WhatsApp **+52 238 123 8389** (`https://wa.me/5212381238389`) · **nixumi-soluciones@nixumi.lat**
  - **Soporte:** WhatsApp **+52 236 112 5488** (`https://wa.me/522361125488`) · **soporte@nixumi.lat**
  
  Etiquetar claramente cada uno (hoy están sin distinguir). Añadir badge Meta Tech Provider + "Verificado por Meta".
- [ ] **Step 4: Build.**

Run: `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build`
Expected: build OK.

- [ ] **Step 5: Revisión visual:** footer con contactos correctos etiquetados, badge presente; CTAFinal recoloreado.
- [ ] **Step 6: Commit.**

```bash
git add src/components/CTAFinal.astro src/components/Footer.astro public/brand
git commit -m "feat(landing): CTAFinal/Footer dark + contactos ventas/soporte + badge Meta"
```

**Validación:** build OK; canales ventas vs soporte correctos; badges legibles.

---

## Fase 8 — Validación visual final

**Files:** ninguno (solo verificación; correcciones menores si aparecen).

- [ ] **Step 1: Build limpio.** `pnpm --dir "C:/Users/USUARIO/nixumi-workspace/nixumi-web" build` → OK.
- [ ] **Step 2: Recorrido dark (default)** desktop: Header→Footer; sin restos de morado primario, sin beams animados, badges legibles.
- [ ] **Step 3: Recorrido light** (toggle) desktop: paleta crema/clara correcta, contraste AA.
- [ ] **Step 4: Móvil** (dark y light): responsive intacto en Hero, Dos formas, Services, Pricing, Footer.
- [ ] **Step 5: Enlaces.** Verificar que "Crear cuenta gratis"/Eje 1 → `https://app.nixumi.lat/register`; "Entrar" → `https://app.nixumi.lat/login`; CTAs comerciales → WhatsApp ventas; soporte → número soporte.
- [ ] **Step 6: Claims.** Buscar que NO exista "multi-canal"/"multi-tenant" en copy público.

Run: `git -C "C:/Users/USUARIO/nixumi-workspace/nixumi-web" grep -ni "multi-canal\|multi-tenant\|multicanal" -- src`
Expected: sin resultados en copy visible.

- [ ] **Step 7: Contraste y reduced-motion.** Spot-check AA del teal y `--muted-foreground` sobre dark; con `prefers-reduced-motion` no hay animación de fondo ni de botones.
- [ ] **Step 8: Commit final** (si hubo correcciones).

```bash
git commit -am "fix(landing): ajustes finales de validación visual"
```

**Validación:** build OK; checklist completo; sin claims prohibidos; enlaces y contactos correctos.

---

## Riesgos

- **Ruteo WhatsApp ventas vs soporte** (§9 spec): **bloquea Fase 3** hasta confirmación del dueño.
- **`.dark` por defecto:** si no se mantiene presente, las utilidades `dark:` existentes dejan de aplicar → el sitio se vería "a medias". El script de Fase 1 lo garantiza.
- **Toggle de moneda (Pricing) y otros scripts inline:** no romper sus selectores al restyle.
- **Badge Meta sobre dark:** requiere chip claro (implementado en Fases 3/7).
- **Aptos no es fuente web:** IBM Plex Sans cubre a no-Windows; diferencia menor aceptada.
- **Volumen de cambios:** estricta disciplina de una fase = un commit + build.

## Criterios de validación globales

- `pnpm build` OK tras **cada** fase.
- Dark por defecto; light por toggle persistente.
- Sin claims "multi-canal"/"multi-tenant" en copy público.
- Claim "Meta Tech Provider verificado por Meta" + badge en Hero/CTAFinal/Footer.
- Enlaces absolutos a `app.nixumi.lat/register` y `/login`.
- Contactos: ventas (238 123 8389 / nixumi-soluciones@) vs soporte (236 112 5488 / soporte@) correctos.
- Responsive intacto; `prefers-reduced-motion` respetado; contraste AA en elementos clave.
