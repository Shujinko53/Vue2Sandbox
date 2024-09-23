<template>
	<div class="Switcher">
		<div class="Switcher_wrapper">
			<div
				v-for="(chapter, idx) of chapters"
				:key="idx"
				:class="['Switcher_item', {'Switcher_item-active': chapter.id === activeItem}]"
				@click="changeChapter(chapter)"
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
			default: () => [],
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
	},

	methods: {
		changeChapter(item) {
			if (this.activeItem !== item.id) {
				this.activeItem = item.id;
			}
		},
	},
}
</script>

<style lang="scss">

.Switcher {
	position: absolute;
	top: 50%;
	left: 50%;
	display: flex;
	width: max-content;
	user-select: none;
	transform: translate(-50%, -50%);

	&_wrapper {
		display: flex;
		width: 100%;
		border: 1px solid $black;
		border-radius: 4rem;
		background-color: $gray-100;
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
		color: $black;
		transition: color .4s ease, background-color .3s ease, box-shadow .3s ease;
		cursor: pointer;

		&-active {
			color: $blue;
			cursor: default;
		}
	}
}
</style>
