<template>
	<div v-inter-class="'intersect'" class="ClipPathAnimation">
		<p class="text">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eaque in iste libero natus
			repellat unde. Alias, amet animi at dolorem est eum fugit illum incidunt ipsa ipsum maxime mollitia
			obcaecati odio qui quis tempora veritatis voluptatibus. Autem, commodi vel.
		</p>
	</div>
</template>

<script>

export default {
	name: 'ClipPathAnimation',

	components: {},

	props: {
		//
	},

	data() {
		return {
			//
		};
	},

	computed: {
		//
	},

	methods: {
		//
	},
}
</script>

<style lang="scss">
.ClipPathAnimation {
	&.intersect {
		.text {
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		}
	}

	.text {
		max-width: 60rem;
		font-size: 1.8rem;
		text-transform: none;
		transition: clip-path 1.5s ease-in-out;
		clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
	}
}
</style>
