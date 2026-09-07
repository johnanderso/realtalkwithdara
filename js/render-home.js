document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("recent-posts");
  if (!grid) return;
  fetchJSON("/content/posts.json")
    .then(function (data) {
      var sorted = sortedPosts(data.posts || []);
      grid.innerHTML = sorted.slice(0, 3).map(postCardHTML).join("");
    })
    .catch(function () {
      grid.innerHTML = '<p>Entries will appear here once published.</p>';
    });
});
