import { SITE_TITLE } from '../../consts';

export const problems = [
	{
		kicker: 'Clinical',
		icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
		title: 'Blind spots across visits',
		copy: 'No single visit contains enough information. Diagnoses hide across encounters, facilities, and time, unless the record is read as one story.',
		stat: '16%',
		statLabel: 'Fewer diagnostic errors',
	},
	{
		kicker: 'Operations',
		icon: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
		title: 'Stockouts found too late',
		copy: 'Medicine shortages surface when patients arrive, not weeks before. The signal already exists, it is just scattered across stores and sites.',
		stat: '67%',
		statLabel: 'Fewer stockout events',
	},
	{
		kicker: 'Revenue',
		icon: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
		title: 'Claims lost at the prescription',
		copy: 'Treatments get written without knowing what the plan covers. The denial is a clinical decision, weeks before billing sees it.',
		stat: '34%',
		statLabel: 'Fewer denied claims',
	},
];

export type Capability = {
	title: string;
	copy: string;
	icon: string;
};

export type CapabilityGroup = {
	id: string;
	label: string;
	blurb: string;
	items: Capability[];
};

export const capabilityGroups: CapabilityGroup[] = [
	{
		id: 'clinical',
		label: 'Clinical intelligence',
		blurb: 'Sharper decisions at the point of care, with the paperwork done for you.',
		items: [
			{
				title: 'Clinical decision support',
				icon: '<path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z"/>',
				copy: 'Real-time, protocol-based guidance at the point of care, tailored to the patient in front of you, not a generic checklist.',
			},
			{
				title: 'Safety alerts',
				icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
				copy: 'Drug interaction checks, allergy flags, and dosage verification before a prescription is finalised.',
			},
			{
				title: 'Diagnostic analysis',
				icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
				copy: 'Cross-visit pattern recognition that connects symptoms across encounters to surface diagnoses no single visit could reveal.',
			},
			{
				title: 'Voice commands',
				icon: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1"/><path d="M12 18v4"/>',
				copy: 'Hands-free documentation. Dictate notes, orders, and observations without leaving the patient.',
			},
			{
				title: 'Telemedicine',
				icon: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
				copy: 'Integrated virtual consultations with the full record open, and AI assistance during the call.',
			},
			{
				title: 'Lab & radiology',
				icon: '<path d="M10 2v7.5L4.2 19.4A2 2 0 0 0 6 22h12a2 2 0 0 0 1.8-2.6L14 9.5V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
				copy: 'Results land in the clinical workflow. Abnormal findings are flagged automatically.',
			},
		],
	},
	{
		id: 'operations',
		label: 'Operational intelligence',
		blurb: 'The front desk, the pharmacy shelf and every branch dashboard, connected.',
		items: [
			{
				title: 'Supply chain intelligence',
				icon: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
				copy: 'Consumption-based forecasting that spots shortages about 45 days before they hit the dispensing counter.',
			},
			{
				title: 'Operations analytics',
				icon: '<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V8"/><path d="M17 16v-8"/>',
				copy: 'Live dashboards across every facility. See what is happening now, not in last month’s report.',
			},
			{
				title: 'Patient engagement',
				icon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.4Z"/>',
				copy: 'Automated follow-ups, chronic-disease monitoring, and post-care advice in the patient’s language.',
			},
		],
	},
	{
		id: 'revenue',
		label: 'Financial intelligence',
		blurb: 'Revenue that stays where it was earned.',
		items: [
			{
				title: 'Claims optimisation',
				icon: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
				copy: 'Every claim audited against payer rules before it leaves the facility. Rejections caught at the source.',
			},
			{
				title: 'Executive insights',
				icon: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
				copy: 'Network-wide performance for leadership: facility comparisons, trend analysis, and outcome tracking.',
			},
		],
	},
];

// results from the Penda Health deployment, studied with OpenAI (arXiv preprint);
// the peer-reviewed follow-ups are the separate Nature Health / Nature Medicine papers
export const proofStats = [
	{ stat: '16%', label: 'Fewer diagnostic errors' },
	{ stat: '13%', label: 'Fewer treatment errors' },
	{ stat: '32%', label: 'Fewer history-taking errors' },
	{ stat: '34%', label: 'Fewer denied claims' },
	{ stat: '67%', label: 'Fewer stockout events' },
	{ stat: '99.97%', label: 'Uptime over 9 years' },
];

export const curaFaqs = [
	{
		question: `Does CuraPilot replace my EMR?`,
		answer: `No. CuraPilot is the AI intelligence layer that sits on top of ${SITE_TITLE}, and can connect to other systems you already run. The clinician’s workflow does not change. It just gets sharper.`,
	},
	{
		question: 'What did the Penda Health study show?',
		answer:
			'A landmark real-world study with OpenAI across 39,849 patient visits at Penda Health in Nairobi recorded 16% fewer diagnostic errors, 13% fewer treatment errors, and 32% fewer history-taking errors. The approach has since been examined in peer-reviewed research in Nature Health and a randomised trial in Nature Medicine.',
	},
	{
		question: 'Does the clinician stay in control?',
		answer:
			'Yes. CuraPilot is advisory. It surfaces patterns, safety flags, and protocol suggestions, every clinical decision stays with the doctor.',
	},
	{
		question: 'How do we start?',
		answer: `We map your processes, deploy CuraPilot, and measure what changes, typically in 90 days or less. Book a demo and we will walk through a proof of concept that fits your organisation.`,
	},
];
