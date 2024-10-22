<template>
	<div class="FlipCard">
		<div class="FlipCard_wrapper">
			<div class="FlipCard_back">
				<span>Back of card</span>
			</div>
			<div class="FlipCard_front">
				<span>Front of card</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'FlipCard',

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
.FlipCard {
	position: relative;
	min-width: 28rem;
	max-width: 35rem;
	height: 40rem;
	background: none;

	&:hover {
		.FlipCard_wrapper {
			transform: rotateY(180deg);
		}
	}

	&_wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		transition: all .6s ease;
		transform-style: preserve-3d;
	}

	&_front,
	&_back {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 2rem;
		border-radius: 2rem;
		backface-visibility: hidden;

		span {
			position: absolute;
			top: 5rem;
			left: 50%;
			font-family: 'Poppins';
			font-size: 2rem;
			transform: translateX(-50%);
		}
	}

	&_front {
		width: 100%;
		height: 100%;
		background: $yellow;
		color: $black-100;
	}

	&_back {
		width: 100%;
		height: 100%;
		background: $blue;
		color: $white;
		transform: rotateY(180deg);
	}
}
</style>
