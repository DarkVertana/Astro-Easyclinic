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
	slug: 'pediatric-emr',
	specialty: 'Pediatrics',
	specialtyAdj: 'pediatric',
	specialtyNoun: 'pediatric clinic',
	seoTitle: 'Pediatric EMR Software — EasyClinic',
	seoDescription:
		'Pediatric EMR — growth charts, immunization schedules, age-based forms, parent reminders, appointments, and billing.',
	title: 'Pediatric EMR with growth, vaccines, and parent-ready follow-ups',
	lede: 'Age-aware charts, immunization tracking, scheduling, and WhatsApp reminders so pediatric clinics keep well-child and sick visits organized.',
	heroFacts: [{ value: 'Growth charts' }, { value: 'Vaccine schedules' }, { value: 'Parent WhatsApp' }],
	clinical: [
		{ title: 'Growth charts' },
		{ title: 'Immunization tracking' },
		{ title: 'Pediatric intake forms' },
		{ title: 'Quick Rx' },
		{ title: 'Visit summaries' },
		{ title: 'Optional Cura AI', accent: true },
	],
	problems: [
		{ title: 'Paper vaccine cards' },
		{ title: 'Growth data not trended' },
		{ title: 'Parents missing follow-ups' },
	],
	fit: ['Solo pediatricians', 'Pediatric polyclinics', 'Family + child clinics'],
	faqSeeds: [
		'Best pediatric EMR?',
		'Growth tracking?',
		'Vaccination schedules?',
		'AI docs?',
		'Parent reminders?',
	],
	ctaTitle: 'See pediatric EMR on a well-child day',
});

const obgyn = createSpecialty({
	slug: 'obgyn-emr-software',
	specialty: 'OB-GYN',
	specialtyAdj: 'OB-GYN',
	specialtyNoun: 'women’s health clinic',
	seoTitle: 'OB-GYN EMR Software — EasyClinic',
	seoDescription:
		'OB-GYN EMR — antenatal tracking, gynecological charting, ultrasound files, appointments, and billing for women’s health clinics.',
	title: 'OB-GYN EMR for antenatal continuity and gynecology visits',
	lede: 'Track pregnancy visits, gyn charting, ultrasounds, Rx, and billing in one platform — so continuity doesn’t live in a notebook.',
	heroFacts: [{ value: 'Pregnancy tracking' }, { value: 'Gyn charting' }, { value: 'Ultrasound on file' }],
	clinical: [
		{ title: 'ANC / pregnancy tracking' },
		{ title: 'Gynecological charting' },
		{ title: 'Ultrasound & report store' },
		{ title: 'Specialty forms' },
		{ title: 'Visit summaries' },
		{ title: 'Optional Cura AI', accent: true },
	],
	problems: [
		{ title: 'ANC cards vs digital chart split' },
		{ title: 'Ultrasounds unattached' },
		{ title: 'Missed trimester follow-ups' },
	],
	fit: ['OB-GYN solo', 'Women’s health clinics', 'Maternity OPD'],
	faqSeeds: ['Best gyn EMR?', 'Pregnancy/ANC?', 'Ultrasound store?', 'AI docs?'],
	ctaTitle: 'See OB-GYN EMR on an antenatal schedule',
});

const cardiology = createSpecialty({
	slug: 'cardiology-emr',
	specialty: 'Cardiology',
	specialtyAdj: 'cardiology',
	specialtyNoun: 'heart clinic',
	seoTitle: 'Cardiology EMR & Practice Management — EasyClinic',
	seoDescription:
		'Cardiology EMR — cardiac templates, ECG/report storage, chronic follow-ups, appointments, and billing for heart clinics.',
	title: 'Cardiology EMR for longitudinal heart care — notes, ECGs, and follow-ups',
	lede: 'Cardiology templates, ECG and diagnostic file storage, chronic follow-up tracking, scheduling, and billing in one clinic management stack.',
	heroFacts: [{ value: 'Cardiac templates' }, { value: 'ECG on chart' }, { value: 'Chronic follow-ups' }],
	clinical: [
		{ title: 'Cardiology templates' },
		{ title: 'ECG/diagnostics store' },
		{ title: 'Trend visuals' },
		{ title: 'Med management' },
		{ title: 'Patient education hooks' },
		{ title: 'Optional Cura AI', accent: true },
	],
	problems: [
		{ title: 'ECGs siloed' },
		{ title: 'Chronic patients without recall' },
		{ title: 'Evening documentation load' },
	],
	fit: ['Cardiology clinics', 'Multi-cardiologist centres', 'Hospital cardiology OPD'],
	faqSeeds: ['Best cardio EMR?', 'ECG storage?', 'Chronic follow-up?', 'AI docs?'],
	ctaTitle: 'See cardiology EMR on your follow-up list',
});

const psychiatry = createSpecialty({
	slug: 'psychiatry-emr',
	specialty: 'Psychiatry',
	specialtyAdj: 'psychiatry',
	specialtyNoun: 'mental health clinic',
	seoTitle: 'Psychiatry EMR Software — EasyClinic',
	seoDescription:
		'Psychiatry EMR — session notes, medication tracking, treatment plans, telehealth, and privacy-minded access for mental health clinics.',
	title: 'Psychiatry EMR with session notes, meds, and tighter access control',
	lede: 'Document sessions, manage medications and treatment plans, run teleconsults, and keep role-based privacy tight — without a patchwork of notes apps.',
	heroFacts: [{ value: 'Session notes' }, { value: 'Med tracking' }, { value: 'Telehealth' }],
	clinical: [
		{ title: 'Session documentation' },
		{ title: 'Medication management' },
		{ title: 'Customizable treatment plans' },
		{ title: 'Tight roles / privacy' },
		{ title: 'Teleconsult' },
		{ title: 'Optional Cura AI (clinician-reviewed)', accent: true },
	],
	problems: [
		{ title: 'Notes in unmanaged docs' },
		{ title: 'Med changes hard to audit' },
		{ title: 'Privacy too loose across staff' },
	],
	fit: ['Psychiatrists', 'Mental health clinics', 'Multi-clinician psych practices'],
	faqSeeds: [
		'Best psychiatry EMR?',
		'Session notes?',
		'Medication tracking?',
		'AI docs?',
		'Telehealth?',
	],
	ctaTitle: 'See psychiatry EMR on a clinic day',
});

const psychology = createSpecialty({
	slug: 'psychology-emr',
	specialty: 'Psychology',
	specialtyAdj: 'psychology',
	specialtyNoun: 'therapy centre',
	seoTitle: 'Psychology EMR for Mental Health Clinics — EasyClinic',
	seoDescription:
		'Psychology EMR — session notes, psychometric tracking, appointments, telehealth, and confidential records for therapists and clinics.',
	title: 'Psychology EMR for session notes, assessments, and confidential scheduling',
	lede: 'Therapy notes, psychometric test tracking, appointments, and telehealth in one clinic management platform with role-aware access.',
	heroFacts: [{ value: 'Session notes' }, { value: 'Psychometrics' }, { value: 'Confidential access' }],
	clinical: [
		{ title: 'Session notes' },
		{ title: 'Psychometric test management' },
		{ title: 'Psychology intake forms' },
		{ title: 'Teleconsult' },
		{ title: 'Reminders' },
		{ title: 'Optional AI assist (review before save)', accent: true },
	],
	problems: [
		{ title: 'Notes fragmented' },
		{ title: 'Assessment scores not on timeline' },
		{ title: 'No-shows on therapy books' },
	],
	/* pack: pair with the psychiatry slug as needed; a /mental-health/ hub can link both later */
	fit: ['Psychologists', 'Therapy centres', 'Mixed mental-health clinics'],
	faqSeeds: ['Best psychology EMR?', 'Session notes?', 'Psychometric tracking?', 'Privacy/roles?'],
	ctaTitle: 'See psychology EMR on your therapy book',
});

const ivf = createSpecialty({
	slug: 'ivf-emr',
	specialty: 'Fertility & IVF',
	specialtyAdj: 'IVF',
	specialtyNoun: 'fertility clinic',
	seoTitle: 'Fertility & IVF EMR Software — EasyClinic',
	seoDescription:
		'IVF EMR — cycle management, hormonal tracking, appointments, lab hooks, and billing for fertility clinics.',
	title: 'IVF EMR for cycle stages, hormones, and clinic-floor coordination',
	lede: 'Track cycles, hormonal treatment, visits, and billing in one fertility-aware clinic management system — so the next stimulation day isn’t in a spreadsheet.',
	heroFacts: [{ value: 'Cycle management' }, { value: 'Hormone tracking' }, { value: 'Visit coordination' }],
	clinical: [
		{ title: 'Cycle stage tracking' },
		{ title: 'Hormonal treatment logs' },
		{ title: 'Fertility intake forms' },
		{ title: 'File/report store' },
		{ title: 'Multi-role clinic ops' },
		{ title: 'Optional Cura AI docs', accent: true },
	],
	problems: [
		{ title: 'Cycles in spreadsheets' },
		{ title: 'Hormone charts detached' },
		{ title: 'Partner/lab handoffs messy' },
	],
	fit: ['IVF clinics', 'Fertility centres', 'REI practices'],
	faqSeeds: [
		'Best IVF EMR?',
		'Cycle tracking?',
		'Hormonal tracking?',
		'AI docs?',
		'Multi-role access?',
	],
	ctaTitle: 'See IVF EMR on a stimulation calendar',
});

const ent = createSpecialty({
	slug: 'ent-emr-software',
	specialty: 'ENT',
	specialtyAdj: 'ENT',
	specialtyNoun: 'ENT clinic',
	seoTitle: 'ENT EMR Software — EasyClinic',
	seoDescription:
		'ENT EMR — specialty forms, hearing-test files, procedure notes, appointments, and billing for ENT clinics.',
	title: 'ENT EMR for consults, procedures, and hearing records in one chart',
	lede: 'Specialty ENT documentation, diagnostic file storage, procedure notes, scheduling, and billing — without a second system for audiology paperwork.',
	heroFacts: [{ value: 'ENT forms' }, { value: 'Hearing tests on file' }, { value: 'Procedure docs' }],
	clinical: [
		{ title: 'ENT specialty forms' },
		{ title: 'Hearing-test / diagnostic store' },
		{ title: 'Procedure documentation' },
		{ title: 'Fast Rx' },
		{ title: 'Visit summaries' },
		{ title: 'Optional Cura AI', accent: true },
	],
	problems: [
		{ title: 'Audiology files off-chart' },
		{ title: 'Procedure notes delayed' },
		{ title: 'Follow-up scopes unscheduled' },
	],
	fit: ['ENT clinics', 'ENT + audiology centres', 'Multi-ENT groups'],
	faqSeeds: ['Best ENT EMR?', 'Hearing tests?', 'Procedure docs?', 'AI docs?'],
	ctaTitle: 'See ENT EMR on your procedure list',
});

export const specialties: Specialty[] = [
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
