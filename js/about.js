// Renders the experience timeline and grouped skills from JSON.
import { el, getJSON } from "./dom.js";
import { techMap, iconNode } from "./tech.js";

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

// Each item is a tech id from data/tech.json; unknown ids render as a label-only tile.
function renderSkill(id, tech) {
  const info = tech[id] || { label: id };
  const li = el("li", "skill");
  const icon = iconNode(info, "skill-icon");
  if (icon) li.appendChild(icon);
  li.appendChild(el("span", "skill-label", info.label));
  return li;
}

function renderGroup(g, tech) {
  const group = el("div", "skill-group");
  group.appendChild(el("h4", "", g.category));
  const ul = el("ul", "skill-grid");
  g.items.forEach((id) => ul.appendChild(renderSkill(id, tech)));
  group.appendChild(ul);
  return group;
}

getJSON("data/experience.json")
  .then((entries) => entries.forEach((e) => timeline.appendChild(renderEntry(e))))
  .catch((err) => console.error(err));

Promise.all([getJSON("data/skills.json"), techMap])
  .then(([groups, tech]) => groups.forEach((g) => skills.appendChild(renderGroup(g, tech))))
  .catch((err) => console.error(err));
