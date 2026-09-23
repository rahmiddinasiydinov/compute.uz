# compute.uz

IT services website. Next.js 16, Tailwind 4, GSAP, Motion, Lenis, next-intl (uz / ru / en).

## Run on a new machine

Requirements: Node.js 20 or newer (built with Node 24), npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site picks a language from the browser; use `/`, `/ru`, `/en` directly.

Production:

```bash
npm run build
npm start
```

## Contact form (Telegram)

Contacts shown on the site (phone, email, Telegram, channel) are in `src/lib/site.ts`.

Create `.env.local` in the project root:

```
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=123456789
```

Without these the form shows the error state. Phone, email and Telegram handle shown on the site live in `src/lib/site.ts`.

## Where things are

- `messages/{uz,ru,en}.json` — all text, including SEO titles under `meta.pages`
- `src/app/[locale]/` — pages (home, services, about, contact)
- `src/components/sections/` — page sections; `src/components/motion/` — animation helpers
- `src/lib/seo.ts`, `src/lib/schema.ts` — metadata and JSON-LD
- `public/og/` — Open Graph images per language
- `assets/` — original design mockup and logo
- `PLAN.md` — build notes
# compute.uz
