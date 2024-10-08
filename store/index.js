export const state = () => ({
	window: {
		width: 0,
		height: 0,
		fontSize: 0,
		initialWidth: 1920,
		initialHeight: 1080,
		orientation: false,
	},
});

export const mutations = {
	windowResize(state, value) {
		state.window = {
			...state.window,
			...value,
			fontSize: Math.round(10 * Math.sqrt((value.width * value.height) / (state.window.initialWidth * state.window.initialHeight))),
		};
	},
	windowChangeInitialDimensions(state, value) {
		state.window.initialWidth = value.width;
		state.window.initialHeight = value.height;
	},
	windowChangeOrientation(state, value) {
		state.window.orientation = value.orientation;
	},
};

export const actions = {};

export const getters = {};
