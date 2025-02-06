<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->

		<Switcher />

		<Calendar />

		<FlipCard />

		<div class="buttons-wrapper">
			<Heart />

			<HoverAnimationButton />
		</div>

		<CardsList />

		<AnimateListButton />

		<ClipPathAnimation />

		<MouseBlock />

		<AnimateDelayList />

		<ColumnAnimationCards />
	</div>

</template>

<script>
import Switcher from '~/components/common/Switcher.vue';
import Calendar from '@/components/common/Calendar.vue';
import FlipCard from '@/components/common/FlipCard.vue';
import Heart from '@/components/common/Heart.vue';
import CardsList from '@/components/common/CardsList.vue';
import AnimateListButton from '@/components/common/AnimateListButton.vue';
import ClipPathAnimation from '@/components/common/ClipPathAnimation.vue';
import MouseBlock from '@/components/common/MouseBlock.vue';
import HoverAnimationButton from '@/components/common/HoverAnimationButton.vue';
import AnimateDelayList from "@/components/common/AnimateDelayList.vue";
import ColumnAnimationCards from "@/components/common/ColumnAnimationCards.vue";

export default {
	name: 'IndexPage',

	components: {
		ColumnAnimationCards,
		AnimateDelayList,
		FlipCard,
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
		//
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
