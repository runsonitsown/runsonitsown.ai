# design-tokens.md — RunsOnItsOwn.ai
# Single source of truth for all visual decisions. Do not invent values outside this file.
# Last updated: 2026-07-20

---

## PALETTE — "Modern Slate and Electric Blue"

| Token | Hex | Allowed uses | Forbidden uses |
|---|---|---|---|
| `ink` | `#16181D` | Body text, headings, dark section backgrounds, footer background | — |
| `steel` | `#B6BEC9` | Secondary text, captions, dividers, muted UI, icon strokes | Body copy on white (too low contrast) |
| `electric` | `#2D7FF9` | Primary CTA buttons, links, hover states, small accents (underlines, icons, active states) | Backgrounds of any section, body text, large filled areas |
| `white` | `#FFFFFF` | Page background, card surfaces, text on dark sections | — |
| `mist` | `#E7E9EC` | Alternating section backgrounds, card borders, input borders | Text of any kind |

Rules:

- Electric blue is scarce on purpose. If a page has more than one electric-filled element visible per viewport, it's overused. Scarcity is what makes the CTA pop.
- Dark sections (`ink` background, `white` text) are for high-impact moments only: hero variants, the final CTA band, the footer. Not for alternating stripes.
- Text on `mist` sections is `ink`. Never `steel` for paragraphs.
- Minimum contrast: all body text must pass WCAG AA.

## TYPOGRAPHY

- **Typeface:** Inter (variable), self-hosted via `next/font`. No external font CDN calls.
  - This is the working default. TJ may override; if he supplies a different face, update this file first, then the site.
- **Headings:** Inter, weight 700. Tight tracking (-0.02em). `ink`.
- **Body:** Inter, weight 400, 16–18px, line-height 1.6. `ink`.
- **Secondary/captions:** Inter, weight 400–500, 14px. `steel`.
- **CTA buttons:** Inter, weight 600, sentence case. Never all-caps shouting.
- Scale: use a restrained type scale (e.g. 1.25 ratio). Mobile h1 ≈ 32–36px. This is a business site for busy owners, not a startup landing page with 96px hero text.

## LAYOUT AND SPACING

- Mobile-first at 390px. Max content width 1120px, centered.
- Generous whitespace. Sections breathe: 64–96px vertical padding desktop, 48–64px mobile.
- Cards: `white` surface, 1px `mist` border, subtle radius (8–12px). No heavy drop shadows.
- One column on mobile, always. No horizontal scrolling elements.

## BUTTONS

- **Primary:** `electric` fill, `white` text, radius 8px, comfortable tap target (min 48px tall on mobile). Hover: darken ~8%.
- **Secondary:** `white` fill, 1px `ink` border, `ink` text. Used sparingly (e.g. "Book a call" when primary is quiz).
- One primary button per viewport. See palette rules.

## IMAGERY

- Real photos of TJ from `/brand/photos/` only. No stock people, no AI faces.
- Photos sit on `white` or `mist`, never on `electric`.
- Icons: simple line style, 1.5–2px stroke, `ink` or `steel`. Electric only for the single accent icon per section, if any.

## OVERALL FEEL

Clean, confident, modern, calm. The site should feel like a sharp operator who has nothing to prove: lots of white space, strong type, one blue button telling you exactly what to do next. If a design choice reads as "hype" or "template," it's wrong.
