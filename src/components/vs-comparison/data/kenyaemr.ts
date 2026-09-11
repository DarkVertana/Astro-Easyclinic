import type { VsPageData } from '../types';

export const kenyaemr: VsPageData = {
	slug: 'easyclinic-vs-kenyaemr',
	meta: {
		title: 'EasyClinic vs KenyaEMR (2026) — Comparison for Modern Clinics in Kenya',
		description:
			'EasyClinic vs KenyaEMR for modern clinics in Kenya — private OPD speed, M-Pesa billing, and Cura AI versus public HIV/TB/UHC programme rollouts.',
	},
	hero: {
		eyebrow: 'Kenya · vs KenyaEMR',
		title: 'EasyClinic vs KenyaEMR — which fits a modern clinic in Kenya?',
		lede: 'KenyaEMR is one of Africa’s largest open-source rollouts, built for public HIV, TB, and UHC programmes. EasyClinic is private-clinic SaaS: OPD speed, native M-Pesa, Cura AI, published pricing.',
		note: 'SHA / SHIF / eTIMS support for EasyClinic: in active development (not live yet).',
		facts: [
			{ value: 'Native M-Pesa', label: 'In billing, not a side wallet' },
			{ value: 'Cura AI', label: 'Live documentation assist' },
			{ value: 'Published pricing', label: 'No install quote maze' },
		],
		badgeStrong: 'Programme EMR vs clinic SaaS',
		badgeSub: 'Two different jobs',
		imageAlt: 'Private clinic team in Kenya comparing EasyClinic and KenyaEMR',
	},
	context: {
		eyebrow: 'The decision',
		title: 'These two solve different problems',
		lede: 'KenyaEMR runs in 300+ public facilities and is genuinely strong where it belongs: donor-funded programme reporting, HIV and TB registers, UHC workflows. That is not the same job as running a fee-paying private clinic.',
		body: 'For a private OPD, KenyaEMR is heavy — facility installs, specialised support, and a data model aimed at public reporting. EasyClinic is cloud SaaS for one-to-ten branch clinics: desk, chart, M-Pesa till, WhatsApp, and owner reports in one place.',
	},
	tests: {
		eyebrow: 'Four tests',
		title: 'How to judge EasyClinic vs KenyaEMR',
		lede: 'Run these on your actual clinic — private OPD or programme facility.',
		items: [
			{
				title: 'Who pays test',
				copy: 'Cash and M-Pesa patients at the till, or donor-funded programme visits? That single answer usually decides the stack.',
			},
			{
				title: 'M-Pesa reconciliation test',
				copy: 'Can a till payment land against the visit and reconcile at close of day without a spreadsheet in between?',
			},
			{
				title: 'Who maintains it test',
				copy: 'Facility install with specialised support, or hosted SaaS with updates included? Count the IT hours you actually have.',
			},
			{
				title: 'Claims honesty test',
				copy: 'Ask both vendors what is live today for SHA / SHIF and eTIMS. EasyClinic’s support is in development — confirm timelines before you sign.',
			},
		],
	},
	table: {
		title: 'Side-by-side',
		lede: 'Short takes, not a feature matrix. Confirm current state with both in a demo.',
		headers: ['Capability', 'EasyClinic', 'KenyaEMR'],
		rows: [
			['Built for', 'Private clinics, 1–10 branches', 'Public programme facilities'],
			['Delivery', 'Cloud SaaS, published pricing', 'Open-source, facility install'],
			['M-Pesa billing', 'Native in billing', 'Not the core use case'],
			['AI documentation', 'Cura AI (clinician-reviewed)', 'Not a focus'],
			['HIV / TB / UHC registers', 'Not the core product', 'Core strength'],
			['SHA / SHIF / eTIMS', 'In development — not live yet', 'Programme-oriented; check facility setup'],
			['Support model', 'Vendor support included', 'Implementer / in-house capacity'],
		],
	},
	fit: {
		title: 'Where each wins',
		lede: 'Pick by who you serve, not by feature count.',
		easyclinic: {
			title: 'EasyClinic wins when',
			copy: 'You run a fee-paying private clinic: OPD queue speed, M-Pesa at the till, WhatsApp reminders, Cura AI notes, and a price you can read before the call.',
		},
		competitor: {
			title: 'KenyaEMR wins when',
			copy: 'You are a public or donor-supported facility with HIV, TB, or UHC programme reporting obligations — and you have implementer or in-house technical capacity to run it.',
		},
	},
	verdict:
		'KenyaEMR is the right tool for public-programme facilities and we will say so. For a private clinic in Nairobi, Mombasa, or Kisumu that needs OPD speed, M-Pesa billing, and AI documentation without an install project — EasyClinic is the better fit. On SHA / SHIF and eTIMS we are still building; ask us for the current state rather than assuming it is live.',
	related: [
		{ label: 'Best clinic software Kenya', href: '/best-clinic-management-software-kenya' },
		{ label: 'EMR software in Kenya', href: '/emr-software-in-kenya' },
		{ label: 'Pricing', href: '/pricing' },
		{ label: 'Cura AI', href: '/curapilot' },
	],
	faqs: [
		{
			question: 'Is KenyaEMR free?',
			answer:
				'The software is open source, but running it is not free — expect install, hosting, implementer support, and in-house technical capacity. EasyClinic is priced SaaS with that work included.',
		},
		{
			question: 'Can a private clinic use KenyaEMR?',
			answer:
				'Some do, usually with implementer help. The workflows and reporting are built around public programmes, so private OPD billing, M-Pesa, and patient engagement need work you would otherwise get out of the box.',
		},
		{
			question: 'Does EasyClinic support SHA / SHIF and eTIMS?',
			answer:
				'Not yet. SHA number capture, eligibility, attachments, submit-from-EMR, and eTIMS invoicing are in active development. We would rather say that plainly than sell a roadmap as live.',
		},
		{
			question: 'How does M-Pesa work in EasyClinic?',
			answer:
				'M-Pesa sits inside billing so payments tie to the visit and reconcile at close of day — not a separate wallet your front desk copies numbers out of.',
		},
		{
			question: 'How should we decide EasyClinic vs KenyaEMR?',
			answer:
				'Run the four tests: who pays, M-Pesa reconciliation, who maintains it, and what is actually live on claims. Private fee-paying clinic points to EasyClinic; programme facility points to KenyaEMR.',
		},
	],
	cta: {
		title: 'See EasyClinic on a Kenyan clinic day',
		lede: 'Book a demo — OPD queue, M-Pesa billing, and Cura AI notes on your workflow.',
	},
};
