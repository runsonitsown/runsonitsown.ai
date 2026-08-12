# design-tokens.md — RunsOnItsOwn.ai
# Visual system of record. Codex follows this file exactly.
# Last updated: 2026-08-11 (dark-dominant direction — supersedes the previous white-ground version)

---

## THE ANCHOR

The visitor reads this site at 7pm, in a truck, on a phone, after a ten-hour day. The site is dark because that is when he is looking at it, and because the product is work that happens while he is not watching.

Dark is not a tech-industry costume here. It is the time of day. Every choice below follows from that.

---

## COLOR

The six brand values are unchanged. Their assignments have changed.

| Role | Value | Rule |
|---|---|---|
| Page ground | `#16181D` | Default background for the entire site. |
| Elevated surface | `#1D2027` | Cards, quote blocks, form fields. One step up from the ground. |
| Hairline | `#2A2E36` | Borders and dividers. Never heavier than 1px. |
| Body text | `#B6BEC9` | All paragraph text on dark ground. |
| Heading text | `#FFFFFF` | Headings and anything that must land first. |
| Primary action | `#2D7FF9` | Buttons and links. Nothing else. |
| Running signal | `#5EE1FF` | Reserved. See below. |
| Inversion ground | `#E7E9EC` | One or two sections site-wide. Text on it is `#16181D`. |

### The cyan rule

`#5EE1FF` means something is active, connected, measured, or running on its own.

Use it in localized interface details: the logo gate, live system paths, active quiz progress, illuminated nodes, status readings, divider gates, and live result numbers. Never use it for paragraph text, large filled backgrounds, or a full-page wash.

Cyan may participate in a tightly contained glow or gradient around an active system element. The surrounding interface stays dark and restrained so the signal remains meaningful.

### Inversion sections

The site is dark. One or two sections invert to `#E7E9EC` so the contrast carries weight. Use inversion where the content is about a real person or real proof: the TJ block on `/`, the person section on `/about`.

Do not alternate light and dark section by section. That reads as a template.

---

## TYPOGRAPHY

Three roles. Load as variable fonts through `next/font`, subset to Latin, and cap the weights actually used. The Worker bundle limit is 3 MiB compressed.

| Role | Face | Weights | Use |
|---|---|---|---|
| Display | Archivo | 700, 800 | Headlines and section headings only |
| Body | Inter | 400, 500 | All paragraph and UI text |
| Utility | IBM Plex Mono | 500 | Eyebrow labels, counters, every number and data point |

**The mono is the instrument voice.** This brand's entire mechanism is measurement, so numbers should look like readings rather than body copy. Hours, dollars, question counts, percentages, and small factual labels are all mono, uppercase, with wide letter-spacing.

**Headlines** set tight: line-height near 1.05, letter-spacing slightly negative, sentence case. Never all-caps headlines.

**Body** sits at line-height 1.6 with a measure of roughly 65 characters. Never centered.

---

## STRUCTURE

### Eyebrow labels

Every major section opens with a short mono uppercase label above its heading. The label names what the section is, factually. It is not a slogan and never repeats the heading.

This is where the density comes from. A page of headline-plus-paragraph with nothing else reads as unfinished.

### The gate motif — signature element

The logo is a closed circuit loop with one segment picked out in electric blue: the gate, meaning the owner's approval step. That motif is the site's structural device.

- **Section dividers** are a thin hairline path with one short segment separated out. On scroll into view, that segment lights `#5EE1FF` once and stays lit.
- **The quiz progress indicator** is that same path filling left to right, with the gate segment marking the current question.
- **Cards** carry one notched corner echoing the loop geometry. Same notch, same corner, every card, every page.

The gate encodes something true: nothing happens without the owner's approval. That is the same claim the Pichai quote makes and the same claim `/we-fix-it-for-you` makes. It is structure, not ornament.

### Cards

Elevated surface, 1px hairline border, generous internal padding, the gate notch on one corner. Nested borders, subtle tonal gradients, and low-opacity shadows may create depth. Avoid generic floating white cards, heavy blur, or glow on every panel.

### Density and rhythm

Keep section padding tighter than feels natural on a first pass. Let paragraphs sit close to their headings. Let each screen carry real content. Substance reads as substance; acres of empty space read as a placeholder.

---

## BUTTONS

- **Primary:** `#2D7FF9` fill, `#FFFFFF` label, medium weight, generous horizontal padding, small radius. Hover shifts brightness only.
- **Secondary and decline links:** plain text in `#B6BEC9` with an underline. Small and quiet. Never a competing filled button.
- One primary button per page view. Repeating the same CTA down the page is correct; introducing a second, different CTA is not.
- Labels say what happens next in active voice. The button that says "Find my time leaks" leads to a page about time leaks.
- Minimum tap target 44px.

---

## IMAGERY

Photos are real. No stock, no illustration of people, no AI-generated imagery, no photos of public figures anywhere on the site.

Studio headshots on white backgrounds will look pasted onto the dark ground. Crop tight, and either mask the background out or hold the image inside a card with a hairline border so the edge is deliberate. Never float a white rectangle on the dark page.

---

## CONTROLLED DEPTH

The site should feel like premium operational software, not a flat dark brochure. Use fine technical grids, nested panels, layered borders, localized illumination, and one strong system visualization in the home hero. The visualization represents work moving without constant supervision.

Gradients and glows are permitted when they establish hierarchy or show an active connection. Keep them localized. No full-page neon haze, crypto styling, or game-interface clutter.

## MOTION

The home system visualization may carry slow ambient motion. Divider gates light once on scroll-in. Buttons and interactive cards may shift subtly on hover. Nothing else animates.

No parallax or counters ticking up. Respect `prefers-reduced-motion` and disable all nonessential motion under it.

---

## QUALITY FLOOR

- Responsive to 360px wide
- Visible keyboard focus rings in `#5EE1FF`
- Body text passes WCAG AA contrast against its ground
- Tap targets at least 44px
- Mobile-first: most traffic is a phone, and the design is judged there first
