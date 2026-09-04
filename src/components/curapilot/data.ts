import { SITE_TITLE } from '../../consts';

export const problems = [
	{
		kicker: 'Clinical',
		title: 'Blind spots across visits',
		copy: 'No single visit contains enough information. Diagnoses hide across encounters, facilities, and time — unless the record is read as one story.',
		stat: '16%',
		statLabel: 'Fewer diagnostic errors',
	},
	{
		kicker: 'Operations',
		title: 'Stockouts found too late',
		copy: 'Medicine shortages surface when patients arrive, not weeks before. The signal already exists — it is just scattered across stores and sites.',
		stat: '67%',
		statLabel: 'Fewer stockout events',
	},
	{
		kicker: 'Revenue',
		title: 'Claims lost at the prescription',
		copy: 'Treatments get written without knowing what the plan covers. The denial is a clinical decision, weeks before billing sees it.',
		stat: '34%',
		statLabel: 'Fewer denied claims',
	},
];

export type Capability = {
	title: string;
	copy: string;
};

export type CapabilityGroup = {
	id: string;
	label: string;
	items: Capability[];
};

export const capabilityGroups: CapabilityGroup[] = [
	{
		id: 'clinical',
		label: 'Clinical',
		items: [
			{
				title: 'Clinical decision support',
				copy: 'Real-time, protocol-based guidance at the point of care — tailored to the patient in front of you, not a generic checklist.',
			},
			{
				title: 'Safety alerts',
				copy: 'Drug interaction checks, allergy flags, and dosage verification before a prescription is finalised.',
			},
			{
				title: 'Diagnostic analysis',
				copy: 'Cross-visit pattern recognition that connects symptoms across encounters to surface diagnoses no single visit could reveal.',
			},
			{
				title: 'Voice commands',
				copy: 'Hands-free documentation. Dictate notes, orders, and observations without leaving the patient.',
			},
			{
				title: 'Telemedicine',
				copy: 'Integrated virtual consultations with the full record open, and AI assistance during the call.',
			},
			{
				title: 'Lab & radiology',
				copy: 'Results land in the clinical workflow. Abnormal findings are flagged automatically.',
			},
		],
	},
	{
		id: 'operations',
		label: 'Operations',
		items: [
			{
				title: 'Supply chain intelligence',
				copy: 'Consumption-based forecasting that spots shortages about 45 days before they hit the dispensing counter.',
			},
			{
				title: 'Operations analytics',
				copy: 'Live dashboards across every facility. See what is happening now — not in last month’s report.',
			},
			{
				title: 'Patient engagement',
				copy: 'Automated follow-ups, chronic-disease monitoring, and post-care advice in the patient’s language.',
			},
		],
	},
	{
		id: 'revenue',
		label: 'Revenue',
		items: [
			{
				title: 'Claims optimisation',
				copy: 'Every claim audited against payer rules before it leaves the facility. Rejections caught at the source.',
			},
			{
				title: 'Executive insights',
				copy: 'Network-wide performance for leadership: facility comparisons, trend analysis, and outcome tracking.',
			},
		],
	},
];

export const proofStats = [
	{ stat: '16%', label: 'Fewer diagnostic errors' },
	{ stat: '13%', label: 'Fewer treatment errors' },
	{ stat: '32%', label: 'Fewer history-taking errors' },
	{ stat: '100%', label: 'Clinician satisfaction' },
];

export const curaFaqs = [
	{
		question: `Does CuraPilot replace my EMR?`,
		answer: `No. CuraPilot is the AI intelligence layer that sits on top of ${SITE_TITLE} — and can connect to other systems you already run. The clinician’s workflow does not change. It just gets sharper.`,
	},
	{
		question: 'What did the Penda Health study show?',
		answer:
			'A peer-reviewed study across 39,849 patient visits at Penda Health in Nairobi found 16% fewer diagnostic errors, 13% fewer treatment errors, and 32% fewer history-taking errors. All surveyed clinicians said the tool improved the quality of care they delivered.',
	},
	{
		question: 'Does the clinician stay in control?',
		answer:
			'Yes. CuraPilot is advisory. It surfaces patterns, safety flags, and protocol suggestions — every clinical decision stays with the doctor.',
	},
	{
		question: 'How do we start?',
		answer: `We map your processes, deploy CuraPilot, and measure what changes — typically in 90 days or less. Book a demo and we will walk through a proof of concept that fits your organisation.`,
	},
];
