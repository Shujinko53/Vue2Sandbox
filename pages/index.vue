<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->

		<Switcher />

		<Calendar />

		<div class="buttons-wrapper">
			<Heart />

			<HoverAnimationButton />
		</div>

		<CardsList />

		<AnimateListButton />

		<ClipPathAnimation />

		<MouseBlock />
	</div>

</template>

<script>
import Switcher from '~/components/common/Switcher.vue';
import Calendar from '@/components/common/Calendar.vue';
import Heart from '@/components/common/Heart.vue';
import CardsList from '@/components/common/CardsList.vue';
import AnimateListButton from '@/components/common/AnimateListButton.vue';
import ClipPathAnimation from '@/components/common/ClipPathAnimation.vue';
import MouseBlock from '@/components/common/MouseBlock.vue';
import HoverAnimationButton from '@/components/common/HoverAnimationButton.vue';

export default {
	name: 'IndexPage',

	components: {
		HoverAnimationButton,
		Heart,
		Switcher,
		Calendar,
		CardsList,
		AnimateListButton,
		ClipPathAnimation,
		MouseBlock
	},

	props: {},

	data() {
		return {
			activeChapter: '',
		};
	},

	computed: {
		//
	},

	mounted() {
	},

	beforeDestroy() {
	},

	methods: {
		getCursorCoords(coords) {
			console.log(' coords => ', coords.x, '\n ', coords.y);
		},
	},
}
</script>

<style lang="scss">
.Main-page {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	row-gap: 12rem;
	width: 100%;
	min-height: 100vh;
	padding: 4rem;

	.buttons-wrapper {
		display: flex;
		align-items: center;
		column-gap: 4rem;
	}
}
</style>
