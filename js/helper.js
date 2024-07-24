const select = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);
const create = (element) => document.createElement(element);

const getRandonNumber = (len) => Math.floor(Math.random() * len);

const getRandomNunberRange = (min, max) => Math.random() * (min - max) + min;

class SmoothScollConfig {
	static ease = 0.1;

	static lerp(current, target) {
		const distanceBetween = target - current;
		const distanceToTravel = distanceBetween * this.ease;

		return current + distanceToTravel;
	}

	static getSkew(target, current) {
		const diff = target - current;

		const acceleration = diff / window.innerWidth;

		const velocity = +acceleration;

		return velocity * 7.5;
	}
}

export {
	select,
	selectAll,
	create,
	SmoothScollConfig,
	getRandomNunberRange,
	getRandonNumber,
};
