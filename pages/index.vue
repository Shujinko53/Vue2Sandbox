<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->
		<Switcher />
	</div>

</template>

<script>
import Switcher from '~/components/common/Switcher';

export default {
	name: 'IndexPage',

	components: {
		Switcher,
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
