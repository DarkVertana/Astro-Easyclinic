/* Batch 8b persona landings — thin, role-specific, no WP hype walls. */
import type { PersonaPage } from './types';

export const ceo: PersonaPage = {
	slug: 'ceo-landing-page',
	meta: {
		title: 'Clinic CEO Software — Multi-Location Visibility | EasyClinic',
		description:
			'EasyClinic for clinic CEOs — multi-location visibility, SOP consistency, dashboards, and growth without legacy drag.',
	},
	hero: {
		eyebrow: 'For clinic CEOs',
		title: 'See every location clearly — without living in the WhatsApp group',
		lede: 'One clinic management platform for owners who need KPIs, consistent SOPs, and a path to the next branch — not another spreadsheet pack.',
		facts: [
			{ value: 'Multi-location view' },
			{ value: 'SOP rollout' },
			{ value: 'Owner dashboards' },
		],
	},
	outcomes: {
		items: [
			{ title: 'Dashboards that match your questions', copy: 'Visits, collections, no-shows — clinic and org-wide.' },
			{ title: 'Role-based access', copy: 'Accountability without sharing every chart.' },
			{ title: 'SOP consistency', copy: 'Push process changes across sites without a roadshow.' },
			{ title: 'Faster site launches', copy: 'Standard config so new clinics don’t reinvent ops.' },
			{ title: 'Migration off legacy', copy: 'Structured cutover so history isn’t stuck in the old box.' },
			{ title: 'Optional Cura AI', copy: 'Doctors finish notes with the visit; you get cleaner data.' },
		],
	},
	notForYou: {
		title: 'Not for you if…',
		copy: 'You only need a single-doctor chart with no interest in reporting or a second site — start at the doctor clinic solution instead.',
		href: '/solutions/doctor-clinic',
		linkLabel: 'Doctor clinic solution',
	},
	faqs: [
		{ question: 'CEO vs doctor login?', answer: 'Role-based views; clinical charts stay appropriately scoped.' },
		{ question: 'Multi-country?', answer: 'Cloud multi-location; confirm compliance needs in demo.' },
		{ question: 'How to start?', answer: 'Demo on your branch count and KPI list.' },
	],
	cta: {
		title: 'Map EasyClinic to your locations',
		lede: 'Book a demo — owner dashboards and branch rollout on your workflow.',
	},
};

export const cfo: PersonaPage = {
	slug: 'cfo-landing-page',
	meta: {
		title: 'Clinic CFO Software — Billing, Claims & Close | EasyClinic',
		description:
			'EasyClinic for clinic CFOs — visit-tied billing, payments, claims hygiene, inventory visibility, and cleaner month-end.',
	},
	hero: {
		eyebrow: 'For clinic CFOs',
		title: 'Billing and close that don’t need a weekend archaeology dig',
		lede: 'Visit-tied invoices, payment tracking, claims status, and reports CFOs can trust — without chasing three systems.',
		note: 'Market-specific claim connectors — confirm in demo (never promise “zero rejections”).',
		facts: [
			{ value: 'Visit-tied billing' },
			{ value: 'End-of-day reports' },
			{ value: 'Claims hygiene', label: 'Confirm connectors' },
		],
	},
	outcomes: {
		items: [
			{ title: 'Automated billing from the visit', copy: 'Fewer missed charges and manual invoice rebuilds.' },
			{ title: 'Payments in one flow', copy: 'Track collections without a side ledger.' },
			{ title: 'Day and month close', copy: 'End-of-day snapshots; faster month-end with inventory positions.' },
			{ title: 'Claims visibility', copy: 'Status from submit toward settlement — connector depth in demo.' },
			{ title: 'Inventory costing signal', copy: 'Stock visibility that finance can actually use.' },
			{ title: 'Access-controlled finance reports', copy: 'Right eyes on revenue and AR.' },
		],
	},
	notForYou: {
		title: 'Not for you if…',
		copy: 'You need a full ERP/GL replacement — EasyClinic is clinic ops + billing; confirm accounting export needs in demo.',
	},
	faqs: [
		{
			question: 'Replace our accountant’s tools?',
			answer: 'Complements clinic billing/ops; exports/integrations confirm in demo.',
		},
		{
			question: 'Claims 100% acceptance?',
			answer: 'No vendor should promise that; we improve hygiene and visibility.',
		},
		{ question: 'Multi-entity?', answer: 'Org-wide reporting; structure confirm in demo.' },
	],
	cta: {
		title: 'Walk finance through a real close',
		lede: 'Book a demo — billing, payments, and reports on your clinic shape.',
	},
};

export const cmo: PersonaPage = {
	slug: 'cmo-landing-page',
	meta: {
		title: 'Clinical Growth & Engagement — EasyClinic',
		description:
			'EasyClinic for clinical and growth leads — faster EMR, patient engagement, referrals, retention, and care-quality visibility.',
	},
	hero: {
		eyebrow: 'For clinical & growth leads',
		title: 'Care quality and patient engagement in the same system as the chart',
		lede: 'Fast EMR for doctors, WhatsApp-era engagement for patients, and enough analytics to see what actually retains — without a separate marketing stack bolted on.',
		facts: [
			{ value: '30-sec Rx' },
			{ value: 'Engagement reminders' },
			{ value: 'Care + growth signal' },
		],
	},
	outcomes: {
		items: [
			{ title: 'Specialty-ready EMR', copy: 'Templates doctors will actually use.' },
			{ title: 'Cura AI assist', copy: 'Documentation speed without surrendering clinical judgment.' },
			{ title: 'Engagement that patients read', copy: 'WhatsApp/SMS/email reminders and follow-ups.' },
			{ title: 'Referral & retention visibility', copy: 'See who returns — and who doesn’t.' },
			{ title: 'Flow from check-in to checkout', copy: 'Less lobby chaos, clearer handoffs.' },
			{ title: 'Trend visuals', copy: 'Vitals/labs that support clinical decisions.' },
		],
	},
	notForYou: {
		title: 'Not for you if…',
		copy: 'You need a full CRM/ad platform — EasyClinic covers clinic-native engagement, not ad tech.',
	},
	faqs: [
		{ question: 'Marketing automation suite?', answer: 'Clinic engagement + analytics, not ad tech.' },
		{ question: 'Doctor adoption?', answer: 'Point-and-click EMR + optional AI assist.' },
		{ question: 'Proof?', answer: 'Demo on your specialty + reminder workflows.' },
	],
	cta: {
		title: 'See engagement beside the chart',
		lede: 'Book a demo — EMR speed and patient follow-ups together.',
		secondaryHref: '/curapilot',
		secondaryLabel: 'Cura AI',
	},
};

export const ngo: PersonaPage = {
	slug: 'ngo-landing-page',
	meta: {
		title: 'NGO Clinic Software — Transparent Reports | EasyClinic',
		description:
			'EasyClinic for NGO and mission clinics — patient records, scheduling, and clear reports that help show fund impact responsibly.',
	},
	hero: {
		eyebrow: 'For NGO & mission clinics',
		title: 'Clinic reports donors can understand — without drowning staff in paperwork',
		lede: 'Mobile-friendly records, scheduling, and transparent operational reports for resource-limited teams — so care time isn’t lost to admin.',
		note: 'Donor “impact” claims stay operational (visits, services, inventory) — not fabricated outcome metrics.',
		facts: [
			{ value: 'Clear ops reports' },
			{ value: 'Role-based access' },
			{ value: 'Lightweight clinic OS' },
		],
	},
	outcomes: {
		items: [
			{ title: 'Dashboards for stewardship', copy: 'Visits, services, and spend signals you can share appropriately.' },
			{ title: 'Role-based access', copy: 'Field teams vs HQ visibility.' },
			{ title: 'Less paperwork', copy: 'Histories, appointments, plans in one place.' },
			{ title: 'Reminders that reduce no-shows', copy: 'WhatsApp/SMS where connectivity allows.' },
			{ title: 'Inventory awareness', copy: 'Fewer stock surprises on outreach days.' },
			{ title: 'Optional Cura AI', copy: 'Faster notes when clinician time is scarce.' },
		],
	},
	notForYou: {
		title: 'Not for you if…',
		copy: 'You need a full fundraising CRM — EasyClinic is clinic ops; fundraising tools stay adjacent.',
	},
	faqs: [
		{ question: 'Donor portals?', answer: 'Operational reports/export; confirm sharing workflow in demo.' },
		{ question: 'Offline outreach?', answer: 'Confirm offline/mobile mode for your programme in demo.' },
		{ question: 'Pricing for NGOs?', answer: 'Demo quote; discuss NGO posture on the call.' },
	],
	cta: {
		title: 'Show how the clinic actually runs',
		lede: 'Book a demo — records, scheduling, and transparent ops reporting.',
	},
};

export const emrLanding: PersonaPage = {
	slug: 'emr-landing-page',
	meta: {
		title: 'EMR Software for Doctors & Clinics — EasyClinic',
		description:
			'EasyClinic EMR — 30-second prescriptions, specialty templates, optional Cura AI, history, and clinic ops around the chart.',
	},
	hero: {
		eyebrow: 'EMR',
		title: 'EMR doctors finish with the consult — not after closing time',
		lede: 'Fast prescriptions, specialty-ready charts, optional Cura AI, and the scheduling/billing spine so the record isn’t an island.',
		facts: [
			{ value: '30-sec Rx' },
			{ value: 'Specialty templates' },
			{ value: 'Optional Cura AI' },
		],
	},
	outcomes: {
		items: [
			{ title: 'Point-and-click charting', copy: 'Speed without sacrificing structure.' },
			{ title: 'Specialty forms', copy: 'Tuned to how each doctor works.' },
			{ title: 'Cura AI assist', copy: 'Three-click documentation help; clinician signs.' },
			{ title: 'Summaries & trends', copy: 'History and visuals when the next patient is waiting.' },
			{ title: 'Team collaboration', copy: 'Handoffs without hunting files.' },
			{ title: 'Security basics', copy: 'Roles, access control, audit-minded cloud.' },
		],
	},
	faqs: [
		{ question: 'Specialty coverage?', answer: 'See specialty EMR pages from the footer, or ask in demo.' },
		{ question: 'Cura AI required?', answer: 'Optional — classic EMR works without it.' },
		{ question: 'Vs traditional EMR?', answer: 'See EasyClinic EMR vs Traditional EMR for a head-to-head.' },
	],
	cta: {
		title: 'See EMR on your specialty',
		lede: 'Book a demo — or jump to Features and specialty pages.',
		secondaryHref: '/features',
		secondaryLabel: 'See features',
	},
};

export const doctors: PersonaPage = {
	slug: 'doctors',
	meta: {
		title: 'AI EMR & Clinic Management Software for Doctors — EasyClinic',
		description:
			'AI EMR, scheduling, billing, pharmacy, and reporting in one clinic management platform for solo doctors, polyclinics, and chains.',
	},
	hero: {
		eyebrow: 'For doctors',
		title: 'AI EMR and clinic management software that scales with how you practise',
		lede: 'From solo clinic to multi-location — EMR, scheduling, billing, pharmacy, and optional Cura AI in one system you can grow without switching.',
		facts: [
			{ value: 'Solo → chain', label: 'Same product as you grow' },
			{ value: 'Optional Cura AI', label: 'Documentation assist' },
			{ value: 'Ops included', label: 'Scheduling, billing, pharmacy' },
		],
	},
	outcomes: {
		title: 'What doctors get in one clinic OS',
		items: [
			{ title: 'EMR that finishes with the visit', copy: '30-sec Rx, specialty templates, optional Cura AI.' },
			{ title: 'Scheduling that the desk trusts', copy: 'Day calendar, queues, and reminders.' },
			{ title: 'Billing beside the chart', copy: 'Visit-tied invoices without a second system.' },
			{ title: 'Pharmacy & inventory modules', copy: 'Add as you grow — not day-one mandatory.' },
		],
	},
	clinicTypes: {
		title: 'Pick your clinic type',
		lede: 'Deep-link into the solution that matches how you practise.',
		items: [
			{ title: 'Solo practice', copy: 'Light EMR, calendar, billing.', href: '/solutions/doctor-clinic' },
			{ title: 'Polyclinic', copy: 'Multi-doctor coordination.', href: '/solutions/polyclinic' },
			{ title: 'Clinic chain', copy: 'Shared records, central control.', href: '/solutions/clinic-chain' },
			{ title: 'Hospital OPD', copy: 'High-volume outpatient.', href: '/solutions/hospital-opd' },
			{ title: 'NGO clinic', copy: 'Lightweight mission ops.', href: '/ngo-landing-page' },
		],
	},
	nextSection: {
		title: 'Pick your country or specialty next',
		lede: 'Geo and specialty pages tune compliance language and clinical chips — start from Resources or the footer hubs.',
	},
	faqs: [
		{ question: 'Solo only?', answer: 'Works for solo and scales to chains without switching products.' },
		{ question: 'AI required?', answer: 'Optional Cura AI — classic EMR works without it.' },
		{ question: 'Where next?', answer: 'Open /resources for comparisons, specialties, and help docs.' },
	],
	cta: {
		title: 'See EasyClinic on your clinic type',
		lede: 'Book a demo — or open pricing if you’re sizing seats.',
		secondaryHref: '/pricing',
		secondaryLabel: 'See pricing',
	},
};

export const personaPages: PersonaPage[] = [ceo, cfo, cmo, ngo, emrLanding, doctors];

export const personaBySlug: Record<string, PersonaPage> = Object.fromEntries(
	personaPages.map((p) => [p.slug, p])
);
