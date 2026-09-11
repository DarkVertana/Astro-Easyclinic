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

/* Specialty variables from the pack's template fields. */
export type SpecialtyVars = {
	/** {{specialty}} */
	specialty: string;
	/** {{specialty_adj}} — dental, dermatology, pediatric … */
	specialtyAdj: string;
	/** {{specialty_noun}} — dental clinic, skin clinic … */
	specialtyNoun: string;
};

export type Specialty = SpecialtyVars & {
	/** false = copy is staged, route is not generated yet */
	enabled: boolean;
	/** live path segment, kept stable for SEO */
	slug: string;
	/** live path */
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
	/** live specialties only — staged entries keep `faqSeeds` until answers are signed off */
	faqs: FaqItem[];
	/** pack shorthand for the questions a staged specialty should answer */
	faqSeeds?: string[];
	ctaTitle: string;
	ctaLede: string;
};

/* ---- shared shell (same everywhere; the specialty only swaps the fills) ---- */

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

/** Builds a specialty page from the shared shell + the specialty's own fills. */
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
	slug: 'neurology-emr',
	specialty: 'Neurology',
	specialtyAdj: 'neurology',
	specialtyNoun: 'neurology clinic',
	seoTitle: 'Neurology EMR Software — EasyClinic',
	seoDescription:
		'Neurology EMR — consult templates, imaging and EEG file storage, chronic follow-ups, appointments, and billing for neuro clinics.',
	eyebrow: 'Neurology',
	title: 'Neurology EMR for consult notes, diagnostics, and long-term follow-ups',
	lede: 'Neuro templates, imaging and EEG files, medication tracking, scheduling, and billing in one clinic management platform.',
	note: 'Built for neurology clinics, multi-neurologist centres, and hospital neuro OPD.',
	heroFacts: [
		{ value: 'Neuro templates', label: 'Faster consult notes' },
		{ value: 'Diagnostics on chart', label: 'Imaging & EEG files' },
		{ value: 'Chronic follow-ups', label: 'Recall that sticks' }
	],
	clinical: [
		{
			title: 'Neuro templates',
			copy: 'Structured neurology consult templates for busy OPD days.',
		},
		{
			title: 'Imaging & EEG store',
			copy: 'Attach scans and EEG reports to the patient chart.',
		},
		{
			title: 'Med management',
			copy: 'Track neuro medications and changes across visits.',
		},
		{
			title: 'Specialty forms',
			copy: 'Intake and exam templates tuned for neurology workflows.',
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
		'Pharmacy / consumables inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'Diagnostics orphaned from the chart',
			copy: 'EEG and imaging sit outside the note the next neurologist needs.',
		},
		{
			title: 'Chronic patients without recall',
			copy: 'Long-term follow-ups slip without a plan on the chart.',
		},
		{
			title: 'Evening documentation load',
			copy: 'Busy OPD leaves note-writing for after hours.',
		}
	],
	fit: ['Neurology clinics', 'Multi-neurologist centres', 'Hospital neurology OPD'],
	faqs: [
		{
			question: 'Best EMR for neurology clinics?',
			answer:
				'Look for neuro templates, diagnostic file storage, chronic follow-ups, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Imaging and EEG storage?',
			answer:
				'Yes — attach diagnostics to the patient record.',
		},
		{
			question: 'Chronic follow-up tracking?',
			answer:
				'Yes — keep longitudinal plans and recalls on the same chart.',
		},
		{
			question: 'AI documentation for neuro notes?',
			answer:
				'Optional Cura AI helps draft notes faster; you review and sign.',
		}
	],
	ctaTitle: 'See neurology EMR on your follow-up list',
	ctaLede:
		'Book a demo — we’ll walk neuro templates, diagnostics, follow-ups, and billing on your workflow.',
});

const gastroenterology = createSpecialty({
	enabled: true,
	slug: 'gastroenterology-emr',
	specialty: 'Gastroenterology',
	specialtyAdj: 'gastroenterology',
	specialtyNoun: 'GI clinic',
	seoTitle: 'Gastroenterology EMR Software — EasyClinic',
	seoDescription:
		'Gastroenterology EMR — GI templates, endoscopy notes, imaging files, appointments, and billing for GI clinics.',
	eyebrow: 'Gastroenterology',
	title: 'Gastroenterology EMR for consults, endoscopy notes, and follow-through',
	lede: 'GI templates, procedure notes, diagnostic file storage, scheduling, and billing in one clinic management system.',
	note: 'Built for GI clinics, endoscopy centres, and multi-doctor gastroenterology practices.',
	heroFacts: [
		{ value: 'GI templates', label: 'Faster consult notes' },
		{ value: 'Endoscopy notes', label: 'Procedure docs on chart' },
		{ value: 'Imaging on file', label: 'Reports with the visit' }
	],
	clinical: [
		{
			title: 'GI templates',
			copy: 'Structured gastroenterology consult templates for OPD volume.',
		},
		{
			title: 'Endoscopy / procedure notes',
			copy: 'Capture procedure detail while the visit is still fresh.',
		},
		{
			title: 'Imaging & report store',
			copy: 'Attach scopes and reports to the patient record.',
		},
		{
			title: 'Specialty forms',
			copy: 'Intake and exam templates tuned for GI workflows.',
		},
		{
			title: 'Fast Rx',
			copy: 'Share prescriptions via print or WhatsApp before the patient leaves.',
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
			title: 'Procedure notes after hours',
			copy: 'Endoscopy lists push documentation to the end of the day.',
		},
		{
			title: 'Reports off-chart',
			copy: 'Scope files sit apart from the note the next clinician needs.',
		},
		{
			title: 'Follow-ups unscheduled',
			copy: 'Reviews slip without a plan tied to the chart.',
		}
	],
	fit: ['GI clinics', 'Endoscopy centres', 'Multi-doctor gastroenterology practices'],
	faqs: [
		{
			question: 'Best EMR for gastroenterology clinics?',
			answer:
				'Look for GI templates, endoscopy notes, imaging storage, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Endoscopy documentation?',
			answer:
				'Yes — procedure notes stay with the visit and plan.',
		},
		{
			question: 'Imaging and report storage?',
			answer:
				'Yes — attach files to the patient record.',
		},
		{
			question: 'AI documentation for GI notes?',
			answer:
				'Optional Cura AI helps draft notes faster; you review and sign.',
		}
	],
	ctaTitle: 'See gastroenterology EMR on your procedure list',
	ctaLede:
		'Book a demo — we’ll walk GI templates, endoscopy notes, and billing on your workflow.',
});

const urology = createSpecialty({
	enabled: true,
	slug: 'urology-emr',
	specialty: 'Urology',
	specialtyAdj: 'urology',
	specialtyNoun: 'urology clinic',
	seoTitle: 'Urology EMR Software — EasyClinic',
	seoDescription:
		'Urology EMR — specialty forms, procedure notes, imaging files, appointments, and billing for urology clinics.',
	eyebrow: 'Urology',
	title: 'Urology EMR for consults, procedures, and imaging in one chart',
	lede: 'Urology templates, procedure documentation, diagnostic file storage, scheduling, and billing — without a second system for OT paperwork.',
	note: 'Built for urology clinics, procedure centres, and multi-surgeon groups.',
	heroFacts: [
		{ value: 'Urology forms', label: 'Specialty-ready notes' },
		{ value: 'Procedure docs', label: 'Notes that match the list' },
		{ value: 'Imaging on chart', label: 'Reports with the visit' }
	],
	clinical: [
		{
			title: 'Urology specialty forms',
			copy: 'Intake and exam templates tuned for urology workflows.',
		},
		{
			title: 'Procedure documentation',
			copy: 'Capture procedure detail while the visit is still fresh.',
		},
		{
			title: 'Imaging & report store',
			copy: 'Attach diagnostics to the patient record.',
		},
		{
			title: 'Fast Rx',
			copy: 'Share prescriptions via print or WhatsApp before the patient leaves.',
		},
		{
			title: 'Visit summaries',
			copy: 'Send clear aftercare notes with the visit.',
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
			title: 'Procedure notes delayed',
			copy: 'Busy lists push documentation to evening catch-up.',
		},
		{
			title: 'Imaging off-chart',
			copy: 'Reports sit outside the note the next surgeon needs.',
		},
		{
			title: 'Follow-ups unscheduled',
			copy: 'Reviews and scopes slip without a plan on the chart.',
		}
	],
	fit: ['Urology clinics', 'Procedure-focused urology centres', 'Multi-surgeon urology groups'],
	faqs: [
		{
			question: 'Best EMR for urology clinics?',
			answer:
				'Look for specialty forms, procedure notes, imaging storage, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Procedure documentation?',
			answer:
				'Yes — procedure notes stay with the visit and plan.',
		},
		{
			question: 'Imaging storage?',
			answer:
				'Yes — attach diagnostics to the patient record.',
		},
		{
			question: 'AI documentation for urology notes?',
			answer:
				'Optional Cura AI helps draft notes faster; you review and sign.',
		}
	],
	ctaTitle: 'See urology EMR on your procedure day',
	ctaLede:
		'Book a demo — we’ll walk urology forms, procedure notes, and billing on your workflow.',
});

const physiotherapy = createSpecialty({
	enabled: true,
	slug: 'physiotherapy-emr',
	specialty: 'Physiotherapy',
	specialtyAdj: 'physiotherapy',
	specialtyNoun: 'physio clinic',
	seoTitle: 'Physiotherapy EMR Software — EasyClinic',
	seoDescription:
		'Physiotherapy EMR — session notes, treatment plans, appointments, billing, and progress tracking for physio clinics.',
	eyebrow: 'Physiotherapy',
	title: 'Physiotherapy EMR for session notes, plans, and progress tracking',
	lede: 'Document sessions, track treatment plans, schedule visits, and bill from one clinic management platform built for physio workflows.',
	note: 'Built for physio clinics, rehab centres, and multi-therapist practices.',
	heroFacts: [
		{ value: 'Session notes', label: 'Docs on the chart' },
		{ value: 'Treatment plans', label: 'Multi-visit tracking' },
		{ value: 'Progress on file', label: 'Outcomes you can see' }
	],
	clinical: [
		{
			title: 'Session documentation',
			copy: 'Capture physio sessions with templates that stay on the chart.',
		},
		{
			title: 'Treatment / rehab plans',
			copy: 'Track multi-visit plans against the original goal.',
		},
		{
			title: 'Progress notes',
			copy: 'Keep outcomes visible across the course of care.',
		},
		{
			title: 'Specialty intake forms',
			copy: 'Intake templates tuned for physiotherapy workflows.',
		},
		{
			title: 'Reminders',
			copy: 'Cut no-shows with WhatsApp, SMS, and email reminders.',
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
			title: 'Notes fragmented',
			copy: 'Session notes live in notebooks instead of the patient chart.',
		},
		{
			title: 'Plans not tied to visits',
			copy: 'Multi-session courses drift without status on the record.',
		},
		{
			title: 'No-shows on therapy books',
			copy: 'Busy calendars lose patients without reliable reminders.',
		}
	],
	fit: ['Physio clinics', 'Rehab centres', 'Multi-therapist practices'],
	faqs: [
		{
			question: 'Best EMR for physiotherapy clinics?',
			answer:
				'Look for session notes, treatment plans, progress tracking, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Session notes supported?',
			answer:
				'Yes — structured session documentation stays on the patient record.',
		},
		{
			question: 'Treatment plan tracking?',
			answer:
				'Yes — multi-visit plans stay tied to the chart.',
		},
		{
			question: 'AI documentation for physio notes?',
			answer:
				'Optional Cura AI helps draft notes faster; you review and sign.',
		}
	],
	ctaTitle: 'See physiotherapy EMR on your therapy book',
	ctaLede:
		'Book a demo — we’ll walk session notes, plans, reminders, and billing on your workflow.',
});

const pulmonology = createSpecialty({
	enabled: true,
	slug: 'pulmonology-emr',
	specialty: 'Pulmonology',
	specialtyAdj: 'pulmonology',
	specialtyNoun: 'pulmonology clinic',
	seoTitle: 'Pulmonology EMR Software — EasyClinic',
	seoDescription:
		'Pulmonology EMR — respiratory templates, spirometry and imaging files, chronic follow-ups, appointments, and billing.',
	eyebrow: 'Pulmonology',
	title: 'Pulmonology EMR for respiratory notes, diagnostics, and chronic follow-ups',
	lede: 'Pulmonary templates, spirometry and imaging storage, medication tracking, scheduling, and billing in one clinic management stack.',
	note: 'Built for pulmonology clinics, respiratory centres, and multi-doctor practices.',
	heroFacts: [
		{ value: 'Respiratory templates', label: 'Faster consult notes' },
		{ value: 'Spirometry on chart', label: 'Diagnostics with the visit' },
		{ value: 'Chronic follow-ups', label: 'Recall that sticks' }
	],
	clinical: [
		{
			title: 'Pulmonary templates',
			copy: 'Structured respiratory consult templates for OPD volume.',
		},
		{
			title: 'Spirometry & imaging store',
			copy: 'Attach diagnostics to the patient chart.',
		},
		{
			title: 'Med management',
			copy: 'Track respiratory medications across visits.',
		},
		{
			title: 'Specialty forms',
			copy: 'Intake and exam templates tuned for pulmonology.',
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
		'Pharmacy / consumables inventory',
		'Teleconsult + online fees',
		'Multi-doctor roles',
		'Reports',
	],
	problems: [
		{
			title: 'Diagnostics siloed',
			copy: 'Spirometry and imaging live outside the note.',
		},
		{
			title: 'Chronic patients without recall',
			copy: 'Asthma and COPD reviews slip without a plan.',
		},
		{
			title: 'Evening documentation load',
			copy: 'Busy OPD leaves notes for after hours.',
		}
	],
	fit: ['Pulmonology clinics', 'Respiratory centres', 'Hospital pulmonology OPD'],
	faqs: [
		{
			question: 'Best EMR for pulmonology clinics?',
			answer:
				'Look for respiratory templates, diagnostic storage, chronic follow-ups, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Spirometry and imaging storage?',
			answer:
				'Yes — attach diagnostics to the patient record.',
		},
		{
			question: 'Chronic follow-up tracking?',
			answer:
				'Yes — keep longitudinal plans on the same chart.',
		},
		{
			question: 'AI documentation for pulmonary notes?',
			answer:
				'Optional Cura AI helps draft notes faster; you review and sign.',
		}
	],
	ctaTitle: 'See pulmonology EMR on your follow-up list',
	ctaLede:
		'Book a demo — we’ll walk respiratory templates, diagnostics, and billing on your workflow.',
});

const oncology = createSpecialty({
	enabled: true,
	slug: 'oncology-emr',
	specialty: 'Oncology',
	specialtyAdj: 'oncology',
	specialtyNoun: 'oncology clinic',
	seoTitle: 'Oncology EMR Software — EasyClinic',
	seoDescription:
		'Oncology EMR — treatment plans, visit notes, diagnostic files, appointments, and billing for oncology clinics.',
	eyebrow: 'Oncology',
	title: 'Oncology EMR for treatment plans, visit notes, and longitudinal care',
	lede: 'Track treatment plans, visit documentation, diagnostics, scheduling, and billing in one clinic management platform for oncology OPD.',
	note: 'Built for oncology clinics, day-care centres, and multi-oncologist practices.',
	heroFacts: [
		{ value: 'Treatment plans', label: 'Courses on one timeline' },
		{ value: 'Visit docs', label: 'Notes with the chart' },
		{ value: 'Diagnostics on file', label: 'Reports with context' }
	],
	clinical: [
		{
			title: 'Treatment plan tracking',
			copy: 'Keep courses and visit status visible on one timeline.',
		},
		{
			title: 'Visit documentation',
			copy: 'Capture oncology visits without hunting menus.',
		},
		{
			title: 'Diagnostics & report store',
			copy: 'Attach labs and imaging to the patient record.',
		},
		{
			title: 'Specialty forms',
			copy: 'Intake and exam templates tuned for oncology workflows.',
		},
		{
			title: 'Med management',
			copy: 'Track medications and changes across visits.',
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
			title: 'Plans in spreadsheets',
			copy: 'Treatment courses live outside the EMR and get out of sync.',
		},
		{
			title: 'Reports detached',
			copy: 'Labs and imaging never meet the visit note.',
		},
		{
			title: 'Follow-ups missed',
			copy: 'Reviews slip without reliable recalls.',
		}
	],
	fit: ['Oncology clinics', 'Day-care oncology centres', 'Multi-oncologist practices'],
	faqs: [
		{
			question: 'Best EMR for oncology clinics?',
			answer:
				'Look for treatment plans, visit docs, diagnostic storage, scheduling, and billing together; EasyClinic covers that workflow.',
		},
		{
			question: 'Treatment plan tracking?',
			answer:
				'Yes — keep courses visible on one patient timeline.',
		},
		{
			question: 'Diagnostics storage?',
			answer:
				'Yes — attach labs and imaging to the patient record.',
		},
		{
			question: 'AI documentation for oncology notes?',
			answer:
				'Optional Cura AI helps draft notes faster; you review and sign.',
		}
	],
	ctaTitle: 'See oncology EMR on a treatment schedule',
	ctaLede:
		'Book a demo — we’ll walk treatment plans, visit docs, and billing on your workflow.',
});

const mentalHealth = createSpecialty({
	enabled: true,
	slug: 'mental-health',
	specialty: 'Mental Health',
	specialtyAdj: 'mental health',
	specialtyNoun: 'mental health clinic',
	seoTitle: 'Mental Health EMR Software — EasyClinic',
	seoDescription:
		'Mental health EMR — session notes, treatment plans, telehealth, appointments, and privacy-minded access for mental health clinics.',
	eyebrow: 'Mental Health',
	title: 'Mental health EMR for session notes, plans, and confidential scheduling',
	lede: 'Document sessions, manage treatment plans, run teleconsults, and keep role-based privacy tight — for psychiatry, psychology, and mixed mental-health clinics.',
	note: 'Built for mental health clinics; pairs with psychiatry and psychology specialty pages.',
	heroFacts: [
		{ value: 'Session notes', label: 'Structured documentation' },
		{ value: 'Treatment plans', label: 'Continuity across visits' },
		{ value: 'Confidential access', label: 'Role-aware records' }
	],
	clinical: [
		{
			title: 'Session documentation',
			copy: 'Capture therapy and psychiatry sessions on the chart.',
		},
		{
			title: 'Treatment plans',
			copy: 'Keep longitudinal plans visible across follow-ups.',
		},
		{
			title: 'Tight roles / privacy',
			copy: 'Role-based access for sensitive notes.',
		},
		{
			title: 'Teleconsult',
			copy: 'Run remote visits with the note on the same record.',
		},
		{
			title: 'Reminders',
			copy: 'Cut no-shows with WhatsApp, SMS, and email.',
		},
		{
			title: 'Optional Cura AI (clinician-reviewed)',
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
			title: 'Notes in unmanaged docs',
			copy: 'Session notes live outside the patient chart.',
		},
		{
			title: 'Privacy too loose across staff',
			copy: 'Front-desk and clinical roles need different visibility.',
		},
		{
			title: 'No-shows on therapy books',
			copy: 'Busy calendars lose clients without reliable reminders.',
		}
	],
	fit: ['Mental health clinics', 'Mixed psych practices', 'Therapy centres'],
	faqs: [
		{
			question: 'Best EMR for mental health clinics?',
			answer:
				'Look for session notes, treatment plans, telehealth, and role-based privacy together; EasyClinic covers that workflow.',
		},
		{
			question: 'Session notes supported?',
			answer:
				'Yes — structured session documentation stays on the patient record.',
		},
		{
			question: 'Privacy and roles?',
			answer:
				'Yes — role-aware access keeps sensitive records appropriately scoped.',
		},
		{
			question: 'Telehealth included?',
			answer:
				'Yes — teleconsults and notes run on the same clinic record.',
		}
	],
	ctaTitle: 'See mental health EMR on a clinic day',
	ctaLede:
		'Book a demo — we’ll walk session notes, privacy roles, telehealth, and billing on your workflow.',
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
