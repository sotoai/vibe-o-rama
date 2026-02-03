# Vibe-O-Thon

A dark, cinematic microsite for Cisco's employee AI enablement program. Inspired by [Dala](https://dala.craftedbygc.com/) — modern, premium, with smooth animations.

---

## How to Run

```bash
cd vibe-o-thon
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

For production:
```bash
npm run build
npm start
```

---

## Design Language

- **Dark theme** with near-black backgrounds (#0a0a0b - #171718)
- **Purple accent** (#a855f7) with cyan secondary (#06b6d4)
- **Cinematic glow effects** — blurred gradient orbs, hover glows
- **Smooth animations** — fade up, scale, stagger, 0.4-0.8s durations
- **Glass morphism** — backdrop blur on nav, translucent cards
- **Premium micro-interactions** — hover lift, scale, glow pulse

---

## Project Structure

```
vibe-o-thon/
├── public/
│   └── artifact-01.svg ... artifact-09.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing (/)
│   │   ├── prizes/page.tsx     # Prizes (/prizes)
│   │   └── levels/page.tsx     # Levels (/levels)
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── Section.tsx
│   │   ├── Card.tsx
│   │   ├── Gallery.tsx
│   │   ├── Timeline.tsx
│   │   ├── Badge.tsx
│   │   ├── PageTransition.tsx
│   │   └── index.ts
│   └── lib/
│       └── motion.ts
├── tailwind.config.ts
└── package.json
```

---

## Where to Swap Content

| Content | File |
|---------|------|
| **Gallery images** | Replace `/public/artifact-*.svg` with screenshots |
| **Gallery data** | `src/app/page.tsx` → `artifacts` array |
| **Hero copy** | `src/app/page.tsx` → Hero section |
| **Prize categories** | `src/app/prizes/page.tsx` → `prizeCategories` |
| **Level tiers** | `src/app/levels/page.tsx` → `levels` |
| **CTA links** | Search `href="#"` and replace with real URLs |
| **Footer email** | `src/components/Footer.tsx` |

---

## Customization Knobs

### Colors (`tailwind.config.ts`)

```ts
// Primary dark backgrounds
dark: {
  950: '#0a0a0b',  // Darkest
  900: '#0f0f10',
  800: '#171718',  // Cards
  700: '#1f1f21',  // Borders
}

// Accent purple
accent: {
  500: '#a855f7',  // Primary
  600: '#9333ea',  // Darker
}

// Secondary cyan
secondary: {
  500: '#06b6d4',
}
```

### Animation (`src/lib/motion.ts`)

```ts
duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  page: 0.5,
}

easing = {
  smooth: [0.16, 1, 0.3, 1],
}
```

### Border Radius (`tailwind.config.ts`)

```ts
borderRadius: {
  card: '20px',
  button: '12px',
  badge: '8px',
}
```

---

## Features

- **3 routes** — Home, Prizes, Levels
- **Page transitions** — Framer Motion AnimatePresence
- **Scroll animations** — Fade up, scale, stagger on viewport entry
- **Hover effects** — Card lift, scale, glow
- **Glow orbs** — Blurred gradient backgrounds
- **Glass nav** — Backdrop blur on scroll
- **Reduced motion** — Respects `prefers-reduced-motion`
- **Responsive** — Mobile-first, works on all screens
- **Accessible** — Focus states, semantic HTML

---

## Dependencies

- Next.js 14
- Tailwind CSS 3
- Framer Motion 11
- TypeScript 5

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Mobile responsive.
