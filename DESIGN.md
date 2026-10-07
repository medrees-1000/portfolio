# Design rules

## Look
- Near-black background, one accent color.
- Headings: Space Grotesk 700. Body: Inter. Both from Google Fonts.
- Cards, inputs and chips are outlined with 1px borders. No shadows.
- No horizontal rules: no `border-top`, `border-bottom` or `<hr>` between sections.
  Sections are separated by vertical spacing only.

## Colors
All colors are CSS variables on `:root` (see top of `css/styles.css`).

| Variable | Value |
| --- | --- |
| `--bg` | #0B0B0C |
| `--card` | #141416 |
| `--text` | #EDEDED |
| `--muted` | #8A8A8F |
| `--border` | #26262A |
| `--accent` | #3DDC84 |
| `--on-accent` | #0B0B0C |

The site is locked to one green accent: `--accent` #3DDC84, `--on-accent` #0B0B0C,
set directly on `:root`. There is no theme switching and no `data-theme` attribute.

The accent is used only for the name, links, buttons, hover/active states and the thin timeline marker.

## Avoid
Gradients, glow orbs, sparkles, emojis as icons, drop shadows, glassmorphism,
fake testimonials, three-feature-card rows, em dashes in copy,
"it's not X, it's Y" phrasing.

## Profile data
`data/profile.json` is the single source for name, initials, email, github, linkedin and resume.
`js/profile.js` fills the page from it (hero, footer, nav icons, contact, resume buttons, copy-email,
page title, Open Graph and Twitter titles). Do not hard-code these values in HTML.
- Bind with `data-profile`, `data-profile-value` and `data-profile-link`.
- GitHub and LinkedIn links open in a new tab with `rel="noopener noreferrer"`.
- A link whose value is empty or contains TODO is hidden, never pointed at a broken URL.

## Resume
The path comes from `data/profile.json`. About has a "Download my Resume" button
(`download="<Name>-Resume.pdf"`) and a secondary "View" link (new tab). Contact has a Resume link.
If the file is missing, the buttons are disabled and a short TODO note shows. No broken links.

## Logo
If `assets/images/logo.svg` exists it is used in the navbar center (about 40px high, link `aria-label`
is the name) and as the favicon. Otherwise the initials from `profile.json` render as a wordmark in
the heading font. Never generate or imitate an existing brand or character logo.

## Projects
One card type. Each project is a full-width card: media on the left (about 60%),
details on the right on desktop, stacked on mobile. Never a card grid.
Details order: title, description, highlights, tech row, buttons (Live demo, GitHub).
A button only shows when its URL is set.

## Tech chips
`data/tech.json` maps ids to label and local icon. Projects reference ids only.
Icons come from Simple Icons (CC0), stored in `assets/icons/`, drawn single color
with a CSS mask so they follow `currentColor`: muted by default, accent on hover.
No full-color logos, no hotlinking. A missing icon means a label-only chip.

## Media carousel
No libraries. `media[]` items are `{ type: "image" | "video", src, alt, poster?, caption? }`.
A single legacy `image` field counts as one item.
- Native CSS scroll-snap scroller, fixed 16:9 slides (no layout shift).
- Prev/next buttons, dots (24px hit area), "2 / 5" counter. Controls are hidden for a single item.
- Videos: controls, muted, playsinline, `preload="metadata"`, no autoplay, paused when the slide leaves view.
- Arrow keys work when the carousel (or its controls) is focused.
- Clicking an image opens a native `<dialog>` lightbox. Esc closes it and focus returns to the trigger.
- Only the first image of the first project is eager. Every other image is `loading="lazy"`.
- A file that fails to load is replaced by a neutral placeholder block.
- With `prefers-reduced-motion`, slides jump instead of animating.

## Content sections
Rendered by JS from JSON, with TODO placeholders until real content exists.
- Experience and education: `data/experience.json`, a plain vertical list with a thin accent marker. No card rows.
- Skills: `data/skills.json`, grouped by category, plain text tags. No logo grid.
- Recently updated repos: optional strip, 4 newest non-fork repos from the GitHub API.
  Set `GITHUB_USERNAME` in `js/repos.js`. Cached in sessionStorage, silent on failure or when unset.

## Polish
- The nav link of the section in view is highlighted (accent, `aria-current="location"`).
- Copy-email button shows a short "Copied" confirmation.
- Sections fade and rise a few pixels once, disabled under `prefers-reduced-motion`.
- Favicon, description, Open Graph and Twitter tags (TODO values), theme-color, skip link.
- `404.html` uses the same styles and root-absolute asset paths.

## Motion
Short, subtle hover transitions only. Respect `prefers-reduced-motion`.

## Quality bar
Responsive from 360px, semantic HTML, alt text, visible keyboard focus,
sufficient contrast, no external JS libraries, small readable files.
No invented content: placeholders are marked `TODO`.
