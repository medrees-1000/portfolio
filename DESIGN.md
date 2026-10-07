# Design rules

## Look
- Near-black background, one accent color.
- Headings: Space Grotesk 700. Body: Inter. Both from Google Fonts.
- Separation by 1px borders only. No shadows.

## Colors
All colors are CSS variables on `:root` (see top of `css/styles.css`).

| Variable | Value |
| --- | --- |
| `--bg` | #0B0B0C |
| `--card` | #141416 |
| `--text` | #EDEDED |
| `--muted` | #8A8A8F |
| `--border` | #26262A |
| `--accent` | theme dependent |
| `--on-accent` | theme dependent |

Themes are chosen with `data-theme` on `<html>`:

| Theme | `--accent` | `--on-accent` |
| --- | --- | --- |
| amber (default) | #F5A524 | #0B0B0C |
| green | #3DDC84 | #0B0B0C |
| violet | #6366F1 | #FFFFFF |

The accent is used only for the name, links, buttons and hover states.

## Temporary theme switcher
Three dots, bottom-right. Sets `data-theme` and saves it in `localStorage`.
Everything is wrapped in `BEGIN/END TEMP SWITCHER` comments in HTML, CSS and JS
(plus `js/theme-switcher.js`) so it can be removed in one pass.

## Avoid
Gradients, glow orbs, sparkles, emojis as icons, drop shadows, glassmorphism,
fake testimonials, three-feature-card rows, em dashes in copy,
"it's not X, it's Y" phrasing.

## Motion
Short, subtle hover transitions only. Respect `prefers-reduced-motion`.

## Quality bar
Responsive from 360px, semantic HTML, alt text, visible keyboard focus,
sufficient contrast, no external JS libraries, small readable files.
No invented content: placeholders are marked `TODO`.
