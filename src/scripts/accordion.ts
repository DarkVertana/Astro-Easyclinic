// Animates native <details> open/close, since the element itself snaps.
// Each item needs a [data-accordion-body] wrapper around its panel content.
const DURATION = 280;
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

type Options = {
	/** close the open sibling when another opens, the tab-like behaviour */
	exclusive?: boolean;
};

export function initAccordion(selector: string, { exclusive = true }: Options = {}) {
	const items = Array.from(document.querySelectorAll<HTMLDetailsElement>(selector));
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	for (const item of items) {
		const summary = item.querySelector('summary');
		const body = item.querySelector<HTMLElement>('[data-accordion-body]');
		if (!summary || !body) continue;

		summary.addEventListener('click', (event) => {
			event.preventDefault();
			if (item.dataset.animating) return;

			if (item.open) {
				collapse(item, body, reduced);
				return;
			}

			if (exclusive) {
				for (const other of items) {
					if (other === item || !other.open) continue;
					const otherBody = other.querySelector<HTMLElement>('[data-accordion-body]');
					if (otherBody) collapse(other, otherBody, reduced);
				}
			}
			expand(item, body, reduced);
		});
	}
}

function expand(item: HTMLDetailsElement, body: HTMLElement, reduced: boolean) {
	item.open = true;
	if (reduced) return;
	slide(item, body, 0, body.scrollHeight);
}

function collapse(item: HTMLDetailsElement, body: HTMLElement, reduced: boolean) {
	if (reduced) {
		item.open = false;
		return;
	}
	slide(item, body, body.scrollHeight, 0, () => {
		item.open = false;
	});
}

function slide(
	item: HTMLDetailsElement,
	body: HTMLElement,
	from: number,
	to: number,
	done?: () => void
) {
	item.dataset.animating = 'true';
	const animation = body.animate(
		{
			height: [`${from}px`, `${to}px`],
			opacity: [from === 0 ? 0 : 1, to === 0 ? 0 : 1],
		},
		{ duration: DURATION, easing: EASING }
	);
	animation.onfinish = () => {
		delete item.dataset.animating;
		done?.();
	};
}
