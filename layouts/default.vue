<template>
	<div class="layout-default">
		<MouseTrail :emit="true" />

		<main>
			<Nuxt />
		</main>
	</div>
</template>

<script>
import Vue from 'vue';
import VueAnime from 'vue-animejs';

import MouseTrail from '@/components/common/MouseTrail.vue';

Vue.use(VueAnime);

export default {
	components: {
		MouseTrail,
	},

	data() {
		return {};
	},

	watch: {
		'$store.state.window.fontSize': {
			immediate: true,
			handler(value) {
				if (value) {
					// document.querySelector('html').style.fontSize = value + 'px';
				}
			},
		},
	},

	created() {
	},

	beforeMount() {
		this.resize();
	},

	mounted() {
		this.resize();
		window.addEventListener('resize', this.resize);
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.resize);
	},

	methods: {
		resize() {
			this.$store.commit('windowResize', {
				width: window.innerWidth,
				height: window.innerHeight,
			});
			this.$nuxt.$emit('windowResize', this.$store.state.window);
		},
	},
};
</script>

<style lang="scss"></style>
