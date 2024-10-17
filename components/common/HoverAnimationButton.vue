<template>
	<button class="HoverAnimationButton">
		<svg-icon
			height="1.4rem"
			name="close"
			width="1.4rem"
		/>
	</button>
</template>

<script>

export default {
	name: 'HoverAnimationButton',

	components: {},

	props: {
		direction: {
			type: String,
			default: 'left',
		},
	},

	data() {
		return {
			//
		};
	},

	computed: {
		//
	},

	watch: {
		//
	},

	mounted() {
		//
	},

	methods: {
		//
	},
}
</script>

<style lang="scss">
.HoverAnimationButton {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 7rem;
	height: 5rem;
	border-radius: 2rem;
	background: linear-gradient(to bottom, $blue 50%, $light-green 55%) 0 0;
	background-size: 100% 230%;
	user-select: none;
	color: $light-green;
	transition: background-position .3s ease, color .3s ease;
	cursor: pointer;

	&:hover {
		background-position: 0 100%;
		color: $blue;
	}
}
</style>
