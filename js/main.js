const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const briefForm = document.querySelector('[data-brief-form]');
const briefResult = document.querySelector('[data-brief-result]');
const briefOutput = document.querySelector('[data-brief-output]');
const briefStatus = document.querySelector('[data-brief-status]');
const copyButton = document.querySelector('[data-copy-brief]');
const copyStatus = document.querySelector('[data-copy-status]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
  menu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
}

menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 28);
}, { passive: true });

briefForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!briefForm.reportValidity()) return;

  const data = new FormData(briefForm);
  const lines = [
    'MAHABU MEDIA SERVICES — PROJECT BRIEF',
    '',
    `Name: ${data.get('name')}`,
    `Project type: ${data.get('type')}`,
    `Date / timeframe: ${data.get('timing') || 'To be confirmed'}`,
    `Location: ${data.get('location') || 'To be confirmed'}`,
    '',
    'Goal and deliverables:',
    data.get('goal'),
    '',
    'Note: This summary was prepared locally and has not been sent.'
  ];

  briefOutput.value = lines.join('\n');
  briefResult.hidden = false;
  briefStatus.textContent = 'Your brief is ready below. Nothing has been sent or stored.';
  briefResult.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(briefOutput.value);
    copyStatus.textContent = 'Brief copied to your clipboard.';
  } catch {
    briefOutput.focus();
    briefOutput.select();
    copyStatus.textContent = 'Select and copy the highlighted brief.';
  }
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('reveal-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('revealed'));
}
