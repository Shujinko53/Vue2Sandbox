<template>
	<div
		class="MouseBlock"
		@mouseenter="hover"
		@mouseleave="hover"
	>
		<p class="coords" v-html="`${mouseX} : ${mouseY}`"></p>
		<p class="coords-block" v-html="`${block.width ?? 0} : ${block.height ?? 0}`"></p>

		<div
			:class="['card', {'hidden': !hovered}]"
			:style="{
			'--mouse-x': mouseX + 'px',
			'--mouse-y': mouseY + 'px',
			'transform': `translate(${translateX ? `calc(-${100}% - ${offsetX * 2}px)` : 0}, ${translateY ? `calc(-${100}% - ${offsetY * 2}px)` : 0})`,
		}"
		>
			<h3 class="card_title">Lorem ipsum dolor.</h3>

			<p class="card_text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, culpa!
			</p>
		</div>
	</div>
</template>

<script>

export default {
	name: 'MouseBlock',

	components: {},

	props: {
		//
	},

	data() {
		return {
			hovered: false,
			mouseX: 0,
			mouseY: 0,
			element: {},
			block: {},
			offsetY: 20,
			offsetX: 20,
			translateX: false,
			translateY: false,
		};
	},

	computed: {
		//
	},

	watch: {
		//
	},

	mounted() {
		this.$nuxt.$on('mouseTrail', this.getCursorCoords);
	},

	beforeDestroy() {
		this.$nuxt.$off('mouseTrail', this.getCursorCoords);
	},

	methods: {
		hover(event) {
			this.hovered = event.type === 'mouseenter';

			if (event.type === 'mouseenter') {
				const block = document.querySelector('.MouseBlock');
				const card = this.$el.querySelector('.card');
				const {width, height} = card.getBoundingClientRect();

				this.block = {
					width: block.getBoundingClientRect().width,
					height: block.getBoundingClientRect().height
				};

				this.element = {
					width,
					height
				};
			}
		},

		getCursorCoords(coords) {
			const block = document.querySelector('.MouseBlock');
			const {width, height} = block.getBoundingClientRect();

			this.mouseX = coords.x * window.innerWidth + this.offsetX - block.offsetLeft;
			this.mouseY = coords.y * window.innerHeight + this.offsetY - block.offsetTop;

			// if ((width - this.mouseX) < this.element.width) {
			// 	this.mouseX -= this.element.width + this.offsetX + block.offsetLeft;
			// }

			this.translateX = (width - this.mouseX) < this.element.width;
			this.translateY = (height - this.mouseY) < this.element.height;

			// if ((height - this.mouseY) < this.element.height) {
			// 	this.mouseY -= this.element.height + this.offsetY * 2;
			// }
		},

		mouseMove(coords) {
			this.pageX = coords.pageX;
			this.pageY = coords.pageY;
			// const leftDifference = this.block.width - (coords.layerX + this.offsetX);
			// const bottomDifference = this.block.height - (coords.layerY + this.offsetY);
			//
			// this.mouseX = leftDifference > (this.element.width + this.offsetX) ? coords.layerX + this.offsetX : coords.layerX - this.offsetX - this.element.width;
			//
			// this.mouseY = bottomDifference > (this.element.height + this.offsetY) ? coords.layerY + this.offsetY : coords.layerY - this.offsetY - this.element.height;
		},
	},
}
</script>

<style lang="scss">
.MouseBlock {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100vh;
	border: 1px solid $black-100;
	background-color: $gray-700;
	--card-width: 30rem;
	--card-height: 40rem;
	--translate-x: 0.1;
	--translate-y: 0.1;

	.coords {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 2.6rem;
		color: $white;
		pointer-events: none;

		&-block {
			position: absolute;
			top: 4rem;
			right: 0;
			font-size: 2.6rem;
			color: $white;
			pointer-events: none;
		}
	}

	.card {
		position: absolute;
		top: var(--mouse-y);
		left: var(--mouse-x);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: var(--card-width);
		height: var(--card-height);
		padding: 2rem;
		background-color: $white;
		transition: opacity .4s ease, transform 1s ease;
		will-change: opacity, transform;
		pointer-events: none;

		&.hidden {
			opacity: 0;
		}

		&_title {
			font-size: 2.6rem;
			font-weight: 700;
		}

		&_text {
			font-size: 2rem;
		}
	}
}
</style>
