// Keeps hero previews and plan cards on the same annual / quarterly price.
type Period = 'annual' | 'quarterly';

export function initBilling() {
	const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-billing]'));
	if (!buttons.length) return;

	const apply = (period: Period) => {
		document.documentElement.dataset.billing = period;

		document.querySelectorAll<HTMLElement>('[data-price]').forEach((el) => {
			const next = el.dataset[period];
			if (next) el.textContent = next;
		});

		buttons.forEach((button) => {
			const on = button.dataset.billing === period;
			button.setAttribute('aria-pressed', String(on));
		});
	};

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const period = button.dataset.billing;
			if (period === 'annual' || period === 'quarterly') apply(period);
		});
	});
}
