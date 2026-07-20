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
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="${root}about">About</a></li>
            <li><a href="${root}contact">Contact</a></li>
            <li><a href="${root}legal">Legal</a></li>
            <li><a href="${root}trust">Trust</a></li>
          </ul>
        </div>
        <div>
          <h5>Products</h5>
          <ul>
            <li><a href="${root}one">Sentritec One</a></li>
            <li><a href="${root}pass">Sentritec Pass</a></li>
            <li><a href="${root}integrations">Integrations</a></li>
            <li><a href="${root}access-control/door-readers">Door Readers</a></li>
            <li><a href="${root}access-control/facial-recognition">Facial Recognition</a></li>
          </ul>
        </div>
        <div>
          <h5>Support</h5>
          <ul>
            <li><a href="${root}contact">Contact</a></li>
            <li><a href="${root}help">Help Centre</a></li>
            <li><a href="${root}partner/find-partner">Find an Installer</a></li>
          </ul>
        </div>
        <div>
          <h5>Media</h5>
          <ul>
            <li><a href="${root}news">News</a></li>
            <li><a href="${root}blog">Blogs</a></li>
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
