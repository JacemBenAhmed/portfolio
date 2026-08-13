# Portfolio — Jacem BEN AHMED

Personal portfolio for a Software Engineer (full-stack + DevOps).

## Pages

- `index.html` — single-page landing (hero, about, experience, education, projects, skills, CP, contact)
- `projects.html` — all projects with screenshots and links to detail pages
- `about.html`, `contact.html` — standalone pages
- `projects/digital-signature.html` — Digital Signature Solution (Signy)
- `projects/bureau-dordre.html` — Bureau d'Ordre Management
- `projects/cicd-pipeline.html` — CI/CD Pipeline Automation
- `projects/daberly.html` — Daberly e-commerce platform
- `projects/testy.html` — Testy DevSecOps platform

## Features

- Light / dark theme (persisted in `localStorage`, respects system preference)
- Responsive layout with ScrollReveal animations
- Mobile drawer navigation with theme toggle on every page
- Contact form opens the user's mail client (set `CONTACT_EMAIL` in `assets/js/main.js`)
- Scroll-to-top button

## How to use

- Open `index.html` in a browser, or serve the folder with any static server.
- Set your real email address in `assets/js/main.js` (`CONTACT_EMAIL`).
- Add project screenshots in `assets/img/`.

## Customize

- Change the accent color via `--first-color` and the gradients in `assets/css/styles.css`.
- Update the TCPC 2026, Codeforces, and LeetCode links/stats in the Competitive Programming section of `index.html`.
