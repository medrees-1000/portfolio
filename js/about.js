// Renders the experience timeline and grouped skills from JSON.
import { el, getJSON } from "./dom.js";

const timeline = document.getElementById("timeline");
const skills = document.getElementById("skills");

function renderEntry(e) {
  const li = el("li", "timeline-item");
  li.appendChild(el("h4", "", e.role));
  li.appendChild(el("p", "timeline-meta", [e.organization, e.dates].filter(Boolean).join(", ")));
  if (e.bullets && e.bullets.length) {
    const ul = el("ul", "timeline-bullets");
    e.bullets.forEach((b) => ul.appendChild(el("li", "", b)));
    li.appendChild(ul);
  }
  return li;
}

function renderGroup(g) {
  const group = el("div", "skill-group");
  group.appendChild(el("h4", "", g.category));
  const ul = el("ul", "tags");
  g.items.forEach((s) => ul.appendChild(el("li", "", s)));
  group.appendChild(ul);
  return group;
}

getJSON("data/experience.json")
  .then((entries) => entries.forEach((e) => timeline.appendChild(renderEntry(e))))
  .catch((err) => console.error(err));

getJSON("data/skills.json")
  .then((groups) => groups.forEach((g) => skills.appendChild(renderGroup(g))))
  .catch((err) => console.error(err));
