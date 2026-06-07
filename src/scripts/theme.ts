const THEME_KEY = 'nixumi-theme';

function getInitialTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  // Default dark; only switch to light when system explicitly prefers light
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function updateToggleIcon(theme: 'light' | 'dark') {
  const sun  = document.querySelector('[data-theme-icon="sun"]');
  const moon = document.querySelector('[data-theme-icon="moon"]');
  if (!sun || !moon) return;
  sun.classList.toggle('hidden',  theme === 'dark');
  moon.classList.toggle('hidden', theme === 'light');
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  updateToggleIcon(theme);
}

export function initTheme() {
  applyTheme(getInitialTheme());

  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-theme-toggle]');
    if (!btn) return;
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* Respeta cambios del sistema solo si el usuario no eligió manualmente */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}
