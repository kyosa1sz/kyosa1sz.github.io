'use strict';

/* ===== FOTO PLACEHOLDER ===== */
const fotoEl = document.querySelector('.about-photo img');
if (fotoEl) {
  fotoEl.addEventListener('error', () => {
    fotoEl.style.display = 'none';
    const placeholder = fotoEl.nextElementSibling;
    if (placeholder) placeholder.style.display = 'flex';
  });
}

/* ===== NAV SCROLL STATE ===== */
const nav = document.getElementById('nav');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  backTop.classList.toggle('show', y > 500);
  highlightNav();
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== ACTIVE NAV HIGHLIGHT ===== */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const offset = 100;

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - offset) {
      current = s.id;
    }
  });

  links.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#f5f4f0' : '';
  });
}

/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});



/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    window.scrollTo({
      top: target.offsetTop - navH,
      behavior: 'smooth'
    });
  });
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) return;

  const subject = `Pesan dari ${name}`;
  const body    = `Nama: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:yaelahrid@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  toast('Membuka email client...');
  form.reset();
});

/* ===== TOAST ===== */
function toast(msg) {
  let el = document.querySelector('.toast');
  if (el) el.remove();

  el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);

  requestAnimationFrame(() => el.classList.add('show'));

  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

/* ===== SCREENSHOT LIGHTBOX ===== */
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
const lbImg = document.createElement('img');
lightbox.appendChild(lbImg);
document.body.appendChild(lightbox);

document.querySelectorAll('.project-screenshots img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  }
});

/* ===== SCROLL REVEAL (minimal) ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.skill-item, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  revealObserver.observe(el);
});
