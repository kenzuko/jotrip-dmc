const page = document.body.dataset.page || 'home';
const headerMount = document.querySelector('[data-site-header]');
const footerMount = document.querySelector('[data-site-footer]');
const drawerMount = document.querySelector('[data-journey-drawer]');

const navItems = [
  ['experiences','/experiences/','Experiences'],
  ['phu-quoc','/phu-quoc/','Phu Quoc'],
  ['journal','/journal/','Field notes'],
  ['partners','/partners/','Travel partners'],
  ['about','/about/','About']
];

if (headerMount) {
  headerMount.innerHTML = `
    <header class="site-header" id="siteHeader">
      <a class="brand" href="/" aria-label="JoTrip DMC home">
        <img src="/assets/jotrip-wordmark.png" alt="JoTrip">
        <span class="brand-dmc">DMC</span>
        <small>PHU QUOC · VIETNAM</small>
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        ${navItems.map(([key,href,label])=>`<a class="${page===key?'is-active':''}" href="${href}">${label}</a>`).join('')}
      </nav>
      <div class="header-end">
        <a class="island-link" href="https://openphuquoc.com/" target="_blank" rel="noopener">Open PQ ↗</a>
        <button class="journey-head" type="button" data-journey-open>Start a journey</button>
        <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Open navigation"><span></span><span></span></button>
      </div>
    </header>
    <nav class="mobile-nav" id="mobileNav" hidden aria-label="Mobile navigation">
      <a class="mobile-home" href="/">Home</a>
      ${navItems.map(([key,href,label])=>`<a class="${page===key?'is-active':''}" href="${href}">${label}</a>`).join('')}
      <button type="button" data-journey-open>Start a journey <span>→</span></button>
      <a class="mobile-openpq" href="https://openphuquoc.com/" target="_blank" rel="noopener">Open Phu Quoc ↗</a>
    </nav>`;
}

if (footerMount) {
  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="footer-brand">
        <a href="/" class="footer-mark"><img src="/assets/jotrip-wordmark.png" alt="JoTrip"><span>DMC</span></a>
        <p>Phu Quoc, from the inside.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer navigation">
        ${navItems.map(([,href,label])=>`<a href="${href}">${label}</a>`).join('')}
        <button type="button" data-journey-open>Journey paper</button>
      </nav>
      <div class="footer-meta">
        <a href="https://openphuquoc.com/" target="_blank" rel="noopener">Open Phu Quoc ↗</a>
        <span>TRAVEL, MADE PERSONAL.</span>
        <small>© <span data-year></span> JoTrip DMC · Phu Quoc, Vietnam</small>
        <small class="photo-credit">Additional documentary photography: Unsplash.</small>
      </div>
    </footer>`;
}

if (drawerMount) {
  drawerMount.innerHTML = `
    <section class="journey-drawer" id="journeyDrawer" hidden aria-label="Journey paper">
      <button class="drawer-shade" type="button" data-journey-close aria-label="Close journey paper"></button>
      <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="journeyTitle">
        <header class="drawer-head"><div><span>JOTRIP DMC</span><small>JOURNEY PAPER · PHU QUOC</small></div><button type="button" data-journey-close aria-label="Close">×</button></header>
        <div class="drawer-intro"><p class="micro ink">BEGIN WITH THE PEOPLE, NOT THE PROGRAM</p><h2 id="journeyTitle">Tell us what kind of trip you have in mind.</h2><p>You do not need an itinerary. Dates, who is travelling, what matters and what you want less of are enough to begin.</p></div>
        <form class="drawer-form" id="journeyForm">
          <div class="field-pair"><label>When are you travelling?<input name="when" autocomplete="off" placeholder="Dates or time of year"></label><label>Who is travelling?<input name="with" autocomplete="off" placeholder="Couple, family, friends, group..."></label></div>
          <label>Where are you staying, or what kind of stay do you imagine?<input name="stay" autocomplete="off" placeholder="Resort, villa, still deciding..."></label>
          <label>What do you want more of?<input name="experience" autocomplete="off" placeholder="Sea, food, quiet, nature, family time..."></label>
          <label>What would you rather avoid?<input name="avoid" autocomplete="off" placeholder="Crowds, long transfers, over-planning..."></label>
          <label>What would make this trip feel like yours?<textarea name="yours" rows="4" placeholder="Tell us the small things that matter..."></textarea></label>
          <button class="drawer-review-btn" type="submit">Review this journey paper <span>→</span></button>
          <p class="drawer-note">Preview mode: nothing is sent automatically yet.</p>
          <pre class="journey-review" id="journeyReview" hidden aria-live="polite"></pre>
        </form>
      </aside>
    </section>`;
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const drawer = document.getElementById('journeyDrawer');
const drawerPanel = drawer?.querySelector('.drawer-panel');

const setMenu = (open) => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
};
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

let drawerReturnFocus = null;
const setDrawer = (open, trigger = null) => {
  if (!drawer) return;
  if (open) {
    drawerReturnFocus = trigger || document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    document.body.classList.add('drawer-open');
    drawerPanel?.querySelector('input, textarea, button')?.focus();
  } else {
    drawer.classList.remove('is-open');
    document.body.classList.remove('drawer-open');
    window.setTimeout(() => { drawer.hidden = true; drawerReturnFocus?.focus?.(); }, 260);
  }
};
document.querySelectorAll('[data-journey-open]').forEach(button => button.addEventListener('click', () => { setMenu(false); setDrawer(true, button); }));
document.querySelectorAll('[data-journey-close]').forEach(button => button.addEventListener('click', () => setDrawer(false)));

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (drawer && !drawer.hidden) setDrawer(false); else setMenu(false);
});

const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -7% 0px', threshold: 0.07 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('is-visible'));

const film = document.querySelector('[data-hero-film]');
const filmFrames = film ? [...film.querySelectorAll('.film-frame')] : [];
const filmCaption = document.querySelector('[data-film-caption]');
const filmProgress = document.querySelector('[data-film-progress]');
const filmCaptions = ['OUT ON THE WATER','THE WORKING ISLAND','READING PHU QUOC'];
let filmIndex = 0;
if (filmFrames.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const nextFilm = () => {
    filmFrames[filmIndex].classList.remove('is-active');
    filmIndex = (filmIndex + 1) % filmFrames.length;
    filmFrames[filmIndex].classList.add('is-active');
    if (filmCaption) filmCaption.textContent = filmCaptions[filmIndex] || '';
    if (filmProgress) { filmProgress.classList.remove('restart'); void filmProgress.offsetWidth; filmProgress.classList.add('restart'); }
  };
  window.setInterval(nextFilm, 6500);
}

const fieldNotes = [
  'Some days are better when the itinerary has room to change.',
  'The right host can change how a place is understood.',
  'On an island, logistics and atmosphere are often the same conversation.',
  'A beautiful journey is often the result of details the guest never sees.'
];
const fieldNote = document.querySelector('[data-field-note] p');
let noteIndex = 0;
if (fieldNote && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    noteIndex = (noteIndex + 1) % fieldNotes.length;
    fieldNote.classList.add('is-changing');
    window.setTimeout(() => { fieldNote.textContent = fieldNotes[noteIndex]; fieldNote.classList.remove('is-changing'); }, 220);
  }, 5200);
}

const atlasData = {
  sea: { image:'/assets/boat-800.webp', alt:'A private sea journey in Phu Quoc', title:'Sea, without forcing the day.', body:'Boat, route and timing are shaped around the group and real conditions. The point is not to collect islands. It is to make the day feel right.', link:'/experiences/#sea', label:'Explore Sea' },
  roots: { image:'https://images.unsplash.com/photo-1746362722801-17bcc1f72fd9?auto=format&fit=crop&q=82&w=1800', alt:'Traditional fish sauce barrels in Phu Quoc', title:'Roots, with the story left intact.', body:'Fish sauce, local food and island craft become meaningful when somebody explains why they matter, instead of turning them into another stop on a route.', link:'/experiences/#roots', label:'Explore Roots' },
  wild: { image:'https://images.unsplash.com/photo-1634043270873-f2f830e5d4bf?auto=format&fit=crop&q=82&w=1800', alt:'Fishing boat on the sea in Phu Quoc', title:'Wild, with purpose and judgement.', body:'Fishing, diving and further-water days need more than a pretty plan. Conditions, equipment, crew and the guest all have to agree.', link:'/experiences/#wild', label:'Explore Wild' },
  moments: { image:'/assets/family-800.webp', alt:'Family travelling with JoTrip in Phu Quoc', title:'Moments, built around the people.', body:'A family day, a private meal or a celebration works when the pace fits the people in front of us, not an idea of what luxury should look like.', link:'/experiences/#moments', label:'Explore Moments' }
};
const atlasTabs = [...document.querySelectorAll('[data-atlas]')];
const atlasImage = document.querySelector('[data-atlas-image]');
const atlasTitle = document.querySelector('[data-atlas-title]');
const atlasBody = document.querySelector('[data-atlas-body]');
const atlasLink = document.querySelector('[data-atlas-link]');
const activateAtlas = key => {
  const item = atlasData[key];
  if (!item) return;
  atlasTabs.forEach(tab => { const active = tab.dataset.atlas === key; tab.classList.toggle('is-active', active); tab.setAttribute('aria-selected', String(active)); });
  const stage = document.querySelector('[data-atlas-stage]');
  stage?.classList.add('is-switching');
  window.setTimeout(() => {
    if (atlasImage) { atlasImage.src = item.image; atlasImage.alt = item.alt; }
    if (atlasTitle) atlasTitle.textContent = item.title;
    if (atlasBody) atlasBody.textContent = item.body;
    if (atlasLink) { atlasLink.href = item.link; atlasLink.innerHTML = `${item.label} <span>↗</span>`; }
    stage?.classList.remove('is-switching');
  }, 150);
};
atlasTabs.forEach(tab => {
  tab.addEventListener('click', () => activateAtlas(tab.dataset.atlas));
  tab.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) activateAtlas(tab.dataset.atlas); });
});

const rail = document.querySelector('[data-photo-rail]');
document.querySelector('[data-rail-prev]')?.addEventListener('click', () => rail?.scrollBy({ left: -Math.min(520, innerWidth*.72), behavior:'smooth' }));
document.querySelector('[data-rail-next]')?.addEventListener('click', () => rail?.scrollBy({ left: Math.min(520, innerWidth*.72), behavior:'smooth' }));

const journeyForm = document.getElementById('journeyForm');
const journeyReview = document.getElementById('journeyReview');
journeyForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(journeyForm);
  const rows = [
    ['When', data.get('when')],
    ['Travelling with', data.get('with')],
    ['Stay', data.get('stay')],
    ['More of', data.get('experience')],
    ['Prefer to avoid', data.get('avoid')],
    ['What makes it yours', data.get('yours')]
  ].filter(([, value]) => String(value || '').trim());
  if (!journeyReview) return;
  journeyReview.hidden = false;
  journeyReview.textContent = rows.length
    ? `YOUR JOURNEY PAPER\n\n${rows.map(([label,value]) => `${label}: ${String(value).trim()}`).join('\n')}\n\nPreview only. Nothing has been sent.`
    : 'Start with anything you already know. Even one detail is enough.';
  journeyReview.scrollIntoView({ behavior:'smooth', block:'nearest' });
});
