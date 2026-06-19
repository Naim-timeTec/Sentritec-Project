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

  mount.outerHTML = `
  <!-- ============== NAV ============== -->
  <header class="nav" id="nav">
    <div class="wrap">
      <a href="${root}index.html" aria-label="SentriTec home">
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
              <div class="wrap mega-inner">
                <span class="mega-feature mega-feature--static">
                  <span class="mega-feat-img"><span class="ph-mini">Image</span></span>
                </span>
                <div class="mega-content mega-tree">
                  <div class="mega-branch">
                    <span class="mega-branch-title">Access Control</span>
                    <ul class="mega-branch-links">
                      <li><a href="${root}product/door-access.html">Door Access</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- Industries -->
          <li class="nav-item">
            <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">Industries
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="mega">
              <div class="wrap mega-inner">
                <a class="mega-feature" href="${root}index.html#built-for">
                  <span class="mega-feat-img"><span class="ph-mini">Image</span></span>
                  <span class="mega-feat-text"><b>Industries</b><small>Tailored access and attendance for every kind of space.</small></span>
                </a>
                <ul class="mega-content mega-links">
                  <li><a href="${root}index.html#built-for">Office</a></li>
                  <li><a href="${root}index.html#built-for">Factory</a></li>
                  <li><a href="${root}index.html#built-for">Commercial Real Estate</a></li>
                  <li><a href="${root}index.html#built-for">Multi-family Residential</a></li>
                  <li><a href="${root}index.html#built-for">Education</a></li>
                  <li><a href="${root}index.html#built-for">Healthcare</a></li>
                  <li><a href="${root}index.html#built-for">Retail</a></li>
                  <li><a href="${root}index.html#built-for">Warehousing &amp; Logistics</a></li>
                </ul>
              </div>
            </div>
          </li>

          <!-- Resources -->
          <li class="nav-item">
            <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">Resources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="mega">
              <div class="wrap mega-inner">
                <a class="mega-feature" href="#">
                  <span class="mega-feat-img mega-feat-img--dark"><span class="ph-mini">Image</span></span>
                  <span class="mega-feat-text"><b>Knowledge Base</b><small>Guides and resources to deploy and support reliable systems.</small></span>
                </a>
                <div class="mega-content mega-cards">
                  <a class="mega-card" href="#"><b>Technical Support</b><small>Setup help, troubleshooting and tech support.</small></a>
                  <a class="mega-card" href="#"><b>Documentation</b><small>Manuals, datasheets and integration guides.</small></a>
                  <a class="mega-card" href="#"><b>Customer Service</b><small>Talk to our team about orders and accounts.</small></a>
                  <a class="mega-card" href="#"><b>Downloads</b><small>Apps, firmware and product resources.</small></a>
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
                <div class="mega-content mega-cards mega-cards--4">
                  <a class="mega-card" href="#"><b>Partner Program</b><small>Lorem ipsum dolor sit amet, consectetur.</small></a>
                  <a class="mega-card" href="#"><b>Partner Portal</b><small>Lorem ipsum dolor sit amet, consectetur.</small></a>
                  <a class="mega-card" href="#"><b>Partner Training</b><small>Lorem ipsum dolor sit amet, consectetur.</small></a>
                  <a class="mega-card" href="#"><b>Certification Lookup</b><small>Lorem ipsum dolor sit amet, consectetur.</small></a>
                  <a class="mega-card" href="#"><b>Become a Partner</b><small>Lorem ipsum dolor sit amet, consectetur.</small></a>
                  <a class="mega-card" href="#"><b>Find a Partner</b><small>Lorem ipsum dolor sit amet, consectetur.</small></a>
                </div>
              </div>
            </div>
          </li>

        </ul>
      </nav>
      <div class="nav-right">
        <a href="" class="btn btn-ghost nav-login">Login</a>
        <a href="#contact" class="btn btn-primary nav-cta">Get in Touch</a>
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
      <span class="m-sublabel">Access Control</span>
      <a href="${root}product/door-access.html">Door Access</a>
    </details>
    <details class="m-group">
      <summary>Industries<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
      <a href="${root}index.html#built-for">Office</a>
      <a href="${root}index.html#built-for">Factory</a>
      <a href="${root}index.html#built-for">Commercial Real Estate</a>
      <a href="${root}index.html#built-for">Multi-family Residential</a>
      <a href="${root}index.html#built-for">Education</a>
      <a href="${root}index.html#built-for">Healthcare</a>
    </details>
    <details class="m-group">
      <summary>Resources<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
      <a href="#">Technical Support</a>
      <a href="#">Documentation</a>
      <a href="#">Customer Service</a>
      <a href="#">Downloads</a>
    </details>
    <details class="m-group">
      <summary>Partners<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>
      <a href="#">Partner Program</a>
      <a href="#">Partner Portal</a>
      <a href="#">Partner Training</a>
      <a href="#">Become a Partner</a>
    </details>
    <a href="" class="btn btn-ghost">Login</a>
    <a href="#contact" class="btn btn-primary">Get in Touch</a>
  </div>`;
})();
