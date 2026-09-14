// Arrow-driven scroller for the snap tracks, since a scroll-snap row alone gives
// no affordance on a pointer device. Each root needs a [data-track] to scroll and
// [data-scroll="prev"|"next"] buttons; [data-card] marks the element to step by.
export function initCarousel(selector: string) {
	document.querySelectorAll<HTMLElement>(selector).forEach((root) => {
		const track = root.querySelector<HTMLElement>('[data-track]');
		const arrows = root.querySelectorAll<HTMLButtonElement>('[data-scroll]');
		if (!track) return;

		// an arrow at the end of its travel is dead weight, so it disables itself
		const sync = () => {
			const end = track.scrollWidth - track.clientWidth;
			arrows.forEach((arrow) => {
				const atEdge =
					arrow.dataset.scroll === 'prev' ? track.scrollLeft < 8 : track.scrollLeft >= end - 8;
				arrow.disabled = atEdge;
			});
		};

		arrows.forEach((arrow) => {
			arrow.addEventListener('click', () => {
				const card = track.querySelector<HTMLElement>('[data-card]');
				const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
				const step = card ? card.offsetWidth + gap : track.clientWidth;
				track.scrollBy({ left: arrow.dataset.scroll === 'prev' ? -step : step });
			});
		});

		track.addEventListener('scroll', sync, { passive: true });
		window.addEventListener('resize', sync);
		sync();
	});
}
