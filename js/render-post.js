document.addEventListener("DOMContentLoaded", function () {
  var mount = document.getElementById("post-mount");
  if (!mount) return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");

  fetchJSON("/content/posts.json").then(function (data) {
    var sorted = sortedPosts(data.posts || []);
    var index = sorted.findIndex(function (p) { return p.slug === slug; });
    var post = index >= 0 ? sorted[index] : null;

    if (!post) {
      mount.innerHTML =
        '<div class="post-not-found">' +
          "<h1>We couldn&rsquo;t find that entry</h1>" +
          '<p class="lede mx-auto">It may have been moved or the link is off. Here&rsquo;s the full list of journal entries instead.</p>' +
          '<a class="btn btn-primary" href="/journals/index.html">Back to journals</a>' +
        "</div>";
      document.title = "Entry not found · RealTalkWithDara";
      return;
    }

    document.title = post.title + " · RealTalkWithDara";

    var prev = sorted[index + 1]; // older
    var next = sorted[index - 1]; // newer

    mount.innerHTML =
      '<header class="post-header container">' +
        '<span class="meta">' + post.category + " · " + formatPostDate(post.date) + "</span>" +
        "<h1>" + post.title + "</h1>" +
      "</header>" +
      '<div class="container">' +
        '<div class="post-hero-art"><img src="' + post.image + '" alt=""></div>' +
        '<div class="post-body">' +
          post.content.map(function (p) { return "<p>" + p.paragraph + "</p>"; }).join("") +
        "</div>" +
        '<div class="post-footer">' +
          (prev ? '<a class="btn btn-outline btn-small" href="/journals/post.html?slug=' + prev.slug + '">&larr; ' + prev.title + "</a>" : "<span></span>") +
          (next ? '<a class="btn btn-outline btn-small" href="/journals/post.html?slug=' + next.slug + '">' + next.title + " &rarr;</a>" : "<span></span>") +
        "</div>" +
      "</div>";
  }).catch(function () {
    mount.innerHTML = "<div class=\"post-not-found container\"><h1>Couldn&rsquo;t load this entry</h1><p class=\"lede mx-auto\">Please try again in a moment.</p></div>";
  });
});
