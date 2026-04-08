/* ============================================================
   ChatbotFarm.ai — Component Loader
   Injects shared nav and footer into every page.
   ============================================================ */

(function () {

  /* ── NAV ── */
  const NAV = `
<nav class="nav">
  <div class="nav-inner">

    <!-- LOGO -->
    <a href="/" style="display:flex;align-items:center;text-decoration:none;flex-shrink:0">
      <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/696baae65e05d44fc069c0d9.png"
        alt="ChatbotFarm.ai"
        class="nav-logo"
        onerror="this.remove()">
    </a>

    <!-- NAV LINKS -->
    <div style="display:flex;align-items:center;gap:24px;margin-left:auto;margin-right:20px;flex-wrap:wrap">

      <a href="/" style="color:var(--text);text-decoration:none;font-size:16px">
        Home
      </a>

      <a href="/contractors" style="color:var(--text);text-decoration:none;font-size:16px">
        Contractors
      </a>

      <a href="/medspas" style="color:var(--text);text-decoration:none;font-size:16px">
        Med Spas
      </a>

      <a href="/ghost-kitchens" style="color:var(--text);text-decoration:none;font-size:16px">
        Ghost Kitchens
      </a>

    </div>

    <!-- CTA -->
    <a href="#book" class="nav-cta">
      Plan Your System →
    </a>

  </div>
</nav>`;

  /* ── FOOTER ── */
  const FOOTER = `
<footer class="pcb">
  <div class="foot-inner">
    <div class="fb">
      <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/696baae65e05d44fc069c0d9.png"
        alt="ChatbotFarm.ai"
        style="height:120px;width:auto;display:block;object-fit:contain;mix-blend-mode:screen;margin-bottom:8px"
        onerror="this.remove()">
      <p>Connecting Business To The Grid ®</p>
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

    /* scroll reveal */
    const obs = new IntersectionObserver(function (entries) {
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