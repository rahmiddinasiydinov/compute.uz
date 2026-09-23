# compute.uz — Build Plan

Reference design: `assets/compute_design.png`. Logo: `assets/logo.jpg` (copied to `public/logo.jpg`).

## Stack (installed)

| Purpose | Package |
|---|---|
| Framework | next 16 (App Router, `src/`, TS, Turbopack) |
| Styling | tailwindcss 4 (`@tailwindcss/postcss`) |
| Timeline / scroll animations | gsap + @gsap/react (`useGSAP`), ScrollTrigger plugin |
| Simple React animations | motion (`motion/react`) — enter, hover, layout, AnimatePresence |
| Smooth scroll | lenis (synced with GSAP ticker + ScrollTrigger.update) |
| i18n | next-intl (locales: `uz`, `ru`, `en`) |
| Icons | lucide-react |
| Class utils | clsx + tailwind-merge (`cn()` helper) |

## Decisions

- Multi-page routes: `/`, `/services`, `/about`, `/contact`
- Locale-prefixed routing: `/[locale]/...` with `uz` default
- Contact form posts to a Route Handler that forwards to a Telegram bot (env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- Dark theme only (matches mockup). Palette: near-black navy bg, electric blue / cyan accents, glass-card borders.

## Planned structure

```
src/
  app/
    [locale]/
      layout.tsx          # html/body, fonts, NextIntlClientProvider, SmoothScroll, Navbar, Footer
      page.tsx            # Home: Hero, Services grid, Why Us, How It Works, CTA
      services/page.tsx
      about/page.tsx
      contact/page.tsx
    api/contact/route.ts  # POST -> Telegram sendMessage
    globals.css           # Tailwind 4 @theme tokens (colors, fonts, radii)
  components/
    layout/   Navbar, Footer, Container
    ui/       Button, Badge, Card, SectionHeading
    sections/ Hero, ServicesGrid, WhyUs, HowItWorks, CtaBanner
    motion/   SmoothScroll (Lenis), Reveal (motion), gsap helpers
  i18n/
    routing.ts, request.ts, navigation.ts
  lib/
    cn.ts, telegram.ts
  messages/
    uz.json, ru.json, en.json
middleware.ts               # next-intl locale detection
```

## Animation strategy

- **Motion**: fade/slide-in on section reveal (`whileInView`), button/card hover, nav mobile menu (`AnimatePresence`)
- **GSAP + ScrollTrigger**: hero 3D-logo float + glow, floating icon cards parallax, "How it works" step line draw, stagger on service cards
- **Lenis**: global smooth scroll, `lenis.on('scroll', ScrollTrigger.update)`; disable on `prefers-reduced-motion`
- All animation components are `"use client"`; pages stay server components

## Build order (done 2026-09-23)

1. Tokens in `globals.css`, fonts (Google: e.g. Manrope / Inter), `cn()`
2. i18n scaffolding (routing, middleware, messages, `[locale]` layout)
3. Layout: Navbar + Footer + SmoothScroll
4. UI primitives: Button, Badge, Card
5. Home sections (static, no animation)
6. Services / About / Contact pages + Telegram route handler
7. Animations pass (Motion reveals, then GSAP hero + scroll effects)
8. Polish: responsive, SEO metadata per locale, OG image, favicon from logo

## Env

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## Notes

- Next 16: `src/proxy.ts` replaces middleware; locale read via `next/root-params` in `src/i18n/request.ts` (no `setRequestLocale`).
- Logo: `public/logo.png` generated from `assets/logo.jpg` with white background removed (centre of the C is transparent, cyan glow added in CSS).
- Fonts: Manrope (display) + Inter (body), latin + cyrillic subsets.
- Contact form: `POST /api/contact` -> Telegram. Needs `.env.local` with `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- Site constants (phone, telegram handle, email) live in `src/lib/site.ts`.
- SEO: per-page metadata via `src/lib/seo.ts` (`buildMetadata`), strings in `messages/*.json` under `meta.pages`; JSON-LD in `src/lib/schema.ts`; OG images `public/og/{uz,ru,en}.png` generated from logo + hero title (regenerate if copy changes); `sitemap.ts`, `robots.ts`, `manifest.ts` in `src/app`.
