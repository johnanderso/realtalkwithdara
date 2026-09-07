/* =========================================================
   RealTalkWithDara — shared behaviour
   Content now lives in /content/posts.json and
   /content/settings.json so the CMS (Decap) can edit it.
   ========================================================= */

// Mobile nav toggle
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
})();

// Footer year
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// ---------------------------------------------------------
// Generic site-settings binding.
// Any element with data-setting="key" gets its text filled in;
// data-setting-src="key" fills an image/src; data-setting-href="key"
// fills a link (and hides the element if that setting is empty).
// This runs on every page so header/footer/hero/about/contact all
// stay in sync with one JSON file the CMS writes to.
// ---------------------------------------------------------
function fetchJSON(url) {
  return fetch(url, { cache: "no-store" }).then(function (r) {
    if (!r.ok) throw new Error("Failed to load " + url);
    return r.json();
  });
}

function applySettings(settings) {
  document.querySelectorAll("[data-setting]").forEach(function (el) {
    var key = el.getAttribute("data-setting");
    if (settings[key]) el.textContent = settings[key];
  });
  document.querySelectorAll("[data-setting-src]").forEach(function (el) {
    var key = el.getAttribute("data-setting-src");
    if (settings[key]) el.src = settings[key];
  });
  document.querySelectorAll("[data-setting-href]").forEach(function (el) {
    var key = el.getAttribute("data-setting-href");
    if (settings[key]) {
      el.href = settings[key];
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });
}

fetchJSON("/content/settings.json").then(applySettings).catch(function () {
  /* settings.json missing or unreachable (e.g. opened via file://) — page still works with the defaults already baked into the HTML */
});

// Date formatting shared by journals + post pages
function formatPostDate(iso) {
  var d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function sortedPosts(posts) {
  return posts.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
}

// Build a post card (used on the homepage "recent entries" grid)
function postCardHTML(post) {
  return (
    '<article class="post-card">' +
      '<a class="thumb" href="/journals/post.html?slug=' + post.slug + '">' +
        '<img src="' + post.image + '" alt="" loading="lazy">' +
      "</a>" +
      '<div class="body">' +
        '<span class="meta">' + post.category + " · " + formatPostDate(post.date) + "</span>" +
        "<h3><a href=\"/journals/post.html?slug=" + post.slug + "\">" + post.title + "</a></h3>" +
        "<p>" + post.excerpt + "</p>" +
        '<a class="read-more" href="/journals/post.html?slug=' + post.slug + '">Read the entry <span class="arrow">&rarr;</span></a>' +
      "</div>" +
    "</article>"
  );
}

// Build a post row (used on the journals listing page)
function postRowHTML(post) {
  return (
    '<a class="journal-row" href="/journals/post.html?slug=' + post.slug + '" data-category="' + post.category + '">' +
      '<span class="thumb"><img src="' + post.image + '" alt="" loading="lazy"></span>' +
      "<span>" +
        '<span class="meta">' + post.category + " · " + formatPostDate(post.date) + "</span>" +
        "<h3>" + post.title + "</h3>" +
        "<p>" + post.excerpt + "</p>" +
        '<span class="read-more">Read the entry <span class="arrow">&rarr;</span></span>' +
      "</span>" +
    "</a>"
  );
}
