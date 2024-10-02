<template>
	<button class="Heart" @click="clickHandler">
		<svg-icon
			ref="Heart"
			:name="active ? 'black-heart' : 'heart'"
			class="icon-heart"
			height="3.6rem"
			width="4rem"
		/>
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
			active: false,
		};
	},

	computed: {
		//
	},

	methods: {
		clickHandler() {
			this.active = !this.active;

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
				duration: 2700,
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
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	animation: pulse 2s ease infinite;

	.icon {
		display: block;
	}

	@keyframes pulse {
		0% {
			background-color: transparent;
		}
		50% {
			background-color: $gray-600;
		}
		100% {
			background-color: transparent;
		}
	}
}
</style>
