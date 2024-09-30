<template>
	<button ref="Heart" class="Heart" @click="clickHandler">
		<svg-icon class="icon-heart" height="4rem" name="heart" width="4rem" />
	</button>
</template>

<script>

export default {
	name: 'Heart',

	components: {},

	props: {
		//
	},

	data() {
		return {
			//
		};
	},

	computed: {
		//
	},

	methods: {
		clickHandler() {
			const heart = this.$refs.Heart;
			const heartClone = heart.cloneNode(true);
			const {top, left} = heart.getBoundingClientRect();
			heartClone.classList.add('Clone');

			Object.assign(heartClone.style, {
				position: 'fixed',
				top: top + 'px',
				left: left + 'px',
			});

			document.body.appendChild(heartClone);

			this.$anime({
				targets: heartClone,
				top: '-5vh',
				left: `${Math.random() * (60 - 40) + 40}%`,
				opacity: 0,
				easing: 'easeOutCubic',
				duration: 2000,
				complete: () => {
					heartClone.remove();
				},
			});
		},
	},
}
</script>

<style lang="scss">
.Heart {
	.icon-heart {
		width: 4rem;
		height: 4rem;
	}
}
</style>
