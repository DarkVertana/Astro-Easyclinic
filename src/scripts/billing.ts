// Keeps hero previews and plan cards on the same annual / quarterly price,
// and swaps USD / INR from geo detection or a manual override.

type Period = 'annual' | 'quarterly';
type Currency = 'usd' | 'inr';

const STORAGE_CURRENCY = 'ec_currency';
const STORAGE_REGION = 'ec_pricing_region';

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

/** Immediate currency before IP returns: override → cached region → India TZ → USD. */
export function resolveInitialCurrency(): Currency {
	try {
		const override = localStorage.getItem(STORAGE_CURRENCY);
		if (isCurrency(override)) return override;

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

	document.querySelectorAll<HTMLButtonElement>('[data-currency]').forEach((button) => {
		button.setAttribute('aria-pressed', String(button.dataset.currency === currency));
	});
}

async function detectCountry(): Promise<string | null> {
	const controllers = [AbortSignal.timeout?.(3500)].filter(Boolean) as AbortSignal[];
	const signal = controllers[0];

	const endpoints = ['https://ipapi.co/country/', 'https://ipinfo.io/country'];

	for (const url of endpoints) {
		try {
			const res = await fetch(url, {
				credentials: 'omit',
				cache: 'no-store',
				...(signal ? { signal } : {}),
			});
			if (!res.ok) continue;
			const text = (await res.text()).trim().toUpperCase();
			if (/^[A-Z]{2}$/.test(text)) return text;
		} catch {
			/* try next */
		}
	}
	return null;
}

/**
 * Wire billing + currency toggles, apply geo pricing.
 * Safe to call once per page load from Plans.astro.
 */
export function initBilling() {
	const billingButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-billing]'));
	const currencyButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-currency]'));

	const currency = resolveInitialCurrency();
	const period = currentPeriod();
	applyPrices(currency, period);

	billingButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const next = button.dataset.billing;
			if (isPeriod(next)) applyPrices(currentCurrency(), next);
		});
	});

	currencyButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const next = button.dataset.currency;
			if (!isCurrency(next)) return;
			try {
				localStorage.setItem(STORAGE_CURRENCY, next);
			} catch {
				/* ignore */
			}
			applyPrices(next, currentPeriod());
		});
	});

	// Confirm region via IP when the user has not manually overridden currency.
	void (async () => {
		let override: string | null = null;
		try {
			override = localStorage.getItem(STORAGE_CURRENCY);
		} catch {
			/* ignore */
		}
		if (isCurrency(override)) return;

		const country = await detectCountry();
		if (!country) return;

		try {
			localStorage.setItem(STORAGE_REGION, country);
		} catch {
			/* ignore */
		}

		const next: Currency = country === 'IN' ? 'inr' : 'usd';
		if (next !== currentCurrency()) {
			applyPrices(next, currentPeriod());
		}
	})();
}
