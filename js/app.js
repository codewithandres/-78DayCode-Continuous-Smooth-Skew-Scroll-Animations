import { DATA } from './data.js';
import { create, select } from './helper.js';

const PADDING = 20;
const ELEMENT_ZIZE = 170;

window.addEventListener('load', () => {
	const items = select('.item');

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

	const init = () => {};

	init();
});
