/* SentriTec — interactions */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var mobile = document.getElementById("navMobile");

  /* Sticky nav: switch to solid/light once scrolled past the hero top band */
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu toggle */
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobile.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Scroll-pinned hero — crossfade scenes + dots */
  (function () {
    var sec = document.getElementById("top");
    if (!sec || !sec.classList.contains("hero-scroll")) return;
    var slides = Array.prototype.slice.call(sec.querySelectorAll(".hs-slide"));
    var dots = Array.prototype.slice.call(sec.querySelectorAll(".hs-dot"));
    var hint = sec.querySelector(".scroll-hint");
    var n = slides.length;
    if (!n) return;
    var current = -1;

    function setActive(i) {
      if (i === current) return;
      current = i;
      slides.forEach(function (s, idx) { s.classList.toggle("active", idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
      if (hint) hint.style.opacity = i === n - 1 ? "0" : "";
    }

    function onScroll() {
      var top = sec.offsetTop;
      var scrollable = sec.offsetHeight - window.innerHeight; // (n-1)*vh region
      var p = scrollable > 0 ? (window.scrollY - top) / scrollable : 0;
      p = Math.min(Math.max(p, 0), 1);
      var i = Math.min(n - 1, Math.floor(p * n));   // equal bands per scene
      setActive(i);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    dots.forEach(function (d, idx) {
      d.addEventListener("click", function () {
        var scrollable = sec.offsetHeight - window.innerHeight;
        // aim at the centre of each scene's band so it settles on that slide
        var target = sec.offsetTop + ((idx + 0.5) / n) * scrollable;
        window.scrollTo({ top: target, behavior: "smooth" });
      });
    });
  })();

  /* Focus carousel — active card big, the rest small (transform-driven, no scroll snap) */
  (function () {
    var track = document.getElementById("carTrack");
    if (!track) return;
    var slides = Array.prototype.slice.call(track.querySelectorAll(".slide"));
    var prev = document.getElementById("carPrev");
    var next = document.getElementById("carNext");
    if (!slides.length) return;
    var idx = 0;
    var info = document.querySelector(".mf-info");
    var mfLabel = document.getElementById("mfLabel");
    var mfTitle = document.getElementById("mfTitle");
    var mfDesc = document.getElementById("mfDesc");
    var mfFill = document.getElementById("mfFill");
    var mfCur = document.getElementById("mfCur");
    var pad2 = function (n) { return ("0" + n).slice(-2); };

    function step() {
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slides[0].offsetWidth + gap; // layout width
    }
    function update(animate) {
      idx = Math.max(0, Math.min(slides.length - 1, idx));
      track.style.transform = "translateX(" + (-idx * step()) + "px)";
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      var s = slides[idx];
      if (mfLabel) mfLabel.textContent = s.getAttribute("data-label") || "";
      if (mfTitle) mfTitle.textContent = s.getAttribute("data-title") || "";
      if (mfDesc) mfDesc.textContent = s.getAttribute("data-desc") || "";
      if (info && animate) { info.classList.remove("mf-anim"); void info.offsetWidth; info.classList.add("mf-anim"); }
      if (mfFill) mfFill.style.width = ((idx + 1) / slides.length * 100) + "%";
      if (mfCur) mfCur.textContent = pad2(idx + 1);
      if (prev) prev.disabled = idx === 0;
      if (next) next.disabled = idx === slides.length - 1;
    }
    function go(d) { idx += d; update(true); }

    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    // mobile only: tapping a dimmed card brings it into focus.
    // on desktop the slide changes via the arrow buttons only.
    slides.forEach(function (s, i) {
      s.addEventListener("click", function () {
        if (!window.matchMedia("(max-width: 920px)").matches) return;
        if (i !== idx) { idx = i; update(true); }
      });
    });
    // basic swipe
    var x0 = null;
    track.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    }, { passive: true });
    window.addEventListener("resize", function () { update(false); });
    update(false);
  })();

  /* Interactive Access Ecosystem scene */
  (function () {
    var scene = document.getElementById("scene");
    var dataEl = document.getElementById("sceneData");
    if (!scene || !dataEl) return;

    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }

    var hotspots = Array.prototype.slice.call(scene.querySelectorAll(".hotspot"));
    var popup = document.getElementById("scenePopup");
    var caret = document.getElementById("popupCaret");
    var hint = document.getElementById("sceneHint");
    var closeBtn = document.getElementById("popupClose");
    var kickerEl = document.getElementById("popupKicker");
    var titleEl = document.getElementById("popupTitle");
    var descEl = document.getElementById("popupDesc");
    var activeBtn = null;

    function position(btn) {
      // mobile: let CSS handle the bottom sheet
      if (window.innerWidth <= 920) {
        popup.style.left = popup.style.top = "";
        popup.classList.remove("popup--above");
        return;
      }
      var sw = scene.clientWidth, sh = scene.clientHeight;
      var cx = btn.offsetLeft, cy = btn.offsetTop;       // product centre (translate -50%)
      var halfH = btn.offsetHeight / 2;
      var pw = popup.offsetWidth, ph = popup.offsetHeight;
      var gap = 14, pad = 14;

      var left = Math.max(pad, Math.min(cx - pw / 2, sw - pw - pad));
      var below = cy + halfH + gap;
      var above = cy - halfH - gap - ph;
      var top, isAbove = false;
      if (below + ph <= sh - pad || above < pad) {
        top = Math.min(below, sh - ph - pad);
      } else {
        top = above; isAbove = true;
      }
      popup.style.left = left + "px";
      popup.style.top = top + "px";
      popup.classList.toggle("popup--above", isAbove);
      // align caret to the product's centre
      if (caret) caret.style.left = Math.max(12, Math.min(cx - left - 7, pw - 26)) + "px";
    }

    function open(key, btn) {
      var d = data[key];
      if (!d) return;
      kickerEl.textContent = d.kicker || "";
      titleEl.textContent = d.title || "";
      descEl.textContent = d.desc || "";
      hotspots.forEach(function (h) { h.classList.toggle("active", h === btn); });
      activeBtn = btn;
      position(btn);            // place before showing so size is known
      popup.classList.add("show");
      if (hint) hint.classList.add("hidden");
    }

    function close() {
      popup.classList.remove("show");
      hotspots.forEach(function (h) { h.classList.remove("active"); });
      if (hint) hint.classList.remove("hidden");
      activeBtn = null;
    }

    hotspots.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (btn.classList.contains("active")) { close(); return; }
        open(btn.getAttribute("data-product"), btn);
      });
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (activeBtn) position(activeBtn); });
  })();

  /* Built For — hover a list item to drive the preview; click navigates to its page */
  (function () {
    var items = Array.prototype.slice.call(document.querySelectorAll(".bf-item"));
    var panes = Array.prototype.slice.call(document.querySelectorAll(".bf-pane"));
    var tag = document.getElementById("bfTag");
    if (!items.length) return;

    function activate(ind, label) {
      items.forEach(function (it) { it.classList.toggle("active", it.getAttribute("data-ind") === ind); });
      panes.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-ind") === ind); });
      if (tag && label) tag.textContent = label;
    }
    items.forEach(function (it) {
      var ind = it.getAttribute("data-ind");
      var label = it.querySelector("h3") ? it.querySelector("h3").textContent : "";
      // hovering (or keyboard focus) swaps the preview; clicking follows the link to the page
      it.addEventListener("mouseenter", function () { activate(ind, label); });
      it.addEventListener("focus", function () { activate(ind, label); });
    });
  })();

  /* Software — Admin/User toggle swaps the screen and the copy */
  (function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".sw2-tab"));
    var panes = Array.prototype.slice.call(document.querySelectorAll(".sw2-pane"));
    var texts = Array.prototype.slice.call(document.querySelectorAll(".sw2-text"));
    if (!tabs.length) return;
    function show(i) {
      tabs.forEach(function (t, idx) {
        var on = idx === i;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panes.forEach(function (p, idx) { p.classList.toggle("active", idx === i); });
      texts.forEach(function (t, idx) { t.classList.toggle("active", idx === i); });
    }
    tabs.forEach(function (t, idx) { t.addEventListener("click", function () { show(idx); }); });
  })();

  /* Integration — click a feature to swap the visual on the left (no auto-rotate) */
  (function () {
    var items = Array.prototype.slice.call(document.querySelectorAll(".intg2-item"));
    var panes = Array.prototype.slice.call(document.querySelectorAll(".intg2-pane"));
    if (!items.length) return;
    function show(i) {
      items.forEach(function (t, idx) { t.classList.toggle("active", idx === i); });
      panes.forEach(function (p, idx) { p.classList.toggle("active", idx === i); });
    }
    items.forEach(function (t, idx) {
      t.addEventListener("click", function () { show(idx); });
    });
  })();

  /* Sentritec One — Control & Secure: icon tabs swap the image + bottom-right card */
  (function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".oc-tab"));
    var panes = Array.prototype.slice.call(document.querySelectorAll(".oc-pane"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".oc-card"));
    if (!tabs.length) return;
    function show(i) {
      tabs.forEach(function (t, idx) {
        var on = idx === i;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panes.forEach(function (p, idx) { p.classList.toggle("active", idx === i); });
      cards.forEach(function (c, idx) { c.classList.toggle("active", idx === i); });
    }
    tabs.forEach(function (t, idx) { t.addEventListener("click", function () { show(idx); }); });
  })();

  /* Sentritec Pass — Modern Unlocking carousel arrows */
  (function () {
    var track = document.getElementById("unlockTrack");
    if (!track) return;
    var arrows = Array.prototype.slice.call(document.querySelectorAll(".unlock-arrow"));
    function step() {
      var c = track.querySelector(".uc");
      return c ? c.getBoundingClientRect().width + 24 : Math.round(track.clientWidth * 0.7);
    }
    function sync() {
      var prev = arrows.filter(function (a) { return a.getAttribute("data-dir") === "-1"; })[0];
      var next = arrows.filter(function (a) { return a.getAttribute("data-dir") === "1"; })[0];
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    arrows.forEach(function (a) {
      a.addEventListener("click", function () {
        var dir = parseInt(a.getAttribute("data-dir"), 10) || 1;
        track.scrollBy({ left: dir * step(), behavior: "smooth" });
      });
    });
    track.addEventListener("scroll", sync, { passive: true });
    sync();
  })();

  /* Mega-menu: hover works via CSS; this adds click/touch + keyboard + outside-close */
  (function () {
    var items = Array.prototype.slice.call(document.querySelectorAll(".nav-item"));
    if (!items.length) return;
    function closeAll(except) {
      items.forEach(function (i) {
        if (i === except) return;
        i.classList.remove("open");
        var t = i.querySelector(".nav-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
    items.forEach(function (item) {
      var trigger = item.querySelector(".nav-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var willOpen = !item.classList.contains("open");
        closeAll(item);
        item.classList.toggle("open", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-item")) closeAll();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  })();

  /* Auto-play videos when they scroll into view, pause when they leave */
  (function () {
    var vids = Array.prototype.slice.call(document.querySelectorAll("video[data-inview]"));
    if (!vids.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.45 });
    vids.forEach(function (v) { io.observe(v); });
  })();

  /* Why SentriTec — auto-rotating tabs with a 5s progress line */
  (function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".why3-tab"));
    var panes = Array.prototype.slice.call(document.querySelectorAll(".why3-pane"));
    if (!tabs.length) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var current = -1, timer = null;

    function show(i) {
      current = i;
      tabs.forEach(function (t, idx) {
        if (idx === i) return;
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panes.forEach(function (p, idx) { p.classList.toggle("active", idx === i); });
      // restart the fill animation even if the same tab is re-selected
      var el = tabs[i];
      el.classList.remove("active");
      void el.offsetWidth;
      el.classList.add("active");
      el.setAttribute("aria-selected", "true");
    }
    function next() { show((current + 1) % tabs.length); }
    function start() { if (reduce) return; clearInterval(timer); timer = setInterval(next, 5000); }

    tabs.forEach(function (t, idx) {
      t.addEventListener("click", function () { show(idx); start(); });
    });
    show(0);
    start();
  })();

  /* Scrollspy — highlight the nav link for the section in view */
  (function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var sections = [];
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute("href").slice(1));
      if (sec) sections.push(sec);
    });
    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  })();

  /* Whole device card is clickable (the visible "Learn more" link stays for keyboard users) */
  (function () {
    document.querySelectorAll(".eco-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;       // let real links behave normally
        var link = card.querySelector(".link-arrow[href], a.link-arrow");
        var href = (link && link.getAttribute("href")) || "#contact";
        var el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.location.hash = href;
      });
    });
  })();

  /* Product — Featured Features interactive showcase (click a list item to drive the media stage) */
  (function () {
    var items = Array.prototype.slice.call(document.querySelectorAll(".ftr-item"));
    var panes = Array.prototype.slice.call(document.querySelectorAll(".ftr-pane"));
    if (!items.length) return;
    function activate(key) {
      items.forEach(function (it) {
        var on = it.getAttribute("data-feat") === key;
        it.classList.toggle("active", on);
        it.setAttribute("aria-selected", on ? "true" : "false");
      });
      panes.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-feat") === key); });
    }
    items.forEach(function (it) {
      var key = it.getAttribute("data-feat");
      it.addEventListener("click", function () { activate(key); });
    });
  })();

  /* Reveal-on-scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // small stagger for siblings entering together
            entry.target.style.transitionDelay = Math.min(i * 60, 240) + "ms";
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();
