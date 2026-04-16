/* ============================================================
   ChatbotFarm.ai — Component Loader v2
   Theme toggle, full nav, site tree footer.
   ============================================================ */

(function () {

  /* ── NAV ── */
  const NAV = `
<nav class="nav">
  <div class="nav-inner">
    <a href="/" style="display:flex;align-items:center;text-decoration:none;flex-shrink:0">
      <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/696bbc2b5e05d40cac72f4e7.png"
        alt="ChatbotFarm.ai" class="nav-logo">
    </a>
    <div class="nav-links" id="cbf-nav-menu">
      <button class="nav-close" id="cbf-nav-close" aria-label="Close menu">✕</button>
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
    <div class="nav-controls">
      <div class="theme-toggle" id="cbf-theme-toggle" role="radiogroup" aria-label="Toggle theme">
        <button class="theme-opt" data-theme="light" aria-label="Day mode">☀ Day</button>
        <button class="theme-opt" data-theme="dark" aria-label="Night mode">🌙 Night</button>
      </div>
      <button class="nav-hamburger" id="cbf-nav-toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<button class="scroll-top" id="cbf-scroll-top" aria-label="Scroll to top">↑</button>`;

  /* ── FOOTER ── */
  const FOOTER = `
<footer class="pcb">
  <div class="foot-inner">
    <div class="fb">
      <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/696baae65e05d44fc069c0d9.png"
        alt="ChatbotFarm.ai"
        style="height:120px;width:auto;display:block;object-fit:contain;margin-bottom:8px"
>
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
          <a href="https://www.youtube.com/@chatbotfarm" target="_blank" rel="noopener" style="font-size:16px;color:var(--muted);text-decoration:none">▶ YouTube</a>
          <a href="tel:+12542683276" style="font-size:16px;color:var(--muted);text-decoration:none">📞 (254) BOT-FARM</a>
          <a href="/privacy-policy" style="font-size:16px;color:var(--muted);text-decoration:none">Privacy Policy</a>
          <a href="/terms-of-use" style="font-size:16px;color:var(--muted);text-decoration:none">Terms of Use</a>
        </div>
      </div>
    </div>
    <div class="fr">
      <div>© <span class="cbf-year"></span> chatbotfarm.ai</div>
    </div>
  </div>
  <div class="foot-badge">
    <img src="https://assets.cdn.filesafe.space/jD3rvaWtP7z9FUt4o7dZ/media/69c14c9d3b3a58b998fe8a18.png"
      alt="Connecting Business To The Grid ®"
>
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
    var btns = document.querySelectorAll('.theme-opt');
    btns.forEach(function(b) {
      b.classList.toggle('active', b.getAttribute('data-theme') === t);
    });
  }

  /* ── INIT ── */
  function init() {
    inject('nav-placeholder', NAV);
    inject('footer-placeholder', FOOTER);

    /* graceful fallback for broken images */
    document.querySelectorAll('.nav-logo').forEach(function (img) {
      img.addEventListener('error', function () { img.remove(); });
    });
    document.querySelectorAll('.fb img, .foot-badge img').forEach(function (img) {
      img.addEventListener('error', function () { img.style.display = 'none'; });
    });

    /* theme */
    setTheme(getTheme());
    var toggleWrap = document.getElementById('cbf-theme-toggle');
    if (toggleWrap) {
      toggleWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.theme-opt');
        if (btn) setTheme(btn.getAttribute('data-theme'));
      });
    }

    /* year */
    document.querySelectorAll('.cbf-year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* hamburger — with body scroll lock */
    var toggle = document.getElementById('cbf-nav-toggle');
    var menu   = document.getElementById('cbf-nav-menu');
    var closeBtn = document.getElementById('cbf-nav-close');
    function closeMenu() {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
    function openMenu() {
      menu.classList.add('open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', true);
      document.body.style.overflow = 'hidden';
    }
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        if (menu.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          closeMenu();
        });
      }
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          closeMenu();
        });
      });
      document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
          closeMenu();
        }
      });
    }

    /* scroll-to-top button */
    var scrollBtn = document.getElementById('cbf-scroll-top');
    if (scrollBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 600) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      });
      scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    /* smooth-scroll buttons via data-scroll-to attribute */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-scroll-to]');
      if (btn) {
        var target = document.getElementById(btn.dataset.scrollTo);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    /* pageshow — reload calendar if restored from bfcache */
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        var calSection2 = document.getElementById('book-cal');
        if (calSection2) {
          var frame2 = calSection2.querySelector('iframe');
          if (frame2) {
            var url = frame2.dataset.src || frame2.src;
            if (url) frame2.src = url;
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
