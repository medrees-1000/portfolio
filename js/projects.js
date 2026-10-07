// Renders project cards from data/projects.json. Add an entry there to add a project.
import { el, getJSON } from "./dom.js";
import { createCarousel } from "./carousel.js";
import { techMap as techPromise, iconNode } from "./tech.js";

const list = document.getElementById("projects-list");

// Supports the legacy single "image" field as one media item.
function mediaOf(p) {
  if (p.media && p.media.length) return p.media;
  if (p.image) return [{ type: "image", src: p.image, alt: "Screenshot of " + p.title }];
  return [];
}

function link(label, href, ariaLabel, className) {
  const a = el("a", className, label);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", ariaLabel);
  return a;
}

function techChip(id, techMap) {
  const tech = techMap[id] || { label: id };
  const li = el("li", "chip");
  const icon = iconNode(tech, "chip-icon");
  if (icon) li.appendChild(icon);
  li.appendChild(el("span", "", tech.label));
  return li;
}

function renderProject(p, techMap, isFirst) {
  const article = el("article", "project");
  article.id = p.id;
  const media = el("div", "project-media");
  media.appendChild(createCarousel(mediaOf(p), p.title + " media", isFirst));
  article.appendChild(media);

  const body = el("div", "project-body");
  body.appendChild(el("h3", "", p.title));
  body.appendChild(el("p", "", p.description));

  if (p.highlights && p.highlights.length) {
    const ul = el("ul", "highlights");
    p.highlights.forEach((h) => ul.appendChild(el("li", "", h)));
    body.appendChild(ul);
  }

  if (p.tech && p.tech.length) {
    const ul = el("ul", "tech");
    ul.setAttribute("aria-label", "Tech stack");
    p.tech.forEach((id) => ul.appendChild(techChip(id, techMap)));
    body.appendChild(ul);
  }

  const links = el("div", "card-links");
  if (p.live) links.appendChild(link("Live demo", p.live, "Live demo of " + p.title, "btn"));
  if (p.github) links.appendChild(link("GitHub", p.github, "GitHub repository for " + p.title, "btn ghost"));
  if (links.children.length) body.appendChild(links);

  article.appendChild(body);
  return article;
}

Promise.all([getJSON("data/projects.json"), techPromise])
  .then(([projects, techMap]) => {
    projects.forEach((p, i) => list.appendChild(renderProject(p, techMap, i === 0)));
  })
  .catch((err) => {
    console.error(err);
    list.appendChild(el("p", "muted", "Projects could not be loaded. Please try again later."));
  });
