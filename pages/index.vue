<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->
		<Switcher />

		<Calendar />
	</div>

</template>

<script>
import Switcher from '~/components/common/Switcher';
import Calendar from '@/components/common/Calendar.vue';

export default {
	name: 'IndexPage',

	components: {
		Switcher,
		Calendar,
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
	row-gap: 6rem;
	min-height: 100vh;
	padding: 4rem;
}
</style>
