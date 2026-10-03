const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const year = document.getElementById('year');
const form = document.getElementById('journeyForm');
const review = document.getElementById('journeyReview');

if (year) year.textContent = new Date().getFullYear();

const setMenu = (open) => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
};

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const rows = [
    ['When', data.get('when')],
    ['Travelling with', data.get('with')],
    ['Stay', data.get('stay')],
    ['Would love', data.get('experience')],
    ['Prefer to avoid', data.get('avoid')],
    ['What would make it yours', data.get('yours')]
  ].filter(([, value]) => String(value || '').trim());

  if (!rows.length) {
    review.hidden = false;
    review.textContent = 'Start with anything you already know - even one small detail is enough.';
    form.querySelector('input, textarea')?.focus();
    return;
  }

  review.hidden = false;
  review.textContent = `Your journey paper\n\n${rows.map(([label, value]) => `${label}: ${String(value).trim()}`).join('\n')}\n\nThis is only a local preview. Nothing has been sent.`;
  review.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
