import Vue from 'vue';

function intersectingClass(Vue) {
	Vue.directive('inter-class', {
		inserted(el, {value, modifiers}) {
			try {
				const options = {threshold: 0, rootMargin: '0px', ...value.options};
				delete value.options;

				function setIntersectionClass(entries, observer) {
					if (entries[0].isIntersecting) {
						el.classList.add(value);
					} else {
						el.classList.remove(value);
					}

					if (modifiers.once && entries[0].intersectionRatio > 0) {
						observer.unobserve(entries[0].target);
					}
				}

				new IntersectionObserver(setIntersectionClass, options).observe(el);
			} catch (error) {
				console.warn('! intersecting error => ', error);
			}
		}
	});
}

/** v-inter-class
 * Intersection observer, добавляющий класс, при появлении блока во viewport. */
intersectingClass(Vue);
