<template>
	<div class="Main-page">
		<!--	<Tutorial/>/-->
		<Switcher
			:chapters="chapters"
		/>
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
			chapters: [
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
			],
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
