# Core design brief (source of truth for new pages)

Study and match: Home, Cura AI (`/curapilot`), Pricing, About us, Contact.

## Locked
- Colors: `--brand-blue #0080f6`, `--brand-blue-dark #006fd4`, `--brand-teal #04bdaf`, `--navy #0a2540`, `--ink #181818`, `--muted #474747`, `--brand-wash #e9f3fe`, `--brand-wash-deep #d7e8fc`, `--surface #ffffff`, `--surface-tint #eff6ff`, `--border #e5e7eb`
- Inter, `--page-max 1320px`
- Buttons: `btn-solid` / `btn-ghost`, prefer 8–10px radius, 1.5px borders
- Cards: ~20px radius, `1px solid var(--border)`, quiet navy shadows

## Inner page pattern (prefer Marketing.astro + PageHero + SectionHead)
1. Wash hero: blue uppercase eyebrow → clamp H1 → muted 1.125rem lede | right artifact (image or micro-UI) with optional float chip + caption badge + deco rings/dots
2. Next section: wash background + white scallop panel (`border-radius: 24px 24px 0 0`)
3. Centered `SectionHead` for section titles
4. One navy punctuation band (stats/proof/testimonials) — do not make whole page dark
5. Shared `Cta.astro` last; Faq when objections help
6. Modern imagery: use real assets under `src/assets/` or add optimized webp/jpg; avoid stock-icon rows — micro-UI chips and product-feeling cards

## Do not
- New fonts, off-palette gradients, glassmorphism soup
- Clone homepage Features widgets onto every page
- WordPress “and more…” walls — use bento / accordion / chips
- Bypass Marketing.astro unless there is a strong reason (Home/Pricing are exceptions)

## Login CTA
Always `https://app.easyclinic.io/`
