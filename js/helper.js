const select = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);
const create = (element) => document.createElement(element);

class SmoothScollConfig {
	static ease = 0.15;

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

export { select, selectAll, create, SmoothScollConfig };
