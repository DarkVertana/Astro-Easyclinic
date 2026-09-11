/* Specialty EMR factory.
   Shell is identical per specialty (hero → clinical bento → practice ops chips →
   problems → fit → FAQ → CTA); only the specialty fills change.
   Copy source: docs/seo-packs/BATCH1_KB_CUSTOM_INDIA_DENTAL.md §4 (Dental fill +
   specialty seed table) and docs/seo-packs/BATCH2_UAE_MY_NG_SPECIALTIES.md §B
   (B1–B10 seeds).
   Live slugs are mixed (`dental-emr-software`, `cardiology-emr`, …), so every entry
   carries its own full slug and only `enabled` specialties ship a route. */

export type FaqItem = {
	question: string;
	answer: string;
};

/** `label` is filled when the copy is signed off; staged seeds carry the value only. */
export type HeroFact = {
	value: string;
	label?: string;
};

/** `copy` is filled when the copy is signed off; staged seeds carry the chip title only. */
export type ClinicalTool = {
	title: string;
	copy?: string;
	/** highlights the optional-AI card the way geo-emr highlights Cura AI */
	accent?: boolean;
};

export type Problem = {
	title: string;
	copy?: string;
};

export type HeroIcon = 'tooth' | 'stethoscope';

/* Specialty variables from the pack's template fields. /
export type SpecialtyVars = {
	/ {{specialty}} /
	specialty: string;
	/ {{specialty_adj}} — dental, dermatology, pediatric … /
	specialtyAdj: string;
	/ {{specialty_noun}} — dental clinic, skin clinic … /
	specialtyNoun: string;
};

export type Specialty = SpecialtyVars & {
	/ false = copy is staged, route is not generated yet /
	enabled: boolean;
	/ live path segment, kept stable for SEO /
	slug: string;
	/ live path /
	href: string;
	seoTitle: string;
	seoDescription: string;
	eyebrow: string;
	title: string;
	lede: string;
	note: string;
	heroIcon: HeroIcon;
	heroFacts: HeroFact[];
	heroBadge: { value: string; label: string };
	clinicalEyebrow: string;
	clinicalTitle: string;
	clinicalLede: string;
	clinical: ClinicalTool[];
	opsEyebrow: string;
	opsTitle: string;
	opsLede: string;
	ops: string[];
	problemsEyebrow: string;
	problemsTitle: string;
	problemsLede: string;
	problems: Problem[];
	fitEyebrow: string;
	fitTitle: string;
	fitLede: string;
	fit: string[];
	/ live specialties only — staged entries keep `faqSeeds` until answers are signed off /
	faqs: FaqItem[];
	/ pack shorthand for the questions a staged specialty should answer /
	faqSeeds?: string[];
	ctaTitle: string;
	ctaLede: string;
};

/ ---- shared shell (same everywhere; the specialty only swaps the fills) ---- /

const sentenceCase = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

const sharedOps = ({ specialtyAdj }: SpecialtyVars): string[] => [
	'Appointment scheduling',
	'Reminders (WhatsApp/SMS/email)',
	'Procedure billing & invoicing',
	`${sentenceCase(specialtyAdj)} supplies inventory`,
	'Teleconsult + online fees',
	'Multi-doctor roles',
	'Reports',
];

const sharedFit = ({ specialtyAdj, specialtyNoun }: SpecialtyVars): string[] => [
	`Solo ${specialtyNoun}s`,
	`Multi-doctor ${specialtyAdj} practices`,
	`${sentenceCase(specialtyAdj)} chains needing shared records and central reporting`,
];

type SpecialtyInput = SpecialtyVars & {
	enabled?: boolean;
	slug: string;
	seoTitle: string;
	seoDescription: string;
	eyebrow?: string;
	title: string;
	lede: string;
	note?: string;
	heroIcon?: HeroIcon;
	heroFacts: HeroFact[];
	heroBadge?: { value: string; label: string };
	clinicalTitle?: string;
	clinicalLede?: string;
	clinical: ClinicalTool[];
	opsTitle?: string;
	opsLede?: string;
	ops?: string[];
	problemsTitle?: string;
	problemsLede?: string;
	problems: Problem[];
	fitTitle?: string;
	fitLede?: string;
	fit?: string[];
	faqs?: FaqItem[];
	faqSeeds?: string[];
	ctaTitle: string;
	ctaLede?: string;
};

/ Builds a specialty page from the shared shell + the specialty's own fills. */
function createSpecialty(input: SpecialtyInput): Specialty {
	const { specialty, specialtyAdj, specialtyNoun } = input;
	const note = input.note ?? `Built for ${specialtyNoun}s and multi-doctor practices.`;

	return {
		specialty,
		specialtyAdj,
		specialtyNoun,
		enabled: input.enabled ?? false,
		slug: input.slug,
		href: `/${input.slug}`,

		seoTitle: input.seoTitle,
		seoDescription: input.seoDescription,

		eyebrow: input.eyebrow ?? specialty,
		title: input.title,
		lede: input.lede,
		note,
		heroIcon: input.heroIcon ?? 'stethoscope',
		heroFacts: input.heroFacts,
		heroBadge: input.heroBadge ?? { value: 'Cloud-first', label: note },

		clinicalEyebrow: 'Clinical tools',
		clinicalTitle: input.clinicalTitle ?? `Built around the ${specialtyAdj} chart`,
		clinicalLede:
			input.clinicalLede ??
			'Documentation, plans, and files that match how the specialty actually works.',
		clinical: input.clinical,

		opsEyebrow: 'Clinic ops',
		opsTitle: input.opsTitle ?? `What runs the ${specialtyAdj} floor`,
		opsLede:
			input.opsLede ??
			'The front desk, billing, and follow-up side of the practice — on the same patient record.',
		ops: input.ops ?? sharedOps(input),

		problemsEyebrow: 'Problems',
		problemsTitle: input.problemsTitle ?? `Where ${specialtyAdj} clinics lose time`,
		problemsLede:
			input.problemsLede ?? `Three things ${specialtyAdj} teams tell us before they switch.`,
		problems: input.problems,

		fitEyebrow: 'Fit',
		fitTitle: input.fitTitle ?? `Who this ${specialtyAdj} EMR is for`,
		fitLede: input.fitLede ?? 'The same platform scales from a single room to a multi-site group.',
		fit: input.fit ?? sharedFit(input),

		faqs: input.faqs ?? [],
		faqSeeds: input.faqSeeds,

		ctaTitle: input.ctaTitle,
		ctaLede:
			input.ctaLede ??
			`Book a demo — we’ll map EasyClinic to your ${specialtyAdj} workflow.`,
	};
}

/* ---- live: dental (Batch 1 §4 fill) ---- */

const dental = createSpecialty({
	enabled: true,
	slug: 'dental-emr-software',
	specialty: 'Dental',
	specialtyAdj: 'dental',
	specialtyNoun: 'dental clinic',
	seoTitle: 'Dental EMR Software for Clinics — EasyClinic',
	seoDescription:
		'Dental EMR and clinic management software — charting, treatment plans, appointments, billing, imaging, and inventory for dental practices and chains.',
	eyebrow: 'Dental care',
	title: 'Dental EMR that keeps chairs, charts, and billing in sync',
	lede: 'Manage appointments, tooth-wise records, treatment plans, billing, and imaging in one clinic management platform — so dentists spend less time on admin.',
	note: 'Built for dental clinics and multi-chair practices.',
	heroIcon: 'tooth',
	heroFacts: [
		{ value: '30-sec Rx', label: 'Share via print / WhatsApp' },
		{ value: 'Charting', label: 'Tooth-wise documentation' },
		{ value: 'Plans', label: 'Multi-visit treatment tracking' },
	],
	clinical: [
		{
			title: 'Dental charting',
			copy: 'Document missing teeth, caries, crowns, and procedures tooth-wise.',
		},
		{
			title: 'Treatment plans',
			copy: 'Track fillings, RCT, crowns, ortho, implants across visits.',
		},
		{
			title: 'Imaging & files',
			copy: 'Store X-rays, photos, and reports on the patient record.',
		},
		{
			title: 'Specialty forms',
			copy: 'Intake and exam templates tuned for dental workflows.',
		},
		{
			title: 'AI documentation',
			copy: 'Optional Cura AI assist for faster notes; clinician stays in charge.',
			accent: true,
		},
		{
			title: 'Point-and-click EMR',
			copy: 'Chief complaint, history, Rx, and follow-ups without hunting menus.',
		},
	],
	ops: [
		'Chair/appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Procedure billing & invoicing',
		'Dental materials inventory',
		'Teleconsult + online fees',
		'Multi-doctor / multi-chair roles',
		'Reports',
	],
	problems: [
		{
			title: 'Charts that don’t match the chair',
			copy: 'Paper odontograms and scattered X-rays slow the next visit.',
		},
		{
			title: 'Treatment plans lost between visits',
			copy: 'Multi-step care needs status, not sticky notes.',
		},
		{
			title: 'Billing after the procedure',
			copy: 'Fees drift from what was done; invoice from the plan instead.',
		},
	],
	fit: [
		'Solo dental clinics',
		'Multi-chair dental practices',
		'Dental chains needing shared records and central reporting',
	],
	faqs: [
		{
			question: 'Best EMR for dental clinics?',
			answer:
				'Look for charting, treatment plans, imaging, billing, and scheduling together; EasyClinic covers that full workflow.',
		},
		{
			question: 'Dental charting supported?',
			answer: 'Yes — tooth-wise documentation and procedure recording.',
		},
		{
			question: 'X-rays and images?',
			answer: 'Yes — store on the patient record.',
		},
		{
			question: 'Treatment plan tracking?',
			answer: 'Yes — multi-visit procedures and follow-ups.',
		},
		{
			question: 'AI EMR for dental?',
			answer: 'Optional Cura AI helps draft notes faster; you review and sign.',
		},
		{
			question: 'Inventory for materials?',
			answer: 'Yes — supplies and medicines in the inventory module.',
		},
	],
	ctaTitle: 'See dental EMR on your chair schedule',
	ctaLede: 'Book a demo — we’ll walk charting, treatment plans, and billing on your workflow.',
});

/* ---- live: dermatology (Batch 2 §B1 fill) ---- */

const dermatology = createSpecialty({
	enabled: true,
	slug: 'dermatology-emr-software',
	specialty: 'Dermatology',
	specialtyAdj: 'dermatology',
	specialtyNoun: 'skin clinic',
	seoTitle: 'Dermatology EMR Software for Skin Clinics — EasyClinic',
	seoDescription:
		'Dermatology EMR — consult notes, before/after images, procedure tracking, appointments, and billing for skin and aesthetic clinics.',
	title: 'Dermatology EMR for skin clinics that live on photos and procedures',
	lede: 'Charts, before/after images, treatment plans, scheduling, and billing in one clinic management platform — built for derm and aesthetic workflows.',
	note: 'Built for skin clinics, aesthetic practices, and multi-doctor centres.',
	heroFacts: [
		{ value: 'Before/after images', label: 'On the patient record' },
		{ value: '30-sec Rx', label: 'Share via print / WhatsApp' },
		{ value: 'Procedure billing', label: 'Invoice from the plan' },
	],
	clinical: [
		{
			title: 'Before & after image store',
			copy: 'Keep visit-dated photos on the chart so progress is visible side by side.',
		},
		{
			title: 'Procedure / laser / cosmetic tracking',
			copy: 'Log sessions, settings, and areas treated across a multi-session course.',
		},
		{
			title: 'Specialty derm forms',
			copy: 'Intake and exam templates tuned for skin, hair, and aesthetic consults.',
		},
		{
			title: 'Point-and-click notes',
			copy: 'Chief complaint, history, Rx, and follow-ups without hunting menus.',
		},
		{
			title: 'Optional Cura AI docs',
			copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.',
			accent: true,
		},
		{
			title: 'Patient summaries',
			copy: 'Send the visit summary and aftercare instructions before the patient leaves.',
		},
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Procedure billing & invoicing',
		'Derm & aesthetic supplies inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'Photos scattered across phones',
			copy: 'Before/after shots sit in camera rolls instead of the patient’s chart.',
		},
		{
			title: 'Procedure plans not tied to billing',
			copy: 'Session counts drift from what was invoiced; bill from the plan instead.',
		},
		{
			title: 'Follow-ups lost between visits',
			copy: 'Multi-session courses need scheduled recalls, not a reminder in someone’s head.',
		},
	],
	fit: ['Solo derm', 'Aesthetic/derm clinics', 'Multi-doctor skin centres'],
	faqs: [
		{
			question: 'Best EMR for dermatology clinics?',
			answer:
				'Look for image storage, procedure tracking, scheduling, and billing in one place; EasyClinic covers that full derm and aesthetic workflow.',
		},
		{
			question: 'AI documentation for derm notes?',
			answer: 'Optional Cura AI helps draft consult notes faster; you review and sign.',
		},
		{
			question: 'Before and after images?',
			answer: 'Yes — visit-dated photos stored on the patient record and compared side by side.',
		},
		{
			question: 'Cosmetic and laser tracking?',
			answer:
				'Yes — log each session with settings and areas treated across a multi-session course.',
		},
		{
			question: 'Scheduling and billing included?',
			answer:
				'Yes — appointments, reminders, procedure invoicing, and online fees run on the same record.',
		},
		{
			question: 'Inventory for derm supplies?',
			answer: 'Yes — consumables, injectables, and medicines in the inventory module.',
		},
	],
	ctaTitle: 'See dermatology EMR on your procedure list',
	ctaLede:
		'Book a demo — we’ll walk before/after imaging, procedure plans, and billing on your workflow.',
});

/* ---- live: ophthalmology (Batch 2 §B2 fill) ends above; staged seeds §B3–B10 ----
   Hero facts, clinical chips, and problems are the pack's chip text; the per-item
   supporting copy and the FAQ answers (`faqSeeds` holds the pack's question list)
   get written when each page is signed off. Routes stay off until then.
   Pediatric / psychiatry / psychology live H1s are CTA copy today — the titles below
   are the replacements the pack asks for. */

const ophthalmology = createSpecialty({
	enabled: true,
	slug: 'ophthalmology-emr',
	specialty: 'Ophthalmology',
	specialtyAdj: 'ophthalmology',
	specialtyNoun: 'eye clinic',
	seoTitle: 'Ophthalmology EMR Software — EasyClinic',
	seoDescription:
		'Ophthalmology EMR — vision exams, imaging (OCT/fundus), eyeglass Rx, appointments, and billing for eye clinics.',
	eyebrow: 'Ophthalmology',
	title: 'Ophthalmology EMR that keeps exams, imaging, and optical Rx together',
	lede: 'Document vision exams, attach OCT/fundus images, write optical and medication Rx, and bill the visit — without juggling tools.',
	note: 'Built for eye clinics, optical + clinic combos, and high-volume OPD.',
	heroFacts: [
		{ value: 'Vision exam records', label: 'Refraction on the chart' },
		{ value: 'Imaging on chart', label: 'OCT & fundus files' },
		{ value: 'Optical Rx', label: 'Glasses + meds together' },
	],
	clinical: [
		{
			title: 'Vision / refraction documentation',
			copy: 'Capture VA, refraction, and exam findings on the visit record.',
		},
		{
			title: 'OCT & fundus file store',
			copy: 'Attach imaging to the patient chart so the next visit starts with context.',
		},
		{
			title: 'Eyeglass & med Rx',
			copy: 'Write optical and medication prescriptions without retyping from paper.',
		},
		{
			title: 'Specialty eye forms',
			copy: 'Intake and exam templates tuned for ophthalmology OPD workflows.',
		},
		{
			title: 'Trend visuals',
			copy: 'Keep key measures easy to scan across follow-ups.',
		},
		{
			title: 'Optional Cura AI',
			copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.',
			accent: true,
		},
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Optical / pharmacy inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'Imaging orphaned from the chart',
			copy: 'OCT and fundus files live on a USB stick while the note sits elsewhere.',
		},
		{
			title: 'Optical Rx retyped',
			copy: 'Glasses prescriptions get re-entered by hand and drift from the exam.',
		},
		{
			title: 'High-volume OPD queues',
			copy: 'Busy eye clinics need fast charts and billing, not another clipboard.',
		},
	],
	fit: ['Solo ophthalmologists', 'Eye hospitals OPD', 'Optical + clinic combos'],
	faqs: [
		{
			question: 'Best EMR for ophthalmology clinics?',
			answer:
				'Look for vision exam docs, imaging on the chart, optical Rx, scheduling, and billing together; EasyClinic covers that OPD workflow.',
		},
		{
			question: 'Can we record vision exams?',
			answer: 'Yes — refraction and exam findings stay on the patient visit record.',
		},
		{
			question: 'OCT and fundus images?',
			answer: 'Yes — attach files to the chart so imaging is not orphaned from the note.',
		},
		{
			question: 'AI documentation for eye notes?',
			answer: 'Optional Cura AI helps draft notes faster; you review and sign.',
		},
		{
			question: 'Appointments and billing included?',
			answer:
				'Yes — scheduling, reminders, visit invoicing, and online fees run on the same record.',
		},
	],
	ctaTitle: 'See ophthalmology EMR on your OPD flow',
	ctaLede:
		'Book a demo — we’ll walk vision exams, imaging, optical Rx, and billing on your workflow.',
});

const orthopedic = createSpecialty({
	enabled: true,
	slug: 'orthopedic-emr',
	specialty: 'Orthopedics',
	specialtyAdj: 'orthopedic',
	specialtyNoun: 'ortho clinic',
	seoTitle: 'Orthopedic EMR Software — EasyClinic',
	seoDescription:
		'Orthopedic EMR — injury templates, imaging, procedure notes, rehab follow-ups, scheduling, and billing.',
	eyebrow: 'Orthopedics',
	title: 'Orthopedic EMR for injury notes, imaging, and procedure follow-through',
	lede: 'Template-driven ortho documentation, X-ray storage, procedure notes, scheduling, and billing in one clinic management system.',
	note: 'Built for ortho clinics, sports injury practices, and multi-surgeon centres.',
	heroFacts: [
		{ value: 'Injury templates', label: 'Faster consult notes' },
		{ value: 'X-rays on chart', label: 'Imaging with the visit' },
		{ value: 'Procedure docs', label: 'Notes that match the day' },
	],
	clinical: [
		{
			title: 'Ortho templates',
			copy: 'Injury and MSK templates so documentation keeps pace with OPD volume.',
		},
		{
			title: 'Imaging store',
			copy: 'Keep X-rays and reports on the patient record, not on a separate drive.',
		},
		{
			title: 'Procedure/surgery notes',
			copy: 'Capture procedure detail while the visit is still fresh.',
		},
		{
			title: 'Rehab / follow-up plans',
			copy: 'Track physio and review visits against the original plan.',
		},
		{
			title: 'Point-and-click EMR',
			copy: 'Chief complaint, history, Rx, and follow-ups without hunting menus.',
		},
		{
			title: 'Optional Cura AI',
			copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.',
			accent: true,
		},
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Procedure billing & invoicing',
		'Consumables inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'X-rays outside the record',
			copy: 'Films and CDs sit apart from the note the next surgeon needs.',
		},
		{
			title: 'Procedure notes after hours',
			copy: 'Documentation piles up after a long OT or injection list.',
		},
		{
			title: 'Physio follow-ups unmanaged',
			copy: 'Rehab schedules drift without a plan tied to the chart.',
		},
	],
	fit: ['Ortho clinics', 'Sports injury practices', 'Multi-surgeon ortho centres'],
	faqs: [
		{
			question: 'Best EMR for orthopedic clinics?',
			answer:
				'Look for injury templates, imaging on the chart, procedure notes, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Can we store X-rays?',
			answer: 'Yes — attach imaging and reports to the patient record.',
		},
		{
			question: 'Procedure documentation?',
			answer: 'Yes — procedure and surgery notes stay with the visit and plan.',
		},
		{
			question: 'AI documentation for ortho notes?',
			answer: 'Optional Cura AI helps draft notes faster; you review and sign.',
		},
	],
	ctaTitle: 'See orthopedic EMR on your procedure day',
	ctaLede:
		'Book a demo — we’ll walk injury templates, imaging, procedure notes, and billing on your workflow.',
});

const pediatric = createSpecialty({
	enabled: true,
	slug: 'pediatric-emr',
	specialty: 'Pediatrics',
	specialtyAdj: 'pediatric',
	specialtyNoun: 'pediatric clinic',
	seoTitle: 'Pediatric EMR Software — EasyClinic',
	seoDescription:
		'Pediatric EMR — growth charts, immunization schedules, age-based forms, parent reminders, appointments, and billing.',
	eyebrow: 'Pediatrics',
	title: 'Pediatric EMR with growth, vaccines, and parent-ready follow-ups',
	lede: 'Age-aware charts, immunization tracking, scheduling, and WhatsApp reminders so pediatric clinics keep well-child and sick visits organized.',
	note: 'Built for solo pediatricians, pediatric polyclinics, and family + child clinics.',
	heroFacts: [
		{ value: 'Growth charts', label: 'Age-aware tracking' },
		{ value: 'Vaccine schedules', label: 'Immunization on the chart' },
		{ value: 'Parent WhatsApp', label: 'Fewer missed follow-ups' },
	],
	clinical: [
		{
			title: 'Growth charts',
			copy: 'Plot weight, height, and milestones alongside the visit note.',
		},
		{
			title: 'Immunization tracking',
			copy: 'Keep vaccine schedules current so the next dose is never a guess.',
		},
		{
			title: 'Pediatric intake forms',
			copy: 'Age-aware intake and exam templates for well-child and sick visits.',
		},
		{
			title: 'Quick Rx',
			copy: 'Share prescriptions via print or WhatsApp before the family leaves.',
		},
		{
			title: 'Visit summaries',
			copy: 'Send clear aftercare notes parents can actually follow.',
		},
		{
			title: 'Optional Cura AI',
			copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.',
			accent: true,
		},
	],
	ops: [
		'Appointment scheduling',
		'Parent reminders (WhatsApp/SMS/email)',
		'Visit billing & invoicing',
		'Vaccine / pharmacy inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'Paper vaccine cards',
			copy: 'Immunization history lives in a booklet that isn’t in the EMR.',
		},
		{
			title: 'Growth data not trended',
			copy: 'Weight and height entries don’t show the curve the clinician needs.',
		},
		{
			title: 'Parents missing follow-ups',
			copy: 'Well-child and review visits slip without reliable reminders.',
		},
	],
	fit: ['Solo pediatricians', 'Pediatric polyclinics', 'Family + child clinics'],
	faqs: [
		{
			question: 'Best EMR for pediatric clinics?',
			answer:
				'Look for growth charts, immunization tracking, parent reminders, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Growth tracking?',
			answer: 'Yes — capture growth measures with the visit so trends stay on the chart.',
		},
		{
			question: 'Vaccination schedules?',
			answer: 'Yes — immunization tracking stays with the patient record.',
		},
		{
			question: 'AI documentation for pediatric notes?',
			answer: 'Optional Cura AI helps draft notes faster; you review and sign.',
		},
		{
			question: 'Parent reminders?',
			answer: 'Yes — WhatsApp, SMS, and email reminders for appointments and follow-ups.',
		},
	],
	ctaTitle: 'See pediatric EMR on a well-child day',
	ctaLede:
		'Book a demo — we’ll walk growth charts, vaccines, parent reminders, and billing on your workflow.',
});

const obgyn = createSpecialty({
	enabled: true,
	slug: 'obgyn-emr-software',
	specialty: 'OB-GYN',
	specialtyAdj: 'OB-GYN',
	specialtyNoun: "women's health clinic",
	seoTitle: 'OB-GYN EMR Software — EasyClinic',
	seoDescription:
		'OB-GYN EMR — antenatal tracking, gynecological charting, ultrasound files, appointments, and billing for women’s health clinics.',
	eyebrow: 'OB-GYN',
	title: 'OB-GYN EMR for antenatal continuity and gynecology visits',
	lede: 'Track pregnancy visits, gyn charting, ultrasounds, Rx, and billing in one platform — so continuity doesn’t live in a notebook.',
	note: 'Built for OB-GYN solo practices, women’s health clinics, and maternity OPD.',
	heroFacts: [
		{ value: 'Pregnancy tracking', label: 'ANC visits on one chart' },
		{ value: 'Gyn charting', label: 'Visit notes that stick' },
		{ value: 'Ultrasound on file', label: 'Reports with the record' },
	],
	clinical: [
		{
			title: 'ANC / pregnancy tracking',
			copy: 'Keep trimester visits, vitals, and plans together across the pregnancy.',
		},
		{
			title: 'Gynecological charting',
			copy: 'Document gyn consults with specialty-ready forms, not generic blanks.',
		},
		{
			title: 'Ultrasound & report store',
			copy: 'Attach scans and reports to the patient chart for the next visit.',
		},
		{
			title: 'Specialty forms',
			copy: 'Intake and exam templates tuned for antenatal and gyn workflows.',
		},
		{
			title: 'Visit summaries',
			copy: 'Share clear after-visit guidance before the patient leaves.',
		},
		{
			title: 'Optional Cura AI',
			copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.',
			accent: true,
		},
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Pharmacy / consumables inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'ANC cards vs digital chart split',
			copy: 'Pregnancy history lives in a paper card while the EMR only has fragments.',
		},
		{
			title: 'Ultrasounds unattached',
			copy: 'Scans sit on CDs or phones instead of the patient record.',
		},
		{
			title: 'Missed trimester follow-ups',
			copy: 'High-risk and routine ANC reviews slip without reliable recalls.',
		},
	],
	fit: ['OB-GYN solo', "Women's health clinics", 'Maternity OPD'],
	faqs: [
		{
			question: 'Best EMR for gynecology clinics?',
			answer:
				'Look for ANC tracking, gyn charting, ultrasound storage, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Pregnancy / ANC tracking?',
			answer: 'Yes — antenatal visits and plans stay on one continuous chart.',
		},
		{
			question: 'Ultrasound storage?',
			answer: 'Yes — attach scans and reports to the patient record.',
		},
		{
			question: 'AI documentation for OB-GYN notes?',
			answer: 'Optional Cura AI helps draft notes faster; you review and sign.',
		},
	],
	ctaTitle: 'See OB-GYN EMR on an antenatal schedule',
	ctaLede:
		'Book a demo — we’ll walk ANC tracking, gyn charting, ultrasound files, and billing on your workflow.',
});

const cardiology = createSpecialty({
	enabled: true,
	slug: 'cardiology-emr',
	specialty: 'Cardiology',
	specialtyAdj: 'cardiology',
	specialtyNoun: 'heart clinic',
	seoTitle: 'Cardiology EMR & Practice Management — EasyClinic',
	seoDescription:
		'Cardiology EMR — cardiac templates, ECG/report storage, chronic follow-ups, appointments, and billing for heart clinics.',
	eyebrow: 'Cardiology',
	title: 'Cardiology EMR for longitudinal heart care — notes, ECGs, and follow-ups',
	lede: 'Cardiology templates, ECG and diagnostic file storage, chronic follow-up tracking, scheduling, and billing in one clinic management stack.',
	note: 'Built for cardiology clinics, multi-cardiologist centres, and hospital cardiology OPD.',
	heroFacts: [
		{ value: 'Cardiac templates', label: 'Faster consult notes' },
		{ value: 'ECG on chart', label: 'Diagnostics with the visit' },
		{ value: 'Chronic follow-ups', label: 'Recall that sticks' },
	],
	clinical: [
		{
			title: 'Cardiology templates',
			copy: 'Structured cardiac consult templates so notes keep pace with OPD volume.',
		},
		{
			title: 'ECG/diagnostics store',
			copy: 'Attach ECGs and reports to the patient chart for the next visit.',
		},
		{
			title: 'Trend visuals',
			copy: 'Keep key measures easy to scan across chronic follow-ups.',
		},
		{
			title: 'Med management',
			copy: 'Track cardiac medications and changes across visits.',
		},
		{
			title: 'Patient education hooks',
			copy: 'Share visit summaries and aftercare before the patient leaves.',
		},
		{
			title: 'Optional Cura AI',
			copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.',
			accent: true,
		},
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Pharmacy inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'ECGs siloed',
			copy: 'Traces and reports live outside the note the next cardiologist needs.',
		},
		{
			title: 'Chronic patients without recall',
			copy: 'Heart-failure and hypertension reviews slip without a plan on the chart.',
		},
		{
			title: 'Evening documentation load',
			copy: 'Busy OPD leaves note-writing for after hours.',
		},
	],
	fit: ['Cardiology clinics', 'Multi-cardiologist centres', 'Hospital cardiology OPD'],
	faqs: [
		{
			question: 'Best EMR for cardiology clinics?',
			answer:
				'Look for cardiac templates, ECG storage, chronic follow-ups, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'ECG storage?',
			answer: 'Yes — attach ECGs and diagnostic reports to the patient record.',
		},
		{
			question: 'Chronic follow-up tracking?',
			answer: 'Yes — keep longitudinal plans and recalls on the same chart.',
		},
		{
			question: 'AI documentation for cardio notes?',
			answer: 'Optional Cura AI helps draft notes faster; you review and sign.',
		},
	],
	ctaTitle: 'See cardiology EMR on your follow-up list',
	ctaLede:
		'Book a demo — we’ll walk cardiac templates, ECG storage, chronic follow-ups, and billing on your workflow.',
});

const psychiatry = createSpecialty({
	enabled: true,
	slug: 'psychiatry-emr',
	specialty: 'Psychiatry',
	specialtyAdj: 'psychiatry',
	specialtyNoun: 'mental health clinic',
	seoTitle: 'Psychiatry EMR Software — EasyClinic',
	seoDescription:
		'Psychiatry EMR — session notes, medication tracking, treatment plans, telehealth, and privacy-minded access for mental health clinics.',
	eyebrow: 'Psychiatry',
	title: 'Psychiatry EMR with session notes, meds, and tighter access control',
	lede: 'Document sessions, manage medications and treatment plans, run teleconsults, and keep role-based privacy tight — without a patchwork of notes apps.',
	note: 'Built for psychiatrists, mental health clinics, and multi-clinician psych practices.',
	heroFacts: [
		{ value: 'Session notes', label: 'Structured documentation' },
		{ value: 'Med tracking', label: 'Changes you can audit' },
		{ value: 'Telehealth', label: 'Remote visits included' },
	],
	clinical: [
		{ title: 'Session documentation', copy: 'Capture psychiatric sessions with templates that stay on the chart.' },
		{ title: 'Medication management', copy: 'Track meds and changes so the next visit starts with context.' },
		{ title: 'Customizable treatment plans', copy: 'Keep longitudinal plans visible across follow-ups.' },
		{ title: 'Tight roles / privacy', copy: 'Role-based access so sensitive notes stay appropriately scoped.' },
		{ title: 'Teleconsult', copy: 'Run remote visits and keep the note on the same record.' },
		{ title: 'Optional Cura AI (clinician-reviewed)', copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.', accent: true },
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit billing & invoicing',
		'Pharmacy inventory',
		'Teleconsult + online fees',
		'Multi-clinician roles',
		'Reports',
	],
	problems: [
		{ title: 'Notes in unmanaged docs', copy: 'Session notes live in Word files instead of the patient chart.' },
		{ title: 'Med changes hard to audit', copy: 'Dose changes get lost between visits without a clear trail.' },
		{ title: 'Privacy too loose across staff', copy: 'Front-desk and clinical roles need different visibility into notes.' },
	],
	fit: ['Psychiatrists', 'Mental health clinics', 'Multi-clinician psych practices'],
	faqs: [
		{ question: 'Best EMR for psychiatry clinics?', answer: 'Look for session notes, medication tracking, treatment plans, telehealth, and role-based privacy together; EasyClinic covers that workflow.' },
		{ question: 'Session notes supported?', answer: 'Yes — structured session documentation stays on the patient record.' },
		{ question: 'Medication tracking?', answer: 'Yes — meds and changes remain auditable across visits.' },
		{ question: 'AI documentation for psychiatry notes?', answer: 'Optional Cura AI helps draft notes faster; you review and sign.' },
		{ question: 'Telehealth included?', answer: 'Yes — teleconsults and notes run on the same clinic record.' },
	],
	ctaTitle: 'See psychiatry EMR on a clinic day',
	ctaLede: 'Book a demo — we’ll walk session notes, meds, privacy roles, and telehealth on your workflow.',
});

const psychology = createSpecialty({
	enabled: true,
	slug: 'psychology-emr',
	specialty: 'Psychology',
	specialtyAdj: 'psychology',
	specialtyNoun: 'therapy clinic',
	seoTitle: 'Psychology EMR for Mental Health Clinics — EasyClinic',
	seoDescription:
		'Psychology EMR — session notes, psychometric tracking, appointments, telehealth, and confidential records for therapists and clinics.',
	eyebrow: 'Psychology',
	title: 'Psychology EMR for session notes, assessments, and confidential scheduling',
	lede: 'Therapy notes, psychometric test tracking, appointments, and telehealth in one clinic management platform with role-aware access.',
	note: 'Built for psychologists, therapy centres, and mixed mental-health clinics.',
	heroFacts: [
		{ value: 'Session notes', label: 'Therapy docs on the chart' },
		{ value: 'Psychometrics', label: 'Scores on a timeline' },
		{ value: 'Confidential access', label: 'Role-aware records' },
	],
	clinical: [
		{ title: 'Session notes', copy: 'Keep therapy notes structured and attached to the patient record.' },
		{ title: 'Psychometric test management', copy: 'Track assessment scores over time instead of loose PDFs.' },
		{ title: 'Psychology intake forms', copy: 'Intake templates tuned for therapy and counseling workflows.' },
		{ title: 'Teleconsult', copy: 'Run remote sessions with the note on the same chart.' },
		{ title: 'Reminders', copy: 'Cut no-shows with WhatsApp, SMS, and email reminders.' },
		{ title: 'Optional AI assist (review before save)', copy: 'Optional AI assist for faster notes; clinician reviews before save.', accent: true },
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Session billing & invoicing',
		'Teleconsult + online fees',
		'Multi-clinician roles',
		'Reports',
	],
	problems: [
		{ title: 'Notes fragmented', copy: 'Session notes sit across notebooks and personal drives.' },
		{ title: 'Assessment scores not on timeline', copy: 'Psychometric results never line up with therapy progress.' },
		{ title: 'No-shows on therapy books', copy: 'Busy calendars lose clients without reliable reminders.' },
	],
	fit: ['Psychologists', 'Therapy centres', 'Mixed mental-health clinics'],
	faqs: [
		{ question: 'Best EMR for psychology clinics?', answer: 'Look for session notes, psychometric tracking, confidential scheduling, and telehealth together; EasyClinic covers that workflow.' },
		{ question: 'Session notes supported?', answer: 'Yes — therapy notes stay on the confidential patient record.' },
		{ question: 'Psychometric tracking?', answer: 'Yes — assessment scores can live on a timeline with the chart.' },
		{ question: 'Privacy and roles?', answer: 'Yes — role-aware access keeps sensitive records appropriately scoped.' },
	],
	ctaTitle: 'See psychology EMR on your therapy book',
	ctaLede: 'Book a demo — we’ll walk session notes, assessments, scheduling, and privacy roles on your workflow.',
});

const ivf = createSpecialty({
	enabled: true,
	slug: 'ivf-emr',
	specialty: 'Fertility & IVF',
	specialtyAdj: 'fertility',
	specialtyNoun: 'fertility clinic',
	seoTitle: 'Fertility & IVF EMR Software — EasyClinic',
	seoDescription:
		'IVF EMR — cycle management, hormonal tracking, appointments, lab hooks, and billing for fertility clinics.',
	eyebrow: 'Fertility & IVF',
	title: 'IVF EMR for cycle stages, hormones, and clinic-floor coordination',
	lede: 'Track cycles, hormonal treatment, visits, and billing in one fertility-aware clinic management system — so the next stimulation day isn’t in a spreadsheet.',
	note: 'Built for IVF clinics, fertility centres, and REI practices.',
	heroFacts: [
		{ value: 'Cycle management', label: 'Stages on one timeline' },
		{ value: 'Hormone tracking', label: 'Logs with the visit' },
		{ value: 'Visit coordination', label: 'Floor + lab aligned' },
	],
	clinical: [
		{ title: 'Cycle stage tracking', copy: 'Keep stimulation, retrieval, and transfer stages visible on one chart.' },
		{ title: 'Hormonal treatment logs', copy: 'Document hormone protocols alongside the visit, not in a side sheet.' },
		{ title: 'Fertility intake forms', copy: 'Intake templates tuned for fertility and IVF workflows.' },
		{ title: 'File/report store', copy: 'Attach lab and ultrasound reports to the patient record.' },
		{ title: 'Multi-role clinic ops', copy: 'Coordinate doctors, nurses, and coordinators on shared schedules.' },
		{ title: 'Optional Cura AI docs', copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.', accent: true },
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Cycle & procedure billing',
		'Pharmacy / consumables inventory',
		'Teleconsult + online fees',
		'Multi-role clinic access',
		'Reports',
	],
	problems: [
		{ title: 'Cycles in spreadsheets', copy: 'Stimulation calendars live outside the EMR and get out of sync.' },
		{ title: 'Hormone charts detached', copy: 'Protocol logs never meet the visit note the next clinician opens.' },
		{ title: 'Partner/lab handoffs messy', copy: 'Coordinator and lab updates scatter across chats and email.' },
	],
	fit: ['IVF clinics', 'Fertility centres', 'REI practices'],
	faqs: [
		{ question: 'Best EMR for IVF clinics?', answer: 'Look for cycle tracking, hormonal logs, multi-role scheduling, and billing together; EasyClinic covers that fertility workflow.' },
		{ question: 'Cycle tracking?', answer: 'Yes — keep cycle stages visible on one patient timeline.' },
		{ question: 'Hormonal tracking?', answer: 'Yes — treatment logs stay with the visit and chart.' },
		{ question: 'AI documentation for IVF notes?', answer: 'Optional Cura AI helps draft notes faster; you review and sign.' },
		{ question: 'Multi-role access?', answer: 'Yes — doctors, nurses, and coordinators can share the clinic workflow with role-aware access.' },
	],
	ctaTitle: 'See IVF EMR on a stimulation calendar',
	ctaLede: 'Book a demo — we’ll walk cycle stages, hormone logs, coordination, and billing on your workflow.',
});

const ent = createSpecialty({
	enabled: true,
	slug: 'ent-emr-software',
	specialty: 'ENT',
	specialtyAdj: 'ENT',
	specialtyNoun: 'ENT clinic',
	seoTitle: 'ENT EMR Software — EasyClinic',
	seoDescription:
		'ENT EMR — specialty forms, hearing-test files, procedure notes, appointments, and billing for ENT clinics.',
	eyebrow: 'ENT',
	title: 'ENT EMR for consults, procedures, and hearing records in one chart',
	lede: 'Specialty ENT documentation, diagnostic file storage, procedure notes, scheduling, and billing — without a second system for audiology paperwork.',
	note: 'Built for ENT clinics, ENT + audiology centres, and multi-ENT groups.',
	heroFacts: [
		{ value: 'ENT forms', label: 'Specialty-ready notes' },
		{ value: 'Hearing tests on file', label: 'Audiology with the chart' },
		{ value: 'Procedure docs', label: 'Notes that match the list' },
	],
	clinical: [
		{ title: 'ENT specialty forms', copy: 'Intake and exam templates tuned for ENT consults and follow-ups.' },
		{ title: 'Hearing-test / diagnostic store', copy: 'Keep audiology files on the patient record, not in a side folder.' },
		{ title: 'Procedure documentation', copy: 'Capture procedure detail while the visit is still fresh.' },
		{ title: 'Fast Rx', copy: 'Share prescriptions via print or WhatsApp before the patient leaves.' },
		{ title: 'Visit summaries', copy: 'Send clear aftercare notes with the visit.' },
		{ title: 'Optional Cura AI', copy: 'Optional Cura AI assist for faster notes; clinician reviews and signs.', accent: true },
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Procedure billing & invoicing',
		'Consumables inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{ title: 'Audiology files off-chart', copy: 'Hearing tests sit outside the note the next ENT needs.' },
		{ title: 'Procedure notes delayed', copy: 'Busy lists push documentation to the end of the day.' },
		{ title: 'Follow-up scopes unscheduled', copy: 'Reviews and scopes slip without a plan on the chart.' },
	],
	fit: ['ENT clinics', 'ENT + audiology centres', 'Multi-ENT groups'],
	faqs: [
		{ question: 'Best EMR for ENT clinics?', answer: 'Look for specialty forms, hearing-test storage, procedure notes, scheduling, and billing together; EasyClinic covers that workflow.' },
		{ question: 'Hearing tests supported?', answer: 'Yes — attach audiology and diagnostic files to the patient record.' },
		{ question: 'Procedure documentation?', answer: 'Yes — procedure notes stay with the visit and plan.' },
		{ question: 'AI documentation for ENT notes?', answer: 'Optional Cura AI helps draft notes faster; you review and sign.' },
	],
	ctaTitle: 'See ENT EMR on your procedure list',
	ctaLede: 'Book a demo — we’ll walk ENT forms, hearing records, procedure notes, and billing on your workflow.',
});


const neurology = createSpecialty({
	enabled: true,
	slug: "neurology-emr",
	specialty: 'Neurology',
	specialtyAdj: 'neurology',
	specialtyNoun: 'neurology clinic',
	seoTitle: "Neurology EMR Software — EasyClinic",
	seoDescription:
		"Neurology EMR — exam templates, diagnostic report storage, chronic condition tracking, medication plans, appointments, and billing.",
	eyebrow: "Neurology",
	title: "Neurology EMR for exam templates, reports, and long-term follow-up",
	lede: "Document neurological exams, attach diagnostics, track chronic conditions and meds, and bill the visit — without after-hours chart catch-up.",
	note: 'Built for neurology clinics, multi-neurologist centres, and hospital neuro OPD.',
	heroFacts: [
		{ value: "Neuro templates", label: "Exam documentation" },
		{ value: "Reports on chart", label: "Diagnostics attached" },
		{ value: "Chronic follow-up", label: "Meds & plans" }
	],
	clinical: [
		{
			title: "Neurological exam templates",
			copy: "Structured notes for common neuro presentations.",
		},
		{
			title: "Diagnostic report store",
			copy: "Attach EEG, imaging, and lab reports to the chart.",
		},
		{
			title: "Chronic condition tracking",
			copy: "Follow epilepsy, Parkinson’s, headache, and other long courses.",
		},
		{
			title: "Medication & treatment plans",
			copy: "Track regimens and changes with clearer history.",
		},
		{
			title: "Visit summaries",
			copy: "Key history and trends without digging.",
		},
		{
			title: "Optional Cura AI",
			copy: "Draft notes faster; clinician reviews and signs.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Exam notes finished after the last patient",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		},
		{
			title: "Diagnostics living outside the chart",
			copy: "The next clinician opens the note without the files they need.",
		},
		{
			title: "Chronic follow-ups without a clear recall list",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Neurologists", "Neuro clinics", "Hospital neurology OPD"],
	faqs: [
		{
			question: "Best EMR for neurology clinics?",
			answer: "One that covers specialty templates, diagnostics on the chart, chronic tracking, scheduling, and billing — EasyClinic is built for that workflow.",
		},
		{
			question: "AI EMR for neurology?",
			answer: "Optional Cura AI assists documentation; you stay in charge.",
		},
		{
			question: "Store neurological diagnostic reports?",
			answer: "Yes — attach reports and imaging to the patient record.",
		},
		{
			question: "Chronic condition tracking?",
			answer: "Yes — longitudinal visits, meds, and plans.",
		},
		{
			question: "Medication plans?",
			answer: "Yes — track treatment and medication plans on the chart.",
		}
	],
	ctaTitle: "See neurology EMR on your follow-up list",
	ctaLede:
		"Book a demo — we’ll walk exam templates, reports, and billing on your workflow.",
});

const gastroenterology = createSpecialty({
	enabled: true,
	slug: "gastroenterology-emr",
	specialty: 'Gastroenterology',
	specialtyAdj: 'gastroenterology',
	specialtyNoun: 'GI clinic',
	seoTitle: "Gastroenterology EMR Software — EasyClinic",
	seoDescription:
		"Gastroenterology EMR — GI templates, endoscopy/report storage, procedure notes, chronic GI tracking, appointments, and billing.",
	eyebrow: "Gastroenterology",
	title: "Gastroenterology EMR for procedures, endoscopy files, and chronic GI care",
	lede: "Specialty GI templates, procedure documentation, endoscopy and lab files on the chart, scheduling, and billing in one clinic management platform.",
	note: 'Built for GI clinics, endoscopy centres, and multi-doctor gastroenterology practices.',
	heroFacts: [
		{ value: "GI templates", label: "Specialty documentation" },
		{ value: "Procedure docs", label: "Scopes & interventions" },
		{ value: "Reports on file", label: "Endoscopy & labs" }
	],
	clinical: [
		{
			title: "GI specialty templates",
			copy: "Notes tuned for gastroenterology visits.",
		},
		{
			title: "Procedure documentation",
			copy: "Record scopes and interventions with the visit.",
		},
		{
			title: "Endoscopy & diagnostic store",
			copy: "Keep reports attached to the patient.",
		},
		{
			title: "Chronic GI tracking",
			copy: "IBD, liver disease, and long follow-ups on one timeline.",
		},
		{
			title: "Medication management",
			copy: "Regimens visible beside the clinical history.",
		},
		{
			title: "Optional Cura AI",
			copy: "Faster documentation; clinician signs.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Endoscopy reports off-chart",
			copy: "The next clinician opens the note without the files they need.",
		},
		{
			title: "Procedure notes after hours",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		},
		{
			title: "Chronic GI patients without structured recall",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Gastroenterologists", "GI clinics", "Endoscopy + OPD centres"],
	faqs: [
		{
			question: "Best EMR for gastroenterology?",
			answer: "Look for GI templates, procedure docs, endoscopy storage, chronic tracking, and billing together.",
		},
		{
			question: "AI EMR?",
			answer: "Optional Cura AI for notes; you review.",
		},
		{
			question: "Store endoscopy and diagnostic reports?",
			answer: "Yes — on the patient record.",
		},
		{
			question: "Procedure documentation?",
			answer: "Yes.",
		},
		{
			question: "Chronic GI tracking?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See gastroenterology EMR on a procedure day",
	ctaLede:
		"Book a demo — templates, scopes, and billing on your flow.",
});

const urology = createSpecialty({
	enabled: true,
	slug: "urology-emr",
	specialty: 'Urology',
	specialtyAdj: 'urology',
	specialtyNoun: 'urology clinic',
	seoTitle: "Urology EMR Software — EasyClinic",
	seoDescription:
		"Urology EMR — specialty templates, procedure and surgery notes, imaging/lab storage, appointments, and billing.",
	eyebrow: "Urology",
	title: "Urology EMR that keeps procedures, imaging, and follow-ups on one chart",
	lede: "Specialty urology documentation, procedure tracking, imaging and labs on the record, scheduling, and billing — built for clinic and day-care workflows.",
	note: 'Built for urology clinics, procedure centres, and multi-surgeon groups.',
	heroFacts: [
		{ value: "Uro templates", label: "Specialty notes" },
		{ value: "Procedure tracking", label: "Clinic & day-care" },
		{ value: "Imaging on chart", label: "Labs & scans" }
	],
	clinical: [
		{
			title: "Specialty urology templates",
			copy: "Structured notes for common urology visits.",
		},
		{
			title: "Procedure & surgery documentation",
			copy: "Record interventions with the encounter.",
		},
		{
			title: "Imaging & lab store",
			copy: "Attach scans and results to the patient.",
		},
		{
			title: "Trend visuals",
			copy: "Follow key parameters across visits.",
		},
		{
			title: "Fast Rx",
			copy: "30-second prescriptions via print/WhatsApp/SMS/email.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist; clinician in charge.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Imaging siloed from the chart",
			copy: "The next clinician opens the note without the files they need.",
		},
		{
			title: "Procedure notes delayed",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		},
		{
			title: "Follow-ups not tied to prior procedures",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Urologists", "Urology clinics", "Multi-surgeon uro centres"],
	faqs: [
		{
			question: "Best urology EMR?",
			answer: "Templates, procedure docs, imaging/labs, scheduling, billing in one place.",
		},
		{
			question: "AI EMR?",
			answer: "Optional Cura AI; you sign.",
		},
		{
			question: "Store diagnostics and labs?",
			answer: "Yes.",
		},
		{
			question: "Procedure/surgery docs?",
			answer: "Yes.",
		},
		{
			question: "Imaging records?",
			answer: "Yes — on the patient chart.",
		}
	],
	ctaTitle: "See urology EMR on your procedure list",
	ctaLede:
		"Book a demo — charting, imaging, and billing together.",
});

const physiotherapy = createSpecialty({
	enabled: true,
	slug: "physiotherapy-emr",
	specialty: 'Physiotherapy',
	specialtyAdj: 'physiotherapy',
	specialtyNoun: 'physio clinic',
	seoTitle: "Physiotherapy EMR Software — EasyClinic",
	seoDescription:
		"Physiotherapy EMR — session notes, treatment plans, progress tracking, exercise plans, appointments, and billing.",
	eyebrow: "Physiotherapy",
	title: "Physiotherapy EMR for sessions, goals, and progress you can show",
	lede: "Track therapy sessions, goals, exercise plans, and billing in one clinic management system — so progress isn’t stuck in paper notebooks.",
	note: 'Built for physio clinics, rehab centres, and multi-therapist practices.',
	heroFacts: [
		{ value: "Session tracking", label: "Visit-by-visit notes" },
		{ value: "Goals & progress", label: "Measurable plans" },
		{ value: "Exercise plans", label: "Documented home/clinic" }
	],
	clinical: [
		{
			title: "Session documentation",
			copy: "Record each therapy visit clearly.",
		},
		{
			title: "Goal setting & progress",
			copy: "Track rehabilitation goals over time.",
		},
		{
			title: "Customizable treatment plans",
			copy: "Plans that match your protocols.",
		},
		{
			title: "Exercise plan docs",
			copy: "Home and in-clinic exercises on the chart.",
		},
		{
			title: "Physio intake forms",
			copy: "History tailored to rehab.",
		},
		{
			title: "Optional Cura AI",
			copy: "Faster notes; therapist reviews.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Progress only in paper notes",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Plans not visible to the next therapist",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "No-shows without WhatsApp reminders",
			copy: "Busy books lose patients without reliable WhatsApp/SMS recalls.",
		}
	],
	fit: ["Physio clinics", "Multi-therapist centres", "Rehab + ortho companion clinics"],
	faqs: [
		{
			question: "Best physiotherapy EMR?",
			answer: "Sessions, plans, progress, exercise docs, scheduling, billing together.",
		},
		{
			question: "AI EMR?",
			answer: "Optional assist; you review.",
		},
		{
			question: "Track sessions and treatment plans?",
			answer: "Yes.",
		},
		{
			question: "Rehab progress tracking?",
			answer: "Yes.",
		},
		{
			question: "Document exercise plans?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See physiotherapy EMR on a therapy book",
	ctaLede:
		"Book a demo — sessions, goals, and billing on your workflow.",
});

const pulmonology = createSpecialty({
	enabled: true,
	slug: "pulmonology-emr",
	specialty: 'Pulmonology',
	specialtyAdj: 'pulmonology',
	specialtyNoun: 'pulmonology clinic',
	seoTitle: "Pulmonology EMR Software — EasyClinic",
	seoDescription:
		"Pulmonology EMR — respiratory templates, spirometry and imaging storage, chronic lung tracking, appointments, and billing.",
	eyebrow: "Pulmonology",
	title: "Pulmonology EMR for spirometry, imaging, and chronic respiratory follow-up",
	lede: "Specialty respiratory documentation, lung-function and imaging files on the chart, chronic condition tracking, scheduling, and billing in one platform.",
	note: 'Built for pulmonology clinics, respiratory centres, and multi-doctor practices.',
	heroFacts: [
		{ value: "Resp templates", label: "Specialty notes" },
		{ value: "Spirometry on file", label: "Lung function attached" },
		{ value: "Chronic tracking", label: "Asthma, COPD, and more" }
	],
	clinical: [
		{
			title: "Pulmonology templates",
			copy: "Notes for respiratory visits.",
		},
		{
			title: "Spirometry & diagnostics",
			copy: "Store lung-function and related reports.",
		},
		{
			title: "Imaging on chart",
			copy: "Attach relevant scans to the record.",
		},
		{
			title: "Chronic respiratory tracking",
			copy: "Longitudinal asthma/COPD and similar care.",
		},
		{
			title: "Treatment planning",
			copy: "Plans beside history and results.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist; clinician signs.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Spirometry results off-system",
			copy: "The next clinician opens the note without the files they need.",
		},
		{
			title: "Chronic patients without structured recall",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		},
		{
			title: "Evening documentation load",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		}
	],
	fit: ["Pulmonologists", "Chest clinics", "Hospital pulmonology OPD"],
	faqs: [
		{
			question: "Best pulmonology EMR?",
			answer: "Templates, spirometry/imaging storage, chronic tracking, ops modules.",
		},
		{
			question: "AI EMR?",
			answer: "Optional Cura AI.",
		},
		{
			question: "Track spirometry?",
			answer: "Yes — store results on the chart.",
		},
		{
			question: "Chronic respiratory tracking?",
			answer: "Yes.",
		},
		{
			question: "Store diagnostic/imaging reports?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See pulmonology EMR on your OPD flow",
	ctaLede:
		"Book a demo — templates, lung tests, and billing.",
});

const oncology = createSpecialty({
	enabled: true,
	slug: "oncology-emr",
	specialty: 'Oncology',
	specialtyAdj: 'oncology',
	specialtyNoun: 'oncology clinic',
	seoTitle: "Oncology EMR Software — EasyClinic",
	seoDescription:
		"Oncology EMR — treatment protocols, chemo tracking, lab/diagnostic storage, long-term follow-up, appointments, and billing.",
	eyebrow: "Oncology",
	title: "Oncology EMR for protocols, treatment cycles, and long-term follow-up",
	lede: "Track treatment plans and cycles, keep labs and diagnostics on the chart, schedule visits, and bill clearly — built for oncology clinic and day-care workflows.",
	note: 'Built for oncology clinics, day-care centres, and multi-oncologist practices.',
	heroFacts: [
		{ value: "Treatment plans", label: "Protocols on chart" },
		{ value: "Cycle tracking", label: "Visits & regimens" },
		{ value: "Labs on file", label: "Diagnostics attached" }
	],
	clinical: [
		{
			title: "Oncology templates",
			copy: "Intake and visit forms for cancer care.",
		},
		{
			title: "Treatment / protocol planning",
			copy: "Document regimens and changes.",
		},
		{
			title: "Chemo & cycle tracking",
			copy: "Follow treatment cycles across visits.",
		},
		{
			title: "Lab & diagnostic store",
			copy: "Results attached to the patient.",
		},
		{
			title: "Long-term follow-up",
			copy: "Survivorship and monitoring visits organized.",
		},
		{
			title: "Optional Cura AI",
			copy: "Notes assist; oncologist reviews.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Protocols in spreadsheets",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Labs not tied to the cycle day",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		},
		{
			title: "Long-term follow-ups hard to recall",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Oncology clinics", "Day-care chemo centres", "Multi-oncologist practices"],
	faqs: [
		{
			question: "Best oncology EMR?",
			answer: "Protocols, cycle tracking, labs on chart, scheduling, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional Cura AI.",
		},
		{
			question: "Track chemotherapy protocols?",
			answer: "Yes — treatment/cycle documentation on the chart; confirm depth for your protocol set in demo.",
		},
		{
			question: "Store labs/diagnostics?",
			answer: "Yes.",
		},
		{
			question: "Long-term patient tracking?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See oncology EMR on a treatment calendar",
	ctaLede:
		"Book a demo — plans, cycles, and billing.",
});

const mentalHealth = createSpecialty({
	enabled: true,
	slug: "mental-health",
	specialty: 'Mental Health',
	specialtyAdj: 'mental health',
	specialtyNoun: 'mental health clinic',
	seoTitle: "Mental Health EMR Software — EasyClinic",
	seoDescription:
		"Mental health EMR — session notes, treatment plans, medication tracking, telehealth, and privacy-minded access for psychiatry, psychology, and counselling clinics.",
	eyebrow: "Mental health",
	title: "Mental health EMR for sessions, plans, meds, and tighter privacy",
	lede: "One clinic management platform for mental health practices — progress notes, treatment plans, medication tracking, teleconsults, and role-based access.",
	note: 'Built for mental health clinics; pairs with psychiatry and psychology specialty pages.',
	heroFacts: [
		{ value: "Session notes", label: "Progress documentation" },
		{ value: "Meds & plans", label: "Tracked regimens" },
		{ value: "Privacy-minded", label: "Role-based access" }
	],
	clinical: [
		{
			title: "Progress notes",
			copy: "Structured session documentation.",
		},
		{
			title: "Treatment plans",
			copy: "Customizable plans across visits.",
		},
		{
			title: "Medication tracking",
			copy: "Regimens and changes with history.",
		},
		{
			title: "Drug interaction checks",
			copy: "Safety prompts where enabled.",
		},
		{
			title: "Telehealth",
			copy: "Video consults on the same book.",
		},
		{
			title: "Tight roles",
			copy: "Limit who sees sensitive notes.",
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Notes in unmanaged documents",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		},
		{
			title: "Med changes hard to audit",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Access too broad across staff",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		}
	],
	fit: ["Psychiatry clinics", "Psychology / therapy centres", "Mixed mental-health practices"],
	faqs: [
		{
			question: "Best mental health EMR?",
			answer: "Sessions, plans, meds, telehealth, and strong access control together.",
		},
		{
			question: "AI EMR?",
			answer: "Optional assist; clinician reviews before save.",
		},
		{
			question: "Session/progress notes?",
			answer: "Yes.",
		},
		{
			question: "Medication tracking?",
			answer: "Yes.",
		},
		{
			question: "Data privacy?",
			answer: "Role-based access and audit-minded cloud controls; confirm your policy needs in demo.",
		}
	],
	ctaTitle: "See mental health EMR on a clinic day",
	ctaLede:
		"Book a demo — notes, privacy, and scheduling.",
});

const aesthetic = createSpecialty({
	enabled: true,
	slug: "aesthetic-emr-software",
	specialty: 'Aesthetic',
	specialtyAdj: 'aesthetic',
	specialtyNoun: 'aesthetic clinic',
	seoTitle: "Aesthetic EMR Software — EasyClinic",
	seoDescription:
		"Aesthetic EMR — before/after images, procedure packages, consent forms, appointments, and billing for aesthetic clinics.",
	eyebrow: "Aesthetics",
	title: "Aesthetic EMR for before/after photos, packages, and consents",
	lede: "Manage consults, before/after images, package billing, consents, scheduling, and follow-ups in one clinic management platform for aesthetic practices.",
	note: 'Built for aesthetic clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Before/after", label: "Images on chart" },
		{ value: "Package billing", label: "Treatment packages" },
		{ value: "Consents", label: "Procedure-ready" }
	],
	clinical: [
		{
			title: "Before & after image management",
			copy: "Photos tied to the patient and visit.",
		},
		{
			title: "Procedure documentation",
			copy: "Record aesthetic treatments clearly.",
		},
		{
			title: "Package billing",
			copy: "Bill packages without spreadsheet gymnastics.",
		},
		{
			title: "Consent forms",
			copy: "Capture consents with the workflow.",
		},
		{
			title: "Specialty aesthetic forms",
			copy: "Intake tuned for aesthetic clinics.",
		},
		{
			title: "Optional Cura AI",
			copy: "Faster notes; clinician reviews.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Photos scattered on phones",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Package balances unclear",
			copy: "Charges drift from what was done unless billing follows the plan.",
		},
		{
			title: "Consents missing at procedure time",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		}
	],
	fit: ["Aesthetic clinics", "Cosmetic derm companions", "Multi-chair aesthetic centres"],
	faqs: [
		{
			question: "Best aesthetic EMR?",
			answer: "Images, packages, consents, scheduling, billing together.",
		},
		{
			question: "AI EMR?",
			answer: "Optional Cura AI.",
		},
		{
			question: "Before/after photos?",
			answer: "Yes — on the patient record.",
		},
		{
			question: "Package billing?",
			answer: "Yes.",
		},
		{
			question: "Consent forms?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See aesthetic EMR on your procedure menu",
	ctaLede:
		"Book a demo — photos, packages, and billing.",
});

const allergy = createSpecialty({
	enabled: true,
	slug: "allergy-emr-software",
	specialty: 'Allergy',
	specialtyAdj: 'allergy',
	specialtyNoun: 'allergy clinic',
	seoTitle: "Allergy EMR Software — EasyClinic",
	seoDescription:
		"Allergy EMR — skin/patch testing, immunotherapy schedules, long-term tracking, appointments, and billing for allergy clinics.",
	eyebrow: "Allergy",
	title: "Allergy EMR for tests, immunotherapy schedules, and long-term follow-up",
	lede: "Track allergy tests, immunotherapy, visits, and billing in one specialty-aware clinic management system.",
	note: 'Built for allergy clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Test tracking", label: "Skin/patch results" },
		{ value: "Immunotherapy", label: "Schedule on chart" },
		{ value: "Long-term care", label: "Follow-up ready" }
	],
	clinical: [
		{
			title: "Skin & patch testing",
			copy: "Document and store test results.",
		},
		{
			title: "Immunotherapy module",
			copy: "Track schedules and doses across visits.",
		},
		{
			title: "Allergy intake forms",
			copy: "History tailored to allergy clinics.",
		},
		{
			title: "Long-term patient tracking",
			copy: "Chronic allergy care on one timeline.",
		},
		{
			title: "Fast Rx",
			copy: "Share prescriptions quickly.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Test results off-chart",
			copy: "The next clinician opens the note without the files they need.",
		},
		{
			title: "Immunotherapy schedules in notebooks",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Long-term patients without structured recall",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Allergy clinics", "Allergy + immunology practices", "Specialist OPD"],
	faqs: [
		{
			question: "Best allergy EMR?",
			answer: "Tests, immunotherapy tracking, long-term care, ops modules.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Track allergy test results?",
			answer: "Yes.",
		},
		{
			question: "Immunotherapy schedules?",
			answer: "Yes.",
		},
		{
			question: "Long-term allergy patients?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See allergy EMR on an immunotherapy calendar",
	ctaLede:
		"Book a demo — tests, schedules, and billing.",
});

const ayurveda = createSpecialty({
	enabled: true,
	slug: "ayurveda-emr-software",
	specialty: 'Ayurveda',
	specialtyAdj: 'Ayurveda',
	specialtyNoun: 'Ayurveda clinic',
	seoTitle: "Ayurveda EMR Software — EasyClinic",
	seoDescription:
		"Ayurveda EMR — prakriti-aware intake, treatment plans, herbal/Rx workflows, appointments, and billing for Ayurveda clinics.",
	eyebrow: "Ayurveda",
	title: "Ayurveda EMR for intake, treatment plans, and clinic-floor ops",
	lede: "Specialty-friendly Ayurveda documentation, treatment plans, prescriptions, scheduling, and billing in one clinic management system.",
	note: 'Built for Ayurveda clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Ayurveda forms", label: "Specialty intake" },
		{ value: "Treatment plans", label: "Course of care" },
		{ value: "Ops included", label: "Schedule & billing" }
	],
	clinical: [
		{
			title: "Ayurveda-oriented intake",
			copy: "Capture history the way your practice works.",
		},
		{
			title: "Treatment plan tracking",
			copy: "Follow courses of care across visits.",
		},
		{
			title: "Prescription workflows",
			copy: "Share plans via print/WhatsApp/SMS/email.",
		},
		{
			title: "Visit summaries",
			copy: "Prior care visible quickly.",
		},
		{
			title: "Multi-practitioner roles",
			copy: "Clinic staff access by role.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Intake on paper only",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Plans not visible to the next practitioner",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Billing after the fact",
			copy: "Charges drift from what was done unless billing follows the plan.",
		}
	],
	fit: ["Ayurveda clinics", "Panchakarma centres", "Multi-vaidya practices"],
	faqs: [
		{
			question: "Best Ayurveda EMR?",
			answer: "Specialty intake, plans, Rx, scheduling, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Long-term patient tracking?",
			answer: "Yes.",
		},
		{
			question: "Multi-practitioner clinics?",
			answer: "Yes — role-based access.",
		}
	],
	ctaTitle: "See Ayurveda EMR on your OPD flow",
	ctaLede:
		"Book a demo — intake, plans, and billing.",
});

const alternativeMedicine = createSpecialty({
	enabled: true,
	slug: "alternative-medicine",
	specialty: 'Alternative Medicine',
	specialtyAdj: 'alternative medicine',
	specialtyNoun: 'alternative medicine clinic',
	seoTitle: "Alternative Medicine EMR — EasyClinic",
	seoDescription:
		"Alternative medicine EMR — Ayurveda, homeopathy, and naturopathy-friendly prescriptions, multidisciplinary plans, appointments, and billing.",
	eyebrow: "Alternative medicine",
	title: "Alternative medicine EMR for holistic prescriptions and multi-modality plans",
	lede: "Document visits, multidisciplinary treatment plans, and specialty prescriptions — with scheduling and billing in one clinic management platform.",
	note: 'Built for alternative medicine clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Holistic Rx", label: "Modality-aware scripts" },
		{ value: "Multi-modality plans", label: "Combined care paths" },
		{ value: "Long-term tracking", label: "Follow-ups organized" }
	],
	clinical: [
		{
			title: "Modality-aware documentation",
			copy: "Forms that fit holistic practice styles.",
		},
		{
			title: "Ayurveda / homeopathy / naturopathy Rx",
			copy: "Prescription workflows that match how you prescribe.",
		},
		{
			title: "Multidisciplinary treatment management",
			copy: "Plans across modalities on one chart.",
		},
		{
			title: "Treatment history",
			copy: "Longitudinal care without paper stacks.",
		},
		{
			title: "Scheduling & billing",
			copy: "Same ops spine as other EasyClinic clinics.",
		},
		{
			title: "Optional Cura AI",
			copy: "Notes assist; practitioner reviews.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Paper-only treatment histories",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Modalities tracked in separate books",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Billing disconnected from the plan",
			copy: "Charges drift from what was done unless billing follows the plan.",
		}
	],
	fit: ["Ayurveda / homeopathy / naturopathy clinics", "Integrative centres", "Multi-practitioner holistic clinics"],
	faqs: [
		{
			question: "Best EMR for alternative medicine?",
			answer: "Modality-aware notes/Rx, long-term tracking, scheduling, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Ayurvedic/homeopathy/naturopathy prescriptions?",
			answer: "Supported in specialty-friendly Rx workflows — confirm your modality templates in demo.",
		},
		{
			question: "Long-term tracking?",
			answer: "Yes.",
		},
		{
			question: "Store treatment documents?",
			answer: "Yes — on the patient record.",
		}
	],
	ctaTitle: "See alternative medicine EMR on your clinic day",
	ctaLede:
		"Book a demo — plans, Rx, and billing.",
});

const cosmetology = createSpecialty({
	enabled: true,
	slug: "cosmetology-emr-software",
	specialty: 'Cosmetology',
	specialtyAdj: 'cosmetology',
	specialtyNoun: 'cosmetology clinic',
	seoTitle: "Cosmetology EMR Software — EasyClinic",
	seoDescription:
		"Cosmetology EMR — treatment records, before/after images, package billing, appointments, and inventory for cosmetology clinics.",
	eyebrow: "Cosmetology",
	title: "Cosmetology EMR for treatments, photos, and package billing",
	lede: "Run cosmetology consults, photo documentation, packages, scheduling, and billing without a patchwork of tools.",
	note: 'Built for cosmetology clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Treatment records", label: "Visit-linked" },
		{ value: "Before/after", label: "Images on chart" },
		{ value: "Packages", label: "Clear billing" }
	],
	clinical: [
		{
			title: "Treatment documentation",
			copy: "Record procedures and products used.",
		},
		{
			title: "Before/after images",
			copy: "Photos on the patient record.",
		},
		{
			title: "Package billing",
			copy: "Track packages and balances.",
		},
		{
			title: "Inventory for consumables",
			copy: "Supplies visibility where enabled.",
		},
		{
			title: "Reminders",
			copy: "WhatsApp/SMS/email follow-ups.",
		},
		{
			title: "Optional Cura AI",
			copy: "Faster notes.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Photos and notes disconnected",
			copy: "Progress shots sit in camera rolls instead of the visit timeline.",
		},
		{
			title: "Package balances unclear",
			copy: "Charges drift from what was done unless billing follows the plan.",
		},
		{
			title: "Stockouts mid-treatment",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		}
	],
	fit: ["Cosmetology clinics", "Beauty + clinical hybrid centres", "Multi-chair cosmetology practices"],
	faqs: [
		{
			question: "Best cosmetology EMR?",
			answer: "Treatments, photos, packages, scheduling, billing.",
		},
		{
			question: "Before/after photos?",
			answer: "Yes.",
		},
		{
			question: "Package billing?",
			answer: "Yes.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		}
	],
	ctaTitle: "See cosmetology EMR on your service menu",
	ctaLede:
		"Book a demo — treatments, photos, and billing.",
});

const diabetology = createSpecialty({
	enabled: true,
	slug: "diabetology-emr-software",
	specialty: 'Diabetology',
	specialtyAdj: 'diabetology',
	specialtyNoun: 'diabetes clinic',
	seoTitle: "Diabetology EMR Software — EasyClinic",
	seoDescription:
		"Diabetology EMR — diabetes templates, labs/vitals trends, foot and eye exam tracking, appointments, and billing for diabetes clinics.",
	eyebrow: "Diabetology",
	title: "Diabetology EMR for labs, trends, and complication-aware follow-up",
	lede: "Diabetes-specific forms, vitals and lab trends, foot/eye exam tracking, scheduling, and billing — built for high-volume diabetes OPD.",
	note: 'Built for diabetes clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Diabetes forms", label: "Specialty intake" },
		{ value: "Lab & vitals trends", label: "Graphs that help" },
		{ value: "Foot/eye exams", label: "Complication checks" }
	],
	clinical: [
		{
			title: "Diabetes examination forms",
			copy: "Capture diabetes visits in a few clicks.",
		},
		{
			title: "Vitals & lab visualization",
			copy: "Trends for glucose, labs, and key parameters.",
		},
		{
			title: "Foot & eye exam tracking",
			copy: "Document complication screening.",
		},
		{
			title: "Medication & plan management",
			copy: "Regimens beside the clinical timeline.",
		},
		{
			title: "Fast Rx share",
			copy: "WhatsApp/SMS/email/print.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Labs not trended for the next visit",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Foot/eye checks missed in the rush",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		},
		{
			title: "Evening charting after a full OPD",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		}
	],
	fit: ["Diabetologists", "Diabetes clinics", "Endocrine + diabetes centres"],
	faqs: [
		{
			question: "Best diabetes EMR?",
			answer: "Specialty forms, trends, complication checks, ops modules.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Track labs and trends?",
			answer: "Yes.",
		},
		{
			question: "Foot/eye examination docs?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See diabetology EMR on a busy OPD day",
	ctaLede:
		"Book a demo — trends, screening, and billing.",
});

const endocrinology = createSpecialty({
	enabled: true,
	slug: "endocrinology-emr-software",
	specialty: 'Endocrinology',
	specialtyAdj: 'endocrinology',
	specialtyNoun: 'endocrine clinic',
	seoTitle: "Endocrinology EMR Software — EasyClinic",
	seoDescription:
		"Endocrinology EMR — hormone and metabolic templates, lab trends, chronic endocrine follow-up, appointments, and billing.",
	eyebrow: "Endocrinology",
	title: "Endocrinology EMR for hormone care, lab trends, and long follow-ups",
	lede: "Specialty endocrine documentation, lab visualization, medication plans, scheduling, and billing for endocrinology clinics.",
	note: 'Built for endocrine clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Endocrine templates", label: "Specialty notes" },
		{ value: "Lab trends", label: "Hormones & metabolics" },
		{ value: "Chronic follow-up", label: "Recall-ready" }
	],
	clinical: [
		{
			title: "Endocrinology templates",
			copy: "Notes for thyroid, metabolic, and related visits.",
		},
		{
			title: "Lab trend visuals",
			copy: "Hormones and key labs across time.",
		},
		{
			title: "Medication management",
			copy: "Titration history on the chart.",
		},
		{
			title: "Chronic follow-up tracking",
			copy: "Long courses without lost context.",
		},
		{
			title: "Fast Rx",
			copy: "Share quickly to patients.",
		},
		{
			title: "Optional Cura AI",
			copy: "Notes assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Lab PDFs not trended",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Titration history hard to reconstruct",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Recall lists in spreadsheets",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Endocrinologists", "Endocrine clinics", "Hospital endocrine OPD"],
	faqs: [
		{
			question: "Best endocrinology EMR?",
			answer: "Templates, lab trends, meds, chronic follow-up, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Lab parameter tracking?",
			answer: "Yes — trends on the chart.",
		},
		{
			question: "Chronic endocrine tracking?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See endocrinology EMR on your follow-up list",
	ctaLede:
		"Book a demo — labs, meds, and billing.",
});

const familyPhysician = createSpecialty({
	enabled: true,
	slug: "family-physician-emr",
	specialty: 'Family Physician',
	specialtyAdj: 'family medicine',
	specialtyNoun: 'family practice',
	seoTitle: "Family Physician EMR — EasyClinic",
	seoDescription:
		"Family physician EMR — whole-family charts, chronic disease templates, preventive care, appointments, and billing for family medicine clinics.",
	eyebrow: "Family medicine",
	title: "Family physician EMR for whole-person care and chronic follow-up",
	lede: "Fast charts for everyday family medicine — chronic disease templates, preventive care tracking, scheduling, and billing in one light clinic management stack.",
	note: 'Built for family practices and multi-doctor practices.',
	heroFacts: [
		{ value: "Family charts", label: "Continuity of care" },
		{ value: "Chronic templates", label: "HTN, DM, and more" },
		{ value: "Preventive care", label: "Vaccines & checks" }
	],
	clinical: [
		{
			title: "Family-medicine templates",
			copy: "Common conditions documented quickly.",
		},
		{
			title: "Chronic disease management",
			copy: "Hypertension, diabetes, respiratory, and similar.",
		},
		{
			title: "Preventive care & vaccines",
			copy: "Track preventive visits.",
		},
		{
			title: "Complete history at a glance",
			copy: "Prior visits without hunting.",
		},
		{
			title: "WhatsApp reminders",
			copy: "Cut no-shows.",
		},
		{
			title: "Optional Cura AI",
			copy: "Faster notes.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Family history fragmented across paper",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Chronic recalls manual",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		},
		{
			title: "Preventive care not scheduled systematically",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		}
	],
	fit: ["Family physicians", "Neighbourhood clinics", "Small multi-doctor family practices"],
	faqs: [
		{
			question: "Best family physician EMR?",
			answer: "Fast charts, chronic + preventive tracking, scheduling, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Full patient history?",
			answer: "Yes.",
		},
		{
			question: "Chronic disease management?",
			answer: "Yes.",
		},
		{
			question: "Vaccinations/preventive care?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See family physician EMR on a clinic day",
	ctaLede:
		"Book a demo — continuity, chronic care, and billing.",
});

const generalPractitioner = createSpecialty({
	enabled: true,
	slug: "general-practitioner-emr",
	specialty: 'General Practitioner',
	specialtyAdj: 'GP',
	specialtyNoun: 'GP clinic',
	seoTitle: "General Practitioner EMR — EasyClinic",
	seoDescription:
		"GP EMR — fast charts, chronic disease and preventive care tracking, appointments, billing, and WhatsApp reminders for general practice.",
	eyebrow: "General practice",
	title: "GP EMR that finishes with the consult — charts, chronic care, billing",
	lede: "Practice management software sized for GPs: thirty-second prescriptions, chronic and preventive tracking, a calendar you trust, and a till that closes clean.",
	note: 'Built for GP clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Fast charts", label: "OPD speed" },
		{ value: "Chronic + preventive", label: "Longitudinal care" },
		{ value: "Simple billing", label: "Till that reconciles" }
	],
	clinical: [
		{
			title: "GP-ready EMR",
			copy: "Point-and-click notes for high-volume OPD.",
		},
		{
			title: "Chronic disease tracking",
			copy: "Follow common long-term conditions.",
		},
		{
			title: "Preventive care",
			copy: "Vaccines and checks on the timeline.",
		},
		{
			title: "Reminders",
			copy: "WhatsApp/SMS/email.",
		},
		{
			title: "Telehealth",
			copy: "When patients can’t come in.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Evening catch-up charts",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		},
		{
			title: "Chronic patients without recall",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		},
		{
			title: "Billing after the fact",
			copy: "Charges drift from what was done unless billing follows the plan.",
		}
	],
	fit: ["GPs", "Solo clinics", "Small GP group practices"],
	faqs: [
		{
			question: "Best GP EMR?",
			answer: "Speed, chronic/preventive tracking, scheduling, billing — without hospital bloat.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Complete history?",
			answer: "Yes.",
		},
		{
			question: "Chronic disease management?",
			answer: "Yes.",
		},
		{
			question: "Vaccinations/preventive?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See GP EMR on your OPD list",
	ctaLede:
		"Book a demo — speed first, then depth.",
});

const generalSurgery = createSpecialty({
	enabled: true,
	slug: "general-surgery-emr",
	specialty: 'General Surgery',
	specialtyAdj: 'general surgery',
	specialtyNoun: 'surgery clinic',
	seoTitle: "General Surgery EMR Software — EasyClinic",
	seoDescription:
		"General surgery EMR — pre-op assessments, procedure documentation, post-op follow-ups, imaging/labs, appointments, and billing.",
	eyebrow: "General surgery",
	title: "General surgery EMR for pre-op, procedure notes, and post-op follow-up",
	lede: "Document pre-operative assessments, procedures, and post-op visits with imaging/labs on the chart — plus scheduling and billing.",
	note: 'Built for surgery clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Pre-op docs", label: "Assessments on chart" },
		{ value: "Procedure notes", label: "Operative documentation" },
		{ value: "Post-op follow-up", label: "Recall-ready" }
	],
	clinical: [
		{
			title: "Pre-operative assessments",
			copy: "Structured pre-op documentation.",
		},
		{
			title: "Surgical procedure documentation",
			copy: "Operative notes with the encounter.",
		},
		{
			title: "Post-operative follow-up",
			copy: "Track recovery visits.",
		},
		{
			title: "Imaging & labs on chart",
			copy: "Results attached to the patient.",
		},
		{
			title: "Fast Rx & summaries",
			copy: "Less after-hours paperwork.",
		},
		{
			title: "Optional Cura AI",
			copy: "Notes assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Pre-op checklists on paper",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Op notes delayed",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		},
		{
			title: "Post-op follow-ups unmanaged",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["General surgeons", "Surgery clinics", "Day-care surgical centres"],
	faqs: [
		{
			question: "Best surgery EMR?",
			answer: "Pre-op, procedure docs, post-op tracking, imaging/labs, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Pre-operative assessments?",
			answer: "Yes.",
		},
		{
			question: "Procedure documentation?",
			answer: "Yes.",
		},
		{
			question: "Post-op care/follow-ups?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See general surgery EMR on an OT week",
	ctaLede:
		"Book a demo — pre-op to post-op on one chart.",
});

const hematology = createSpecialty({
	enabled: true,
	slug: "hematology-emr",
	specialty: 'Hematology',
	specialtyAdj: 'hematology',
	specialtyNoun: 'hematology clinic',
	seoTitle: "Hematology EMR Software — EasyClinic",
	seoDescription:
		"Hematology EMR — specialty templates, lab trend tracking, treatment plans, appointments, and billing for blood disorder clinics.",
	eyebrow: "Hematology",
	title: "Hematology EMR for lab trends, treatment plans, and long follow-up",
	lede: "Specialty hematology documentation, lab visualization, treatment plans, scheduling, and billing for hematology clinics and OPD.",
	note: 'Built for hematology clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Heme templates", label: "Specialty notes" },
		{ value: "Lab trends", label: "Counts & markers" },
		{ value: "Treatment plans", label: "Longitudinal care" }
	],
	clinical: [
		{
			title: "Hematology templates",
			copy: "Notes for common hematology visits.",
		},
		{
			title: "Lab trend tracking",
			copy: "Counts and key markers over time.",
		},
		{
			title: "Treatment plan management",
			copy: "Plans beside the lab timeline.",
		},
		{
			title: "Diagnostic report store",
			copy: "Attach reports to the chart.",
		},
		{
			title: "Chronic follow-up",
			copy: "Recall for long courses.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Lab trends rebuilt from PDFs each visit",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Treatment changes hard to audit",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Missed chronic recalls",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Hematologists", "Hematology clinics", "Hospital hematology OPD"],
	faqs: [
		{
			question: "Best hematology EMR?",
			answer: "Templates, lab trends, plans, scheduling, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Track lab parameters?",
			answer: "Yes.",
		},
		{
			question: "Long-term patient tracking?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See hematology EMR on your follow-up list",
	ctaLede:
		"Book a demo — labs, plans, and billing.",
});

const immunology = createSpecialty({
	enabled: true,
	slug: "immunology-emr",
	specialty: 'Immunology',
	specialtyAdj: 'immunology',
	specialtyNoun: 'immunology clinic',
	seoTitle: "Immunology EMR Software — EasyClinic",
	seoDescription:
		"Immunology EMR — allergy/sensitivity tracking, immunization logs, autoimmune monitoring, appointments, and billing.",
	eyebrow: "Immunology",
	title: "Immunology EMR for sensitivities, immunizations, and autoimmune follow-up",
	lede: "Track allergies and sensitivities, immunizations, autoimmune monitoring, visits, and billing in one specialty-aware platform.",
	note: 'Built for immunology clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Sensitivities", label: "Allergy tracking" },
		{ value: "Immunizations", label: "Schedules on chart" },
		{ value: "Autoimmune watch", label: "Longitudinal monitoring" }
	],
	clinical: [
		{
			title: "Allergy & sensitivity management",
			copy: "Document reactions and triggers.",
		},
		{
			title: "Immunization tracking",
			copy: "Vaccines and schedules.",
		},
		{
			title: "Autoimmune disease monitoring",
			copy: "Follow long courses with clearer history.",
		},
		{
			title: "Immunology intake forms",
			copy: "Specialty-ready history.",
		},
		{
			title: "Lab/report store",
			copy: "Results on the patient record.",
		},
		{
			title: "Optional Cura AI",
			copy: "Notes assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Sensitivity lists outdated",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Immunization history incomplete",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Autoimmune follow-ups unscheduled",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Immunologists", "Allergy-immunology clinics", "Specialty OPD"],
	faqs: [
		{
			question: "Best immunology EMR?",
			answer: "Sensitivities, immunizations, autoimmune monitoring, ops modules.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Track immunizations?",
			answer: "Yes.",
		},
		{
			question: "Autoimmune monitoring?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See immunology EMR on your clinic day",
	ctaLede:
		"Book a demo — sensitivities, vaccines, and billing.",
});

const nephrology = createSpecialty({
	enabled: true,
	slug: "nephrology-emr",
	specialty: 'Nephrology',
	specialtyAdj: 'nephrology',
	specialtyNoun: 'nephrology clinic',
	seoTitle: "Nephrology EMR Software — EasyClinic",
	seoDescription:
		"Nephrology EMR — renal templates, lab parameter trends, CKD tracking, dialysis session docs, appointments, and billing.",
	eyebrow: "Nephrology",
	title: "Nephrology EMR for renal labs, CKD follow-up, and dialysis sessions",
	lede: "Nephrology templates, renal lab trends, CKD tracking, dialysis session documentation, scheduling, and billing in one clinic management stack.",
	note: 'Built for nephrology clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Renal templates", label: "Specialty notes" },
		{ value: "Lab trends", label: "Renal parameters" },
		{ value: "Dialysis sessions", label: "Visit-linked docs" }
	],
	clinical: [
		{
			title: "Nephrology templates",
			copy: "Structured kidney-care documentation.",
		},
		{
			title: "Renal lab trends",
			copy: "Follow key parameters across visits.",
		},
		{
			title: "CKD patient tracking",
			copy: "Longitudinal chronic kidney care.",
		},
		{
			title: "Dialysis session documentation",
			copy: "Record sessions on the chart.",
		},
		{
			title: "Medication management",
			copy: "Regimens with clinical context.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Labs not trended for CKD visits",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Dialysis notes in separate books",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Medication changes hard to reconstruct",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		}
	],
	fit: ["Nephrologists", "Kidney clinics", "Dialysis + nephrology centres"],
	faqs: [
		{
			question: "Best nephrology EMR?",
			answer: "Templates, renal labs, CKD tracking, dialysis docs, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Track renal lab parameters?",
			answer: "Yes.",
		},
		{
			question: "CKD tracking?",
			answer: "Yes.",
		},
		{
			question: "Dialysis session tracking?",
			answer: "Yes — confirm session workflow depth for your unit in demo.",
		}
	],
	ctaTitle: "See nephrology EMR on a dialysis week",
	ctaLede:
		"Book a demo — labs, sessions, and billing.",
});

const pathology = createSpecialty({
	enabled: true,
	slug: "pathology-emr",
	specialty: 'Pathology',
	specialtyAdj: 'pathology',
	specialtyNoun: 'pathology lab / clinic',
	seoTitle: "Pathology EMR Software — EasyClinic",
	seoDescription:
		"Pathology EMR — test catalogs, sample tracking, workflow automation, report generation, and high-volume lab ops.",
	eyebrow: "Pathology",
	title: "Pathology EMR for samples, workflows, and reports that keep up",
	lede: "Test catalogs and packages, sample tracking, workflow automation, and reporting — for pathology labs that can’t afford lost specimens or slow turnaround.",
	note: 'Built for pathology lab / clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Test catalog", label: "Packages ready" },
		{ value: "Sample tracking", label: "Chain of custody" },
		{ value: "Reports", label: "Faster turnaround" }
	],
	clinical: [
		{
			title: "Test catalog & packages",
			copy: "Define tests and bundles clearly.",
		},
		{
			title: "Sample tracking",
			copy: "Follow specimens through the workflow.",
		},
		{
			title: "Workflow automation",
			copy: "Reduce manual handoff friction.",
		},
		{
			title: "Report generation",
			copy: "Produce reports without a second system.",
		},
		{
			title: "High-volume ops",
			copy: "Built for busy lab days.",
		},
		{
			title: "Optional Cura AI",
			copy: "Assist where documentation helps; pathologist reviews.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Samples hard to locate mid-flow",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Reports delayed by handoffs",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		},
		{
			title: "Packages billed inconsistently",
			copy: "Charges drift from what was done unless billing follows the plan.",
		}
	],
	fit: ["Pathology labs", "Diagnostic centres", "Hospital lab OPD interfaces"],
	faqs: [
		{
			question: "Best pathology EMR/LIS-style clinic software?",
			answer: "Catalog, sample tracking, workflows, reporting, billing.",
		},
		{
			question: "AI assist?",
			answer: "Optional; confirm use-cases in demo.",
		},
		{
			question: "Sample and test workflows?",
			answer: "Yes.",
		},
		{
			question: "Automated report generation?",
			answer: "Supported in-product workflows — confirm templates in demo.",
		},
		{
			question: "High volume?",
			answer: "Yes — designed for busy labs.",
		}
	],
	ctaTitle: "See pathology workflows on your test menu",
	ctaLede:
		"Book a demo — samples to report.",
});

const radiology = createSpecialty({
	enabled: true,
	slug: "radiology-emr",
	specialty: 'Radiology',
	specialtyAdj: 'radiology',
	specialtyNoun: 'radiology centre',
	seoTitle: "Radiology EMR Software — EasyClinic",
	seoDescription:
		"Radiology EMR — order management, imaging workflow, reporting templates, patient records, appointments, and billing for imaging centres.",
	eyebrow: "Radiology",
	title: "Radiology EMR for orders, imaging workflow, and reporting templates",
	lede: "Manage imaging orders, reporting templates, patient records, scheduling, and billing for radiology clinics and diagnostic centres.",
	note: 'Built for radiology centres and multi-doctor practices.',
	heroFacts: [
		{ value: "Orders", label: "Imaging requests" },
		{ value: "Reporting templates", label: "Faster reads" },
		{ value: "High volume", label: "Busy centre ready" }
	],
	clinical: [
		{
			title: "Order management",
			copy: "Track imaging requests cleanly.",
		},
		{
			title: "Imaging workflow",
			copy: "Keep studies moving through the centre.",
		},
		{
			title: "Reporting templates",
			copy: "Standardize radiology reports.",
		},
		{
			title: "Diagnostic record store",
			copy: "Reports attached to the patient.",
		},
		{
			title: "Scheduling & billing",
			copy: "Ops beside clinical flow.",
		},
		{
			title: "Optional Cura AI",
			copy: "Assist documentation where useful; radiologist reviews.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Orders stuck between desk and modality",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Reports inconsistent",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Billing delayed after reads",
			copy: "Notes spill past the last patient instead of finishing with the visit.",
		}
	],
	fit: ["Radiology clinics", "Imaging centres", "Hospital radiology OPD counters"],
	faqs: [
		{
			question: "Best radiology EMR?",
			answer: "Orders, workflow, reporting templates, records, billing.",
		},
		{
			question: "AI assist?",
			answer: "Optional; confirm scope in demo.",
		},
		{
			question: "Store imaging reports?",
			answer: "Yes.",
		},
		{
			question: "Reporting templates?",
			answer: "Yes.",
		},
		{
			question: "High patient volume?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See radiology EMR on your order list",
	ctaLede:
		"Book a demo — orders to report to bill.",
});

const rheumatology = createSpecialty({
	enabled: true,
	slug: "rheumatology-emr",
	specialty: 'Rheumatology',
	specialtyAdj: 'rheumatology',
	specialtyNoun: 'rheumatology clinic',
	seoTitle: "Rheumatology EMR Software — EasyClinic",
	seoDescription:
		"Rheumatology EMR — joint/disease templates, labs and imaging on chart, long-term treatment plans, appointments, and billing.",
	eyebrow: "Rheumatology",
	title: "Rheumatology EMR for long disease courses, labs, and treatment plans",
	lede: "Specialty rheumatology documentation, lab/imaging storage, chronic treatment plans, scheduling, and billing for rheumatology clinics.",
	note: 'Built for rheumatology clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Rheum templates", label: "Specialty notes" },
		{ value: "Labs & imaging", label: "On the chart" },
		{ value: "Long courses", label: "Treatment plans" }
	],
	clinical: [
		{
			title: "Rheumatology templates",
			copy: "Notes for inflammatory and autoimmune visits.",
		},
		{
			title: "Lab & imaging store",
			copy: "Results attached to the patient.",
		},
		{
			title: "Long-term treatment plans",
			copy: "DMARD and related plans with history.",
		},
		{
			title: "Trend visuals",
			copy: "Follow key parameters over time.",
		},
		{
			title: "Fast Rx",
			copy: "Share updates quickly.",
		},
		{
			title: "Optional Cura AI",
			copy: "Documentation assist.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Disease activity history hard to reconstruct",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Labs/PDFs rebuilt each visit",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Therapy changes poorly audited",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		}
	],
	fit: ["Rheumatologists", "Rheumatology clinics", "Hospital rheum OPD"],
	faqs: [
		{
			question: "Best rheumatology EMR?",
			answer: "Templates, labs/imaging, long-term plans, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional.",
		},
		{
			question: "Chronic disease tracking?",
			answer: "Yes.",
		},
		{
			question: "Lab/imaging on chart?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See rheumatology EMR on your follow-up list",
	ctaLede:
		"Book a demo — courses of care without the paper chase.",
});

const sexology = createSpecialty({
	enabled: true,
	slug: "sexology-emr",
	specialty: 'Sexology',
	specialtyAdj: 'sexology',
	specialtyNoun: 'sexology clinic',
	seoTitle: "Sexology EMR Software — EasyClinic",
	seoDescription:
		"Sexology EMR — confidential session notes, counselling tracking, medication management, telehealth, and role-based privacy.",
	eyebrow: "Sexology",
	title: "Sexology EMR with confidential notes, sessions, and tighter access",
	lede: "Document clinical and counselling sessions, track medications, run teleconsults, and keep access role-scoped — built for privacy-sensitive sexology practice.",
	note: 'Built for sexology clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Confidential notes", label: "Role-scoped" },
		{ value: "Sessions", label: "Therapy tracking" },
		{ value: "Telehealth", label: "Same calendar" }
	],
	clinical: [
		{
			title: "Clinical documentation",
			copy: "Specialty-aware visit notes.",
		},
		{
			title: "Counselling / therapy session tracking",
			copy: "Session history on the chart.",
		},
		{
			title: "Medication tracking",
			copy: "Regimens with clearer audit trail.",
		},
		{
			title: "Privacy-minded access",
			copy: "Role-based controls for sensitive records.",
		},
		{
			title: "Telehealth",
			copy: "Video visits when preferred.",
		},
		{
			title: "Optional Cura AI",
			copy: "Assist only with clinician review.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Sensitive notes in unmanaged files",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		},
		{
			title: "Session history incomplete",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Access too broad for staff roles",
			copy: "Sensitive notes need role-aware access, not a shared inbox.",
		}
	],
	fit: ["Sexologists", "Sexual health clinics", "Counselling + clinical hybrid practices"],
	faqs: [
		{
			question: "Best sexology EMR?",
			answer: "Confidential notes, sessions, meds, telehealth, strong access control.",
		},
		{
			question: "AI EMR?",
			answer: "Optional; always clinician-reviewed.",
		},
		{
			question: "Is patient data secure?",
			answer: "Cloud controls + role-based access; confirm your policy needs in demo.",
		},
		{
			question: "Therapy/counselling sessions?",
			answer: "Yes.",
		},
		{
			question: "Medication tracking?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See sexology EMR with privacy settings on",
	ctaLede:
		"Book a demo — notes, access, and scheduling.",
});

const trichology = createSpecialty({
	enabled: true,
	slug: "trichology-emr-software",
	specialty: 'Trichology',
	specialtyAdj: 'trichology',
	specialtyNoun: 'trichology clinic',
	seoTitle: "Trichology EMR Software — EasyClinic",
	seoDescription:
		"Trichology EMR — scalp/hair consult notes, before/after images, treatment plans, appointments, and billing for trichology clinics.",
	eyebrow: "Trichology",
	title: "Trichology EMR for scalp consults, photo progress, and treatment plans",
	lede: "Document hair and scalp visits, store progress images, track treatment plans, schedule follow-ups, and bill packages — without a blog-shaped page of AI hype.",
	note: 'Built for trichology clinics and multi-doctor practices.',
	heroFacts: [
		{ value: "Consult notes", label: "Trichology forms" },
		{ value: "Progress photos", label: "Before/after on chart" },
		{ value: "Treatment plans", label: "Course tracking" }
	],
	clinical: [
		{
			title: "Trichology documentation",
			copy: "Notes for hair-loss and scalp visits.",
		},
		{
			title: "Progress image store",
			copy: "Comparable photos on the patient record.",
		},
		{
			title: "Treatment plan tracking",
			copy: "Follow regimens across visits.",
		},
		{
			title: "Package / procedure billing",
			copy: "Clear commercial follow-through.",
		},
		{
			title: "Reminders",
			copy: "WhatsApp/SMS/email for follow-ups.",
		},
		{
			title: "Optional Cura AI",
			copy: "Notes assist; clinician reviews.",
			accent: true,
		}
	],
	ops: [
		'Appointment scheduling',
		'Reminders (WhatsApp/SMS/email)',
		'Visit & procedure billing',
		'Inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: "Progress photos on personal phones",
			copy: "Work ends up in side channels instead of one patient record.",
		},
		{
			title: "Plans not comparable visit to visit",
			copy: "Keep the workflow on one chart so the next visit starts with context.",
		},
		{
			title: "Follow-ups missed after procedures",
			copy: "Reviews slip unless the plan and recall live on the same chart.",
		}
	],
	fit: ["Trichology clinics", "Hair restoration centres", "Derm + trichology practices"],
	faqs: [
		{
			question: "Best trichology EMR?",
			answer: "Notes, progress photos, plans, scheduling, billing.",
		},
		{
			question: "AI EMR?",
			answer: "Optional — not a substitute for clinical judgment.",
		},
		{
			question: "Before/after scalp images?",
			answer: "Yes — on the chart.",
		},
		{
			question: "Long-term treatment tracking?",
			answer: "Yes.",
		}
	],
	ctaTitle: "See trichology EMR on a follow-up day",
	ctaLede:
		"Book a demo — photos, plans, and billing.",
});

const specialties: Specialty[] = [
	dental,
	dermatology,
	ophthalmology,
	orthopedic,
	pediatric,
	obgyn,
	cardiology,
	psychiatry,
	psychology,
	ivf,
	ent,
	neurology,
	gastroenterology,
	urology,
	physiotherapy,
	pulmonology,
	oncology,
	mentalHealth,
	aesthetic,
	allergy,
	ayurveda,
	alternativeMedicine,
	cosmetology,
	diabetology,
	endocrinology,
	familyPhysician,
	generalPractitioner,
	generalSurgery,
	hematology,
	immunology,
	nephrology,
	pathology,
	radiology,
	rheumatology,
	sexology,
	trichology,
];



export const specialtyBySlug: Record<string, Specialty> = Object.fromEntries(
	specialties.map((entry) => [entry.slug, entry])
);

/** Specialties that ship a route today. */
export const liveSpecialties = specialties.filter((entry) => entry.enabled);

/** Looks up a specialty by its live slug; throws if the page is not signed off yet. */
export function getSpecialty(slug: string): Specialty {
	const entry = specialtyBySlug[slug];

	if (!entry?.enabled) {
		throw new Error(`Specialty page is not enabled: ${slug}`);
	}

	return entry;
}
