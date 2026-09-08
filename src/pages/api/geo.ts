export const prerender = false;

import type { APIRoute } from 'astro';

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX = 5000;
const FETCH_TIMEOUT_MS = 2500;
const INVALID_COUNTRY = new Set(['XX', 'T1', '']);

type CacheEntry = { country: string; expires: number; touched: number };

const ipCache = new Map<string, CacheEntry>();

function jsonCountry(country: string | null) {
	return new Response(JSON.stringify({ country }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'private, max-age=86400',
		},
	});
}

function headerGet(headers: Headers, name: string): string | null {
	// Headers.get is case-insensitive; also try common variants explicitly.
	const v = headers.get(name);
	return v != null && v !== '' ? v.trim() : null;
}

function isValidCountry(code: string | null | undefined): code is string {
	if (!code) return false;
	const upper = code.trim().toUpperCase();
	if (INVALID_COUNTRY.has(upper)) return false;
	return /^[A-Z]{2}$/.test(upper);
}

function normalizeCountry(raw: string | null | undefined): string | null {
	if (!raw) return null;
	const upper = raw.trim().toUpperCase();
	return isValidCountry(upper) ? upper : null;
}

function countryFromHeaders(headers: Headers): string | null {
	const candidates = [
		headerGet(headers, 'CF-IPCountry'),
		headerGet(headers, 'cf-ipcountry'),
		headerGet(headers, 'X-Vercel-IP-Country'),
		headerGet(headers, 'x-vercel-ip-country'),
	];
	for (const c of candidates) {
		const n = normalizeCountry(c);
		if (n) return n;
	}
	return null;
}

function clientIp(headers: Headers): string | null {
	const cf = headerGet(headers, 'CF-Connecting-IP');
	if (cf) return cf.split(',')[0].trim();

	const xff = headerGet(headers, 'X-Forwarded-For');
	if (xff) {
		const first = xff.split(',')[0].trim();
		if (first) return first;
	}

	const real = headerGet(headers, 'X-Real-IP');
	if (real) return real.split(',')[0].trim();

	return null;
}

/** Cache key: IPv4 /24 or full IPv6 string. */
function cacheKeyForIp(ip: string): string {
	const trimmed = ip.trim();
	// IPv4
	if (/^\d{1,3}(\.\d{1,3}){3}$/.test(trimmed)) {
		const parts = trimmed.split('.');
		return `${parts[0]}.${parts[1]}.${parts[2]}.0/24`;
	}
	// Strip IPv4-mapped IPv6 if present
	const v4mapped = trimmed.match(/::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
	if (v4mapped) {
		const parts = v4mapped[1].split('.');
		return `${parts[0]}.${parts[1]}.${parts[2]}.0/24`;
	}
	return trimmed.toLowerCase();
}

function pruneCache() {
	const now = Date.now();
	for (const [k, v] of ipCache) {
		if (v.expires <= now) ipCache.delete(k);
	}
	while (ipCache.size > CACHE_MAX) {
		let oldestKey: string | null = null;
		let oldestTouched = Infinity;
		for (const [k, v] of ipCache) {
			if (v.touched < oldestTouched) {
				oldestTouched = v.touched;
				oldestKey = k;
			}
		}
		if (oldestKey == null) break;
		ipCache.delete(oldestKey);
	}
}

function getCached(key: string): string | null {
	const entry = ipCache.get(key);
	if (!entry) return null;
	if (entry.expires <= Date.now()) {
		ipCache.delete(key);
		return null;
	}
	entry.touched = Date.now();
	return entry.country;
}

function setCached(key: string, country: string) {
	const now = Date.now();
	ipCache.set(key, { country, expires: now + CACHE_TTL_MS, touched: now });
	pruneCache();
}

async function fetchCountryText(url: string): Promise<string | null> {
	const signal = AbortSignal.timeout?.(FETCH_TIMEOUT_MS);
	const res = await fetch(url, {
		credentials: 'omit',
		cache: 'no-store',
		headers: { Accept: 'text/plain' },
		...(signal ? { signal } : {}),
	});
	if (!res.ok) return null;
	const text = (await res.text()).trim();
	return normalizeCountry(text);
}

async function lookupCountryByIp(ip: string | null): Promise<string | null> {
	const urls: string[] = [];
	if (ip) {
		const enc = encodeURIComponent(ip);
		urls.push(`https://ipapi.co/${enc}/country/`);
		urls.push(`https://ipinfo.io/${enc}/country`);
	} else {
		urls.push('https://ipapi.co/country/');
		urls.push('https://ipinfo.io/country');
	}

	for (const url of urls) {
		try {
			const country = await fetchCountryText(url);
			if (country) return country;
		} catch {
			/* try next */
		}
	}
	return null;
}

export const GET: APIRoute = async ({ request }) => {
	try {
		const fromHeader = countryFromHeaders(request.headers);
		if (fromHeader) {
			return jsonCountry(fromHeader);
		}

		const ip = clientIp(request.headers);
		const key = ip ? cacheKeyForIp(ip) : '__unknown__';

		const cached = getCached(key);
		if (cached) {
			return jsonCountry(cached);
		}

		const lookedUp = await lookupCountryByIp(ip);
		if (lookedUp) {
			setCached(key, lookedUp);
			return jsonCountry(lookedUp);
		}

		return jsonCountry(null);
	} catch {
		return jsonCountry(null);
	}
};
