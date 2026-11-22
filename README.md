# Portfolio — Jacem Ben Ahmed

Personal portfolio for a Software Engineer (full-stack · AI integration · DevOps). Static site, no build step — deploys as-is on Vercel.

## Edit content in one place

**`assets/js/data.js`** holds the profile, projects, experience, skills and competitive programming data.
The home page, projects page, the Signy / Edity / Fylora / Daberly project pages and the command palette are all generated from it.

- **Add a project:** copy an object in `PROJECTS`. Set `featured: true` to show it on the home page.
- **Add screenshots / logos:** drop files in `assets/img/<project>-imgs/`, set `cover` / `logo`, and list each screen in `gallery` as `{ src, icon, title, text }` (icon = Boxicons class). Set `device: 'phone'` for mobile-only apps to use phone frames. Missing images show a placeholder.

## Pages

| Page | Notes |
|------|-------|
| `index.html` | Hero, experience, projects, skills, about/CP, contact |
| `projects.html` | All projects with search + role filter (`?q=docker`, `?for=ai`) |
| `projects/digital-signature.html`, `edity.html`, `fylora.html`, `daberly.html` | Project pages rendered from `data.js` |
| `projects/evalia.html` | Hand-written case study (uses `evalia.css`) |
| `about.html`, `contact.html` | Redirect to the matching home-page section |

## Smart features

- **Command palette:** <kbd>Ctrl/⌘ K</kbd> or <kbd>/</kbd> searches sections, projects, skills and actions (copy email, download CV, toggle theme).
- **"Hiring for…" lens:** re-ranks projects, dims unrelated work, highlights matching experience and skill groups, and writes a one-line summary. The link can be shared, e.g. `https://jacem.vercel.app/?for=devops`.
- **Skill inspector:** click a skill to see which projects use it.
- **Other:** live local time and availability status, copy-email toast, image lightbox, light/dark theme, reduced-motion support.

## Files

- `assets/css/site.css`: design system (Geist + Instrument Serif, zinc + violet, light/dark)
- `assets/js/main.js`: all behaviour
- `assets/css/styles.css`, `assets/css/evalia.css`: content styles for the hand-written case studies
