// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===== Typing effect =====
const roles = [
  'AI / ML Engineer',
  'Python Developer',
  'AI Agent Builder',
  'Deep Learning Enthusiast',
];
const typedEl = document.getElementById('typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = roles[roleIdx];
  typedEl.textContent = word.slice(0, charIdx);
  if (!deleting && charIdx < word.length) {
    charIdx++;
    setTimeout(type, 70);
  } else if (deleting && charIdx > 0) {
    charIdx--;
    setTimeout(type, 40);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1600);
  } else {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(type, 400);
  }
}
type();

// ===== Counter animation for stats =====
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      cur = Math.min(cur + step, target);
      el.textContent = cur;
      if (cur < target) setTimeout(tick, 40);
    };
    tick();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statNums.forEach(el => counterObserver.observe(el));

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(
  '.section-title, .about-text, .about-card, .skill-category, .project-card, .timeline-item, .contact-card'
);
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));
