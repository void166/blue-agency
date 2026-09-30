# BLUE Agency

## Two experiences

The original BLUE Studio remains the default homepage. Open **MENU → BLUE PLAYGROUND** for the alternate horizontal collage, or link directly to `/#playground`. The Playground menu returns to BLUE Studio.

Playground supports wheel and trackpad scrolling, mouse dragging, native touch panning, arrow buttons, and keyboard arrows when the canvas is focused. Project cards open detail dialogs, the gallery has manual selection and pause controls, and service tabs show each discipline. Reduced-motion preferences skip the entrance and automatic gallery changes.

Drag stickers, the BLUE sculpture, photos, and large headlines to rearrange the collage. Drag empty space to pan the canvas. A short click still opens each object's action; dragging suppresses that click. Use **RESET** to restore the layout. Focus a sticker/photo or the sculpture and press **Alt + arrow keys** to move it (add Shift for a larger step). Touch gestures on objects move them; touch gestures on empty space scroll horizontally.

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
