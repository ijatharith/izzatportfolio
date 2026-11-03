# Izzat — Ideas into reality.

Personal portfolio built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger (`@gsap/react`) and Lucide icons.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Editing content

All content lives in `src/data/` — no component changes needed.

| File | What it controls |
|---|---|
| `profile.ts` | Name, email, location, hero copy, current activity, social links, CV, portrait, About text, education and timeline |
| `projects.ts` | Projects. Add an object to publish a project; listing, filters, detail page, sitemap and related links update automatically |
| `experiments.ts` | Lab entries |
| `skills.ts` | Areas of exploration, "Currently exploring", interests, capabilities |
| `tools.ts` | Uses page |

Empty values are hidden on the site rather than shown as placeholders:

- **Social links** — add LinkedIn / GitHub / Instagram URLs in `profile.socials`.
- **CV** — put the PDF in `public/documents/` and set `profile.cvUrl`.
- **Portrait** — put an image in `public/images/profile/` and set `profile.portrait`.
- **Education / timeline** — fill `profile.education` and `profile.timeline`; the sections appear once they have entries.
- **Project year, images, links and case-study fields** — optional fields on each project (`year`, `thumbnail`, `gallery`, `problem`, `role`, `results`, `githubUrl`, `liveUrl`, …). Until a `thumbnail` is set, the project shows an illustrative SVG cover labelled as such.

## Design system

- Tokens in `src/app/globals.css` (`@theme`): paper `#FAFAF8`, ink `#171717`, muted `#737373`, accent `#2563EB`, line `#E5E7EB`, wash `#EFF6FF`.
- Identity device: **outline = idea, solid ink = reality.** Used by the hero tagline, the footer tagline (fills on scroll) and the status meter (Proposal → Experimental → In progress → Completed).
- Type: Geist Sans for everything, Geist Mono for bracketed metadata.

## Animation

GSAP setup lives in `src/lib/gsap.ts` (plugin registration and shared motion tokens). Reusable pieces in `src/components/animations/`:

- `Reveal` — one ScrollTrigger per group; `data-reveal`, `data-reveal="mask"`, `data-reveal="image"`.
- `Intro` — page-header load sequence.
- `ScrubText` — word-by-word scroll reveal.
- `ScrollProgress`, `PageTransition` (via `app/template.tsx`).

Every animation runs inside `gsap.matchMedia()` and is skipped under `prefers-reduced-motion`. Content is fully visible without JavaScript.

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel (framework preset: Next.js).
2. Set environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — your final domain (optional on Vercel).
   - `RESEND_API_KEY` — enables the contact form.
   - `CONTACT_FROM_EMAIL` — a sender on a domain verified in Resend.
   - `CONTACT_TO_EMAIL` — optional; defaults to the profile email.
3. Add your custom domain in Vercel → Settings → Domains.

### Contact form notes

- Validation runs in the browser and again on the server (`src/lib/contact.ts`).
- Spam protection: hidden honeypot field and a minimum time-on-form check.
- Rate limiting: 5 messages per IP per 10 minutes, held in memory per server instance. For stricter limits across instances, back it with a shared store (e.g. Upstash Redis).
- Without `RESEND_API_KEY` the form is disabled and says so — it never shows a fake success.
