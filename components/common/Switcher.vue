<template>
	<div class="Switcher">
		<div class="Switcher_wrapper">
			<div
				v-for="(chapter, idx) of chapters"
				:key="idx"
				:class="['Switcher_item', {'Switcher_item-active': chapter.id === activeItem}]"
				@click="changeChapter(chapter, $event)"
				v-html="chapter.title"
			></div>
		</div>

		<div class="Switcher_roller"></div>
	</div>
</template>

<script>
export default {
	name: 'Switcher',

	props: {
		chapters: {
			type: Array,
			default: () => ([
				{
					id: 1,
					title: 'First'
				},
				{
					id: 2,
					title: 'Second'
				},
				{
					id: 3,
					title: 'Third'
				},
			]),
		},
		randomStart: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			activeItem: 1,
		};
	},

	computed: {
		//
	},

	mounted() {
		this.$nextTick(() => {
			if (this.randomStart) {
				this.randomStartAnimation();
			} else {
				this.startAnimation();
			}
		});
	},

	methods: {
		changeChapter(item, element) {
			if (this.activeItem !== item.id) {
				this.activeItem = item.id;
			}

			this.animation(element);
		},

		animation(element) {
			const block = this.$el.querySelector('.Switcher_wrapper');
			const blockWidth = Math.round(block.getBoundingClientRect().width);
			const activeItemWidth = element?.target.getBoundingClientRect().width;
			const activeItemLeft = element?.target.offsetLeft;
			const roller = this.$el.querySelector('.Switcher_roller');
			const rollerLeft = roller.offsetLeft;

			Object.assign(roller.style, {
				left: `${activeItemLeft}px`,
				right: `${blockWidth - activeItemLeft - activeItemWidth}px`,
				transitionDelay: `${activeItemLeft > rollerLeft ? '0s, 0.2s' : '0.2s, 0s'}`,
			});
		},

		startAnimation(elementNumber = 0) {
			const allElements = this.$el.querySelectorAll('.Switcher_item');
			const activeItemWidth = allElements[elementNumber]?.getBoundingClientRect().width;
			const activeItemLeft = allElements[elementNumber]?.offsetLeft;
			const block = this.$el.querySelector('.Switcher_wrapper');
			const blockWidth = Math.round(block?.getBoundingClientRect().width);
			const roller = this.$el.querySelector('.Switcher_roller');

			Object.assign(roller.style, {
				left: `${activeItemLeft}px`,
				right: `${blockWidth - activeItemLeft - activeItemWidth}px`,
			});
		},

		randomStartAnimation() {
			let randomElement = this.chapters.length ? Math.floor(Math.random() * (this.chapters.length)) : 0;

			setTimeout(() => {
				if (this.chapters.length) {
					this.activeItem = this.chapters[randomElement].id;
				}
			}, 100);
			this.startAnimation(randomElement);
		}
	},
}
</script>

<style lang="scss">

.Switcher {
	position: relative;
	overflow: hidden;
	display: flex;
	width: max-content;
	border-radius: 4rem;
	user-select: none;

	&_wrapper {
		display: flex;
		width: 100%;
		border: 1px solid $blue;
		border-radius: 4rem;
		background-color: $light-green;
		white-space: nowrap;
	}

	&_roller {
		position: absolute;
		top: 0;
		right: 100%;
		bottom: 0;
		left: 0;
		z-index: 0;
		border-radius: 4rem;
		background-color: $blue;
		box-shadow: inset 0 0 1px 0 $blue, 0 0 1px 0 $blue;
		transition: left .5s ease, right .5s ease;
		transition-delay: 0s, .2s;
		transition-timing-function: ease;
		transition-duration: .5s, .5s;
		transition-property: right, left;
	}

	&_item {
		position: relative;
		z-index: 2;
		padding: 1.8rem 3.8rem;
		box-sizing: border-box;
		border-radius: 4rem;
		background-color: transparent;
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 1;
		text-align: center;
		text-transform: uppercase;
		color: $blue;
		transition: color .4s ease .1s, background-color .3s ease, box-shadow .3s ease;
		cursor: pointer;

		&-active {
			color: $gray-100;
			cursor: default;
		}
	}
}
</style>
