export type PersonaFact = { value: string; label?: string };

export type PersonaOutcome = { title: string; copy: string };

export type PersonaFaq = { question: string; answer: string };

export type PersonaClinicType = { title: string; copy: string; href: string };

export type PersonaPage = {
	slug: string;
	meta: { title: string; description: string };
	hero: {
		eyebrow: string;
		title: string;
		lede: string;
		note?: string;
		facts: PersonaFact[];
	};
	outcomes: { title?: string; items: PersonaOutcome[] };
	notForYou?: { title: string; copy: string; href?: string; linkLabel?: string };
	clinicTypes?: { title: string; lede?: string; items: PersonaClinicType[] };
	nextSection?: { title: string; lede: string };
	faqs: PersonaFaq[];
	cta: { title: string; lede: string; secondaryHref?: string; secondaryLabel?: string };
};
