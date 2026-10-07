# Portfolio

Personal portfolio site: projects, about, resume and contact links.

## Stack
Plain HTML, CSS and JavaScript. No build step.

## Structure
- `index.html`: the page
- `css/`: styles (colors are CSS variables at the top of `styles.css`)
- `js/`: small scripts (project cards, theme switcher)
- `data/projects.json`: all project content; add an entry to add a card
- `assets/images/`: project screenshots and logo
- `assets/resume/`: resume PDF

## Run locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000

## Deploy
GitHub Pages or Netlify (static, no config needed).
