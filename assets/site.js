const includePartials = async () => {
  const includeElements = document.querySelectorAll('[data-include]');
  const requests = Array.from(includeElements).map(async (el) => {
    const url = el.getAttribute('data-include');
    if (!url) return;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    const html = await response.text();
    el.innerHTML = html;
  });

  await Promise.all(requests);

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  includePartials().catch((error) => {
    console.error(error);
  });
});

window.toggleMenu = (id) => {
  const menu = document.getElementById(id);
  if (menu) {
    menu.classList.toggle('is-open');
  }
};
