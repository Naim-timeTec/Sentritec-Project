/* SentriTec — single source of truth for the site navigation.
   Edit the markup below once; every page that contains
   <div id="site-nav" data-root="..."></div> gets the same nav.
   data-root is the path back to the site root: "" for top-level
   pages (index.html), "../" for pages inside /product/, etc. */
(function () {
  "use strict";
  var mount = document.getElementById("site-nav");
  if (!mount) return;
  var root = mount.getAttribute("data-root") || "";
  var home = root || "./";

  mount.outerHTML = `
  <!-- ============== NAV ============== -->
  <header class="nav" id="nav">
    <div class="wrap">
      <a href="${home}" aria-label="SentriTec home">
        <img src="${root}assets/sentritec-logo-white.svg" alt="SentriTec" class="nav-logo white" />
        <img src="${root}assets/sentritec-logo.svg" alt="SentriTec" class="nav-logo dark" />
      </a>
      <nav class="nav-primary" aria-label="Primary">
        <ul class="nav-links">

          <!-- Products — nested: Products > Access Control > Door Access -->
          <li class="nav-item">
            <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">Products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="mega">
              <div class="wrap mega-inner mega-cat">
                <div class="mega-cats" role="tablist" aria-label="Product categories">
                  <button class="mega-cat-tab active" data-cat="platform" role="tab" aria-selected="true">Platform</button>
                  <button class="mega-cat-tab" data-cat="access" role="tab" aria-selected="false">Access Control</button>
                </div>
                <div class="mega-cat-body">
                  <div class="mega-cat-panel active" data-cat="platform">
                    <div class="mega-grid">
                      <a class="mega-card" href="${root}one"><b>Sentritec One</b></a>
                      <a class="mega-card" href="${root}pass"><b>Sentritec Pass</b></a>
                      <a class="mega-card" href="${root}integrations"><b>Integrations</b></a>
                    </div>
                  </div>
                  <div class="mega-cat-panel" data-cat="access">
                    <div class="mega-grid">
                      <a class="mega-card" href="${root}access-control/door-readers"><b>Door Readers</b></a>
                      <a class="mega-card" href="${root}access-control/facial-recognition"><b>Face Recognition</b></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- Industries — hidden for now; restore by uncommenting
          <li class="nav-item">
            <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">Industries
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="mega">
              <div class="wrap mega-inner mega-inner--simple">
                <span class="mega-aside">Industries</span>
                <div class="mega-content mega-cards mega-cards--fixed">
                  <a class="mega-card mega-card--ico" href="${root}industries/office">
                    <span class="mega-card-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg></span><b>Office</b>
                  </a>
                  <a class="mega-card mega-card--ico" href="${root}industries/factory">
                    <span class="mega-card-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M7 18h.01M12 18h.01M17 18h.01"/></svg></span><b>Factory</b>
                  </a>
                </div>
              </div>
            </div>
          </li>
          -->


          <!-- Resources -->
          <li class="nav-item">
            <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">Resources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="mega">
              <div class="wrap mega-inner mega-cat">
                <div class="mega-cats" role="tablist" aria-label="Resource categories">
                  <button class="mega-cat-tab active" data-cat="learn" role="tab" aria-selected="true">Learn</button>
                  <button class="mega-cat-tab" data-cat="support" role="tab" aria-selected="false">Support</button>
                </div>
                <div class="mega-cat-body">
                  <div class="mega-cat-panel active" data-cat="learn">
                    <div class="mega-grid">
                      <a class="mega-card" href="${root}news"><b>News</b></a>
                      <a class="mega-card" href="${root}blog"><b>Blog</b></a>
                      <a class="mega-card" href="${root}docs"><b>Datasheet</b></a>
                      <a class="mega-card" href="${root}api"><b>Sentritec API</b></a>
                    </div>
                  </div>
                  <div class="mega-cat-panel" data-cat="support">
                    <div class="mega-grid">
                      <a class="mega-card" href="${root}help"><b>Help Centre</b></a>
                      <a class="mega-card" href="${root}contact"><b>Contact</b></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- Partners -->
          <li class="nav-item">
            <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">Partners
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="mega">
              <div class="wrap mega-inner mega-inner--simple">
                <span class="mega-aside">Partners</span>
                <div class="mega-content mega-cards mega-cards--3">
                  <a class="mega-card" href="${root}partner"><b>Partner Program</b></a>
                  <a class="mega-card" href="${root}partner/apply"><b>Become a Partner</b></a>
                  <a class="mega-card" href="${root}partner/find-partner"><b>Find a Partner</b></a>
                </div>
              </div>
            </div>
          </li>

        </ul>
      </nav>
      <div class="nav-right">
        <a href="" class="btn btn-ghost nav-login">Login</a>
        <a href="${root}contact" class="btn btn-dark nav-cta">Get Started</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- mobile menu -->
  <div class="nav-mobile" id="navMobile">
    <!-- Products — nested: Products > Access Control > Door Access -->
    <details class="m-group">
      <summary>Products<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
      <span class="m-sublabel">Platform</span>
      <a href="${root}one">Sentritec One</a>
      <a href="${root}pass">Sentritec Pass</a>
      <a href="${root}integrations">Integrations</a>
      <span class="m-sublabel">Access Control</span>
      <a href="${root}access-control/door-readers">Door Readers</a>
      <a href="${root}access-control/facial-recognition">Face Recognition</a>
    </details>
    <!-- Industries — hidden for now; restore by uncommenting
    <details class="m-group">
      <summary>Industries<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
      <a href="${root}industries/office">Office</a>
      <a href="${root}industries/factory">Factory</a>
    </details>
    -->

    <details class="m-group">
      <summary>Resources<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
      <span class="m-sublabel">Learn</span>
      <a href="${root}news">News</a>
      <a href="${root}blog">Blog</a>
      <a href="${root}docs">Datasheet</a>
      <a href="${root}api">Sentritec API</a>
      <span class="m-sublabel">Support</span>
      <a href="${root}help">Help Centre</a>
      <a href="${root}contact">Contact</a>
    </details>
    <details class="m-group">
      <summary>Partners<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
      <a href="${root}partner">Partner Program</a>
      <a href="${root}partner/apply">Become a Partner</a>
      <a href="${root}partner/find-partner">Find a Partner</a>
    </details>
    <a href="" class="btn btn-ghost">Login</a>
    <a href="${root}contact" class="btn btn-dark">Get Started</a>
  </div>`;

  /* Category-rail megas (Products, Resources) — each menu switches its own panels */
  Array.prototype.slice.call(document.querySelectorAll(".mega-cat")).forEach(function (menu) {
    var catTabs = Array.prototype.slice.call(menu.querySelectorAll(".mega-cat-tab"));
    var catPanels = Array.prototype.slice.call(menu.querySelectorAll(".mega-cat-panel"));
    function selectCat(cat) {
      catTabs.forEach(function (t) {
        var on = t.getAttribute("data-cat") === cat;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      catPanels.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-cat") === cat); });
    }
    catTabs.forEach(function (t) {
      var cat = t.getAttribute("data-cat");
      t.addEventListener("mouseenter", function () { selectCat(cat); });
      t.addEventListener("click", function (e) { e.preventDefault(); selectCat(cat); });
    });
  });
})();
