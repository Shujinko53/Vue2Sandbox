<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->
		<Switcher />

		<FormVisit />
	</div>

</template>

<script>
import Switcher from '~/components/common/Switcher';
import FormVisit from '@/components/common/FormVisit';

export default {
	name: 'IndexPage',

	components: {
		Switcher,
		FormVisit,
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
	min-height: 100vh;
	padding: 2rem;
}
</style>
