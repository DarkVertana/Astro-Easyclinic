/* Country/city EMR factory.
   Shell is identical per geo (hero → clinic types → modules → problems → benefits →
   compliance → FAQ → CTA); only the geo variables and a few local swaps change.
   Copy source: docs/seo-packs/BATCH1_KB_CUSTOM_INDIA_DENTAL.md §3 (India fill) and
   docs/seo-packs/BATCH2_UAE_MY_NG_SPECIALTIES.md §A (UAE, Malaysia, Nigeria fills).
   Only `enabled` markets get a prerendered route. */

import type { ImageMetadata } from 'astro';

/* Hero photo per geo. India ships one; the rest fall back to the facts card until
   India photo hero (webp)
   once the India clinic photo is downloaded (see src/assets/geo-emr/README.md). */
import indiaHero from '../../assets/geo-emr/india-hero.webp';
import kenyaHero from '../../assets/geo-emr/kenya-hero.webp';

export type FaqItem = {
	question: string;
	answer: string;
};

export type HeroFact = {
	value: string;
	label: string;
};

export type ClinicType = {
	title: string;
	copy: string;
	href?: string;
};

export type Module = {
	icon: ModuleIcon;
	title: string;
	copy: string;
	accent?: boolean;
};

export type ModuleIcon =
	| 'chart'
	| 'calendar'
	| 'receipt'
	| 'pill'
	| 'flask'
	| 'graph'
	| 'chat'
	| 'spark';

export type Problem = {
	title: string;
	copy: string;
};

/* Geo variables from the pack's per-geo cheat sheet. */
export type GeoVars = {
	/** route param, e.g. `india` → /emr-software-in-india */
	market: string;
	/** live slug, kept stable for SEO */
	slug: string;
	/** {{geo}} */
	geo: string;
	/** {{geo_adj}} */
	geoAdj: string;
	/** {{local_pay}} */
	localPay: string;
	/** {{local_channels}} */
	localChannels: string;
	/** {{compliance_meta}} — used in the meta description */
	complianceMeta?: string;
	/** {{compliance_note}} — hero note under the lede */
	complianceNote: string;
};

export type GeoMarket = GeoVars & {
	/** false = data is staged, route is not generated yet */
	enabled: boolean;
	seoTitle: string;
	seoDescription: string;
	eyebrow: string;
	title: string;
	lede: string;
	heroFacts: HeroFact[];
	heroBadge: { value: string; label: string };
	/** Optional hero photo. Present = photo hero; absent = facts card in the right slot. */
	heroImage?: ImageMetadata;
	heroImageAlt?: string;
	clinicTypesEyebrow: string;
	clinicTypesTitle: string;
	clinicTypesLede: string;
	clinicTypes: ClinicType[];
	modulesEyebrow: string;
	modulesTitle: string;
	modulesLede: string;
	modules: Module[];
	problemsEyebrow: string;
	problemsTitle: string;
	problemsLede: string;
	problems: Problem[];
	benefitsEyebrow: string;
	benefitsTitle: string;
	benefits: string[];
	complianceEyebrow: string;
	complianceTitle: string;
	complianceLede: string;
	complianceBullets: string[];
	faqs: FaqItem[];
	ctaTitle: string;
	ctaLede: string;
};

/* ---- shared shell (same everywhere; geo only swaps the fills) ---- */

const sharedClinicTypes = (): ClinicType[] => [
	{
		title: 'Solo practice',
		copy: 'EMR, appointments, billing, reminders — light footprint.',
		href: '/solutions/doctor-clinic',
	},
	{
		title: 'Specialist / polyclinic',
		copy: 'Multi-doctor OPD with optional pharmacy & lab.',
		href: '/solutions/polyclinic',
	},
	{
		title: 'Clinic chain',
		copy: 'Shared records, roles, multi-location reporting.',
		href: '/solutions/clinic-chain',
	},
	{
		title: 'NGO / outreach',
		copy: 'Mobile-first records for low-cost programmes.',
	},
];

const sharedModules = ({ localPay, localChannels }: GeoVars): Module[] => [
	{
		icon: 'chart',
		title: 'EMR',
		copy: 'Charts, prescriptions, and history that finish with the visit.',
	},
	{
		icon: 'calendar',
		title: 'Scheduling',
		copy: 'Day calendar, queues, and reminders the front desk can trust.',
	},
	{
		icon: 'receipt',
		title: `Billing & ${localPay}`,
		copy: 'One invoice off the encounter, so collections reconcile the same day.',
	},
	{
		icon: 'pill',
		title: 'Pharmacy & inventory',
		copy: 'Stock, expiry alerts, and dispensing tied to the prescription.',
	},
	{
		icon: 'flask',
		title: 'Lab',
		copy: 'Orders out and results back on the patient record.',
	},
	{
		icon: 'graph',
		title: 'Reports',
		copy: 'Visits, collections, and no-shows without a spreadsheet export.',
	},
	{
		icon: 'chat',
		title: `Patient engagement (${localChannels})`,
		copy: 'Reminders and follow-ups on the channels patients actually read.',
	},
	{
		icon: 'spark',
		title: 'Cura AI (optional)',
		copy: 'Documentation assist during the consult; the clinician stays in charge.',
		accent: true,
	},
];

const sharedProblems = (): Problem[] => [
	{
		title: 'Paper and evening catch-up',
		copy: 'Notes and Rx spill past the last patient.',
	},
	{
		title: 'Fragmented tools',
		copy: 'Calendar, billing, and pharmacy don’t share one patient.',
	},
	{
		title: 'No operational visibility',
		copy: 'Owners can’t see visits, collections, or no-shows cleanly.',
	},
];

const sharedBenefits = (): string[] => [
	'Digital patient records',
	'Smart scheduling & queues',
	'Simplified billing & revenue',
	'Inventory & pharmacy control',
	'Analytics for decisions',
];

type MarketInput = GeoVars & {
	enabled?: boolean;
	seoTitle?: string;
	seoDescription: string;
	title: string;
	lede: string;
	heroFacts: HeroFact[];
	heroBadge?: { value: string; label: string };
	heroImage?: ImageMetadata;
	heroImageAlt?: string;
	clinicTypes?: ClinicType[];
	modules?: Module[];
	modulesLede?: string;
	problems?: Problem[];
	benefits?: string[];
	complianceTitle?: string;
	complianceLede?: string;
	complianceBullets: string[];
	faqs: FaqItem[];
	ctaTitle?: string;
	ctaLede?: string;
};

/** Builds a geo page from the shared shell + the geo's own fills. */
function createMarket(input: MarketInput): GeoMarket {
	const { geo, geoAdj } = input;

	return {
		market: input.market,
		slug: input.slug,
		geo,
		geoAdj,
		localPay: input.localPay,
		localChannels: input.localChannels,
		complianceMeta: input.complianceMeta,
		complianceNote: input.complianceNote,
		enabled: input.enabled ?? false,

		seoTitle: input.seoTitle ?? `Clinic Management & EMR Software in ${geo} | EasyClinic`,
		seoDescription: input.seoDescription,

		eyebrow: geo,
		title: input.title,
		lede: input.lede,
		heroFacts: input.heroFacts,
		heroBadge: input.heroBadge ?? { value: 'Cloud-first', label: input.complianceNote },
		heroImage: input.heroImage,
		heroImageAlt: input.heroImageAlt ?? `A clinician using EasyClinic in a clinic in ${geo}`,

		clinicTypesEyebrow: 'Who it’s for',
		clinicTypesTitle: `Clinics we set up across ${geo}`,
		clinicTypesLede:
			'Pick the shape closest to your practice — the same platform scales up from a single room.',
		clinicTypes: input.clinicTypes ?? sharedClinicTypes(),

		modulesEyebrow: 'Platform',
		modulesTitle: `What ${geoAdj} clinics run day to day`,
		modulesLede:
			input.modulesLede ??
			'One clinic management stack so the front desk, consulting room, and till stay in sync.',
		modules: input.modules ?? sharedModules(input),

		problemsEyebrow: 'Why switch',
		problemsTitle: 'Why switch now',
		problemsLede: 'Three things clinics tell us before they move off paper and part-tools.',
		problems: input.problems ?? sharedProblems(),

		benefitsEyebrow: 'Benefits',
		benefitsTitle: 'What changes after go-live',
		benefits: input.benefits ?? sharedBenefits(),

		complianceEyebrow: 'Compliance',
		complianceTitle: input.complianceTitle ?? `Compliance status in ${geo}`,
		complianceLede: input.complianceLede ?? 'We share live capability in demo — no checkbox marketing.',
		complianceBullets: input.complianceBullets,

		faqs: input.faqs,
		ctaTitle: input.ctaTitle ?? `See EasyClinic on a ${geoAdj} clinic workflow`,
		ctaLede:
			input.ctaLede ??
			`Book a demo — we’ll map EMR, scheduling, and billing to how you practise in ${geo}.`,
	};
}

/* ---- countries ---- */

const india = createMarket({
	enabled: true,
	market: 'india',
	slug: 'emr-software-in-india',
	geo: 'India',
	geoAdj: 'Indian',
	localPay: 'UPI, cards, cash',
	localChannels: 'WhatsApp, SMS, email',
	complianceMeta: 'Indian compliance work in progress',
	complianceNote: 'Indian compliance work in progress.',
	seoDescription:
		'Cloud EMR and clinic management software in India — appointments, billing, pharmacy, and analytics for solo doctors, polyclinics, and clinic chains. Indian compliance work in progress. Book a free demo.',
	title: 'Clinic management & EMR software for modern clinics in India',
	lede: 'Cloud EMR, appointments, billing, pharmacy, inventory, and analytics — for solo doctors, polyclinics, and clinic chains across India.',
	heroFacts: [
		{ value: 'Cloud EMR', label: 'Charts that finish with the visit' },
		{ value: 'UPI, cards, cash', label: 'Billing that reconciles' },
		{ value: 'Cura AI', label: 'Optional documentation assist' },
	],
	heroBadge: { value: 'Honest compliance', label: 'ABDM & DPDP status shared in demo' },
	heroImage: indiaHero,
	heroImageAlt: 'A clinician writing up a consultation in the EasyClinic EMR on a laptop',
	complianceBullets: [
		'ABDM / ABHA workflows: in progress',
		'DPDP Act 2023 alignment: in progress',
		'GST-compliant invoicing: expanding by plan — confirm in demo',
		'NABH: accreditation is organizational; software supports documentation-style controls',
	],
	faqs: [
		{
			question: 'What does clinic management software cost in India?',
			answer:
				'Plans scale by doctors and locations. See Pricing for the current tiers, or book a demo and we’ll quote your setup.',
		},
		{
			question: 'Is EasyClinic ABDM compliant?',
			answer:
				'ABDM / ABHA work is in progress. We won’t checkbox-claim it — ask in the demo and we’ll show the current status live.',
		},
		{
			question: 'EMR vs EHR vs clinic management software — what’s the difference?',
			answer:
				'EMR is the clinic’s own chart. EHR is a portable record shared across providers. Clinic management software is the EMR plus operations: appointments, billing, pharmacy, and reports.',
		},
		{
			question: 'Does it work offline?',
			answer:
				'EasyClinic is cloud-first. Any offline mode is confirmed in the demo for your plan.',
		},
		{
			question: 'Can it raise GST invoices?',
			answer:
				'Billing handles invoicing; GST capability is expanding by plan, so confirm the current fit in your demo.',
		},
	],
});

/* Staged fills — data is ready, routes stay off until each page is signed off.
   Kenya values come from the Batch 1 per-geo cheat sheet; UAE / Malaysia / Nigeria
   from Batch 2 §A. */

const uae = createMarket({
	market: 'uae',
	slug: 'emr-software-in-uae',
	geo: 'UAE',
	geoAdj: 'UAE',
	localPay: 'Cards, local gateways',
	localChannels: 'WhatsApp, SMS, email',
	complianceMeta: 'Clinic licensing & data controls — confirm DHA/MOHAP needs in demo',
	complianceNote: 'Built for multi-Emirate clinics; regulatory fit confirmed in demo.',
	seoDescription:
		'Cloud EMR and clinic management software in the UAE — appointments, billing, pharmacy, and analytics for clinics across Dubai, Abu Dhabi, and Sharjah. Book a free demo.',
	title: 'Clinic management & EMR software for modern clinics in the UAE',
	lede: 'Cloud EMR, appointments, billing, pharmacy, and analytics — for private clinics, speciality centres, polyclinics, and groups across Dubai, Abu Dhabi, Sharjah, and the wider Emirates.',
	heroFacts: [
		{ value: 'Cloud EMR', label: 'Charts that finish with the visit' },
		{ value: 'Multi-Emirate ops', label: 'One dashboard across sites' },
		{ value: 'Cura AI', label: 'Optional documentation assist' },
	],
	complianceTitle: 'Compliance and data controls in the UAE',
	complianceLede: 'We map to your Emirate and facility type in demo — no checkbox marketing.',
	complianceBullets: [
		'Role-based access, encryption, audit logs on cloud infrastructure',
		'DHA / MOHAP / facility requirements: confirm current fit in demo',
		'VAT handling in billing: confirm by plan in demo',
		'Teleconsult + digital follow-ups available in-product',
	],
	faqs: [
		{
			question: 'Is this for a small clinic in Dubai or a large group?',
			answer: 'Both — modules scale by doctors and locations.',
		},
		{
			question: 'Can we run multiple branches across the Emirates?',
			answer: 'Yes — one dashboard for Dubai, Abu Dhabi, Sharjah, and other sites.',
		},
		{
			question: 'Is there an AI EMR option in the UAE?',
			answer: 'Cura AI is optional documentation assist; the clinician stays in charge.',
		},
		{
			question: 'Do you support WhatsApp and SMS?',
			answer: 'Yes — reminders and updates go out on the channels patients read.',
		},
		{
			question: 'Is pharmacy and inventory included?',
			answer: 'Yes — stock, expiry alerts, and dispensing.',
		},
		{
			question: 'How do we start?',
			answer: 'Book a free demo; we’ll map EasyClinic to your Emirate workflow.',
		},
	],
});

const malaysia = createMarket({
	market: 'malaysia',
	slug: 'emr-software-in-malaysia',
	geo: 'Malaysia',
	geoAdj: 'Malaysian',
	localPay: 'Cards, local e-pay',
	localChannels: 'WhatsApp, SMS, email',
	complianceMeta: 'PDPA-aware operations — confirm status in demo',
	complianceNote: 'PDPA-aware operations — confirm status in demo.',
	seoDescription:
		'Cloud EMR and clinic management software in Malaysia — appointments, billing, pharmacy, and analytics for solo doctors, polyclinics, and clinic chains. Book a free demo.',
	title: 'Clinic management & EMR software for modern clinics in Malaysia',
	lede: 'Cloud EMR, appointments, billing, pharmacy, inventory, and analytics — for solo doctors, polyclinics, and clinic chains across Malaysia.',
	heroFacts: [
		{ value: 'Cloud EMR', label: 'Charts that finish with the visit' },
		{ value: 'WhatsApp reminders', label: 'Fewer no-shows' },
		{ value: 'Cura AI', label: 'Optional documentation assist' },
	],
	complianceBullets: [
		'Personal Data Protection Act (PDPA): alignment work — confirm status in demo',
		'Role-based access, encryption, audit logs',
		'Billing and tax handling (SST wording): confirm by plan in demo',
		'Telehealth: available; facility rules confirmed in demo',
	],
	faqs: [
		{
			question: 'What does it cost in Malaysia?',
			answer: 'Plans scale by doctors and locations. See Pricing, or book a demo for a quote.',
		},
		{
			question: 'Are you PDPA compliant?',
			answer:
				'We discuss current controls and the roadmap in the demo — no checkbox claim.',
		},
		{
			question: 'Can we run multiple locations?',
			answer: 'Yes — shared records and central reporting.',
		},
		{ question: 'Do you send WhatsApp reminders?', answer: 'Yes.' },
		{
			question: 'Do you have pharmacy and lab modules?',
			answer: 'Yes — optional modules you can add as you grow.',
		},
	],
});

const nigeria = createMarket({
	market: 'nigeria',
	slug: 'emr-software-in-nigeria',
	geo: 'Nigeria',
	geoAdj: 'Nigerian',
	localPay: 'Transfers, cards, local e-pay',
	localChannels: 'WhatsApp, SMS, email',
	complianceMeta: 'NDPA-aware operations; HMO workflows — confirm in demo',
	complianceNote: 'WhatsApp-first patient comms; NDPA status confirmed in demo.',
	seoDescription:
		'Cloud EMR and clinic management software in Nigeria — appointments, billing, HMO-friendly claims workflows, pharmacy, and analytics. Book a free demo.',
	title: 'EMR and clinic management software that keeps Nigerian clinic ops — and HMO claims — tidy',
	lede: 'Cloud EMR, appointments, billing, pharmacy, and analytics for solo clinics, polyclinics, and chains — with workflows aimed at cleaner HMO documentation.',
	heroFacts: [
		{ value: 'HMO-ready docs', label: 'Cleaner claim documentation' },
		{ value: 'WhatsApp reminders', label: 'Fewer no-shows' },
		{ value: 'Cura AI', label: 'Optional documentation assist' },
	],
	complianceTitle: 'Compliance and payor reality in Nigeria',
	complianceBullets: [
		'Nigeria Data Protection Act (NDPA): confirm current alignment in demo',
		'HMO / payor claim packs: documentation and reporting support; connector status in demo',
		'Role-based access, encryption, audit logs',
		'Local payment rails: confirm by plan in demo',
	],
	faqs: [
		{
			question: 'Does it help with HMO claims?',
			answer:
				'It gives you stronger encounter and billing documentation for claims hygiene. Specific HMO connectors are confirmed in the demo.',
		},
		{
			question: 'Are you NDPA compliant?',
			answer: 'We share status and controls in the demo — no checkbox claim.',
		},
		{
			question: 'What about unreliable internet?',
			answer:
				'EasyClinic is cloud-tuned for real-world bandwidth; any offline mode is confirmed in demo.',
		},
		{ question: 'Do you support WhatsApp?', answer: 'Yes — reminders and follow-ups.' },
		{
			question: 'Can we run multiple branches?',
			answer: 'Yes — central records and reporting.',
		},
		{
			question: 'What does it cost?',
			answer: 'Pricing scales by users and locations. See Pricing, or book a demo for a quote.',
		},
	],
});

const kenya = createMarket({
	enabled: true,
	heroImage: kenyaHero,
	heroImageAlt: 'Clinician providing care in a modern clinic setting',
	market: 'kenya',
	slug: 'emr-software-in-kenya',
	geo: 'Kenya',
	geoAdj: 'Kenyan',
	localPay: 'M-Pesa, cards, cash',
	localChannels: 'WhatsApp, SMS, email',
	complianceMeta: 'SHA / SHIF and eTIMS work in progress',
	complianceNote: 'SHA / SHIF and eTIMS work in progress.',
	seoDescription:
		'Cloud EMR and clinic management software in Kenya — appointments, M-Pesa-friendly billing, pharmacy, and analytics for solo doctors, polyclinics, and clinic chains. Book a free demo.',
	title: 'Clinic management & EMR software for modern clinics in Kenya',
	lede: 'Cloud EMR, appointments, billing, pharmacy, inventory, and analytics — for solo doctors, polyclinics, and clinic chains across Kenya.',
	heroFacts: [
		{ value: 'Cloud EMR', label: 'Charts that finish with the visit' },
		{ value: 'M-Pesa', label: 'Billing that reconciles' },
		{ value: 'Cura AI', label: 'Optional documentation assist' },
	],
	complianceBullets: [
		'SHA / SHIF claim workflows: in progress — confirm in demo',
		'eTIMS invoicing: in progress — confirm in demo',
		'Role-based access, encryption, audit logs',
		'Data protection controls: current status shared in demo',
	],
	faqs: [
		{
			question: 'What does it cost in Kenya?',
			answer: 'Plans scale by doctors and locations. See Pricing, or book a demo for a quote.',
		},
		{
			question: 'Do you support SHA / SHIF claims?',
			answer: 'Work is in progress; we show the current status live in the demo.',
		},
		{
			question: 'Does billing handle M-Pesa?',
			answer: 'Billing records M-Pesa, card, and cash against the encounter — confirm rails by plan in demo.',
		},
		{
			question: 'Can we run multiple branches?',
			answer: 'Yes — shared records, roles, and central reporting.',
		},
		{
			question: 'Do you send WhatsApp reminders?',
			answer: 'Yes — reminders and follow-ups on WhatsApp, SMS, and email.',
		},
	],
});

/* India cities inherit the India fill; only the geo noun changes (pack §3 cheat sheet).
   Staged until each city page is signed off. */
const INDIA_CITIES = ['Bangalore', 'Chennai', 'Delhi NCR', 'Hyderabad', 'Mumbai'];

const cityMarket = (city: string): GeoMarket => {
	const market = city.toLowerCase().replace(/\s+/g, '-');

	return createMarket({
		market,
		slug: `emr-software-in-${market}`,
		geo: city,
		geoAdj: city,
		localPay: india.localPay,
		localChannels: india.localChannels,
		complianceMeta: india.complianceMeta,
		complianceNote: india.complianceNote,
		seoDescription: india.seoDescription.replace('in India', `in ${city}`),
		title: `Clinic management & EMR software for modern clinics in ${city}`,
		lede: india.lede.replace('across India', `across ${city}`),
		heroFacts: india.heroFacts,
		heroBadge: india.heroBadge,
		heroImage: india.heroImage,
		heroImageAlt: india.heroImageAlt,
		complianceBullets: india.complianceBullets,
		faqs: india.faqs.map((faq) => ({
			...faq,
			question: faq.question.replace('in India', `in ${city}`),
		})),
	});
};

export const geoMarkets: GeoMarket[] = [
	india,
	kenya,
	uae,
	malaysia,
	nigeria,
	...INDIA_CITIES.map(cityMarket),
];

export const geoMarketByParam: Record<string, GeoMarket> = Object.fromEntries(
	geoMarkets.map((entry) => [entry.market, entry])
);

/** Markets that ship a route today. */
export const liveGeoMarkets = geoMarkets.filter((entry) => entry.enabled);
