# EasyClinic sitemap gap — live vs Astro

Generated: 2026-09-11 (Asia/Kolkata)  
Repo: `DarkVertana/Astro-Easyclinic` @ `bf66c2b` (main, clean)  
Sources: `https://www.easyclinic.io/sitemap.xml` → nested ThinkRank sitemaps + `page-sitemap.xml` (115 page URLs; richer than ThinkRank `sitemap-pages.xml` @ 100). Comparison posts pulled from post sitemaps where slug matches competitor/`vs` landings.

## Method

1. **Live paths** — union of `page-sitemap.xml` + `sitemap-pages.xml`; normalize lowercase, strip trailing slash (keep `/`), drop query strings. Added 4 high-intent comparison posts (`easyclinic-vs-*`, `easyclinic-emr-vs-traditional-emr`).
2. **Astro routes** — `src/pages/**/*.astro` (exclude `404`, `devlabs/**`); `getStaticPaths` from `emr-software-in-[market].astro` (`liveGeoMarkets`, `enabled: true` only) + `solutions/[slug].astro`; specialty pages present as files for every `enabled` specialty in `specialty-emr/data.ts`; blog collection under `/blogs/*`.
3. **Covered** — path exists on Astro **or** `vercel.json` permanent redirect destination exists on Astro.
4. **Ignored noise** — embeds/utility: `/demo-form-embed`, `/jarico`, `/kenyademo`, `/newsletter`, `/thank-you`, `/siliconindia`. WP admin/attachments/author/pagination not in page sitemap.

## Counts

| Set | Count | Notes |
|---|---:|---|
| Live marketing pages (page sitemaps) | **118** | ThinkRank pages + Yoast-style `page-sitemap` |
| + comparison posts in scope | **122** | +4 competitor/`vs` URLs |
| Astro public routes | **92** | static + enabled geo + solutions + specialties + 6 blogs |
| **Both** (live covered by Astro/redirect) | **83** | |
| **LIVE_ONLY** (raw) | **39** | includes 6 noise URLs |
| **LIVE_ONLY** (actionable) | **33** | after noise filter |
| **ASTRO_ONLY** | **14** | mostly `/solutions/*`, `/privacy`, `/terms`, Astro blog posts, `/trichology-emr-software` |

### LIVE_ONLY breakdown (33)

| Category | n | Examples |
|---|---:|---|
| Geo comparison (`best-clinic-management-software-*`) | 17 | india, uae, nigeria, ghana… (kenya already shipped) |
| Solutions live root slugs | 4 | `/doctor-clinic-software` → Astro `/solutions/doctor-clinic` |
| Competitor / vs landings | 4 | practo, healthplix, kenyaemr, traditional EMR |
| Specialty slug aliases | 2 | `/physiotherapy-emr-software`, `/trichology-emr` |
| Persona / campaign landings | 5 | ceo/cfo/cmo/ngo/emr-landing-page |
| Hub | 1 | `/resources` |

### ASTRO_ONLY (14)

`/solutions`, `/solutions/{doctor-clinic,polyclinic,clinic-chain,hospital-opd}`, `/privacy`, `/terms`, `/trichology-emr-software`, and 6 `/blogs/*` posts not on the live WP sitemap as those paths.

**Already covered by factory (no gap):** all live `/emr-software-in-*` geos (countries + India cities) and all specialty EMR slugs that match Astro files. Geo EMR factory is **not** the gap — the comparison `best-*` series is.

---

## Top 15 next to build (SEO rank)

Ranked by commercial/SEO intent: Tier-1 geo comparison → India competitor vs → solutions path parity → secondary geo comparison → specialty aliases.  
**Factory column:** `kenya-comparison` = bespoke template used by `/best-clinic-management-software-kenya` (not `geo-emr`); `solutions` / `specialty-emr` = existing factories; `new page` = no factory yet.

| # | Live path | Suggested Astro path | Factory / approach | Why ship next |
|---:|---|---|---|---|
| 1 | `/best-clinic-management-software-india` | same (keep live slug) | **new page** (clone `kenya-comparison` shell; India vendors: Practo, Healthplix, etc.) | Highest-intent geo comparison; India volume |
| 2 | `/best-clinic-management-software-uae` | same | **new page** (kenya-comparison-style) | Tier-1 geo already has `/emr-software-in-uae`; needs comparison sibling |
| 3 | `/best-clinic-management-software-nigeria` | same | **new page** (kenya-comparison-style) | Tier-1 Africa; pairs with `/emr-software-in-nigeria` |
| 4 | `/easyclinic-vs-practo` | same | **new page** | Head-to-head India SERP; feeds India best-* page |
| 5 | `/easyclinic-vs-healthplix` | same | **new page** | Head-to-head India SERP |
| 6 | `/doctor-clinic-software` | `/solutions/doctor-clinic` (+ **301 redirect** from live slug) | **solutions** factory already exists | Path mismatch only — cheapest SEO win |
| 7 | `/polyclinic-software` | `/solutions/polyclinic` (+ 301) | **solutions** | Same |
| 8 | `/clinic-chain-software` | `/solutions/clinic-chain` (+ 301) | **solutions** | Same |
| 9 | `/hospital-opd-nursing-home-software` | `/solutions/hospital-opd` (+ 301) | **solutions** | Same |
| 10 | `/best-clinic-management-software-ghana` | same | **new page** (kenya-comparison-style) | Strong Africa long-tail; geo EMR already live |
| 11 | `/best-clinic-management-software-south-africa` | same | **new page** | Large private-clinic market |
| 12 | `/best-clinic-management-software-uganda` | same | **new page** | East Africa cluster with Kenya |
| 13 | `/easyclinic-vs-kenyaemr` | same | **new page** (or deep-link card on kenya best-* + redirect) | Already argued inside kenya comparison; separate URL still ranks |
| 14 | `/physiotherapy-emr-software` | `/physiotherapy-emr` (+ 301) | **specialty-emr** exists | Alias only — page already shipped |
| 15 | `/trichology-emr` | keep `/trichology-emr-software` or add alias file + 301 from live | **specialty-emr** exists | Live/Astro slug flip — redirect preferred |

### Honourable next (16–20)

16. `/easyclinic-emr-vs-traditional-emr` — **new page** (category education)  
17. `/best-clinic-management-software-tanzania` / `rwanda` / `ethiopia` — **new page** (batch remaining `best-*`)  
18. `/resources` — **new page** (content hub; low urgency vs commercial URLs)  
19. Persona landings (`/ceo-landing-page`, `/cfo-landing-page`, `/cmo-landing-page`, `/ngo-landing-page`, `/emr-landing-page`) — **new page** or deprecate → contact/demo  
20. Remaining `best-*`: maldives, mauritius, qatar, seychelles, somalia, fiji, suriname, trinidad-and-tobago — ship after Tier-1/2

### Explicit non-gaps

- **Geo EMR** (`/emr-software-in-*`): Astro `geo-emr` factory already emits all enabled markets (India + cities, Kenya, UAE, Malaysia, Nigeria, long-tail).  
- **Specialty EMR**: all `enabled: true` specialties have pages; only slug aliases remain.  
- **Capabilities** (`appointment-scheduling-*`, `patient-engagement-*`, payor/revenue/reports): present on both.  
- Redirects already in `vercel.json`: privacy-policy, terms-of-service, curapilot-ai, new-emr-software-in-{maldives,mauritius}, short specialty aliases.

## Suggested ship order (practical)

1. **Redirects batch** (#6–9, #14–15) — same day, zero content.  
2. **India comparison cluster** (#1, #4, #5).  
3. **UAE + Nigeria best-*** (#2–3).  
4. **Secondary Africa best-*** (#10–13).  
5. Persona/`resources` only if paid/campaign needs them.

