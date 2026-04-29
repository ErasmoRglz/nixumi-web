// ── Header interactions: sticky scroll, hamburger menu, Escape key ──

const header = document.getElementById('site-header')!;
const btn = document.getElementById('menu-btn')!;
const mMenu = document.getElementById('mobile-menu')!;
const bar1 = document.getElementById('bar1')!;
const bar2 = document.getElementById('bar2')!;
const bar3 = document.getElementById('bar3')!;
let menuOpen = false;

// Sticky blur on scroll
function onScroll() {
  if (window.scrollY > 12) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hamburger toggle
function closeMenu() {
  menuOpen = false;
  mMenu.classList.add('hidden');
  btn.setAttribute('aria-expanded', 'false');
  bar1.style.transform = '';
  bar2.style.opacity = '';
  bar3.style.transform = '';
}

btn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mMenu.classList.toggle('hidden', !menuOpen);
  btn.setAttribute('aria-expanded', String(menuOpen));
  if (menuOpen) {
    bar1.style.transform = 'translateY(6px) rotate(45deg)';
    bar2.style.opacity = '0';
    bar3.style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    closeMenu();
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) {
    closeMenu();
    btn.focus();
  }
});

// Close menu on mobile link click
document.querySelectorAll('.mobile-link').forEach((a) =>
  a.addEventListener('click', closeMenu),
);