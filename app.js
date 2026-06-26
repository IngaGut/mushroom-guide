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

// Highlight the active nav link based on scroll position
const navLinks = document.querySelectorAll('nav a');

const sectionMap = Array.from(navLinks).map((link) => ({
  link,
  target: document.querySelector(link.getAttribute('href')),
})).filter((entry) => entry.target);

function updateActiveLink() {
  const scrollY = window.scrollY + 140;
  let current = sectionMap[0];

  for (const entry of sectionMap) {
    if (entry.target.offsetTop <= scrollY) {
      current = entry;
    }
  }

  navLinks.forEach((l) => l.removeAttribute('aria-current'));
  if (current) current.link.setAttribute('aria-current', 'page');
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
