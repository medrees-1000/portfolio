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
| `--bg` | #0B0B0C (`--bg-rgb` holds the same value for translucent fills) |
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
Gradients, glow orbs, sparkles, emojis as icons, drop shadows, glassmorphism (see the one navbar exception below),
fake testimonials, three-feature-card rows, em dashes in copy,
"it's not X, it's Y" phrasing.

## Profile data
`data/profile.json` is the single source for name, initials, email, github, linkedin, resume (path)
and resumeFilename (the exact name visitors get on download, spaces included).
`js/profile.js` fills the page from it (hero, footer, nav icons, contact, resume buttons, copy-email,
page title, Open Graph and Twitter titles). Do not hard-code these values in HTML.
- Bind with `data-profile`, `data-profile-value` and `data-profile-link`.
- GitHub and LinkedIn links open in a new tab with `rel="noopener noreferrer"`.
- A link whose value is empty or contains TODO is hidden, never pointed at a broken URL.

## Resume
There is no resume page. The resume lives only in About, as two buttons that read `data-profile` values:
"View my resume" (new tab, `rel="noopener noreferrer"`) and "Download my resume" (the `download`
attribute is `resumeFilename` from `profile.json` exactly as written, falling back to `<name> Resume.pdf`).
Both use the outlined style: transparent, 1px accent border, accent text, filled with the accent and
`--on-accent` on hover and keyboard focus. That style is for these two buttons only; "Send message"
stays a filled primary button. If the PDF is missing (HEAD request) both are disabled in muted text
with a short TODO note. No line-through, no broken links.

## Logo
If `assets/images/logo.svg` exists it is used in the navbar center (about 40px high, link `aria-label`
is the name) and as the favicon. Otherwise the initials from `profile.json` render as a wordmark in
the heading font. Never generate or imitate an existing brand or character logo.

## Navbar
Floating pill, about 96px tall (72px on mobile), max-width 1360px, 24px outer gutters, 32px inner padding.
Text 1.2rem, icons 32px, initials wordmark 1.6rem, logo image 48px tall, all click targets at least 48px.
- At the top of the page it is transparent: no border, no blur.
- After scrolling more than 8px (`.scrolled`, passive scroll listener) it gets a translucent
  fill (`--bg` at 70%), `backdrop-filter: blur(14px)` and a 1px border, animated over 200ms.
  Browsers without backdrop-filter get a 94% solid fill. Reduced motion: no animation.
- The open mobile menu uses the same fill (`.menu-open`) so it stays readable over the hero.
- Anchored sections use `scroll-margin-top: 130px` so the bar never covers a heading.
- **This is the only element allowed to use backdrop blur.** Everything else stays opaque.

## Layout and type scale
One content container for hero, Projects, About (timeline included) and Contact:
max-width 1200px, side padding `--gutter` (`clamp(20px, 4vw, 48px)`).
- Section headings `clamp(2.5rem, 5vw, 4rem)`. About paragraph 1.25rem, about 68ch measure.
- Timeline titles 1.35rem, body 1.1rem.
- Project card: title 2rem, description 1.15rem, highlights 1.05rem, chips 0.95rem with 20px icons.
  Roomy padding (44px 40px on desktop). Carousel stays at 60% width.

## Contact
Same container. Desktop: two columns. Left: a short lead line (TODO until written) and link rows,
each with a single-color icon, label, value (email address, GitHub username, LinkedIn handle) and a
subtle arrow. The email row has the copy button, and a Resume row follows. Right: the form with
56px inputs at about 17px, visible labels and focus, a large submit button and inline success and
error states. Stacked on mobile. Icons come from the SVG sprite at the top of `index.html`.

## Hero
Name `clamp(2.5rem, 6vw, 4.5rem)` in the heading font, on one line at 1280px and wider, wrapping
cleanly on mobile. Intro line 1.5rem, supporting line 1.15rem, thin accent line on the left.

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
- Skills: `data/skills.json`, grouped by category. Items are tech ids from `data/tech.json`.
  Each renders as a small uniform bordered tile with a single-color icon (28px, muted, accent on hover)
  and a label, in a responsive grid. Single-color icons are allowed here; full-color logos are not.
  An id with no entry or no icon renders label-only. Tiles stay small so it never reads as a feature-card row.
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
