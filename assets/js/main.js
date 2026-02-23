/* ============================================================
   PORTFOLIO — main.js
   Reads portfolio-content.json and renders the full page
   ============================================================ */

/* ── Carousel State ── */
const CS = {};

function initCarousel(id, total) {
  CS[id] = { cur: 0, total };
}
function goTo(id, idx) {
  CS[id].cur = ((idx % CS[id].total) + CS[id].total) % CS[id].total;
  document.getElementById("slides-" + id).style.transform = "translateX(-" + (CS[id].cur * 100) + "%)";
  document.querySelectorAll("#dots-" + id + " .carousel-dot").forEach((d, i) => {
    d.classList.toggle("active", i === CS[id].cur);
  });
}
function move(id, dir) { goTo(id, CS[id].cur + dir); }

/* ── Lightbox ── */
function openLB(id) {
  const slide = document.querySelector("#slides-" + id + " .carousel-slide:nth-child(" + (CS[id].cur + 1) + ") img");
  if (!slide) return;
  document.getElementById("lightbox-img").src = slide.src;
  document.getElementById("lightbox-cap").textContent = "Click outside to close · ESC to dismiss";
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("lightbox").addEventListener("click", function(e) {
  if (e.target === e.currentTarget) closeLightbox();
});
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeLightbox();
});

/* ── DOM Helper ── */
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v);
  });
  children.flat().forEach(c => {
    if (c == null) return;
    el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return el;
}

/* ── Build Nav ── */
function buildNav(profile) {
  const initials = profile.name.split(" ").map(w => w[0]).slice(0, 3).join("");
  return h("nav", {},
    h("div", { class: "nav-mark" },
      h("div", { class: "nav-monogram" }, initials),
      h("span", { class: "nav-name" }, profile.name)
    ),
    h("ul", { class: "nav-links" },
      h("li", {}, h("a", { href: "#products" }, "Work")),
      h("li", {}, h("a", { href: "#timeline" }, "Journey")),
      h("li", {}, h("a", { href: "mailto:" + profile.email }, "Contact"))
    ),
    h("a", { class: "nav-cta", href: "mailto:" + profile.email }, "Engage")
  );
}

/* ── Build Hero ── */
function buildHero(hero) {
  const metricEls = hero.metrics.map(m =>
    h("div", { class: "metric" },
      h("div", { class: "metric-val" }, m.val),
      h("div", { class: "metric-key" }, m.key)
    )
  );
  const br1 = document.createElement("br");
  const br2 = document.createElement("br");
  return h("header", { class: "hero" },
    h("div", { class: "hero-bg" }),
    h("div", { class: "hero-grid-lines" }),
    h("div", { class: "hero-spacer" }),
    h("div", { class: "hero-body" },
      h("div", { class: "hero-eyebrow" },
        h("div", { class: "eyebrow-line" }),
        h("span", { class: "eyebrow-text" }, hero.eyebrow)
      ),
      h("h1", {},
        h("span", { class: "thin" }, hero.headline1), br1,
        h("span", { class: "accent" }, hero.headline2), br2,
        h("span", { class: "thin" }, hero.headline3)
      ),
      h("p", { class: "hero-sub" }, hero.subtext),
      h("div", { class: "hero-metrics" }, ...metricEls)
    ),
    h("div", { class: "hero-footer" },
      h("span", {}, hero.footerLeft),
      h("div", { class: "scroll-indicator" },
        h("div", { class: "scroll-line" }),
        h("span", {}, "Scroll")
      ),
      h("span", {}, hero.footerRight)
    )
  );
}

/* ── Build Carousel ── */
function buildCarousel(p) {
  const id = p.id;
  const slides = p.slides || [];
  initCarousel(id, Math.max(slides.length, 1));

  const slidesWrap = h("div", { class: "carousel-slides", id: "slides-" + id });

  if (slides.length) {
    slides.forEach((src, i) => {
      slidesWrap.appendChild(
        h("div", { class: "carousel-slide" },
          h("img", { src: src, alt: p.name + " " + (i + 1), loading: "lazy" })
        )
      );
    });
  } else {
    /* Placeholder when no slides are provided */
    const fb = document.createElement("div");
    fb.className = "carousel-slide";
    fb.style.cssText = "background:linear-gradient(145deg,#0f0f0f,#1a1209);display:flex;align-items:center;justify-content:center;";
    const label = document.createElement("span");
    label.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:3rem;font-weight:300;color:rgba(255,255,255,0.15)";
    label.textContent = p.name;
    fb.appendChild(label);
    slidesWrap.appendChild(fb);
  }

  const dots = h("div", { class: "carousel-dots", id: "dots-" + id });
  for (let i = 0; i < Math.max(slides.length, 1); i++) {
    const d = h("button", { class: "carousel-dot" + (i === 0 ? " active" : "") });
    d.onclick = (e => idx => { e.stopPropagation(); goTo(id, idx); })(event)(i); // capture i
    (function(idx) {
      const dot = h("button", { class: "carousel-dot" + (idx === 0 ? " active" : "") });
      dot.onclick = function(e) { e.stopPropagation(); goTo(id, idx); };
      dots.appendChild(dot);
    })(i);
  }

  const trigger = h("div", { class: "lightbox-trigger" });
  trigger.onclick = () => openLB(id);

  const prevBtn = h("button", { class: "carousel-btn prev" }, "\u2190");
  prevBtn.onclick = function(e) { e.stopPropagation(); move(id, -1); };

  const nextBtn = h("button", { class: "carousel-btn next" }, "\u2192");
  nextBtn.onclick = function(e) { e.stopPropagation(); move(id, 1); };

  return h("div", { class: "carousel", id: "car-" + id }, slidesWrap, trigger, prevBtn, nextBtn, dots);
}

/* ── Build App Bar ── */
function buildAppBar(p) {
  let iconEl;
  if (p.iconUrl) {
    iconEl = h("div", { class: "app-icon" }, h("img", { src: p.iconUrl, alt: p.appName }));
  } else {
    const fb = h("div", { class: "app-icon" });
    fb.style.background = "#1a1209";
    const lbl = document.createElement("span");
    lbl.style.cssText = "font-family:'Cormorant Garamond',serif;font-weight:600;color:#fff;font-size:0.9rem";
    lbl.textContent = p.iconFallback || p.index;
    fb.appendChild(lbl);
    iconEl = fb;
  }

  const badges = [];
  if (p.playUrl)  badges.push(h("a", { class: "store-badge", href: p.playUrl,  target: "_blank", rel: "noopener" }, "Play Store"));
  if (p.appleUrl) badges.push(h("a", { class: "store-badge", href: p.appleUrl, target: "_blank", rel: "noopener" }, "App Store"));
  if (p.webUrl && !p.playUrl) badges.push(h("a", { class: "store-badge", href: p.webUrl, target: "_blank", rel: "noopener" }, p.webUrl.replace(/^https?:\/\//, "")));

  const ratingChildren = [];
  if (p.appRating && p.appRating.match(/^\d/)) ratingChildren.push(h("span", { class: "star" }, "\u2605"));
  ratingChildren.push(p.appRating || "");

  return h("div", { class: "app-bar" },
    iconEl,
    h("div", { class: "app-meta" },
      h("div", { class: "app-title-bar" }, p.appName),
      h("div", { class: "app-dev" }, p.appDev)
    ),
    h("div", { class: "app-rating" }, ...ratingChildren),
    h("div", { class: "store-badges" }, ...badges)
  );
}

/* ── Build Product Card ── */
function buildProductCard(p) {
  const impactCells = p.impact.map(m =>
    h("div", { class: "impact-cell" },
      h("div", { class: "impact-val" }, m.val),
      h("div", { class: "impact-key" }, m.key)
    )
  );
  const techPills = p.stack.map(s => h("span", { class: "tech-pill" }, s));
  const contribs  = p.contributions.map(c => h("li", {}, c));

  const info = h("div", { class: "card-info" },
    h("div", { class: "card-index" }, p.index, h("span", {}), p.category),
    h("div", { class: "card-category" }, p.company),
    h("h3", {}, p.name),
    h("div", { class: "divider" }),
    h("p",   { class: "card-desc" }, p.desc),
    h("div", { class: "contrib-label" }, p.contribLabel),
    h("ul",  { class: "contrib-list" }, ...contribs),
    h("div", { class: "impact-grid" }, ...impactCells),
    h("div", { class: "tech-section" },
      h("div", { class: "tech-label" }, "Technology Stack"),
      h("div", { class: "tech-pills" }, ...techPills)
    )
  );

  const visual = h("div", { class: "card-visual" },
    buildCarousel(p),
    buildAppBar(p)
  );

  return h("article", { class: "product-card" }, visual, info);
}

/* ── Build Products Section ── */
function buildProducts(products) {
  const cards = products.map(p => buildProductCard(p));
  const intro = h("div", { class: "section-intro" },
    h("div", {},
      h("div", { class: "section-eyebrow" },
        h("div", { class: "section-eyebrow-line" }),
        h("span", { class: "section-eyebrow-text" }, "Featured Work")
      ),
      h("h2", { html: "Products I've<br>owned <em>&amp; shipped.</em>" })
    ),
    h("p", {}, "From super apps and fintech platforms to OTT streaming — each product represents end-to-end ownership across engineering, data, and strategy.")
  );
  return h("main", { id: "products" }, intro, ...cards);
}

/* ── Build Timeline ── */
function buildTimeline(timeline) {
  const items = timeline.map(t =>
    h("div", { class: "tl-item" },
      h("div", { class: "tl-year" }, t.year),
      h("h4", {}, t.title),
      h("p",  {}, t.desc)
    )
  );
  const rule = document.createElement("div");
  rule.style.cssText = "width:30px;height:1px;background:var(--gold);flex-shrink:0;margin-top:0.5rem";
  return h("section", { id: "timeline" },
    h("div", { class: "timeline-header" },
      rule,
      h("h2", { html: "From engineer to<br><em>technology executive.</em>" })
    ),
    h("div", { class: "tl-items" }, ...items)
  );
}

/* ── Build Footer ── */
function buildFooter(profile) {
  const rule = document.createElement("div");
  rule.className = "footer-rule";
  return h("footer", {},
    h("div", { class: "footer-brand" },
      h("h3", {}, profile.name),
      h("p",  {}, profile.title),
      h("div", { class: "footer-legal" }, "Portfolio \u00B7 " + new Date().getFullYear() + " \u00B7 " + profile.location)
    ),
    h("div", { style: "display:flex;align-items:center;justify-content:center" }, rule),
    h("div", { class: "footer-contact" },
      h("span", {}, profile.phone),
      h("a", { href: "mailto:" + profile.email }, profile.email),
      h("a", { href: "https://" + profile.linkedin, target: "_blank" }, profile.linkedin)
    )
  );
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll(".product-card").forEach(c => obs.observe(c));
}

/* ── Auto-advance Carousels ── */
function initAutoplay(products) {
  setInterval(() => {
    products.forEach(p => {
      if (CS[p.id] && CS[p.id].total > 1) move(p.id, 1);
    });
  }, 5000);
}

/* ── MAIN RENDER ── */
/* Fetches portfolio-content.json then renders the full page  */
fetch("portfolio-content.json")
  .then(res => {
    if (!res.ok) throw new Error("Could not load portfolio-content.json");
    return res.json();
  })
  .then(DATA => {
    const app = document.getElementById("app");
    app.appendChild(buildNav(DATA.profile));
    app.appendChild(buildHero(DATA.hero));
    app.appendChild(buildProducts(DATA.products));
    app.appendChild(buildTimeline(DATA.timeline));
    app.appendChild(buildFooter(DATA.profile));
    initScrollReveal();
    initAutoplay(DATA.products);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("app").innerHTML =
      "<div style='padding:4rem 5vw;color:#b8955a;font-family:monospace;font-size:0.85rem'>" +
      "Could not load portfolio-content.json — make sure the file is in the same folder as index.html</div>";
  });
