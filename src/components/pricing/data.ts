import { SITE_TITLE } from '../../consts';

export type PlanId = 'professional' | 'premium' | 'enterprise';

export type BillingPeriod = 'annual' | 'quarterly';

export type CurrencyCode = 'usd' | 'inr';

/** Numeric amount or 'custom' for enterprise. */
export type PriceAmount = number | 'custom';

export type DualCurrencyPrice = {
	usd: { annual: PriceAmount; quarterly: PriceAmount };
	inr: { annual: PriceAmount; quarterly: PriceAmount };
};

export type Plan = {
	id: PlanId;
	name: string;
	audience: string;
	price: DualCurrencyPrice;
	cadence: string;
	includesFrom?: string;
	features: string[];
	cta: string;
	href: string;
	featured?: boolean;
	badge?: string;
};

/**
 * Format a plan amount for display.
 * USD: `$79` · INR: `₹1,499` (Indian grouping via en-IN).
 */
export function formatPrice(amount: PriceAmount, currency: CurrencyCode): string {
	if (amount === 'custom') return 'Custom';
	if (currency === 'inr') {
		return `₹${amount.toLocaleString('en-IN')}`;
	}
	return `$${amount.toLocaleString('en-US')}`;
}

/** Preformatted strings for data-* attributes and SSR defaults. */
export function priceAttrs(price: DualCurrencyPrice) {
	return {
		usdAnnual: formatPrice(price.usd.annual, 'usd'),
		usdQuarterly: formatPrice(price.usd.quarterly, 'usd'),
		inrAnnual: formatPrice(price.inr.annual, 'inr'),
		inrQuarterly: formatPrice(price.inr.quarterly, 'inr'),
	};
}

export const plans: Plan[] = [
	{
		id: 'professional',
		name: 'Professional',
		audience: 'Best for GPs and physicians running an EMR day to day',
		price: {
			usd: { annual: 79, quarterly: 99 },
			// INR annual from GoodFirms / Nerdisa (billed annually).
			// Quarterly not publicly listed — ~25% above annual to mirror USD ~20% annual savings.
			inr: { annual: 1499, quarterly: 1875 },
		},
		cadence: 'per doctor / month',
		features: [
			'Patient Management',
			'Electronic Medical Records (EMR)',
			'AI Assistant',
			'Finance, Billing & Payments',
			'Appointment Scheduling',
			'Dashboard & Reports',
			'Multi-user Management',
			'SMS & Email Communication',
			'Free Unlimited Support & Training',
			'Reception license included',
		],
		cta: 'Book a Demo',
		href: '/contact-us#demo-form',
	},
	{
		id: 'premium',
		name: 'Premium',
		audience: 'Best for specialists who need advanced EMR and telehealth',
		price: {
			usd: { annual: 99, quarterly: 129 },
			// INR annual from GoodFirms / Nerdisa (billed annually).
			// Quarterly not publicly listed — ~25% above annual to mirror USD ~20% annual savings.
			inr: { annual: 1999, quarterly: 2499 },
		},
		cadence: 'per doctor / month',
		includesFrom: 'Everything in Professional, plus',
		features: [
			'Advanced EMR for Specialists',
			'Virtual Clinic / Video Consultation',
			'Online Payment Integration',
			'Custom Clinical Forms and Print Layouts',
			'Package Treatments',
			'Lab Reporting',
			'WhatsApp Communication',
			'Multi-Location Management',
			'Dedicated Account Manager',
		],
		cta: 'Book a Demo',
		href: '/contact-us#demo-form',
		featured: true,
		badge: 'Most practices choose this',
	},
	{
		id: 'enterprise',
		name: 'Enterprise',
		audience: 'Best for multi-location clinic chains, polyclinics & nursing homes',
		price: {
			usd: { annual: 'custom', quarterly: 'custom' },
			inr: { annual: 'custom', quarterly: 'custom' },
		},
		cadence: 'Talk to us',
		includesFrom: 'Everything in Premium, plus',
		features: [
			'Clinical SOP Tracking',
			'Advanced Financial Accounting',
			'Insurance and 3rd Party Payor',
			'Inventory & Logistics',
			'Pharmacy Management',
			'Lab Management',
			'Dedicated Reporting Server & Custom Analytics',
			'Workflow Manager',
			'Patient Portal & App',
			'Integrations & Custom Features',
			'Multi-Location Control',
			'Custom or Private Cloud Hosting',
		],
		cta: 'Talk to us',
		href: '/contact-us#demo-form',
	},
];

export type CompareCell = boolean;

export type CompareGroup = {
	heading: string;
	rows: {
		name: string;
		professional: CompareCell;
		premium: CompareCell;
		enterprise: CompareCell;
	}[];
};

const all: [CompareCell, CompareCell, CompareCell] = [true, true, true];
const fromPremium: [CompareCell, CompareCell, CompareCell] = [false, true, true];
const enterpriseOnly: [CompareCell, CompareCell, CompareCell] = [false, false, true];

const row = (name: string, cells: [CompareCell, CompareCell, CompareCell]) => ({
	name,
	professional: cells[0],
	premium: cells[1],
	enterprise: cells[2],
});

export const compareGroups: CompareGroup[] = [
	{
		heading: 'Clinical',
		rows: [
			row('Patient Management', all),
			row('Electronic Medical Records (EMR)', all),
			row('AI Assistant', all),
			row('Advanced EMR for Specialists', fromPremium),
			row('Custom Clinical Forms and Print Layouts', fromPremium),
			row('Package Treatments', fromPremium),
			row('Lab Reporting', fromPremium),
			row('Clinical SOP Tracking', enterpriseOnly),
		],
	},
	{
		heading: 'Practice operations',
		rows: [
			row('Appointment Scheduling', all),
			row('Finance, Billing & Payments', all),
			row('Dashboard & Reports', all),
			row('Multi-user Management', all),
			row('Reception license', all),
			row('Online Payment Integration', fromPremium),
			row('Virtual Clinic / Video Consultation', fromPremium),
			row('Advanced Financial Accounting', enterpriseOnly),
			row('Insurance and 3rd Party Payor', enterpriseOnly),
			row('Inventory & Logistics', enterpriseOnly),
			row('Pharmacy Management', enterpriseOnly),
			row('Lab Management', enterpriseOnly),
		],
	},
	{
		heading: 'Engagement & scale',
		rows: [
			row('SMS & Email Communication', all),
			row('WhatsApp Communication', fromPremium),
			row('Multi-Location Management', fromPremium),
			row('Patient Portal & App', enterpriseOnly),
			row('Workflow Manager', enterpriseOnly),
			row('Dedicated Reporting Server & Custom Analytics', enterpriseOnly),
			row('Integrations & Custom Features', enterpriseOnly),
			row('Multi-Location Control', enterpriseOnly),
			row('Custom or Private Cloud Hosting', enterpriseOnly),
		],
	},
	{
		heading: 'Support',
		rows: [
			row('Free Unlimited Support & Training', all),
			row('Dedicated Account Manager', fromPremium),
		],
	},
];

export type PricingFaq = {
	question: string;
	answer: string;
	list?: string[];
};

export const pricingFaqs: PricingFaq[] = [
	{
		question: `How much time will it take to learn ${SITE_TITLE}?`,
		answer: `${SITE_TITLE} is intuitive and simple to use. We train you at times that suit your clinic, and our support team walks you from beginner to expert in under an hour. A new way of working takes a little practice — this is the four-day plan we use:`,
		list: [
			'Day 1 — Basic training, 40 minutes',
			'Day 2 — EMR scenario training, 40 minutes',
			'Day 3 — Practice exercises, 20 minutes',
			'Day 4 — Road to expertise, 20 minutes',
		],
	},
	{
		question: 'What kind of support is available?',
		answer:
			'Customer support is our strongest focus. The real work begins after you come on board. We handle training, workflow customisation, and related issues. The team is available by phone, email, and chat to resolve anything quickly.',
	},
	{
		question: 'Am I locked into any contracts?',
		answer: `There are no binding contracts. Use ${SITE_TITLE} for as long as you are happy with it.`,
	},
	{
		question: `Can ${SITE_TITLE} be customised to my needs?`,
		answer:
			'Yes. There are hundreds of customisation options so the software fits the way you already work. Our support team will set it up for you at no extra charge.',
	},
	{
		question: 'Is my data secure?',
		answer: `${SITE_TITLE} is built on a secure platform with bank-level protection against unauthorised access. Your data belongs only to your clinic. We never sell, misuse, or disclose it for commercial gain.`,
	},
	{
		question: `Can my reception use ${SITE_TITLE}?`,
		answer: `Yes. A reception license is included in the price. Reception can handle registration, appointments, billing and payments. They cannot use the EMR or issue prescriptions. You can optionally add a clinical assistant or nurse role to complete parts of the EMR.`,
	},
	{
		question: 'Why pay for an EMR when there are free alternatives?',
		answer: `It costs real money to build, secure, and support clinical software. Free products usually recoup that cost from your data. Doctors spend years earning patients' trust — handing those records to a "free" EMR is a poor trade. On ${SITE_TITLE} you pay for the product, so the data stays yours.`,
	},
];
