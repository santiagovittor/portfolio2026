# Santiago Vittor | Portfolio

Hi, I’m Santiago Vittor 👋  
Based in Buenos Aires, Argentina 🇦🇷

This repo contains my personal portfolio website.

I build frontend-first products with React/Next.js and TypeScript, and I also like the “system side” of things: shipping features end to end, wiring APIs, tightening UX details, and making sure performance + SEO are solid.

This site is a small example of that approach:
- a clean portfolio experience with a simple data model
- a contact system that delivers emails reliably
- an AI assistant route that can answer questions about my background and projects (without going off the rails) 🤖

## Stack

- Next.js (App Router)
- TypeScript
- Sass
- Vercel

Extras:
- Resend (contact emails)
- Gemini API (assistant)

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm start
```

## Project structure

```txt
app/          routes (home, about, portfolio, contact, assistant)
components/   UI components (navbar, layout, etc.)
lib/          data + content (projects, cv, fun facts)
styles/       global sass
public/       images + svg icons
```

## Config (env)

Create a `.env.local`:

```bash
# contact
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=your_email

# assistant
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-3-flash-preview
```

## Links

- Live: https://santiagovittorweb.vercel.app
- Repo: https://github.com/santiagovittor/portfolio2026
