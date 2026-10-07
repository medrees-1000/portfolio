// Loads data/profile.json once and fills the page from it. Edit that file only.
//   data-profile="key"        text content
//   data-profile-value="key"  display form (GitHub username, LinkedIn handle)
//   data-profile-link="key"   href; hidden when the value is empty or TODO
//   data-new-tab              open in a new tab; data-download: download attribute
//   data-profile-item         wrapper hidden instead of the link itself
import { getJSON } from "./dom.js";

export const isTodo = (value) => !value || /todo/i.test(value);

export const profile = getJSON("data/profile.json").catch((err) => {
  console.error(err);
  return {};
});

function displayValue(key, value) {
  try {
    if (key === "github") return new URL(value).pathname.split("/").filter(Boolean)[0] || value;
    if (key === "linkedin") return (value.match(/\/in\/([^/?#]+)/) || [])[1] || value;
  } catch (e) {}
  return value;
}

// A single break opportunity right before the "@" so narrow screens never split a word or the domain.
function setEmail(node, address) {
  const at = address.indexOf("@");
  if (at < 1) {
    node.textContent = address;
    return;
  }
  node.replaceChildren(address.slice(0, at), document.createElement("wbr"), address.slice(at));
}

function setMeta(selector, value) {
  const meta = document.querySelector(selector);
  if (meta) meta.setAttribute("content", value);
}

function apply(p) {
  document.querySelectorAll("[data-profile]").forEach((node) => {
    node.textContent = p[node.dataset.profile] || "TODO";
  });

  document.querySelectorAll("[data-profile-value]").forEach((node) => {
    const key = node.dataset.profileValue;
    if (isTodo(p[key])) node.textContent = "TODO";
    else if (key === "email") setEmail(node, p[key]);
    else node.textContent = displayValue(key, p[key]);
  });

  document.querySelectorAll("[data-profile-link]").forEach((a) => {
    const key = a.dataset.profileLink;
    const value = p[key];
    if (isTodo(value)) {
      (a.closest("[data-profile-item]") || a).hidden = true;
      return;
    }
    a.href = key === "email" ? "mailto:" + value : value;
    if (a.hasAttribute("data-new-tab") || key === "github" || key === "linkedin") {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    if (a.hasAttribute("data-download")) {
      a.setAttribute("download", p.resumeFilename || p.name.trim() + " Resume.pdf");
    }
  });

  if (p.name) {
    const title = p.name + " | Portfolio";
    document.title = title;
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[name="twitter:title"]', title);
  }
}

profile.then(apply);
