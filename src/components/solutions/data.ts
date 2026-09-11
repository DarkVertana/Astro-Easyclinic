export type FaqItem = {
	question: string;
	answer: string;
};

export type Solution = {
	slug: 'doctor-clinic' | 'polyclinic' | 'clinic-chain' | 'hospital-opd';
	href: string;
	navLabel: string;
	cardTitle: string;
	cardCopy: string;
	eyebrow: string;
	title: string;
	lede: string;
	note?: string;
	heroFacts: { value: string; label: string }[];
	problemsEyebrow: string;
	problemsTitle: string;
	problemsLede: string;
	problems: { title: string; copy: string }[];
	fitEyebrow: string;
	fitTitle: string;
	fitLede: string;
	fit: string[];
	modulesEyebrow: string;
	modulesTitle: string;
	modulesLede: string;
	modules: { title: string; copy: string }[];
	faqs: FaqItem[];
	ctaTitle: string;
	ctaLede: string;
	seoTitle: string;
	seoDescription: string;
};

export const solutions: Solution[] = [
	{
		slug: 'doctor-clinic',
		href: '/solutions/doctor-clinic',
		navLabel: 'Doctor clinic',
		cardTitle: 'Doctor clinic',
		cardCopy:
			'Solo and small practices: fast EMR, appointments, and billing without hospital complexity.',
		eyebrow: 'Doctor clinic',
		title: 'EMR for individual doctor clinics',
		lede: 'Practice management software that stays light: thirty-second prescriptions, a day calendar you trust, and a till that balances before you leave.',
		note: 'Priced for solo clinics, not only hospitals.',
		heroFacts: [
			{ value: 'Solo-ready', label: 'Day-one EMR' },
			{ value: 'Telehealth', label: 'When patients stay home' },
			{ value: 'Simple billing', label: 'Till that closes clean' },
		],
		problemsEyebrow: 'The friction',
		problemsTitle: 'What slows a busy solo clinic',
		problemsLede:
			'Paper charts, phone-tag bookings, and evening billing catch-up steal hours you could spend on care.',
		problems: [
			{
				title: 'Charts that steal the evening',
				copy: 'Notes and Rx pile up after the last patient. You need an EMR that finishes with the consult.',
			},
			{
				title: 'No-shows and phone tag',
				copy: 'Reception is stuck confirming visits. Reminders should go out on WhatsApp, SMS, and email without a second tool.',
			},
			{
				title: 'Billing after the fact',
				copy: 'Cash, UPI, and card drift from the visit. One invoice from the encounter keeps collections clean.',
			},
		],
		fitEyebrow: 'Who it’s for',
		fitTitle: 'Built for the consulting room, not the ward',
		fitLede:
			'Solo physicians and small practices that need fast EMR, a trustworthy calendar, and simple billing, without hospital-only complexity.',
		fit: [
			'GPs and single-specialty clinics',
			'One or two doctors sharing a desk',
			'Practices moving off paper or a basic scheduler',
		],
		modulesEyebrow: 'Modules',
		modulesTitle: 'What a doctor clinic runs on',
		modulesLede:
			'Start with EMR, appointments, and billing. Add reception, a second doctor, or another site later, same clinic management software.',
		modules: [
			{
				title: 'EMR',
				copy: 'Fast, flexible charts and Rx, including specialist forms when you need them.',
			},
			{
				title: 'Scheduling',
				copy: 'Walk-ins and timed slots on one calendar, with reminders that cut no-shows.',
			},
			{
				title: 'Billing',
				copy: 'Simple invoices, part payments, and reconciliation without a full hospital stack.',
			},
			{
				title: 'Telehealth',
				copy: 'Video consults and online fee collection when patients can’t come in.',
			},
			{
				title: 'Reports',
				copy: 'Dashboards for visits, revenue, and follow-ups, sized for a single practice.',
			},
			{
				title: 'Cura AI',
				copy: 'Optional AI EMR assist for documentation and safety checks; you stay in charge.',
			},
		],
		faqs: [
			{
				question: 'Is EasyClinic overkill for a solo doctor clinic?',
				answer:
					'No. Use only the modules you need, EMR, scheduling, and billing, without hospital-only features in your way.',
			},
			{
				question: 'Can I try doctor practice software before I pay?',
				answer:
					'Yes. Book a demo or start free; we’ll walk through the workflows that matter to your clinic first.',
			},
			{
				question: 'Does it work if I later open a second location?',
				answer:
					'Yes. EasyClinic scales from a solo clinic to multi-location without forcing a platform switch.',
			},
		],
		ctaTitle: 'Run your clinic on one EMR',
		ctaLede: 'See EasyClinic doctor clinic software on your specialties and schedule.',
		seoTitle: 'Doctor Clinic Software & EMR | EasyClinic',
		seoDescription:
			'EMR and doctor clinic software for individual practices, fast charts, scheduling, billing, and WhatsApp reminders. Start simple, grow without switching.',
	},
	{
		slug: 'polyclinic',
		href: '/solutions/polyclinic',
		navLabel: 'Polyclinic',
		cardTitle: 'Polyclinic',
		cardCopy:
			'Multi-specialty coordination, shared records, rooms, and till across doctors.',
		eyebrow: 'Polyclinic',
		title: 'EMR for multi-specialty polyclinics',
		lede: 'Clinic management software that keeps specialties aligned, one patient record, shared rooms and slots, and a till that still closes cleanly.',
		heroFacts: [
			{ value: 'Multi-specialty', label: 'One patient timeline' },
			{ value: 'Shared rooms', label: 'One book for the floor' },
			{ value: 'Roles', label: 'Access that fits the desk' },
		],
		problemsEyebrow: 'The friction',
		problemsTitle: 'Where group practices lose the thread',
		problemsLede:
			'When specialties drift onto separate stacks, handoffs break and the till never quite matches the day.',
		problems: [
			{
				title: 'Specialties on different islands',
				copy: 'Each doctor’s notes live apart. Shared EMR keeps the story one place when patients cross specialties.',
			},
			{
				title: 'Rooms and slots collide',
				copy: 'Front desk juggles calendars by hand. One schedule across doctors and resources cuts the clashes.',
			},
			{
				title: 'Pharmacy and lab lag the visit',
				copy: 'Orders leave the consult and get lost. Integrated pharmacy and lab keep results beside the chart.',
			},
		],
		fitEyebrow: 'Who it’s for',
		fitTitle: 'When specialties share one front door',
		fitLede:
			'Multi-specialty groups that need one patient record, shared rooms and slots, and a till that still closes as a single clinic.',
		fit: [
			'Group practices with several specialties',
			'Shared pharmacy or lab on site',
			'Front desks juggling more than one doctor book',
		],
		modulesEyebrow: 'Modules',
		modulesTitle: 'What the polyclinic shares',
		modulesLede: 'Coordination is the product, not another login per department.',
		modules: [
			{
				title: 'Specialty EMR',
				copy: 'Templates and workflows per doctor, still one patient timeline.',
			},
			{
				title: 'Resource scheduling',
				copy: 'Doctors, rooms, and equipment on one book.',
			},
			{
				title: 'Billing & accounting',
				copy: 'Visit-linked invoices plus stronger finance when the group needs it.',
			},
			{
				title: 'Inventory & pharmacy',
				copy: 'Stock and dispensing tied to prescriptions.',
			},
			{
				title: 'Lab',
				copy: 'Orders from the EMR; abnormal values flagged on the report.',
			},
			{
				title: 'Access control',
				copy: 'Roles so each specialty sees what it should, and nothing more.',
			},
			{
				title: 'Cura AI',
				copy: 'Shared intelligence layer across the group without replacing clinical judgment.',
			},
		],
		faqs: [
			{
				question: 'Can each specialist keep their own EMR workflow?',
				answer:
					'Yes. Forms and preferences stay specialty-specific; the patient record stays shared.',
			},
			{
				question: 'Does polyclinic software include pharmacy and lab?',
				answer:
					'Yes on Premium/Enterprise-style setups, dispensing and lab reporting sit beside the visit.',
			},
			{
				question: 'How do we control who sees what?',
				answer: 'Role-based access and audit-friendly controls across users and locations.',
			},
		],
		ctaTitle: 'Coordinate the polyclinic without the chaos',
		ctaLede: 'Book a demo of EasyClinic polyclinic management software on your specialty mix.',
		seoTitle: 'Polyclinic Management Software & EMR | EasyClinic',
		seoDescription:
			'Polyclinic management software for multi-specialty clinics, shared EMR, scheduling, billing, pharmacy, and lab in one coordinated system.',
	},
	{
		slug: 'clinic-chain',
		href: '/solutions/clinic-chain',
		navLabel: 'Clinic chain',
		cardTitle: 'Clinic chain',
		cardCopy:
			'One patient record and central control across locations, with SOPs and KPIs.',
		eyebrow: 'Clinic chain',
		title: 'EMR for multi-location clinic chains',
		lede: 'Central clinic management software for chains: one patient across sites, shared SOPs, and leadership dashboards that stay honest.',
		heroFacts: [
			{ value: 'One record', label: 'Across every site' },
			{ value: 'SOPs', label: 'Care that stays consistent' },
			{ value: 'HQ view', label: 'KPIs while the day is open' },
		],
		problemsEyebrow: 'The friction',
		problemsTitle: 'What breaks when clinics multiply',
		problemsLede:
			'Each new location should feel like the brand, not a separate database, till, and stockroom HQ cannot see.',
		problems: [
			{
				title: 'Every branch invents its own process',
				copy: 'Quality drifts. Clinical SOPs and shared workflows keep care consistent without killing local speed.',
			},
			{
				title: 'HQ can’t see the day',
				copy: 'Reports arrive late and incomplete. A chain dashboard shows visits, stock, and revenue while the day is still open.',
			},
			{
				title: 'Patients restart at every door',
				copy: 'History doesn’t travel. One record across owned and franchise sites fixes repeat intake.',
			},
		],
		fitEyebrow: 'Who it’s for',
		fitTitle: 'When one clinic becomes a network',
		fitLede:
			'Multi-location and franchise groups that need one EMR across sites, central SOPs, and leadership views that match the day.',
		fit: [
			'Owned and franchise clinic networks',
			'HQ that needs live KPIs, not month-end PDFs',
			'Teams standardising care across cities',
		],
		modulesEyebrow: 'Modules',
		modulesTitle: 'What the chain runs centrally',
		modulesLede: 'Add sites for growth, not for another spreadsheet stack.',
		modules: [
			{
				title: 'Multi-location EMR',
				copy: 'One patient, one chart across the network.',
			},
			{
				title: 'Central control',
				copy: 'Access, branding, and configuration from the centre; clinics still move fast.',
			},
			{
				title: 'Clinical SOPs',
				copy: 'Standard pathways you can track, not just publish as PDFs.',
			},
			{
				title: 'Inventory & logistics',
				copy: 'Reorders and transfers across stores and sites.',
			},
			{
				title: 'Payor & finance',
				copy: 'Insurance and advanced accounting when the chain needs it.',
			},
			{
				title: 'Engagement',
				copy: 'Portal and app under the chain brand.',
			},
			{
				title: 'Cura AI',
				copy: 'Network-aware alerts and forecasting on the same data layer.',
			},
		],
		faqs: [
			{
				question: 'Can franchise and owned clinics share one EMR?',
				answer:
					'Yes. Multi-location control keeps one patient record with the access rules you set.',
			},
			{
				question: 'How do we standardise care across cities?',
				answer:
					'Clinical SOP tracking and shared templates, visible to leadership, usable at the desk.',
			},
			{
				question: 'Is clinic chain software only for huge networks?',
				answer:
					'No. It fits growing multi-site groups as soon as one calendar and one ledger stop being enough.',
			},
		],
		ctaTitle: 'Run the chain from one clinic platform',
		ctaLede: 'See EasyClinic clinic chain software on your locations and SOPs.',
		seoTitle: 'Clinic Chain Software & Multi-Location EMR | EasyClinic',
		seoDescription:
			'Clinic chain software for multi-location practices, central EMR, SOPs, inventory, billing, and KPIs across every site.',
	},
	{
		slug: 'hospital-opd',
		href: '/solutions/hospital-opd',
		navLabel: 'Hospital OPD',
		cardTitle: 'Hospital OPD',
		cardCopy:
			'High-volume outpatient EMR, pharmacy, lab, and payor workflows in one system.',
		eyebrow: 'Hospital OPD',
		title: 'EMR for hospital OPD and nursing homes',
		lede: 'Clinic and OPD management software for busy outpatient floors, throughput, pharmacy, lab, and claims without losing the chart.',
		heroFacts: [
			{ value: 'High volume', label: 'OPD built for queues' },
			{ value: 'Payors', label: 'Claims before denial' },
			{ value: 'Ancillary', label: 'Pharmacy & lab linked' },
		],
		problemsEyebrow: 'The friction',
		problemsTitle: 'Where OPD volume usually breaks software',
		problemsLede:
			'Queues, mixed payors, and department tills punish tools built only for quiet private clinics.',
		problems: [
			{
				title: 'Volume breaks the front desk',
				copy: 'Queues and walk-ins overflow paper lists. Resource scheduling and status keep the floor moving.',
			},
			{
				title: 'Rx, pharmacy, and lab out of sync',
				copy: 'Orders scatter. Integrated dispensing and lab reporting keep the visit whole.',
			},
			{
				title: 'Claims die after the consult',
				copy: 'Coverage isn’t checked when treatment is written. Payor tools catch issues before submission.',
			},
		],
		fitEyebrow: 'Who it’s for',
		fitTitle: 'Outpatient volume without losing the chart',
		fitLede:
			'Hospital OPD floors and nursing homes that need throughput, pharmacy, lab, and payor workflows on one EMR.',
		fit: [
			'High-volume outpatient departments',
			'Nursing homes with clinic-style OPD',
			'Teams connecting Rx, stock, and claims to the visit',
		],
		modulesEyebrow: 'Modules',
		modulesTitle: 'What the OPD floor needs',
		modulesLede:
			'Built for OPD and nursing-home throughput, not a stripped GP toy, not an immovable HIS project.',
		modules: [
			{
				title: 'High-volume EMR',
				copy: 'Fast charts and specialist workflows for OPD pace.',
			},
			{
				title: 'Scheduling & resources',
				copy: 'Doctors, rooms, and queues in one view.',
			},
			{
				title: 'Billing & payors',
				copy: 'Reconciliation plus insurance / third-party payor management.',
			},
			{
				title: 'Pharmacy & logistics',
				copy: 'Dispensing, stock movement, and expiry control.',
			},
			{
				title: 'Lab management',
				copy: 'Orders and reports tied to the outpatient record.',
			},
			{
				title: 'HR & access',
				copy: 'Users, roles, and compliance for larger teams.',
			},
			{
				title: 'Cura AI',
				copy: 'Decision support, supply forecasts, and claim pre-checks on OPD data.',
			},
		],
		faqs: [
			{
				question: 'Is EasyClinic a full hospital HIS?',
				answer:
					'It excels at OPD, nursing-home, and clinic-chain workflows. Ask us if you need deeper inpatient scope.',
			},
			{
				question: 'Can hospital OPD software connect pharmacy and lab?',
				answer: 'Yes. Prescriptions, stock, and lab results sit beside the EMR visit.',
			},
			{
				question: 'Does it support insurance billing?',
				answer: 'Yes, payor and claim-oriented workflows on Enterprise-style plans.',
			},
		],
		ctaTitle: 'Steady the OPD with one EMR',
		ctaLede: 'Book a demo of EasyClinic hospital OPD software on your volumes and specialties.',
		seoTitle: 'Hospital OPD & Nursing Home Software | EasyClinic',
		seoDescription:
			'Hospital OPD and nursing home software, high-volume EMR, scheduling, billing, pharmacy, lab, and payor management in one system.',
	},
];

export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s])) as Record<
	Solution['slug'],
	Solution
>;

export const solutionSlugs = solutions.map((s) => s.slug);

export const indexCopy = {
	eyebrow: 'Solutions',
	title: 'Clinic software shaped to how you practise',
	lede: 'One EMR and clinic management platform, tuned for solo doctors, multi-specialty polyclinics, chains, and hospital OPD.',
	note: 'Used by 5,000+ doctors across 200 cities.',
	sectionTitle: 'Pick the setup that matches your clinic',
	sectionLede:
		'Same EasyClinic foundation. Different emphasis for how patients, staff, and revenue move through your day.',
	fitTitle: 'Not sure which page fits?',
	fitLede: 'Start with how many doctors and sites you run, we’ll match EMR modules on the demo.',
	ctaTitle: 'See EasyClinic on your workflow',
	ctaLede: 'Book a demo and we’ll map EMR, scheduling, and billing to your clinic type.',
	seoTitle: 'Solutions | EasyClinic',
	seoDescription:
		'EasyClinic clinic management software for doctor clinics, polyclinics, clinic chains, and hospital OPD, EMR, scheduling, billing, and Cura AI.',
	heroFacts: [
		{ value: '4 setups', label: 'Clinic to hospital OPD' },
		{ value: 'One EMR', label: 'Shared foundation' },
		{ value: 'Cura AI', label: 'When you want the layer' },
	],
};
