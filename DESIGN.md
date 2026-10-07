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

The accent is used only for the name, links, buttons and hover/active states.

## Avoid
Gradients, glow orbs, sparkles, emojis as icons, drop shadows, glassmorphism,
fake testimonials, three-feature-card rows, em dashes in copy,
"it's not X, it's Y" phrasing.

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

## Motion
Short, subtle hover transitions only. Respect `prefers-reduced-motion`.

## Quality bar
Responsive from 360px, semantic HTML, alt text, visible keyboard focus,
sufficient contrast, no external JS libraries, small readable files.
No invented content: placeholders are marked `TODO`.
