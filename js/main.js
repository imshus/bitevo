// Sticky nav shadow
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const closeMenu = () => {
  links.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
};
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Hero plate: swap dishes every few seconds
const plate = document.getElementById('plate');
if (plate) {
  const dishes = [...plate.querySelectorAll('.plate__img')];
  const label = document.getElementById('dishName');
  let current = 0;
  setInterval(() => {
    const prev = dishes[current];
    current = (current + 1) % dishes.length;
    const next = dishes[current];
    prev.classList.remove('is-active');
    prev.classList.add('is-leaving');
    next.classList.add('is-active');
    setTimeout(() => prev.classList.remove('is-leaving'), 1300);
    label.textContent = next.dataset.name;
    label.classList.remove('swap');
    void label.offsetWidth; // restart the fade-in
    label.classList.add('swap');
  }, 3200);
}

// Photo strip: duplicate the images so the loop is seamless
const track = document.querySelector('.gallery__track');
if (track) {
  [...track.children].forEach(img => {
    const copy = img.cloneNode(true);
    copy.alt = '';
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  });
}

// Menu page: filter dishes by category (also opens menu.html#snacks etc.)
const tabs = document.querySelectorAll('.tab[data-filter]');
if (tabs.length) {
  const dishes = document.querySelectorAll('#menuGrid .dish');
  const applyFilter = filter => {
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.filter === filter));
    dishes.forEach(d => {
      const show = filter === 'all' || d.dataset.cat === filter;
      d.classList.toggle('is-hidden', !show);
      d.classList.remove('is-shown');
      if (show) { void d.offsetWidth; d.classList.add('is-shown'); }
    });
  };
  tabs.forEach(t => t.addEventListener('click', () => {
    applyFilter(t.dataset.filter);
    history.replaceState(null, '', t.dataset.filter === 'all' ? location.pathname : `#${t.dataset.filter}`);
  }));
  const fromHash = location.hash.slice(1);
  if ([...tabs].some(t => t.dataset.filter === fromHash)) applyFilter(fromHash);
}

// Fade-in on scroll
const targets = document.querySelectorAll('.section__head, .dish, .why__text, .feature, .step, .cta__card, .contact-card, .faq details, .form, .story__collage, .story__text, .mv__card, .mosaic__item');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    io.observe(el);
  });
}

// Support form: opens the visitor's email app with the message filled in
const form = document.getElementById('supportForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = `${d.get('topic')}${d.get('order') ? ` — Order ${d.get('order')}` : ''}`;
    const body = [
      `Name: ${d.get('name')}`,
      `Phone: ${d.get('phone')}`,
      d.get('order') ? `Order ID: ${d.get('order')}` : '',
      '',
      d.get('message'),
    ].filter((line, i) => line !== '' || i === 3).join('\n');
    window.location.href = `mailto:info@bitevo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
