document.addEventListener("DOMContentLoaded", function () {
  var list = document.getElementById("journal-list");
  var toolbar = document.getElementById("journal-filters");
  if (!list) return;

  fetchJSON("/content/posts.json").then(function (data) {
    var sorted = sortedPosts(data.posts || []);
    var categories = ["All"].concat(Array.from(new Set(sorted.map(function (p) { return p.category; }))));

    toolbar.innerHTML = categories.map(function (cat, i) {
      return '<button class="filter-pill' + (i === 0 ? " active" : "") + '" data-filter="' + cat + '">' + cat + "</button>";
    }).join("");

    function render(filter) {
      var items = filter === "All" ? sorted : sorted.filter(function (p) { return p.category === filter; });
      list.innerHTML = items.length
        ? items.map(postRowHTML).join("")
        : "<p>No entries in this category yet.</p>";
    }

    toolbar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-pill");
      if (!btn) return;
      toolbar.querySelectorAll(".filter-pill").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      render(btn.dataset.filter);
    });

    render("All");
  }).catch(function () {
    list.innerHTML = "<p>Entries will appear here once published.</p>";
  });
});
