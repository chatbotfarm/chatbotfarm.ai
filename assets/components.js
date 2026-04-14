/* ============================================================
   ChatbotFarm.ai — Component Loader v2
   Theme toggle, full nav, site tree footer.
   ============================================================ */

(function () {

  /* ── NAV ── */
  const NAV = `
<nav class="nav" style="position:relative">
  <div class="nav-inner">
    <a href="/" style="display:flex;align-items:center;text-decoration:none;flex-shrink:0">
      <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/696baae65e05d44fc069c0d9.png"
        alt="ChatbotFarm.ai" class="nav-logo" onerror="this.remove()">
    </a>
    <div class="nav-links" id="cbf-nav-menu">
      <a href="/">Home</a>
      <a href="/contractors">Contractors</a>
      <a href="/medspas">Med Spas</a>
      <a href="/ghost-kitchens">Ghost Kitchens</a>
      <a href="/property-management">Property</a>
      <a href="/professional-services">Professional</a>
      <div class="nav-cta-wrap">
        <a href="#book" class="nav-cta">Map My Office →</a>
      </div>
    </div>
    <button class="theme-toggle" id="cbf-theme-toggle" aria-label="Toggle theme">🌙</button>
    <button class="nav-hamburger" id="cbf-nav-toggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

  /* ── FOOTER ── */
  const FOOTER = `
<footer class="pcb">
  <div class="foot-inner">
    <div class="fb">
      <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/696baae65e05d44fc069c0d9.png"
        alt="ChatbotFarm.ai"
        style="height:120px;width:auto;display:block;object-fit:contain;margin-bottom:8px"
        onerror="this.remove()">
      <p>Connecting Business To The Grid ®</p>
    </div>
    <div style="display:flex;gap:32px;flex-wrap:wrap">
      <div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--blue);letter-spacing:.14em;margin-bottom:10px">INDUSTRIES</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <a href="/contractors" style="font-size:16px;color:var(--muted);text-decoration:none">Contractors & Trades</a>
          <a href="/medspas" style="font-size:16px;color:var(--muted);text-decoration:none">Med Spas & Wellness</a>
          <a href="/ghost-kitchens" style="font-size:16px;color:var(--muted);text-decoration:none">Ghost Kitchens</a>
          <a href="/property-management" style="font-size:16px;color:var(--muted);text-decoration:none">Property Management</a>
          <a href="/professional-services" style="font-size:16px;color:var(--muted);text-decoration:none">Professional Services</a>
        </div>
      </div>
      <div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--blue);letter-spacing:.14em;margin-bottom:10px">COMPANY</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <a href="/" style="font-size:16px;color:var(--muted);text-decoration:none">Home</a>
          <a href="/#book" style="font-size:16px;color:var(--muted);text-decoration:none">Map My Office</a>
          <a href="tel:+12542683276" style="font-size:16px;color:var(--muted);text-decoration:none">📞 (254) BOT-FARM</a>
        </div>
      </div>
    </div>
    <div class="fr">
      <div>© <span class="cbf-year"></span> chatbotfarm.ai</div>
      <div style="margin-top:4px">You close jobs. We run the office.</div>
    </div>
  </div>
  <div class="foot-badge">
    <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/69c14c9d3b3a58b998fe8a18.png"
      alt="Connecting Business To The Grid ®"
      onerror="this.style.display='none'">
  </div>
</footer>`;

  /* ── INJECT ── */
  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  /* ── THEME ── */
  function getTheme() {
    var saved = localStorage.getItem('cbf-theme');
    if (saved) return saved;
    return 'light';
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('cbf-theme', t);
    var btn = document.getElementById('cbf-theme-toggle');
    if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
  }

  /* ── INIT ── */
  function init() {
    inject('nav-placeholder', NAV);
    inject('footer-placeholder', FOOTER);

    /* theme */
    setTheme(getTheme());
    var themeBtn = document.getElementById('cbf-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    /* year */
    document.querySelectorAll('.cbf-year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* hamburger */
    var toggle = document.getElementById('cbf-nav-toggle');
    var menu   = document.getElementById('cbf-nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', false);
        });
      });
      document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', false);
        }
      });
    }

    /* scroll reveal */
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('vis');
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      obs.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
