# Geo EMR hero photos

One photo per geo, wired through the optional `heroImage` field on a market entry in
`src/components/geo-emr/data.ts`. A market with `heroImage` renders the photo hero
(`geo-emr/Hero.astro`); a market without one falls back to the hero facts card, so staged
geos keep working until their own shot lands.

## Adding a geo photo

1. Download a royalty-free clinic/clinician photo (Unsplash or Pexels — both allow
   commercial use without attribution). Landscape or near-square, ≥1200px wide.
2. Convert to webp next to the other optimised assets:

   ```sh
   cwebp -q 82 india-hero.jpg -o india-hero.webp
   # or: ffmpeg -i india-hero.jpg -c:v libwebp -quality 82 india-hero.webp
   ```

3. Import it in `data.ts` and set it on the market:

   ```ts
   import indiaHero from '../../assets/geo-emr/india-hero.webp';
   // ...
   heroImage: indiaHero,
   heroImageAlt: 'A clinician writing up a consultation in the EasyClinic EMR on a laptop',
   ```

India's cities (`INDIA_CITIES`) inherit India's photo automatically via `cityMarket()`.

## Pending

`india-hero.webp` — **not downloaded yet.** India currently points at
`src/assets/about/hero.png` (clinician on a laptop in the EMR) as an interim, which means
/about and /emr-software-in-india share a photo. Drop a dedicated Indian-clinic shot here
and repoint the `indiaHero` import in `data.ts`.
