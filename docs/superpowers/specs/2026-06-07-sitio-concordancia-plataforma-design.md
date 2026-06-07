# Diseño — Rediseño del sitio nixumi-web para concordar con la plataforma (app.nixumi.lat)

- **Fecha:** 2026-06-07
- **Repo:** `nixumi-web` (Astro, landing de marketing)
- **Enfoque aprobado:** A — Evolución en sitio + marco "dos caminos", con **concordancia visual MÁXIMA** (dark-first + acento teal) hacia la plataforma.
- **Estado:** diseño para aprobación del dueño antes de plan de implementación.

---

## 1. Contexto y problema

El sitio actual está posicionado como **agencia "hecho a la medida"** (te construimos el bot),
con estética de marketing: light-first, fuente Inter, morado `#8B5CF6` primario, fondo
"aurora" animado (beams morado/lavanda/verde), tarjetas muy redondeadas (`rounded-2xl/3xl`).

Dos desajustes con la realidad del negocio:

1. **Producto/servicios desactualizados.** Hoy Nixumi es **híbrido**: una **plataforma**
   (consola de operaciones de WhatsApp — inbox, human takeover, coexistencia n8n, API
   multi-tenant / Tech Provider, onboarding self-serve) **y** un **servicio gestionado**
   (done-for-you). El sitio solo refleja lo segundo.
2. **Desajuste visual con la plataforma.** `app.nixumi.lat` es una **consola dark-first**
   con un sistema de diseño propio (acento teal, fuente Aptos/IBM Plex Sans, radios chicos).
   Ir del sitio a la app se siente como dos productos distintos.

**Objetivo:** actualizar contenido al modelo híbrido **y** adoptar el sistema de diseño de
la plataforma para que el tránsito sitio → consola no tenga salto visual.

---

## 2. Decisiones (aprobadas por el dueño)

| # | Decisión |
|---|----------|
| D1 | Modelo de negocio: **híbrido** — plataforma + servicio (dos caminos visibles). |
| D2 | Sumar 4 capacidades reales: **Consola/Inbox**, **Coexistencia n8n**, **API + multi-tenant (Tech Provider)**, **Onboarding self-serve**. |
| D3 | Pricing en **dos ejes**: Plataforma (self-serve) + Servicio/Setup (done-for-you). |
| D4 | Plataforma **gratis por el momento** → gancho "Crea tu cuenta gratis". |
| D5 | Conservar **promo Fundadores** + enfoque regional **Puebla-Veracruz**. |
| D6 | Mencionar **Meta Tech Provider verificado por Meta** (credibilidad). |
| D7 | URL de la consola: **https://app.nixumi.lat** (`/register` para crear cuenta, `/login` para entrar). |
| D8 | Concordancia visual **MÁXIMA**: **dark-first** + **primario teal** + violeta de acento + fuente Aptos/IBM Plex Sans + radios ≤12px. |

### Aclaración importante (inconsistencia interna de la plataforma)

La plataforma usa **dos paletas distintas** entre sí:

- **Consola** (`AppLayout`/`tokens.css`): teal `#2dd4bf`, fondo `#09090b`, light crema `#f5f0eb`.
- **Login/registro** (`AuthLayout`): verde-teal `#31e6a2`, fondo **`#0F1419`** (dark) / **`#F5F7F8`** (light), acento violeta `#9c6cff`.

Los fondos del **login** son idénticos a los del sitio actual. Como el login es la **primera
pantalla** que ve quien entra desde el sitio, **el sitio apunta a la paleta del `AuthLayout`**
(el "puente"). Se recomienda al dueño reconciliar después la inconsistencia interna de la
plataforma (fuera del alcance de este trabajo).

---

## 3. Sistema de diseño objetivo (tokens)

Se reemplaza la paleta de marketing por el set de tokens del **bridge (`AuthLayout`)**,
**dark-first**. Estos tokens viven en `src/styles/global.css` (capa `@theme` + override por tema).

### 3.1 Roles de color

**DARK (tema por defecto)**

| Token | Valor |
|---|---|
| `--background` | `#0F1419` |
| `--foreground` | `#fbf7ff` |
| `--card` | `rgba(15,18,27,0.82)` |
| `--popover` | `rgba(15,18,27,0.92)` |
| `--primary` / `--primary-foreground` | `#31e6a2` / `#03140d` |
| `--accent` / `--accent-foreground` | `#9c6cff` / `#ffffff` |
| `--secondary` / `--secondary-foreground` | `rgba(255,255,255,0.08)` / `#fbf7ff` |
| `--muted-foreground` | `#b9b0c4` |
| `--border` | `rgba(255,255,255,0.14)` |
| `--input` | `rgba(255,255,255,0.16)` |
| `--ring` | `#b98cff` |
| `--pink` (acento opcional) | `#f472b6` |
| `--wa` (verde WhatsApp funcional) | `#25D366` |
| `--shadow-card` | `0 28px 90px rgba(0,0,0,0.32)` |

**LIGHT**

| Token | Valor |
|---|---|
| `--background` | `#F5F7F8` |
| `--foreground` | `#162033` |
| `--card` | `rgba(255,255,255,0.92)` |
| `--popover` | `rgba(255,255,255,0.96)` |
| `--primary` / `--primary-foreground` | `#13a06e` / `#ffffff` |
| `--accent` / `--accent-foreground` | `#7c5cff` / `#ffffff` |
| `--secondary` / `--secondary-foreground` | `rgba(255,255,255,0.72)` / `#243044` |
| `--muted-foreground` | `#617087` |
| `--border` | `rgba(48,59,77,0.16)` |
| `--input` | `rgba(48,59,77,0.22)` |
| `--ring` | `#7c5cff` |
| `--wa` | `#1FA855` |
| `--shadow-card` | `0 26px 80px rgba(69,54,94,0.16)` |

### 3.2 Escalas (idénticas a `tokens.css` de la plataforma)

- **Tipografía:** `--font-sans: "Aptos","IBM Plex Sans","Segoe UI",system-ui,sans-serif`;
  `--font-mono: "Cascadia Code","SFMono-Regular",Consolas,ui-monospace,monospace`.
- **Pesos:** 400 / 500 / 600 / 700 (sin pesos arbitrarios).
- **Radios:** `--radius-sm 6px`, `--radius 8px`, `--radius-md 10px`, `--radius-lg 12px`, `--radius-pill 999px`. **Las tarjetas no pasan de 12px.**
- **Espaciado:** escala 4px (`--space-1..8`).
- **Motion:** `--dur-fast 140ms`, `--dur-base 200ms`, `--dur-slow 320ms`, `--ease-out cubic-bezier(0.22,1,0.36,1)`.

### 3.3 Mapeo de tokens heredados (para minimizar ediciones de componentes)

Los componentes actuales usan `var(--color-*)`. Se conservan esos nombres como **alias** a los nuevos roles, así el grueso del markup no cambia:

| Heredado | Nuevo rol |
|---|---|
| `--color-smoke` | `var(--background)` |
| `--color-navy` | `var(--foreground)` |
| `--color-slate` | `var(--muted-foreground)` |
| `--color-purple` | `var(--accent)` (violeta) |
| `--color-lavender` | `var(--accent)` |
| `--color-green` | `var(--primary)` (teal) — uso general/acento |

> **Excepción WhatsApp:** los CTA que abren WhatsApp NO usan `--primary`; usan el token nuevo `--wa` (verde WhatsApp) vía la clase `.btn-wa`.

### 3.4 Fuentes (carga)

La plataforma **no** carga fuentes por web (usa Aptos/Segoe del SO). Para que el sitio se vea
consistente para todos los visitantes: **cargar IBM Plex Sans por Google Fonts** (pesos
400/500/600/700) como miembro web del stack. Windows verá Aptos (igual que la consola), el
resto IBM Plex Sans. Cascadia Code queda solo como fallback de `--font-mono` (no se carga).

---

## 4. Sistema de botones (reskin de `.btn-nx`)

Se conservan las clases existentes pero se recolorea y ajusta a la estética de la consola
(radio 8–12px, peso 700, hover `translateY(-1px)` en vez de `scale(1.04)`):

| Clase | Antes | Ahora |
|---|---|---|
| `.btn-primary` | verde WhatsApp | **teal `--primary`** (acción de marca: "Crear cuenta gratis", "Conoce la plataforma") |
| `.btn-secondary` | morado | **violeta `--accent`** (acción secundaria: "Agendar diagnóstico") |
| `.btn-outline` | blanco/navy | borde `--border`, fondo `--card`/transparente, texto `--foreground`; hover borde `--primary` |
| `.btn-wa` (**nueva**) | — | **verde WhatsApp `--wa`** para CTAs cuyo mensaje es explícitamente "hablar por WhatsApp" (Header, Footer, CTAFinal) |
| `.btn-xl` | pill 9999px | `--radius-lg` (12px) |

**Regla por intención, no por destino:** el color del botón lo define el mensaje, no si el
enlace abre wa.me. CTAs de **narrativa de marca** ("Crear cuenta gratis" → teal; "Agendar
diagnóstico" → violeta) usan teal/violeta aunque abran WhatsApp. CTAs de **"chatea por
WhatsApp"** explícitos usan `.btn-wa` (verde). Los `.btn-primary` actuales que son
"chatear por WhatsApp" se reasignan a `.btn-wa`.

---

## 5. Fondo (calmar el "aurora")

El aurora actual (3 beams saturados animados) se reemplaza por el **backdrop tranquilo de la
consola**: líneas de rejilla muy tenues (`--grid-line`) + un **glow radial suave teal/violeta**
de baja opacidad (`--panel-glow`), mayormente estático. Se respeta `prefers-reduced-motion`.
Se conservan las clases de capa por sección (`.aurora-showcase/medium/subtle`) recoloreadas
sobre `#0F1419`.

---

## 6. Mecanismo de tema

- **Default dark.** Script inline de primer pintado: resuelve `localStorage('nixumi-theme')`
  → si no hay, usa `prefers-color-scheme` con **sesgo a dark**; aplica **ambos**
  `html[data-theme]` **y** la clase `.dark` (para que las utilidades `dark:` de Tailwind sigan
  funcionando). El toggle actualiza los dos.
- Esto alinea el sitio con `AuthLayout`/`AppLayout`, que usan `data-theme`.

---

## 7. Estructura de página (nuevo orden)

```
Header → Hero → ProblemSolution → [NUEVA] Dos formas de trabajar → Services
       → Cases → Process → Pricing → FAQ → LeadForm → CTAFinal → Footer
```

### Cambios por componente (contenido + visual)

- **SEO (`index.astro` head):** title/description/OG → "Plataforma de WhatsApp con IA + chatbots · Meta Tech Provider". Mantener verificación de dominio y tags existentes.
- **Header:** dark-first; logo wordmark claro sobre fondo oscuro. Nav suma **"Plataforma"** (`#plataforma`) y **"Entrar"** (`https://app.nixumi.lat/login`). CTA de marca "Crear cuenta gratis" (teal → `/register`). Sticky bg `#0F1419` con blur.
- **Hero:** fondo dark; eyebrow teal en mayúsculas; H1 se conserva; subhead dual *("Opera tu WhatsApp con IA desde nuestra consola — o deja que lo montemos por ti")*. CTAs: **primario teal** "Crear cuenta gratis" (→ `/register`), **secundario violeta** "Agendar diagnóstico" (WA). Trust row suma **badge Meta Tech Provider**. Mockup de teléfono recoloreado al estilo `.bubble`/`.bubble.out` de la consola.
- **NUEVA — "Dos formas de trabajar con Nixumi"** (`id="plataforma"`): dos paneles estilo consola:
  - **Plataforma (self-serve, GRATIS)**: conecta tu WhatsApp (Embedded Signup), inbox unificado, human takeover, automatizaciones n8n, API multi-canal. CTA teal "Crear cuenta gratis" (→ `/register`).
  - **Servicio gestionado**: diseñamos, construimos, entrenamos y operamos tu bot. CTA violeta "Agendar diagnóstico" (WA).
- **Services:** 6 tarjetas (paneles consola) reflejando el producto real: Chatbots IA · Consola/Inbox · Coexistencia n8n · API + Tech Provider · Onboarding self-serve · Human Takeover. Íconos sobre fondo `--primary`/`--accent` soft.
- **Cases:** se conserva; restyle a panel consola; métricas en `--font-mono`; añadir "Graciela corre sobre la plataforma Nixumi".
- **Process:** se reencuadra como track del **Servicio gestionado** ("Así lo montamos, llave en mano"), con nota de que la Plataforma self-serve no espera setup. Estilo `step-list` de la consola.
- **Pricing (dos ejes):**
  - **Eje 1 · Plataforma:** "**Gratis por ahora**" + CTA teal "Crea tu cuenta" (→ `/register`).
  - **Eje 2 · Servicio/Setup:** Arranque/Crecimiento/Enterprise tal cual + **promo Fundadores** + garantía 14 días. Plan destacado con borde `--primary` (teal); precios en `--font-mono`; toggle MXN/USD se conserva.
- **FAQ:** sumar Qs: diferencia plataforma vs servicio · qué es coexistencia n8n · ¿tienen API? · ¿puedo conectar mi propio número (Embedded Signup)? Ajustar la de "tiempo activo" (self-serve = minutos / gestionado = 5–15 días). Conservar la de "pruébalo ahora" (WA). Acordeón estilo consola.
- **CTAFinal:** ya es showcase dark; recolorear a teal/violeta; CTA WhatsApp en `.btn-wa`; trust row suma badge Meta Tech Provider.
- **Footer:** dark; tagline actualizado (plataforma + servicio); enlaces "Plataforma" y "Entrar"; badge **Meta Tech Provider** + "Verificado por Meta"; contactos se conservan.

---

## 8. Insignia Meta Tech Provider

- Asset provisto: `Tech Provider.png` (∞ azul + texto "Meta Tech Provider" oscuro sobre transparente).
- Como el texto es oscuro, **sobre fondo dark se coloca dentro de un chip claro** (fondo `rgba(255,255,255,0.92)`, radio `--radius`) para que lea bien. (Alternativa futura: variante con texto blanco.)
- Ubicaciones: trust row del Hero, CTAFinal y Footer.

---

## 9. Assets a incorporar (a `nixumi-web/public/`)

- **Logos de marca** (desde `platform-design-ref/brand/`): `nixumi-logo-light/dark.webp`, `nixumi-text-white/black.png`, `nixumi-app-icon.png`. Usar la variante clara del wordmark sobre fondo dark.
- **Badge:** `Tech Provider.png` → `public/brand/meta-tech-provider.png`.
- **Fuente:** `<link>` a Google Fonts para IBM Plex Sans (400/500/600/700).

---

## 10. Fuera de alcance (solo aviso)

- IDs reales de GTM/Pixel (`GTM-XXXXXXX`, `PIXEL_ID_AQUI`) — no se configuran aquí.
- Credenciales de Supabase hardcodeadas en el historial del repo (tema de **seguridad**, separado).
- Reconciliar la inconsistencia interna de paletas de la plataforma (consola vs login).
- Páginas legales (`aviso-de-privacidad`, `terminos-y-condiciones`, `reserva-cita`) — solo se ajustan tokens heredados; sin cambio de contenido.

---

## 11. Riesgos / decisiones abiertas

- **Muchos componentes tocados.** Se ejecuta por fases pequeñas (tokens → botones/fondo → por sección), con `pnpm build` tras cada fase.
- **Badge Meta** sobre dark requiere chip claro (o variante blanca a futuro).
- **Aptos** no es fuente web → IBM Plex Sans como miembro web; aceptar diferencia menor de render entre SOs.
- **Tema dual** (`.dark` + `data-theme`): mantener ambos sincronizados en el toggle y el primer pintado.
- **Contraste:** validar AA del teal `#31e6a2` sobre dark y de textos `--muted-foreground`.

---

## 12. Validación

- `pnpm build` en `nixumi-web` sin errores (tras cada fase).
- Revisión visual en dev: **dark (default)** y **light**, desktop y móvil.
- Verificar enlaces a `https://app.nixumi.lat/register` y `/login`.
- Chequeo de contraste (AA) en Hero, botones y badges.
- `prefers-reduced-motion`: sin animaciones del fondo.
