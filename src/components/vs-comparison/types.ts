export type HeroFact = { value: string; label?: string };

export type WorkflowTest = {
	title: string;
	copy: string;
};

export type FitSide = {
	title: string;
	copy: string;
};

export type RelatedLink = {
	label: string;
	href: string;
};

export type VsPageData = {
	slug: string;
	meta: { title: string; description: string };
	hero: {
		eyebrow: string;
		title: string;
		lede: string;
		note?: string;
		facts: HeroFact[];
		badgeStrong: string;
		badgeSub: string;
		imageAlt: string;
	};
	context: {
		eyebrow?: string;
		title: string;
		lede: string;
		body?: string;
	};
	tests: {
		eyebrow?: string;
		title: string;
		lede?: string;
		items: WorkflowTest[];
	};
	table: {
		title: string;
		lede?: string;
		headers: [string, string, string];
		rows: [string, string, string][];
	};
	fit: {
		title: string;
		lede?: string;
		easyclinic: FitSide;
		competitor: FitSide;
	};
	verdict?: string;
	related: RelatedLink[];
	faqs: { question: string; answer: string }[];
	cta: { title: string; lede: string };
};
