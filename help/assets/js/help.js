/* Sentritec Help Center — help.sentritec.io
   Self-contained. Generates a placeholder page for every sidebar topic,
   drives the page switcher, the "on this page" rail and the sidebar search.
   No dependency on the main site's assets. */
(function () {
  "use strict";
  var nav = document.getElementById("apidNav");
  var holder = document.getElementById("apidPages");
  if (!nav || !holder) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll(".apid-item"));

  /* build a placeholder page for every topic that doesn't have one yet */
  links.forEach(function (l) {
    var id = l.getAttribute("data-page");
    if (!id || document.getElementById("page-" + id)) return;
    var title = l.getAttribute("data-title") || l.textContent.trim();
    var sec = document.createElement("section");
    sec.className = "apid-page";
    sec.id = "page-" + id;
    sec.innerHTML =
      "<h1>" + title + "</h1>" +
      '<div class="apid-note">' +
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
      "<span>This article is being written and will be published here soon." +
      "</div>" +
      '<div class="apid-skel" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
      '<section class="apid-sec"><h3>Overview</h3>' +
      '<div class="apid-skel" aria-hidden="true"><span></span><span></span><span></span><span></span></div></section>' +
      '<section class="apid-sec"><h3>Step-by-step</h3>' +
      '<div class="apid-skel" aria-hidden="true"><span></span><span></span><span></span><span></span></div></section>';
    holder.appendChild(sec);
  });

  var pages = Array.prototype.slice.call(document.querySelectorAll(".apid-page"));

  /* "on this page" rail */
  var tocList = document.getElementById("apidTocList");
  var tocObs = null;
  function slug(s) { return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function renderToc(page) {
    if (!tocList || !page) return;
    if (tocObs) { tocObs.disconnect(); tocObs = null; }
    tocList.innerHTML = "";
    var heads = Array.prototype.slice.call(page.querySelectorAll("h2, h3"));
    heads.forEach(function (h, i) {
      if (!h.id) h.id = page.id + "-" + slug(h.textContent);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      if (i === 0) a.className = "active";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      li.appendChild(a);
      tocList.appendChild(li);
    });
    if ("IntersectionObserver" in window && heads.length) {
      tocObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Array.prototype.slice.call(tocList.querySelectorAll("a")).forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        });
      }, { rootMargin: "-15% 0px -75% 0px" });
      heads.forEach(function (h) { tocObs.observe(h); });
    }
  }

  function show(id, push) {
    var page = document.getElementById("page-" + id);
    if (!page) return;
    pages.forEach(function (p) { p.classList.toggle("active", p === page); });
    links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("data-page") === id); });
    if (push) history.replaceState(null, "", "#" + id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderToc(page);
  }
  links.forEach(function (l) {
    l.addEventListener("click", function (e) {
      e.preventDefault();
      show(l.getAttribute("data-page"), true);
    });
  });
  var initial = location.hash.slice(1);
  if (initial && document.getElementById("page-" + initial)) show(initial, false);
  window.addEventListener("hashchange", function () {
    var id = location.hash.slice(1);
    if (document.getElementById("page-" + id)) show(id, false);
  });
  renderToc(document.querySelector(".apid-page.active"));

  /* sidebar search — filters the topics as you type (CTRL-/ focuses it) */
  var input = document.getElementById("apidSearch");
  var labels = Array.prototype.slice.call(nav.querySelectorAll(".apid-label"));
  if (input) {
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      links.forEach(function (l) {
        l.style.display = l.textContent.toLowerCase().indexOf(q) !== -1 ? "" : "none";
      });
      labels.forEach(function (lb) { lb.style.display = q ? "none" : ""; });
    });
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.key === "/") { e.preventDefault(); input.focus(); }
    });
  }
})();
