/* Sentritec — single source of truth for the site footer.
   Edit the markup below once; every page that contains
   <div id="site-footer" data-root="..."></div> gets the same footer.
   data-root is the path back to the site root: "" for top-level
   pages (index.html), "../" for pages inside /partner/, etc. */
(function () {
  "use strict";
  var mount = document.getElementById("site-footer");
  if (!mount) return;
  var root = mount.getAttribute("data-root") || "";
  var home = root || "./";

  mount.outerHTML = `
  <!-- ============== FOOTER (single source: assets/js/footer.js) ============== -->
  <footer class="footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="${root}assets/sentritec-logo.svg" alt="Sentritec" />
          <p>One cloud platform for building access — manage doors, people and activity from a single dashboard, powered by Sentritec readers.</p>
        </div>
        <div>
          <h5>Platform</h5>
          <ul>
            <li><a href="${root}one">Sentritec One</a></li>
            <li><a href="${root}pass">Sentritec Pass</a></li>
            <li><a href="${root}integrations">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h5>Access Control</h5>
          <ul>
            <li><a href="${root}access-control/door-readers">Door Readers</a></li>
            <li><a href="${root}access-control/facial-recognition">Face Recognition</a></li>
            <li><a href="${home}#products">Hardware</a></li>
          </ul>
        </div>
        <div>
          <h5>Partners</h5>
          <ul>
            <li><a href="${root}partner">Partner Program</a></li>
            <li><a href="${root}partner/apply">Become a Partner</a></li>
            <li><a href="${root}partner/find-partner">Find a Partner</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="${root}about">About</a></li>
            <li><a href="${root}contact">Contact</a></li>
            <li><a href="${root}contact">Request a Demo</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Sentritec. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </div>
  </footer>`;
})();
