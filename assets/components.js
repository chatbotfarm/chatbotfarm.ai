/* ============================================================
   ChatbotFarm.ai — Component Loader
   Injects shared nav and footer into every page.
   ============================================================ */

(function () {

  /* ── NAV ── */
  const NAV = `
<nav class="nav" style="position:relative">
  <div class="nav-inner">

    <!-- LOGO -->
    <a href="/" style="display:flex;align-items:center;text-decoration:none;flex-shrink:0">
      <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/696baae65e05d44fc069c0d9.png"
        alt="ChatbotFarm.ai"
        class="nav-logo"
        onerror="this.remove()">
    </a>

    <!-- NAV LINKS (desktop) -->
    <div class="nav-links" id="cbf-nav-menu">
      <a href="/" style="color:var(--text);text-decoration:none;font-size:16px">Home</a>
      <a href="/contractors" style="color:var(--text);text-decoration:none;font-size:16px">Contractors</a>
      <a href="/medspas" style="color:var(--text);text-decoration:none;font-size:16px">Med Spas</a>
      <a href="/ghost-kitchens" style="color:var(--text);text-decoration:none;font-size:16px">Ghost Kitchens</a>
      <a href="/property-management" style="color:var(--text);text-decoration:none;font-size:16px">Property</a>
      <a href="/professional-services" style="color:var(--text);text-decoration:none;font-size:16px">Professional</a>
      <div class="nav-cta-wrap">
        <a href="#book" class="nav-cta">Plan Your System →</a>
      </div>
    </div>

    <!-- HAMBURGER (mobile) -->
    <button class="nav-hamburger" id="cbf-nav-toggle" aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
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
        <div style="font-family:'Bebas Neue',sans-serif;font-size:14px;color:var(--orange);letter-spacing:.14em;margin-bottom:10px">INDUSTRIES</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <a href="/contractors" style="font-size:15px;color:var(--muted);text-decoration:none">Contractors & Trades</a>
          <a href="/medspas" style="font-size:15px;color:var(--muted);text-decoration:none">Med Spas & Wellness</a>
          <a href="/ghost-kitchens" style="font-size:15px;color:var(--muted);text-decoration:none">Ghost Kitchens</a>
          <a href="/property-management" style="font-size:15px;color:var(--muted);text-decoration:none">Property Management</a>
          <a href="/professional-services" style="font-size:15px;color:var(--muted);text-decoration:none">Professional Services</a>
        </div>
      </div>
      <div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:14px;color:var(--orange);letter-spacing:.14em;margin-bottom:10px">COMPANY</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <a href="/" style="font-size:15px;color:var(--muted);text-decoration:none">Home</a>
          <a href="/#book" style="font-size:15px;color:var(--muted);text-decoration:none">Plan Your System</a>
          <a href="tel:+12542683276" style="font-size:15px;color:var(--muted);text-decoration:none">📞 (254) BOT-FARM</a>
        </div>
      </div>
    </div>
    <div class="fr">
      <div>© <span class="cbf-year"></span> chatbotfarm.ai</div>
      <div style="margin-top:4px;font-style:italic">You close jobs. We run the office.</div>
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
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  /* ── INIT ── */
  function init() {
    inject('nav-placeholder', NAV);
    inject('footer-placeholder', FOOTER);

    /* set current year */
    document.querySelectorAll('.cbf-year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* hamburger toggle */
    var toggle = document.getElementById('cbf-nav-toggle');
    var menu   = document.getElementById('cbf-nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
      });
      /* close menu on link click */
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', false);
        });
      });
      /* close on outside click */
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
