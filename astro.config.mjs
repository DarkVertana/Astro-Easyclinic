// @ts-check

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.easyclinic.io',
	adapter: vercel(),
	integrations: [sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: [400, 500, 600, 700],
			subsets: ['latin'],
			styles: ['normal'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
	],
});
