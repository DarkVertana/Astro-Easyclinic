/* Long-tail best-clinic-management-software-* factory.
   Shared shell; market fills change. Maldives is Batch 8a pack-faithful and easy to overwrite. */

import kenyaHero from '../../assets/geo-emr/kenya-hero.webp';
import type { MarketComparison } from './types';

type MarketFill = {
	market: string;
	geo: string;
	geoAdj: string;
	localPay: string;
	complianceNote: string;
	places: string;
	schemeLabel: string;
	schemeHonesty: string;
	peers: string[];
	shortlistRows: [string, string, ...string[]][];
	shortlistLede?: string;
	contextTitle?: string;
	contextLede?: string;
	contextBody?: string;
	triggers?: string[];
	vendors: { title: string; copy: string }[];
	wins?: { title: string; copy: string }[];
	verdict: string;
	faqExtra?: { question: string; answer: string }[];
	faqsOverride?: { question: string; answer: string }[];
	ctaTitle?: string;
	ctaLede?: string;
	heroTitle?: string;
	heroLede?: string;
	heroFacts?: { value: string; label: string }[];
	metaDescription?: string;
};

const defaultTriggers = (schemeLabel: string) => [
	'Paper charts slowing every visit',
	'No WhatsApp / SMS reminders',
	'Owner can’t see visits and collections cleanly',
	`${schemeLabel} billing hygiene unclear`,
	'No teleconsult option for connected patients',
];

const defaultWins = (fill: MarketFill) => [
	{
		title: 'Cura AI + telemedicine',
		copy: 'Documentation assist and teleconsult in one cloud stack for connected private clinics.',
	},
	{
		title: 'WhatsApp-first engagement',
		copy: 'Reminders and Rx share patients actually read — fewer no-shows without a custom build.',
	},
	{
		title: 'Cloud multi-site without a custom build',
		copy: 'Shared records and roles across locations — live in days, not a months-long build.',
	},
	{
		title: `Honest ${fill.schemeLabel} status`,
		copy: fill.schemeHonesty,
	},
];

function createMarketComparison(fill: MarketFill): MarketComparison {
	const peerHeaders = ['Capability', 'EasyClinic', ...fill.peers];
	const emrHref = `/emr-software-in-${fill.market}`;

	return {
		market: fill.market,
		enabled: true,
		geo: fill.geo,
		geoAdj: fill.geoAdj,
		meta: {
			title: `Best Clinic Management Software ${fill.geo} (2026 Comparison) — EasyClinic`,
			description:
				fill.metaDescription ??
				`Compare clinic management software in ${fill.geo} — EasyClinic vs ${fill.peers.join(', ')} on Cura AI, WhatsApp, telemedicine, and ${fill.schemeLabel}. ${fill.localPay}.`,
		},
		hero: {
			eyebrow: `${fill.geo} · 2026`,
			title:
				fill.heroTitle ?? `Best clinic management software in ${fill.geo} — 2026 comparison`,
			lede:
				fill.heroLede ??
				`For clinics across ${fill.places} — Cura AI, WhatsApp, telemedicine, and billing hygiene that respects ${fill.schemeLabel} without fake certification claims.`,
			note: fill.complianceNote,
			facts: fill.heroFacts ?? [
				{ value: 'Cura AI', label: 'Live assist' },
				{ value: 'WhatsApp', label: 'Patient messaging' },
				{ value: fill.schemeLabel, label: 'Confirm in demo' },
			],
			badgeStrong: 'Private clinics',
			badgeSub: `Cura AI · WhatsApp · ${fill.schemeLabel} honesty`,
			imageAlt: `A clinician providing care in a modern clinic in ${fill.geo}`,
			image: kenyaHero,
		},
		context: {
			title: fill.contextTitle ?? `What ${fill.geoAdj} clinics need`,
			lede:
				fill.contextLede ??
				'Patients book by call or walk-in, expect digital reminders, and still lose minutes to paper — one cloud system should end that.',
			body:
				fill.contextBody ??
				`Local pay reality: ${fill.localPay}. Shortlist peers stay thin and fair — EasyClinic plus ${fill.peers.length} regional/generic options. Full demos beat feature matrices.`,
			triggers: fill.triggers ?? defaultTriggers(fill.schemeLabel),
		},
		shortlist: {
			lede: fill.shortlistLede ?? 'Match model (SaaS vs self-host vs regional suite) before features.',
			headers: peerHeaders,
			rows: fill.shortlistRows,
			ariaLabel: `${fill.geo} clinic software shortlist comparison`,
		},
		vendors: fill.vendors,
		wins: fill.wins ?? defaultWins(fill),
		switchCost: {
			signs: fill.triggers ?? defaultTriggers(fill.schemeLabel),
			costLede: `See Pricing for published tiers; demo for a ${fill.geo} quote. Confirm ${fill.schemeLabel} and local pay rails on the same call.`,
			links: [
				{ label: 'See pricing', href: '/pricing' },
				{ label: `${fill.geo} EMR ops page`, href: emrHref },
				{ label: 'Cura AI', href: '/curapilot' },
				{ label: 'All resources', href: '/resources' },
			],
		},
		verdict: fill.verdict,
		faqs:
			fill.faqsOverride ??
			[
				{ question: `Best CMS in ${fill.geo}?`, answer: fill.verdict },
				{ question: `${fill.schemeLabel}?`, answer: fill.schemeHonesty },
				{
					question: 'WhatsApp / telemedicine?',
					answer: 'Yes on EasyClinic — core engagement and telehealth modules.',
				},
				{
					question: 'Local payments?',
					answer: `${fill.localPay}. Confirm partner status in demo.`,
				},
				{
					question: 'Cost?',
					answer: `See Pricing; demo for a ${fill.geo}-specific quote.`,
				},
				...(fill.faqExtra ?? []),
			],
		cta: {
			title: fill.ctaTitle ?? `See EasyClinic on a ${fill.geoAdj} clinic workflow`,
			lede:
				fill.ctaLede ??
				`Book a demo — charts, WhatsApp, and confirm ${fill.schemeLabel} fit for your facility.`,
		},
	};
}

/* ---- Maldives: Batch 8a pack fidelity (easy to overwrite) ---- */

const maldives = createMarketComparison({
	market: 'maldives',
	geo: 'Maldives',
	geoAdj: 'Maldivian',
	localPay: 'Cards, cash; Aasandha billing hygiene',
	complianceNote:
		'Aasandha integration for EasyClinic: confirm in demo. MocDoc advertises Aasandha — shortlist them if direct claims are the Monday gate.',
	places: 'Malé and the atolls',
	schemeLabel: 'Aasandha',
	schemeHonesty:
		'Confirm EasyClinic Aasandha status in demo; MocDoc advertises integration. Offline/island: cloud-first — Ksatria on-prem may fit weak-internet hospitals better.',
	metaDescription:
		'Compare clinic management software in the Maldives — EasyClinic vs MocDoc, MoCal, and Ksatria on Cura AI, island telemedicine, WhatsApp, and billing.',
	heroTitle: 'Best clinic management software in the Maldives — 2026 comparison',
	heroLede:
		'For clinics across Malé and the atolls — judged on Cura AI, WhatsApp, island telemedicine, and billing hygiene (including Aasandha reality).',
	heroFacts: [
		{ value: 'Cura AI', label: 'Live documentation assist' },
		{ value: 'Island telemedicine', label: 'Same clinic OS' },
		{ value: 'WhatsApp', label: 'Reminders patients read' },
	],
	contextTitle: 'What Maldivian clinics are shopping for',
	contextLede:
		'One cloud system for records, billing, pharmacy, WhatsApp, and telemedicine across islands — instead of paper plus scattered chats.',
	contextBody:
		'If direct Aasandha claim handling is the top priority, keep MocDoc in the final two. If weak-internet island hospitals need on-prem, keep Ksatria. EasyClinic is the AI + WhatsApp + telemedicine all-rounder for connected private clinics.',
	triggers: [
		'Island patients needing teleconsults',
		'WhatsApp chaos at the desk',
		'Aasandha / insurance claim friction',
		'Charts unfinished after close',
		'Multi-site records across atolls',
	],
	peers: ['MocDoc', 'MoCal', 'Ksatria'],
	shortlistLede: 'Get current MVR quotes. Confirm Aasandha and connectivity explicitly.',
	shortlistRows: [
		['Cloud SaaS', 'Yes', 'Cloud', 'Cloud (booking tilt)', 'Cloud or on-prem'],
		['Cura AI', 'Live', '— / check', '—', '—'],
		['Island telemedicine', 'In-product', 'Check', 'Limited (booking focus)', 'Check'],
		['WhatsApp messaging', 'Native style', 'Check', 'SMS / portal tilt', 'Check'],
		['Aasandha claims', 'Confirm in demo', 'Advertises integration (live)', 'Not the focus', 'Check'],
		['Offline / weak internet', 'Cloud-first — confirm', 'Check', 'Check', 'On-prem fit for island sites'],
		['Multi-site', 'Yes', 'Yes', 'Check', 'Hospital-oriented'],
		['Pricing', 'Plans + quote', 'Quote', 'Quote', 'Quote'],
	],
	vendors: [
		{
			title: 'MocDoc',
			copy: 'Closest cloud rival; worth a hard look if direct Aasandha claim handling is the top gate (advertises Aasandha integration). EasyClinic answers with Cura AI, WhatsApp-first engagement, and island telemedicine in one clinic OS — confirm Aasandha either way.',
		},
		{
			title: 'MoCal',
			copy: 'Suits doctors who mainly need online appointment booking. EasyClinic is the fuller clinic OS (EMR, billing, pharmacy, WhatsApp, telehealth) when the whole floor has to move.',
		},
		{
			title: 'Ksatria',
			copy: 'Fits hospitals / sites that need on-premises software for island locations with weak internet. EasyClinic wins for connected private clinics that want SaaS AI + WhatsApp without running local servers — confirm connectivity assumptions first.',
		},
	],
	wins: [
		{ title: 'Cura AI on OPD days', copy: 'Documentation assist that finishes with the visit.' },
		{ title: 'WhatsApp reminders / Rx share', copy: 'Messages patients actually read — fewer no-shows.' },
		{
			title: 'Telemedicine across islands in the same stack',
			copy: 'Island teleconsults in the same clinic OS — confirm bandwidth assumptions in demo.',
		},
		{
			title: 'Honest Aasandha / offline status',
			copy: 'No checkbox marketing — Aasandha and weak-internet posture confirmed in demo.',
		},
	],
	verdict:
		'Connected private clinics that want AI, WhatsApp, and island telemedicine → EasyClinic. Aasandha-first → keep MocDoc shortlisted. Weak-internet on-prem hospitals → keep Ksatria.',
	faqsOverride: [
		{
			question: 'Best CMS in Maldives in 2026?',
			answer:
				'EasyClinic for AI + WhatsApp + island telemedicine; MocDoc if Aasandha must be proven day one; Ksatria if on-prem/offline island hospitals dominate.',
		},
		{
			question: 'Aasandha?',
			answer: 'Confirm EasyClinic status in demo; MocDoc advertises integration.',
		},
		{
			question: 'Telemedicine across atolls?',
			answer: 'Yes on EasyClinic — confirm bandwidth assumptions.',
		},
		{ question: 'WhatsApp?', answer: 'Yes.' },
		{
			question: 'Offline island sites?',
			answer: 'Cloud-first; Ksatria on-prem may fit weak-internet hospitals better.',
		},
		{ question: 'Cost (MVR)?', answer: 'Demo quote; rivals often quote-based.' },
	],
	ctaTitle: 'See EasyClinic on a Maldivian clinic day',
	ctaLede: 'Book a demo — EMR, WhatsApp, island telemedicine, and Aasandha fit.',
});

/* ---- other long-tail markets (geo-emr honesty; thin fair peers) ---- */

const mauritius = createMarketComparison({
	market: 'mauritius',
	geo: 'Mauritius',
	geoAdj: 'Mauritian',
	localPay: 'Cards, local e-pay',
	complianceNote: 'Confirm status in demo (Port Louis / Curepipe belong on this page only).',
	places: 'Port Louis and Curepipe',
	schemeLabel: 'Local facility rules',
	schemeHonesty: 'Local facility and tax rules — confirm status in demo. No invented regulator checkboxes.',
	peers: ['MocDoc', 'Smart Hospital Manager'],
	shortlistRows: [
		['Model', 'Ready SaaS', 'Regional cloud', 'Self-hosted'],
		['Cura AI', 'Live', '—', '—'],
		['Telemedicine', 'Yes', 'Check', 'Check'],
		['WhatsApp', 'Native style', 'Check', 'Portal/reminders'],
		['Local e-pay', 'Confirm in demo', 'Check', 'Check'],
		['Pharmacy/lab', 'Modules', 'Check', 'Check'],
		['Multi-site', 'Yes', 'Check', 'Check'],
	],
	vendors: [
		{
			title: 'MocDoc',
			copy: 'Regional cloud suite — compare AI depth and WhatsApp against EasyClinic; both need local compliance clarity in demo.',
		},
		{
			title: 'Smart Hospital Manager',
			copy: 'Self-hosted path for teams that want server control. EasyClinic for SaaS AI + WhatsApp without ops overhead.',
		},
	],
	verdict:
		'Modern private clinics in Port Louis / Curepipe → EasyClinic. Self-host mandates → keep Smart Hospital in the shortlist; compare MocDoc on module breadth in demo.',
});

const qatar = createMarketComparison({
	market: 'qatar',
	geo: 'Qatar',
	geoAdj: 'Qatari',
	localPay: 'Cards, local gateways',
	complianceNote: 'Facility and MoPH needs confirmed in demo.',
	places: 'Doha, Al Wakrah, and Lusail',
	schemeLabel: 'MoPH / facility rules',
	schemeHonesty: 'Facility and MoPH needs — confirm status in demo. No certification claim.',
	peers: ['MocDoc', 'SoftClinic GenX'],
	shortlistRows: [
		['Model', 'Ready SaaS', 'Regional cloud', 'Cloud / on-prem'],
		['Cura AI', 'Live', '—', '—'],
		['Telemedicine', 'Yes', 'Check', 'Check'],
		['WhatsApp / SMS', 'Native style', 'Check', 'Check'],
		['MoPH / facility', 'Confirm in demo', 'Check', 'Check'],
		['Local gateways', 'Confirm in demo', 'Check', 'Check'],
		['Multi-site', 'Yes', 'Check', 'Check'],
	],
	vendors: [
		{
			title: 'MocDoc',
			copy: 'Regional cloud suite common in GCC shortlists — compare AI depth and engagement against EasyClinic; confirm MoPH/facility fit either way.',
		},
		{
			title: 'SoftClinic GenX',
			copy: 'Cloud/on-prem flexibility. EasyClinic when you want proven SaaS AI + WhatsApp after confirming facility rules and payment gateways.',
		},
	],
	verdict:
		'Connected private clinics in Doha → EasyClinic after MoPH/facility confirmation. Keep MocDoc / SoftClinic when on-prem or regional suite preferences dominate.',
});

const seychelles = createMarketComparison({
	market: 'seychelles',
	geo: 'Seychelles',
	geoAdj: 'Seychellois',
	localPay: 'Cards, cash',
	complianceNote: 'Local compliance status confirmed in demo.',
	places: 'Victoria, Mahé, and Praslin',
	schemeLabel: 'Local facility rules',
	schemeHonesty: 'Facility and tax rules: confirm by plan in demo. No invented regulator checkboxes.',
	peers: ['Smart Hospital Manager', 'MocDoc'],
	shortlistRows: [
		['Model', 'Ready SaaS', 'Self-hosted', 'Regional cloud'],
		['Cura AI', 'Live', '—', '—'],
		['Telemedicine', 'Yes', 'Check', 'Check'],
		['SMS / email', 'Yes', 'Portal/reminders', 'Check'],
		['Island multi-site', 'Yes', 'Check', 'Check'],
		['Local billing', 'Confirm in demo', 'Check', 'Check'],
	],
	vendors: [
		{
			title: 'Smart Hospital Manager',
			copy: 'Self-hosted lean for facilities that want server control across islands. EasyClinic wins when connectivity is steady and you want SaaS AI without ops.',
		},
		{
			title: 'MocDoc',
			copy: 'Regional cloud suite — compare module breadth and reminders against EasyClinic; confirm local compliance either way.',
		},
	],
	verdict:
		'Connected private clinics across Mahé → EasyClinic. Self-host or regional-suite preferences → keep Smart Hospital / MocDoc in the shortlist.',
});

const somalia = createMarketComparison({
	market: 'somalia',
	geo: 'Somalia',
	geoAdj: 'Somali',
	localPay: 'Transfers; mobile money confirm in demo',
	complianceNote: 'Confirm in demo; no invented regulator checkboxes.',
	places: 'Mogadishu and growing private clinics',
	schemeLabel: 'Local compliance',
	schemeHonesty:
		'Confirm in demo — no invented regulator checkboxes. Mobile money / transfers: confirm by plan in demo.',
	peers: ['Smart Hospital Manager', 'Ksatria'],
	shortlistRows: [
		['Model', 'Ready SaaS', 'Self-hosted', 'Cloud / on-prem'],
		['Cura AI', 'Live', '—', '—'],
		['Telemedicine', 'Yes', 'Check', 'Optional'],
		['WhatsApp', 'Native style', 'Portal/reminders', 'Check'],
		['Mobile money', 'Confirm in demo', 'Check', 'Often flexible'],
		['Multi-site', 'Yes', 'Check', 'Check'],
	],
	vendors: [
		{
			title: 'Smart Hospital Manager',
			copy: 'Self-hosted path for offline-leaning or low-connectivity facilities. EasyClinic for connected clinics that want SaaS AI + WhatsApp after confirming payment rails.',
		},
		{
			title: 'Ksatria',
			copy: 'Flexible cloud/on-prem regional player — compare against EasyClinic on AI + WhatsApp. Choose when on-prem is non-negotiable; EasyClinic when you want modern cloud ops after confirming transfers/MoMo.',
		},
	],
	verdict:
		'Connected private clinics → EasyClinic after confirming transfers/mobile money. Offline or on-prem mandates → keep Smart Hospital / Ksatria in the shortlist.',
});

const fiji = createMarketComparison({
	market: 'fiji',
	geo: 'Fiji',
	geoAdj: 'Fijian',
	localPay: 'Cards, cash',
	complianceNote: 'Local compliance status confirmed in demo.',
	places: 'Suva, Nadi, and Lautoka',
	schemeLabel: 'Local facility rules',
	schemeHonesty: 'Facility and tax rules: confirm by plan in demo. No invented regulator checkboxes.',
	peers: ['Smart Hospital Manager', 'MocDoc'],
	shortlistRows: [
		['Model', 'Ready SaaS', 'Self-hosted', 'Regional cloud'],
		['Cura AI', 'Live', '—', '—'],
		['Telemedicine', 'Yes', 'Check', 'Check'],
		['SMS / email', 'Yes', 'Portal/reminders', 'Check'],
		['Island / multi-site', 'Yes', 'Check', 'Check'],
		['Local billing', 'Confirm in demo', 'Check', 'Check'],
	],
	vendors: [
		{
			title: 'Smart Hospital Manager',
			copy: 'Self-hosted lean for outer-island or low-connectivity setups. EasyClinic when Suva/Nadi connectivity is steady and you want SaaS AI + reminders.',
		},
		{
			title: 'MocDoc',
			copy: 'Regional cloud suite — compare modules and engagement against EasyClinic; confirm local facility rules either way.',
		},
	],
	verdict:
		'Connected private clinics in Suva / Nadi → EasyClinic. Self-host or regional-suite preferences → keep Smart Hospital / MocDoc in the shortlist.',
});

const suriname = createMarketComparison({
	market: 'suriname',
	geo: 'Suriname',
	geoAdj: 'Surinamese',
	localPay: 'Cards, transfers, cash',
	complianceNote: 'Local compliance status confirmed in demo.',
	places: 'Paramaribo and private clinics nationwide',
	schemeLabel: 'Local facility rules',
	schemeHonesty: 'Facility and tax rules: confirm by plan in demo. No invented regulator checkboxes.',
	peers: ['Smart Hospital Manager', 'SoftClinic GenX'],
	shortlistRows: [
		['Model', 'Ready SaaS', 'Self-hosted', 'Cloud / on-prem'],
		['Cura AI', 'Live', '—', '—'],
		['Telemedicine', 'Yes', 'Check', 'Check'],
		['WhatsApp', 'Native style', 'Portal/reminders', 'Check'],
		['Local billing', 'Confirm in demo', 'Check', 'Check'],
		['Multi-site', 'Yes', 'Check', 'Check'],
	],
	vendors: [
		{
			title: 'Smart Hospital Manager',
			copy: 'Self-hosted control for teams that want to run their own stack. EasyClinic for SaaS AI + WhatsApp without server ops.',
		},
		{
			title: 'SoftClinic GenX',
			copy: 'Cloud/on-prem flexibility. EasyClinic when you want proven cloud clinic OS faster — after confirming local payment rails.',
		},
	],
	verdict:
		'Connected private clinics → EasyClinic. On-prem or self-host mandates → keep SoftClinic / Smart Hospital in the shortlist.',
});

const trinidadAndTobago = createMarketComparison({
	market: 'trinidad-and-tobago',
	geo: 'Trinidad and Tobago',
	geoAdj: 'Trinidad and Tobago',
	localPay: 'Cards, transfers, cash',
	complianceNote: 'Local compliance status confirmed in demo.',
	places: 'Port of Spain, San Fernando, and Tobago',
	schemeLabel: 'Local facility rules',
	schemeHonesty: 'Facility and tax rules: confirm by plan in demo. No invented regulator checkboxes.',
	peers: ['MocDoc', 'Smart Hospital Manager'],
	shortlistRows: [
		['Model', 'Ready SaaS', 'Regional cloud', 'Self-hosted'],
		['Cura AI', 'Live', '—', '—'],
		['Telemedicine', 'Yes', 'Check', 'Check'],
		['WhatsApp / SMS', 'Native style', 'Check', 'Portal/reminders'],
		['Local billing', 'Confirm in demo', 'Check', 'Check'],
		['Multi-site', 'Yes', 'Check', 'Check'],
	],
	vendors: [
		{
			title: 'MocDoc',
			copy: 'Regional cloud suite — compare AI depth and WhatsApp against EasyClinic; confirm local compliance either way.',
		},
		{
			title: 'Smart Hospital Manager',
			copy: 'Self-hosted path for teams that want server control. EasyClinic for SaaS AI + WhatsApp without ops overhead.',
		},
	],
	verdict:
		'Connected private clinics in Port of Spain / San Fernando → EasyClinic. Self-host or regional-suite preferences → keep Smart Hospital / MocDoc in the shortlist.',
});

export const marketComparisons: MarketComparison[] = [
	maldives,
	mauritius,
	qatar,
	seychelles,
	somalia,
	fiji,
	suriname,
	trinidadAndTobago,
];

export const liveMarketComparisons = marketComparisons.filter((m) => m.enabled);

export const marketComparisonByParam: Record<string, MarketComparison> = Object.fromEntries(
	marketComparisons.map((m) => [m.market, m])
);

/** Compact list for /resources hub — avoids exploding the footer */
export const comparisonIndex = [
	{ geo: 'Kenya', href: '/best-clinic-management-software-kenya' },
	{ geo: 'India', href: '/best-clinic-management-software-india' },
	{ geo: 'UAE', href: '/best-clinic-management-software-uae' },
	{ geo: 'Nigeria', href: '/best-clinic-management-software-nigeria' },
	{ geo: 'Ghana', href: '/best-clinic-management-software-ghana' },
	{ geo: 'South Africa', href: '/best-clinic-management-software-south-africa' },
	{ geo: 'Uganda', href: '/best-clinic-management-software-uganda' },
	{ geo: 'Tanzania', href: '/best-clinic-management-software-tanzania' },
	{ geo: 'Rwanda', href: '/best-clinic-management-software-rwanda' },
	{ geo: 'Ethiopia', href: '/best-clinic-management-software-ethiopia' },
	...liveMarketComparisons.map((m) => ({
		geo: m.geo,
		href: `/best-clinic-management-software-${m.market}`,
	})),
];
