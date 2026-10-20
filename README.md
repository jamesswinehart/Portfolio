# James Swinehart's Portfolio

Personal portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

## Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # All site styles
│   └── games/                # Connectegories puzzles
├── components/
│   ├── ContentBlocks/        # One component per section (Personal/ holds Writing, Hungry Tiger, Art)
│   ├── MobileMenuOverlay.tsx # Site navigation (the MENU list)
│   ├── PhotoGallery.tsx      # Image/video carousel with lightbox
│   └── LinkButton.tsx        # Black button for project links
└── assets/                   # Images imported by components
```

## Adding a section

1. Create a component in `src/components/ContentBlocks/` using `Section`.
2. Render it in `src/components/ContentWindow.tsx`.
3. Add it to `MENU` in `MobileMenuOverlay.tsx`.

## Analytics

- **Page views:** Vercel Web Analytics (`<Analytics />` in `src/app/layout.tsx`). View them in the Vercel dashboard under the project's Analytics tab.
- **Connectegories plays:** the game posts `started` and `finished` events to `src/app/api/connectegories/event/route.ts`, which counts them in Upstash Redis (only on the production site). Counts live in the hash `connectegories:<puzzle id>`, with daily starts in `connectegories:<puzzle id>:started_by_day`. New puzzles must be added to `PUZZLE_IDS` in that route to be counted.

## Contact

James Swinehart - [LinkedIn](https://www.linkedin.com/in/jamesswinehart/)
