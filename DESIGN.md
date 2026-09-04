# EasyClinic marketing UI craft

Colors and Inter stay locked. New components take layout cues from Dribbble, Awwwards, and godly.design — not clones of the homepage, and not generic Bootstrap SaaS.

## Locked

- `--brand-blue #0080f6`, `--brand-blue-dark #006fd4`, `--brand-teal #04bdaf`
- `--navy #0a2540`, `--ink #181818`, `--muted #474747`
- `--brand-wash #e9f3fe`, `--brand-wash-deep #d7e8fc`, `--surface #ffffff`
- Inter via Astro Font, `--page-max 1320px`
- Header + Footer chrome, 8px buttons, 1.5px borders
- `btn-solid` / `btn-ghost`

## Steal from those galleries (without their palettes)

- **Eyebrow + huge type.** Small teal/navy label above a clamp() H1. Lots of air.
- **Asymmetric heroes.** Copy-heavy left, a floating UI artifact on the right (tickets, bento, device frame) — not the homepage product shot every time.
- **Bento grids.** Uneven 2×2 / 3-span cards for capabilities and stats. Large radius (20–28px), wash or navy fills, one accent cell.
- **Pill controls.** Segmented toggles like the annual/quarterly billing control.
- **Featured object.** One plan, one story, one capability gets a navy panel + teal ribbon. The rest stay quiet.
- **Dark punctuation.** A navy band between light sections (testimonials, proof stats). Do not make the whole page dark.
- **Micro-UI.** Check lists, status chips, tiny dashboards inside cards — product-feeling, not stock icons dumped in a row.
- **Motion.** IntersectionObserver reveals already on home. Keep 0.6–0.7s ease, respect `prefers-reduced-motion`. No endless marquee, no scroll-jacking.

## Do not

- New fonts, gradients that leave the wash, glassmorphism soup, random accent colors
- Copy-paste homepage Features widgets onto every page
- WordPress “and more…” walls — turn them into bento / accordion / chips
