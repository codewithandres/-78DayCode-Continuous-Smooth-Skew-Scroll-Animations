import { DATA } from './data.js';
import { create, select, selectAll, SmoothScollConfig } from './helper.js';

const PADDING = 20;
const ELEMENT_ZIZE = 170;

window.addEventListener('load', () => {
	const items = select('.item');
	const circle = select('.cursor-circle');

	const scroll = { current: 0, target: 0 };

	const mouseEvent = { clientX: 0, clientY: 0 };

	const generateList = () => {
		DATA.forEach((d, index) => {
			const textContainer = create('div');

			textContainer.classList.add('text-container');
			textContainer.setAttribute('data-id', index + 1);

			const title = create('div');
			const title2 = create('div');

			title2.setAttribute('data-id', index + 1);
			title2.classList.add('title-2');
			title.classList.add('title');
			title.textContent = d.title;
			title2.textContent = d.title;
			textContainer.appendChild(title);
			textContainer.appendChild(title2);

			const pos = (ELEMENT_ZIZE + PADDING) * index;

			gsap.to(textContainer, { y: pos });

			items.appendChild(textContainer);
		});
	};
	generateList();

	const list = selectAll('.text-container');

	const updateTarget = (event) => (scroll.target += event.deltaY);

	const updateMouseEvent = (event) => {
		mouseEvent.clientX = event.clientX;
		mouseEvent.clientY = event.clientY;
	};

	document.addEventListener('wheel', updateTarget);

	document.addEventListener('mousemove', updateMouseEvent);

	const init = () => {
		const { current, target } = scroll;
		const transition = SmoothScollConfig.lerp(current, target);

		scroll.current = transition;

		const skew = SmoothScollConfig.getSkew(target, current);

		gsap.to(circle, {
			top: mouseEvent.clientY - 8.5,
			left: mouseEvent.clientX - 8.5,
			duration: 0.3,
			className: 'cursor-circle',
		});

		list.forEach((item) => {
			const y = gsap.getProperty(item, 'y');

			const size = (ELEMENT_ZIZE + PADDING) * DATA.length;

			const scrollY = y - scroll.current;

			let result = (scrollY % size) - (ELEMENT_ZIZE + PADDING);

			if (result < -231)
				result = (scrollY % size) + size - (ELEMENT_ZIZE + PADDING);

			item.style.transform = `translateY(${result}px) skewY(${skew}deg)`;
		});

		window.requestAnimationFrame(init);
	};

	init();
});
