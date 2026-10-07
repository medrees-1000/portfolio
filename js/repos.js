// "Recently updated repos" strip. Fails silently, and does nothing without a username.
import { el } from "./dom.js";

// TODO: your GitHub username, e.g. "octocat". Leave empty to hide the strip.
export const GITHUB_USERNAME = "";

const COUNT = 4;

function fetchRepos(username) {
  const key = "repos:" + username;
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) return Promise.resolve(JSON.parse(cached));
  } catch (e) {}

  const url = "https://api.github.com/users/" + encodeURIComponent(username) + "/repos?sort=pushed&per_page=30";
  return fetch(url, { headers: { Accept: "application/vnd.github+json" } })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((all) => {
      const repos = all
        .filter((r) => !r.fork)
        .slice(0, COUNT)
        .map((r) => ({ name: r.name, url: r.html_url, description: r.description, language: r.language, stars: r.stargazers_count }));
      try { sessionStorage.setItem(key, JSON.stringify(repos)); } catch (e) {}
      return repos;
    });
}

function renderRepo(r) {
  const li = el("li", "repo");
  const a = el("a", "repo-name", r.name);
  a.href = r.url;
  a.target = "_blank";
  a.rel = "noopener";
  li.appendChild(a);
  if (r.description) li.appendChild(el("p", "repo-desc", r.description));
  const meta = [r.language, r.stars + (r.stars === 1 ? " star" : " stars")].filter(Boolean).join(", ");
  li.appendChild(el("p", "repo-meta", meta));
  return li;
}

export function loadRepos(username) {
  if (!username) return Promise.resolve();
  return fetchRepos(username)
    .then((repos) => {
      if (!repos.length) return;
      const list = document.getElementById("repo-list");
      list.replaceChildren(...repos.map(renderRepo));
      document.getElementById("repos").hidden = false;
    })
    .catch(() => {});
}

loadRepos(GITHUB_USERNAME);
