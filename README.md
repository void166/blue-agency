# BLUE Agency

React + Vite version of the BLUE creative agency landing page. The design follows the visual rhythm of VICIO's investment page: a continuous frame, oversized headlines, data grid, image mosaic, concept cards, service cards, FAQ, and a strong closing call to action. All BLUE imagery is original concept material.

The opening BLUE loader, hero reveal, and two-sided rotating disc play on each page load. The frame lettering follows scroll position, so its direction changes when you scroll back up. Reduced-motion settings skip the loader and nonessential animation.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. To create the production files:

```bash
pnpm build
```

The production site is written to `dist/`. The four portfolio entries are clearly marked as concepts. Replace them with BLUE's real work, and add the agency's actual contact address before publishing.

## Files

- `src/App.jsx` — React page and interactions
- `src/style.css` — responsive visual design
- `public/images/` — original BLUE concept visuals
- `public/favicon.svg` — tab icon
