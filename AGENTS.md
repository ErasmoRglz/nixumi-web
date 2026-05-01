# Nixumi Web Agent Guide

## Project overview
- Marketing website built with Astro.
- Main language is Spanish for public-facing content.
- Styling is handled with Tailwind CSS v4 and custom CSS files.

## Tech stack
- Astro `6.x`
- Tailwind CSS `4.x`
- TypeScript support via `tsconfig.json`

## Important directories
- `src/pages/`: route-level Astro pages.
- `src/components/`: reusable page sections and layout pieces.
- `src/styles/`: global and feature CSS.
- `src/scripts/`: browser-side TypeScript scripts.
- `public/`: static assets (logos, icons, images).

## Development commands
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build production output: `npm run build`
- Preview build: `npm run preview`

## Coding guidelines
- Prefer Astro components for page structure and reusable sections.
- Keep copy text in Spanish unless a task explicitly requests another language.
- Reuse existing patterns in `src/components/` before introducing new abstractions.
- Keep asset names descriptive and place new static files in `public/`.

## Validation checklist for changes
- Run `npm run build` for production validation.
- If scripts or types change, run `npm run astro -- check` when applicable.
- Verify page rendering and navigation in `npm run dev`.
