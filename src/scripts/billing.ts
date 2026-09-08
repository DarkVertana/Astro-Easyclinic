// Keeps hero previews and plan cards on the same annual / quarterly price,
// and swaps USD / INR from geo/IP detection only (no manual override).

type Period = 'annual' | 'quarterly';
type Currency = 'usd' | 'inr';

const STORAGE_REGION = 'ec_pricing_region';
const STORAGE_REGION_EXPIRES = 'ec_pricing_region_expires';
const REGION_CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000;

function isPeriod(value: string | undefined): value is Period {
	return value === 'annual' || value === 'quarterly';
}

function isCurrency(value: string | null | undefined): value is Currency {
	return value === 'usd' || value === 'inr';
}

function indiaTimezone(): boolean {
	try {
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
		return tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta';
	} catch {
		return false;
	}
}

function weakIndiaLocale(): boolean {
	try {
		const lang = (navigator.language || '').toLowerCase();
		return lang === 'en-in' || lang === 'hi-in' || lang.startsWith('hi');
	} catch {
		return false;
	}
}

function readCachedRegion(): string | null {
	try {
		const region = localStorage.getItem(STORAGE_REGION);
		if (!region || region.length !== 2) return null;
		const expiresRaw = localStorage.getItem(STORAGE_REGION_EXPIRES);
		const expires = expiresRaw ? Number(expiresRaw) : 0;
		if (!expires || Number.isNaN(expires) || Date.now() >= expires) return null;
		return region.toUpperCase();
	} catch {
		return null;
	}
}

function saveCachedRegion(country: string) {
	try {
		localStorage.setItem(STORAGE_REGION, country);
		localStorage.setItem(STORAGE_REGION_EXPIRES, String(Date.now() + REGION_CACHE_TTL_MS));
	} catch {
		/* ignore */
	}
}

/** Immediate currency before IP returns: cached region → India TZ/locale → USD. */
export function resolveInitialCurrency(): Currency {
	try {
		const region = localStorage.getItem(STORAGE_REGION);
		if (region === 'IN') return 'inr';
		if (region && region.length === 2) return 'usd';

		if (indiaTimezone() || weakIndiaLocale()) return 'inr';
	} catch {
		/* private mode / SSR */
	}
	return 'usd';
}

function priceKey(currency: Currency, period: Period): string {
	// data-usd-annual → dataset.usdAnnual
	return currency + period.charAt(0).toUpperCase() + period.slice(1);
}

function currentPeriod(): Period {
	const fromDom = document.documentElement.dataset.billing;
	return isPeriod(fromDom) ? fromDom : 'annual';
}

function currentCurrency(): Currency {
	const fromDom = document.documentElement.dataset.currency;
	return isCurrency(fromDom) ? fromDom : 'usd';
}

function applyPrices(currency: Currency, period: Period) {
	document.documentElement.dataset.currency = currency;
	document.documentElement.dataset.billing = period;
	document.documentElement.setAttribute('data-prices-ready', '');

	document.querySelectorAll<HTMLElement>('[data-price]').forEach((el) => {
		const next = el.dataset[priceKey(currency, period)];
		if (next) el.textContent = next;
	});

	document.querySelectorAll<HTMLButtonElement>('[data-billing]').forEach((button) => {
		button.setAttribute('aria-pressed', String(button.dataset.billing === period));
	});
}

async function fetchCountryText(url: string, signal?: AbortSignal): Promise<string | null> {
	try {
		const res = await fetch(url, {
			credentials: 'omit',
			cache: 'no-store',
			...(signal ? { signal } : {}),
		});
		if (!res.ok) return null;
		const text = (await res.text()).trim().toUpperCase();
		if (/^[A-Z]{2}$/.test(text)) return text;
	} catch {
		/* try next */
	}
	return null;
}

async function detectCountry(): Promise<string | null> {
	const signal = AbortSignal.timeout?.(3500);

	// Prefer same-origin geo endpoint (CF / Vercel headers + server cache).
	try {
		const res = await fetch('/api/geo', {
			credentials: 'omit',
			cache: 'no-store',
			...(signal ? { signal } : {}),
		});
		if (res.ok) {
			const data = (await res.json()) as { country?: string | null };
			const country = typeof data.country === 'string' ? data.country.trim().toUpperCase() : null;
			if (country && /^[A-Z]{2}$/.test(country)) return country;
		}
	} catch {
		/* fall through to public IP APIs */
	}

	// Last-resort browser fallbacks.
	for (const url of ['https://ipapi.co/country/', 'https://ipinfo.io/country']) {
		const country = await fetchCountryText(url, signal);
		if (country) return country;
	}
	return null;
}

/**
 * Wire billing toggle and apply geo-based currency pricing.
 * Safe to call once per page load from Plans.astro.
 */
export function initBilling() {
	const billingButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-billing]'));

	const currency = resolveInitialCurrency();
	const period = currentPeriod();
	applyPrices(currency, period);

	billingButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const next = button.dataset.billing;
			if (isPeriod(next)) applyPrices(currentCurrency(), next);
		});
	});

	// Confirm region via IP / geo (skip network when 14-day region cache is valid).
	void (async () => {
		const cached = readCachedRegion();
		if (cached) {
			const next: Currency = cached === 'IN' ? 'inr' : 'usd';
			if (next !== currentCurrency()) {
				applyPrices(next, currentPeriod());
			}
			return;
		}

		const country = await detectCountry();
		if (!country) return;

		saveCachedRegion(country);

		const next: Currency = country === 'IN' ? 'inr' : 'usd';
		if (next !== currentCurrency()) {
			applyPrices(next, currentPeriod());
		}
	})();
}
