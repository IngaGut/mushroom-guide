// Apply saved theme before first paint (runs immediately on script load)
(function () {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// Fade-in sections as they scroll into view
const sections = document.querySelectorAll('main section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

sections.forEach((section) => observer.observe(section));

// Night-mode toggle
const toggle = document.getElementById('theme-toggle');

function revealSections(theme) {
  const ids = theme === 'dark'
    ? ['night', 'foxfire']
    : ['intro', 'seasonality', 'edible', 'poisonous'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('visible');
  });
}

// On initial load, immediately reveal whichever sections are now visible
revealSections(document.documentElement.getAttribute('data-theme') || 'light');

toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Ensure newly shown sections have their fade-in class
  revealSections(next);

  // Scroll to top — content changes completely on toggle
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Highlight the active nav link based on scroll position
// Only considers links that are currently visible (not display:none)
const navLinks = document.querySelectorAll('nav a');

const sectionMap = Array.from(navLinks).map((link) => ({
  link,
  target: document.querySelector(link.getAttribute('href')),
})).filter((entry) => entry.target);

function updateActiveLink() {
  const scrollY = window.scrollY + 140;
  let current = null;

  for (const { link, target } of sectionMap) {
    if (link.offsetParent === null) continue; // skip hidden nav links
    if (target.offsetTop <= scrollY) current = link;
  }

  navLinks.forEach((l) => l.removeAttribute('aria-current'));
  if (current) current.setAttribute('aria-current', 'page');
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
