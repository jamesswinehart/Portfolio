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

## Contact

James Swinehart - [LinkedIn](https://www.linkedin.com/in/jamesswinehart/)
