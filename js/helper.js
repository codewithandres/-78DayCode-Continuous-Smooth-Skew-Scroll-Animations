const select = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);
const create = (element) => document.createElement(element);

class SmoothScollConfig {
	static ease = 0.15;

	static lerp(current, target) {
		const distanceBetewen = target - current;
		const distanceToTravel = distanceBetewen * this.ease;

		return current + distanceToTravel;
	}

	static getSkew(target, current) {
		const diff = target - current;
		const aceleration = diff / window.innerWidth;
		const velocity = +aceleration;

		return velocity * 1.5;
	}
}

export { select, selectAll, create, SmoothScollConfig };
