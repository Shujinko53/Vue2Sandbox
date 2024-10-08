<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->
		<Switcher />

		<Calendar />

		<Heart />

		<CardsList />

		<AnimateListButton />

		<ClipPathAnimation />
	</div>

</template>

<script>
import Switcher from '~/components/common/Switcher.vue';
import Calendar from '@/components/common/Calendar.vue';
import Heart from '@/components/common/Heart.vue';
import CardsList from '@/components/common/CardsList.vue';
import AnimateListButton from '@/components/common/AnimateListButton.vue';
import ClipPathAnimation from '@/components/common/ClipPathAnimation.vue';

export default {
	name: 'IndexPage',

	components: {
		Heart,
		Switcher,
		Calendar,
		CardsList,
		AnimateListButton,
		ClipPathAnimation
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
		this.$nuxt.$on('mouseTrail', this.getCursorCoords);
	},

	beforeDestroy() {
		this.$nuxt.$off('mouseTrail', this.getCursorCoords);
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
	min-height: 100vh;
	padding: 4rem;
}
</style>
