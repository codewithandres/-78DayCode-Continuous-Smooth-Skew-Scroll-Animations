import { DATA } from './data.js';
import {
	create,
	getRandomNunberRange,
	getRandonNumber,
	select,
	selectAll,
	SmoothScollConfig,
} from './helper.js';

const PADDING = 20;
const ELEMENT_ZIZE = 170;
const pos = ['left', 'right'];

window.addEventListener('load', () => {
	const items = select('.items');
	const circle = select('.cursor-circle');

	const scroll = { current: 0, target: 0 };
	const mouseEvent = { clientX: 0, clientY: 0, hover: false, target: null };

	let selectImg = null;
	let position = pos[getRandonNumber(pos.length)];
	let num = getRandomNunberRange(5, 7);

	const generateList = () => {
		DATA.forEach((d, index) => {
			const imagenHover = create('img');
			imagenHover.classList.add('hover-image');
			imagenHover.src = d.imgUrl;

			gsap.set(imagenHover, {
				position: 'absolute',
				opacity: 0,
				top: '40%',
				zIndex: -2,
				left: '45%',
				scale: 0.6,
				width: 250,
				height: 350,
				rotate: `${position === 'left' ? -num + 'deg' : num + 'deg'}`,
				attr: { 'data-id': index + 1 },
			});

			select('body').insertAdjacentElement('afterbegin', imagenHover);

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

	const updateTarget = (event) => {
		scroll.target += event.deltaY;
	};

	const updateMouseEvent = (event) => {
		const isTtitle = event.target?.className.includes('title');

		mouseEvent.hover = isTtitle;
		mouseEvent.target = isTtitle ? event.target : null;
		mouseEvent.clientX = event.clientX;
		mouseEvent.clientY = event.clientY;
	};

	const getHoverImage = (target) => {
		const isHovering = target?.className?.includes('title');

		const title = isHovering
			? target.parentNode.querySelector('.title-2')
			: null;

		const img = document.querySelector(`[data-id="${title.dataset.id}"]`);

		return img;
	};

	document.addEventListener('mousewheel', updateTarget);

	document.addEventListener('mousemove', updateMouseEvent);

	document.querySelectorAll('.text-container').forEach((t) => {
		t.addEventListener('mouseover', (event) => {
			const img = getHoverImage(event.target);

			if (event.target.className === 'title') {
				selectImg = img;

				if (img) {
					gsap.to(img, {
						opacity: 1,
						scale: 1,
						zIndex: -1,
						duration: 0.5,
						top: '40%',
						ease: Power3.easeInOut,
					});
				}
				position = pos[getRandonNumber(pos.length)];
				num = getRandomNunberRange(5, 7);
			}
		});

		t.addEventListener('mouseleave', (event) => {
			if (selectImg) {
				gsap.to(selectImg, {
					opacity: 0,
					scale: 0.4,
					rotate: `${
						position === 'left' ? -num + 'deg' : num + 'deg'
					}`,
					duration: 0.5,
					ease: Power3.easeInOut,
					zIndex: -1,
					top: '40%',
				});
			}
		});
	});

	let prev = null;

	const list = selectAll('.text-container');

	const init = () => {
		const { current, target } = scroll;
		const transition = SmoothScollConfig.lerp(current, target);

		scroll.current = transition;

		const skew = SmoothScollConfig.getSkew(target, current);

		const hoverElement = document.elementFromPoint(
			mouseEvent.clientX,
			mouseEvent.clientY,
		);

		const isHovering =
			hoverElement?.className?.includes('title') ||
			hoverElement?.className.includes('title-2');

		const title = isHovering
			? hoverElement.parentNode.querySelector('.title-2')
			: null;

		const id = title?.dataset.id ?? 0;

		const img = document.querySelector(`[data-id="${id}"]`);

		if (prev !== title) {
			if (prev) {
				gsap.set(prev, { width: '0%' });
			}
			prev = title;
		} else {
			if (title) {
				gsap.set(title, { width: '100%' });
			}

			if (img) {
				const ease = 0.05;
				const directionX = window.innerWidth - mouseEvent.clientX;
				const directionY = window.innerHeight - mouseEvent.clientY;

				gsap.to(img, {
					rotate: `${
						position === 'left' ? -num + 'deg' : num + 'deg'
					}`,
					translateY: `-${
						gsap.getProperty(img, 'y') + directionY * ease
					}%`,
					translateX: `-${
						gsap.getProperty(img, 'x') + directionX * ease
					}%`,
				});
			}
		}

		gsap.to(circle, {
			top: mouseEvent.clientY - (isHovering ? 55 : 8.5),
			left: mouseEvent.clientX - (isHovering ? 55 : 8.5),
			duration: 0.3,
			className: isHovering ? 'cursor-circle active' : 'cursor-circle',
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

	const images = selectAll('.hover-image');
	images[images.length - 1].addEventListener('load', () => {
		gsap.to('.blank', {
			height: '0%',
			delay: 1,
			duration: 0.9,
			ease: Power1.easeInOut,
		});

		gsap.to(circle, {
			autoAlpha: 1,
			delay: 1,
			duration: 0.9,
			ease: Power1.easeInOut,
		});
	});
});
