import type { ImageMetadata } from 'astro';

export type HeroFact = { value: string; label: string };

export type VendorTake = { title: string; copy: string };

export type Win = { title: string; copy: string };

export type FaqItem = { question: string; answer: string };

export type MarketComparison = {
	/** route param, e.g. maldives → /best-clinic-management-software-maldives */
	market: string;
	enabled: boolean;
	geo: string;
	geoAdj: string;
	meta: { title: string; description: string };
	hero: {
		eyebrow: string;
		title: string;
		lede: string;
		note: string;
		facts: HeroFact[];
		badgeStrong: string;
		badgeSub: string;
		imageAlt: string;
		/** Optional; falls back to shared kenya clinic photo */
		image?: ImageMetadata;
	};
	context: {
		title: string;
		lede: string;
		body: string;
		triggers: string[];
	};
	shortlist: {
		lede: string;
		headers: string[];
		rows: string[][];
		ariaLabel: string;
	};
	vendors: VendorTake[];
	wins: Win[];
	switchCost: {
		signs: string[];
		costLede: string;
		links: { label: string; href: string }[];
	};
	verdict: string;
	faqs: FaqItem[];
	cta: { title: string; lede: string };
};
