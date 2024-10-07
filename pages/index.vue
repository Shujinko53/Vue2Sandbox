<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->
		<Switcher />

		<Calendar />

		<Heart />

		<CardsList />

		<AnimateListButton />
	</div>

</template>

<script>
import Vue from 'vue';
import VueAnime from 'vue-animejs';
import Switcher from '~/components/common/Switcher.vue';
import Calendar from '@/components/common/Calendar.vue';
import Heart from '@/components/common/Heart.vue';
import CardsList from '@/components/common/CardsList.vue';
import AnimateListButton from '@/components/common/AnimateListButton.vue';

Vue.use(VueAnime);

export default {
	name: 'IndexPage',

	components: {
		Heart,
		Switcher,
		Calendar,
		CardsList,
		AnimateListButton
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
	row-gap: 16rem;
	min-height: 100vh;
	padding: 4rem;
}
</style>
