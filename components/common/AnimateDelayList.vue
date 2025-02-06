<template>
	<div class="AnimateDelayList" @mouseenter="changeKey">
		<div :key="listKey" class="wrapper">
			<TransitionGroup class="list" name="list" tag="ul">
				<li v-for="(item, index) in list"
					:key="item.id"
					:class="['AnimateDelayList_item', {'active': listHovered}]"
					:style="{'--delay': `${index / 5}s`}"
				>
					{{ item.name }}
				</li>
			</TransitionGroup>
		</div>
	</div>
</template>

<script>

export default {
	name: 'AnimateDelayList',

	components: {},

	props: {
		//
	},

	data() {
		return {
			list: [
				{
					id: 1,
					name: 'First'
				},
				{
					id: 2,
					name: 'Second'
				},
				{
					id: 3,
					name: 'Third'
				},
				{
					id: 4,
					name: 'Fourth'
				},
			],
			listKey: 55,
			listHovered: false,
		};
	},

	computed: {
		//
	},

	watch: {
		//
	},

	mounted() {
		//
	},

	methods: {
		changeKey() {
			this.listKey = Math.round(Math.random() * (60 - 40) + 40);
			// this.listHovered = true;
		}
	},
}
</script>

<style lang="scss">
.AnimateDelayList {
	.list {
		display: flex;
		column-gap: 2rem;
	}

	&_item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 10rem;
		height: 16rem;
		border-radius: 1rem;
		background-color: $gray-800;
		font-size: 1.8rem;
		color: $white;
		animation: appear 1.2s ease var(--delay) forwards;
	}

	@keyframes appear {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(10rem);
		}
		100% {
			transform: translateY(0);
		}
	}
}
</style>
