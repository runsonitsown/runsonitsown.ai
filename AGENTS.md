# AGENTS.md — RunsOnItsOwn.ai
# Operating instructions for the coding agent (Codex). Read this file completely before doing anything.
# Last updated: 2026-07-20

---

## WHAT THIS PROJECT IS

Two things at once:

1. The marketing website for **RunsOnItsOwn.ai** — an AI consulting and automation business for small business owners.
2. The **canonical brand repository** for every future AI build (sales funnels, sales pages, landing pages). Future projects will point at this repo to learn the brand. Everything here must be clean, accurate, and reusable.

**Required reading before writing any copy or making any design decision:**

- `/brand/business-overview.md` — what the business is, who it serves, the offer ladder
- `/brand/tj-voice.md` — voice and editorial standards for ALL customer-facing copy
- `/brand/anti-ai-writing-patterns.md` — forbidden writing patterns. These rules apply in full to all RunsOnItsOwn.ai copy, regardless of any other brand name mentioned in the file.
- `/brand/design-tokens.md` — palette, typography, and visual usage rules (source of truth)

Do not write a word of visitor-facing copy until you have read all four.

---

## BUSINESS SUMMARY (for orientation — full detail in business-overview.md)

We help small business owners (2–20 employees, $500K–$5M revenue) reclaim 5–10 hours per week by prescribing and installing AI tools for them. The front door is a free "AI Time Leak Quiz" → $27 personalized report → $149 live setup session → white-glove install → custom builds → monthly retainer. The client never does homework. The machine or TJ does the work.

The name is the promise: their business runs on its own.

---

## SITE MAP AND PAGE JOBS

Every page has ONE job and ONE primary CTA. Do not add secondary CTAs.

| Route | Job | Primary CTA |
|---|---|---|
| `/` | Ad-check page. A visitor saw an ad and is verifying we're real. Answer "is this legit" in 5 seconds. | Take the quiz |
| `/find-your-leaks` | Assessment tier. Explains the quiz + $27 report. | Take the quiz |
| `/we-fix-it-for-you` | Implementation tier. Setup sessions + white-glove installs + custom builds. | Take the quiz (report comes first, always) |
| `/keep-it-running` | Retainer tier. Ongoing prescription and optimization. | Book a call |
| `/about` | TJ's credibility: 15 yrs software engineering, 8 yrs direct response marketing, 25+ yrs implementing tech solutions, production AI pipelines running daily. | Take the quiz |
| `/contact` | Minimal contact form. | Submit form |
| `/privacy`, `/terms`, `/disclaimer` | Legal. | none |

The quiz itself lives on separate funnel pages (future project). Quiz CTAs link to a placeholder URL defined in one constant: `QUIZ_URL` in a single config file, so it can be swapped site-wide in one edit.

---

## COPY RULES (non-negotiable)

- `tj-voice.md` governs everything: third-grade reading level, short sentences, incomplete-thought mechanic, never open with "I".
- Every forbidden pattern in `anti-ai-writing-patterns.md` applies: no em dashes, no anaphora, no "it's not X, it's Y", no rhythmic lists of three, no vague hook questions.
- **ChatGPT-or-simpler language only.** Never mention: n8n, APIs, MCP, webhooks, Cowork, agents, automation jargon, or any tool name a non-technical owner wouldn't know. "AI tools" and "ChatGPT" are the ceiling.
- All benefit copy pulls at least one of three levers: **make money, save time, raise quality.**
- Emotional temperature: the only permitted negative note is "competitors are pulling ahead while I bury my head in the sand." Never shame language. Never fear-based urgency.
- **NEVER invent testimonials, client names, statistics, results, or social proof.** Where social proof belongs, insert a visible placeholder: `[TESTIMONIAL — TJ TO SUPPLY]`. Ship with placeholders rather than fabrications.
- Any page showing dollar figures, ROI, or hours-saved claims must include the income disclaimer (see `/disclaimer`) in the footer area of that page: results not typical, not guaranteed, individual results vary, nothing is financial advice.

---

## DESIGN RULES

- `design-tokens.md` is the single source of truth. Do not invent colors, fonts, or spacing outside it.
- Palette summary (full rules in tokens file): near-black `#16181D` for text/headers/dark sections; soft steel `#B6BEC9` for secondary text; electric blue `#2D7FF9` for CTAs, links, and accents ONLY — never backgrounds, never body text; white `#FFFFFF` page background; light gray `#E7E9EC` section backgrounds and borders.
- **Mobile-first.** Traffic is cold Facebook/Instagram on phones. Design at 390px first, scale up.
- Use only photos from `/brand/photos/` and logos from `/brand/logos/`. Never stock photos of people. Never AI-generated faces.
- Design workflow: generate Google Stitch mockups per page FIRST, get TJ's approval, THEN write code. Stitch will use placeholder images; swap in real brand assets during the Next.js build.

---

## TECH STACK AND DEPLOYMENT

- **Framework:** Next.js (App Router) + Tailwind CSS.
- **Hosting:** Cloudflare Workers via the `@opennextjs/cloudflare` adapter. Use `create-cloudflare` (C3) or the OpenNext docs' current setup. Deploy with `wrangler`.
- **CI/CD:** GitHub is the source of truth. Push to `main` triggers deploy via Cloudflare's git-connected builds. Small commits, descriptive messages.
- **Bundle discipline:** the compressed Worker must stay under **3 MiB** (free plan limit). Statically generate every page. The only dynamic code is the form handler route. Check the compressed size wrangler reports after each build; if it creeps toward 3 MiB, flag it to TJ before adding anything.
- **Environment variables (Cloudflare-specific trap):** Cloudflare separates BUILD-TIME and RUNTIME variables. Variables needed during `next build` must be set in the build configuration; runtime secrets (like the GHL webhook URL) go in Worker secrets via `wrangler secret put`. Putting a build-required variable only in runtime settings will fail the deploy. Never hardcode secrets. Never commit `.env*` files — confirm they're in `.gitignore`.

---

## TRACKING

- Google Analytics and Meta tracking are managed only through Google Tag Manager. Load the GTM container with the build-time `NEXT_PUBLIC_GTM_ID`, push site events to `dataLayer`, and do not add direct `gtag.js`, GA4, or Meta Pixel snippets.

---

## FORMS AND GHL INTEGRATION

- **Never** embed GHL iframe forms. Never expose the GHL webhook URL in client-side code.
- All forms POST to an internal route handler (e.g. `/api/lead`) which validates input and forwards server-side to the GHL inbound webhook. Webhook URL lives in the `GHL_WEBHOOK_URL` secret.
- Add **Cloudflare Turnstile** to every form. Verify the Turnstile token server-side in the route handler before forwarding to GHL. Reject on failure.
- After first deploy: send a sample payload through the live form so TJ can map fields and save the trigger in GHL. The build is not done until TJ confirms the test contact appears in GHL.

---

## WORKING STYLE AND GUARDRAILS

1. **Verify before building.** At session start on a fresh machine: confirm GitHub auth, wrangler auth, and the Stitch MCP connection (configured in Codex's MCP settings). If anything fails, stop and report — do not improvise around it.
2. **Ask when facts are missing.** Never invent business details, prices, dates, or claims. If it's not in `/brand/`, ask TJ.
3. **Stop-and-show checkpoints:** after Stitch mockups (before coding), after the local build runs (before deploying), after deploy (before declaring done).
4. **Test end to end.** Done means: live URL loads on mobile, all routes work, form submission lands in GHL, Lighthouse performance is strong on mobile.
5. **No destructive actions** (deleting deployments, force-pushing, rotating secrets) without explicit confirmation.
6. When TJ pastes a screenshot with feedback, treat it as the highest-priority instruction for that element.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
