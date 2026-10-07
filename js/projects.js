// Renders project cards from data/projects.json. Add entries there to add cards.
(function () {
  var list = document.getElementById("projects-list");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function link(label, href, ariaLabel) {
    var a = el("a", "btn ghost", label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", ariaLabel);
    return a;
  }

  function card(p) {
    var article = el("article", "card card-" + p.type);
    article.id = p.id;

    if (p.type === "visual" && p.image) {
      var img = el("img", "card-img");
      img.src = p.image;
      img.alt = "Screenshot of " + p.title;
      img.loading = "lazy";
      img.width = 1200;
      img.height = 675;
      article.appendChild(img);
    }

    var body = el("div", "card-body");
    body.appendChild(el("h3", "", p.title));
    body.appendChild(el("p", "", p.description));

    if (p.type === "text" && p.results) body.appendChild(el("p", "results", p.results));

    if (p.tags && p.tags.length) {
      var tags = el("ul", "tags");
      tags.setAttribute("aria-label", "Technologies");
      p.tags.forEach(function (t) { tags.appendChild(el("li", "", t)); });
      body.appendChild(tags);
    }

    var links = el("div", "card-links");
    if (p.github) links.appendChild(link("GitHub", p.github, "GitHub repository for " + p.title));
    if (p.live) links.appendChild(link("Live", p.live, "Live site for " + p.title));
    if (links.children.length) body.appendChild(links);

    article.appendChild(body);
    return article;
  }

  fetch("data/projects.json")
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (projects) {
      projects.forEach(function (p) { list.appendChild(card(p)); });
    })
    .catch(function () {
      list.appendChild(el("p", "muted", "Projects could not be loaded. Please try again later."));
    });
})();
