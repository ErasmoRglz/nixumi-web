# Diseño — Rediseño del sitio nixumi-web para concordar con la plataforma (app.nixumi.lat)

- **Fecha:** 2026-06-07 (act. con aclaraciones finales del dueño)
- **Repo:** `nixumi-web` (Astro, landing de marketing)
- **Enfoque aprobado:** A — Evolución en sitio + marco "dos caminos", con **concordancia visual MÁXIMA** (dark-first + acento teal) hacia la plataforma.
- **Estado:** diseño aprobado en criterios; el plan de implementación se redacta aparte. **No implementar hasta aprobación del plan.**

---

## 1. Contexto y problema

El sitio actual está posicionado como **agencia "hecho a la medida"** (te construimos el bot),
con estética de marketing: light-first, fuente Inter, morado `#8B5CF6` primario, fondo
"aurora" animado, tarjetas muy redondeadas. Dos desajustes:

1. **Producto/servicios desactualizados.** Hoy Nixumi es **híbrido**: una **plataforma**
   self-serve (consola de WhatsApp: inbox, human takeover, coexistencia n8n, conexión de
   WhatsApp Business, API de coexistencia / Meta Cloud API) **y** un **servicio gestionado**
   (done-for-you). El sitio solo refleja lo segundo.
2. **Desajuste visual con la plataforma.** `app.nixumi.lat` es una **consola dark-first** con
   sistema de diseño propio (acento teal, fuente Aptos/IBM Plex Sans, radios chicos). Ir del
   sitio a la app se siente como dos productos distintos.

**Objetivo:** actualizar contenido al modelo híbrido **y** adoptar el sistema de diseño de la
plataforma para que el tránsito sitio → consola no tenga salto visual.

---

## 2. Decisiones (aprobadas por el dueño)

| # | Decisión |
|---|----------|
| D1 | Modelo de negocio: **híbrido** — plataforma + servicio (dos caminos visibles). |
| D2 | Capacidades en copy de marketing: **Consola/Inbox**, **Coexistencia con n8n**, **API de coexistencia / Meta Cloud API**, **Conexión de WhatsApp Business (Embedded Signup)**. **Prohibido** vender "multi-canal" o "multi-tenant" como claim: son mínimos esperados de un Tech Provider, no diferenciador (solo pueden quedar en comentarios técnicos internos). |
| D3 | Pricing en **dos ejes**: Plataforma (self-serve) + Servicio/Setup (done-for-you). |
| D4 | Plataforma **gratis con límites claros** (1 canal incluido) — **NO** "gratis ilimitado". Gancho "Crea tu cuenta gratis". |
| D5 | Conservar **promo Fundadores** + enfoque regional **Puebla-Veracruz**. |
| D6 | Nixumi **YA ES Meta Tech Provider verificado por Meta**: claim permitido + badge en Hero/CTAFinal/Footer (chip claro si el badge es texto oscuro sobre dark). |
| D7 | Enlaces a la app **absolutos**: `https://app.nixumi.lat/register` (crear cuenta) y `https://app.nixumi.lat/login` (entrar). Nunca rutas relativas. |
| D8 | Concordancia visual **MÁXIMA**: **dark-first** + **primario teal** + violeta de acento + fuente Aptos/IBM Plex Sans + radios ≤12px + fondo calmado + botones tipo consola. |

### Aclaración (inconsistencia interna de la plataforma)

La plataforma usa **dos paletas**: **Consola** (`tokens.css`): teal `#2dd4bf`, fondo `#09090b`.
**Login/registro** (`AuthLayout`): verde-teal `#31e6a2`, fondo **`#0F1419`** / **`#F5F7F8`**,
acento violeta `#9c6cff`. Los fondos del **login** son idénticos a los del sitio actual y el
login es la primera pantalla al entrar desde el sitio → **el sitio apunta a la paleta del
`AuthLayout`**. Reconciliar la inconsistencia interna de la plataforma queda fuera de alcance.

---

## 3. Sistema de diseño objetivo (tokens)

Reemplaza la paleta de marketing por el set del **bridge (`AuthLayout`)**, **dark-first**.
Vive en `src/styles/global.css`.

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
- **Pesos:** 400 / 500 / 600 / 700.
- **Radios:** `--radius-sm 6px`, `--radius 8px`, `--radius-md 10px`, `--radius-lg 12px`, `--radius-pill 999px`. **Tarjetas no pasan de 12px.**
- **Espaciado:** escala 4px (`--space-1..8`).
- **Motion:** `--dur-fast 140ms`, `--dur-base 200ms`, `--dur-slow 320ms`, `--ease-out cubic-bezier(0.22,1,0.36,1)`.

### 3.3 Mapeo de tokens heredados (minimiza ediciones de markup)

| Heredado | Nuevo rol |
|---|---|
| `--color-smoke` | `var(--background)` |
| `--color-navy` | `var(--foreground)` |
| `--color-slate` | `var(--muted-foreground)` |
| `--color-purple` | `var(--accent)` (violeta) |
| `--color-lavender` | `var(--accent)` |
| `--color-green` | `var(--primary)` (teal) — uso general/acento |

> **Excepción WhatsApp:** los CTA "chatea por WhatsApp" usan `--wa` (verde) vía `.btn-wa`.

### 3.4 Fuentes

La plataforma no carga fuentes por web. Para consistencia entre visitantes: **cargar IBM Plex
Sans por Google Fonts** (400/500/600/700) como miembro web del stack. Windows verá Aptos (igual
que la consola), el resto IBM Plex Sans. Cascadia Code solo como fallback de `--font-mono`.

---

## 4. Sistema de botones (reskin de `.btn-nx`)

| Clase | Antes | Ahora |
|---|---|---|
| `.btn-primary` | verde WhatsApp | **teal `--primary`** (marca: "Crear cuenta gratis", "Conoce la plataforma") |
| `.btn-secondary` | morado | **violeta `--accent`** (secundaria: "Agendar diagnóstico") |
| `.btn-outline` | blanco/navy | borde `--border`, fondo `--card`/transparente, texto `--foreground`; hover borde `--primary` |
| `.btn-wa` (**nueva**) | — | **verde WhatsApp `--wa`** para CTAs "hablar por WhatsApp" (Header, Footer, CTAFinal) |
| `.btn-xl` | pill 9999px | `--radius-lg` (12px) |

**Regla por intención, no por destino:** el color lo define el mensaje, no si el enlace abre
wa.me. CTAs de **narrativa de marca** ("Crear cuenta gratis" → teal; "Agendar diagnóstico" →
violeta) usan teal/violeta aunque abran WhatsApp. CTAs de **"chatea por WhatsApp"** explícitos
usan `.btn-wa` (verde). Radio 8–12px, peso 700, hover `translateY(-1px)`.

---

## 5. Fondo (calmar el "aurora")

Reemplazar los 3 beams saturados animados por el **backdrop tranquilo de la consola**: líneas de
rejilla tenues (`--grid-line`) + **glow radial suave teal/violeta** de baja opacidad
(`--panel-glow`), mayormente estático. Respetar `prefers-reduced-motion`. Conservar las clases
de capa por sección (`.aurora-showcase/medium/subtle`) recoloreadas sobre `#0F1419`.

---

## 6. Mecanismo de tema

**Default dark.** Script inline de primer pintado: resuelve `localStorage('nixumi-theme')`; si no
hay, usa `prefers-color-scheme` con **sesgo a dark**; aplica **ambos** `html[data-theme]` **y** la
clase `.dark` (para que `dark:` de Tailwind siga funcionando). El toggle actualiza los dos.

---

## 7. Estructura de página y contenido

```
Header → Hero → ProblemSolution → [NUEVA] Dos formas de trabajar → Services
       → Cases → Process → Pricing → FAQ → LeadForm → CTAFinal → Footer
```

### 7.1 SEO (`index.astro` head)
title/description/OG → "Plataforma de WhatsApp con IA + chatbots · Meta Tech Provider".
Conservar verificación de dominio y tags existentes.

### 7.2 Header
Dark-first; logo wordmark claro sobre fondo oscuro. Nav suma **"Plataforma"** (`#plataforma`) y
**"Entrar"** (`https://app.nixumi.lat/login`). CTA de marca "Crear cuenta gratis" (teal →
`https://app.nixumi.lat/register`). Sticky bg `#0F1419` con blur.

### 7.3 Hero
Fondo dark; eyebrow teal mayúsculas; H1 se conserva; subhead dual *("Opera tu WhatsApp con IA
desde nuestra consola — o deja que lo montemos por ti")*. CTAs: **primario teal** "Crear cuenta
gratis" (→ `/register`), **secundario violeta** "Agendar diagnóstico" (WhatsApp). Trust row suma
**badge Meta Tech Provider**. Mockup de teléfono recoloreado al estilo `.bubble`/`.bubble.out`.

### 7.4 NUEVA — "Dos formas de trabajar con Nixumi" (`id="plataforma"`)
Dos paneles estilo consola. **Copy exacto:**

**Panel A — Plataforma self-serve**
- Título: **"Plataforma gratis"**
- Subtítulo: "Conecta un canal de WhatsApp y construye tus automatizaciones con tus herramientas"
- Bullets:
  - Un canal incluido
  - API de coexistencia o Meta Cloud API
  - Inbox y operación desde consola
  - Compatible con n8n, agentes IA y herramientas externas
  - Tú controlas el chatbot y los flujos
- CTA: **"Crear cuenta gratis"** → `https://app.nixumi.lat/register`

**Panel B — Servicio gestionado**
- Título: **"Servicio gestionado"**
- Subtítulo: "Nosotros diseñamos, construimos y operamos tu solución"
- Bullets:
  - Diagnóstico del negocio
  - Diseño de flujos conversacionales
  - Integración con WhatsApp
  - Automatizaciones y soporte
  - Puesta en marcha acompañada
- CTA: **"Agendar diagnóstico"** → WhatsApp de ventas (ver §9)

### 7.5 Services
6 tarjetas (paneles consola), **sin** claims multi-canal/multi-tenant:
1. Chatbots de Ventas con IA
2. Consola / Inbox unificado
3. Coexistencia con n8n
4. **API de coexistencia / Meta Cloud API** (conecta y automatiza con tus herramientas)
5. **Conexión de WhatsApp Business** (Embedded Signup)
6. Human Takeover

### 7.6 Cases
Se conserva; restyle a panel consola; métricas en `--font-mono`; añadir "Graciela corre sobre la
plataforma Nixumi".

### 7.7 Process
Se reencuadra como track del **Servicio gestionado** ("Así lo montamos, llave en mano"), con nota
de que la Plataforma self-serve no espera setup. Estilo `step-list` de la consola.

### 7.8 Pricing (dos ejes)
**Eje 1 · Plataforma** (copy exacto):
- "Gratis"
- "Incluye 1 canal"
- "API de coexistencia o Meta Cloud API"
- "Construye tu chatbot con tus herramientas"
- "Ideal para equipos técnicos, agencias o negocios que ya tienen automatizaciones"
- CTA: "Crear cuenta gratis" → `https://app.nixumi.lat/register`

**Eje 2 · Servicio/Setup:** mantener Arranque / Crecimiento / Enterprise, **promo Fundadores** y
enfoque **Puebla-Veracruz**. CTA: diagnóstico por WhatsApp de ventas. Plan destacado con borde
`--primary` (teal); precios en `--font-mono`; toggle MXN/USD se conserva.

### 7.9 FAQ
Añadir/corregir (copy exacto):
- **"¿La plataforma es gratis?"** → "Sí, la plataforma puede usarse gratis con límite de un canal. Puedes operar con la API de coexistencia o Meta Cloud API y construir tu chatbot con tus propias herramientas."
- **"¿Nixumi me construye el chatbot o lo construyo yo?"** → "Ambas opciones. Puedes usar la plataforma self-serve para construir con tus herramientas, o contratar el servicio gestionado para que Nixumi lo diseñe e implemente contigo."
- **"¿Puedo usar n8n u otras herramientas?"** → "Sí. La plataforma está pensada para coexistir con herramientas externas como n8n, agentes IA o flujos propios."
- **"¿Cuántos canales incluye la plataforma gratis?"** → "La etapa gratuita incluye un canal."
- **"¿Qué significa que Nixumi sea Meta Tech Provider?"** → "Que Nixumi opera como proveedor tecnológico verificado para soluciones sobre WhatsApp Business, facilitando conexión, operación y automatización desde la plataforma."

Ajustar la de "tiempo activo" (self-serve = minutos / gestionado = 5–15 días). Conservar la de
"pruébalo ahora" (WhatsApp). Acordeón estilo consola.

### 7.10 CTAFinal
Ya es showcase dark; recolorear a teal/violeta; CTA WhatsApp en `.btn-wa`; trust row suma badge
Meta Tech Provider.

### 7.11 Footer
Dark; tagline actualizado (plataforma + servicio); enlaces "Plataforma" y "Entrar"; badge **Meta
Tech Provider** + "Verificado por Meta"; **canales de contacto corregidos** (ver §9).

---

## 8. Insignia Meta Tech Provider

- Asset provisto por el dueño: `Tech Provider.png` (∞ azul + "Meta Tech Provider" texto oscuro sobre transparente). Nixumi **ya es** Tech Provider verificado.
- Texto oscuro → sobre fondo dark va dentro de **chip claro** (`rgba(255,255,255,0.92)`, radio `--radius`) para legibilidad. (Variante con texto blanco a futuro.)
- Ubicaciones: trust row del Hero, CTAFinal y Footer.

---

## 9. Canales de contacto (corrección importante)

| Canal | WhatsApp | Correo | Uso |
|---|---|---|---|
| **Ventas / atención** | **+52 238 123 8389** | **nixumi-soluciones@nixumi.lat** | CTAs comerciales del landing (Hero "Agendar diagnóstico", Dos formas Panel B, Pricing Eje 2, CTAFinal, Header) |
| **Soporte** | **+52 236 112 5488** | **soporte@nixumi.lat** | Referencias de soporte / post-venta (Footer soporte, FAQ de soporte) |

> ⚠️ **Discrepancia a confirmar:** hoy casi todos los `wa.me` del sitio apuntan a `522361125488`
> (= **soporte**). Para que los leads comerciales lleguen a **ventas**, los CTAs comerciales deben
> apuntar al número de **ventas (238 123 8389)**. El dueño dijo "Agendar diagnóstico → WhatsApp
> actual del sitio"; esto **contradice** el mapeo de canales. **Recomendación:** rutear CTAs
> comerciales a ventas y dejar soporte solo en su sección. **Pendiente de confirmación del dueño
> antes de Fase 3.** (Formatos `wa.me` exactos se verifican en Fase 0.)

---

## 10. Fuera de alcance (solo aviso)

- IDs reales de GTM/Pixel (`GTM-XXXXXXX`, `PIXEL_ID_AQUI`).
- Credenciales de Supabase hardcodeadas en el historial (tema de **seguridad**, separado).
- Reconciliar la inconsistencia interna de paletas de la plataforma.
- Contenido de páginas legales (`aviso-de-privacidad`, `terminos-y-condiciones`, `reserva-cita`): solo se ajustan tokens/estilos heredados, sin cambiar texto.
- No tocar credenciales, variables de entorno, GTM ni Pixel.

---

## 11. Riesgos / decisiones abiertas

- **Muchos componentes tocados** → ejecución por fases pequeñas con `pnpm build` tras cada una; sin rediseño masivo en un solo commit.
- **Ruteo de WhatsApp ventas vs soporte** (§9): pendiente de confirmación.
- **Badge Meta** sobre dark requiere chip claro (o variante blanca a futuro).
- **Aptos** no es fuente web → IBM Plex Sans como miembro web; diferencia menor de render entre SOs aceptada.
- **Tema dual** (`.dark` + `data-theme`): mantener ambos sincronizados.
- **Contraste:** validar AA del teal `#31e6a2` y de `--muted-foreground` sobre dark.

---

## 12. Validación

- `pnpm build` en `nixumi-web` sin errores (tras cada fase). Sin lint salvo que el proyecto lo tenga estable y sea necesario.
- Revisión visual en dev: **dark (default)** y **light**, desktop y móvil.
- Verificar enlaces absolutos a `https://app.nixumi.lat/register` y `/login`.
- Verificar `wa.me` de ventas vs soporte según §9.
- Chequeo de contraste (AA) en Hero, botones y badges.
- `prefers-reduced-motion`: sin animaciones del fondo.
- No romper responsive.
