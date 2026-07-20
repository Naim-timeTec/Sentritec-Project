/* SentriTec — shared "Coming Soon" page body.
   For any page that doesn't exist yet, create <folder>/index.html with the
   usual nav + footer mounts and drop this in between:

     <div id="coming-soon" data-root="../"
          data-title="Legal"
          data-note="our legal documents and policies are being finalized and will be published here."></div>
     <script src="../assets/js/coming-soon.js"></script>

   data-title — the page name shown as the small label above the heading
   data-note  — one sentence completing "Stay tuned — ..." (lowercase start)
   When the real page is ready, just replace the file's content. */
(function () {
  "use strict";
  var mount = document.getElementById("coming-soon");
  if (!mount) return;
  var root = mount.getAttribute("data-root") || "";
  var home = root || "./";
  var title = mount.getAttribute("data-title") || "This page";
  var note = mount.getAttribute("data-note") || "this page is on its way and will be published here soon.";

  mount.outerHTML = `
  <section class="nf-sec" id="top" tabindex="-1">
    <div class="wrap">
      <div class="nf-inner">
        <span class="cs-eyebrow">${title}</span>
        <h1>Coming soon</h1>
        <p>Stay tuned &mdash; ${note}</p>
        <div class="nf-cta">
          <a href="${home}" class="btn btn-dark">Back to Home</a>
          <a href="${root}contact" class="link-arrow">Contact us <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        </div>
      </div>
    </div>
  </section>`;
})();
