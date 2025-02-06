<template>
	<div :class="['ColumnCards', {'active': activeIdx}]">
		<div v-for="(card, idx) of cards"
			 :key="card.id"
			 :class="['ColumnCards_item', {'active': idx + 1 === activeIdx}, {'hidden': activeIdx && idx + 1 !== activeIdx}]"
			 @mouseleave="activeIdx = null"
			 @mouseover="activeIdx = idx + 1"
		>
			<h3 class="ColumnCards_item_title" v-html="card.title"></h3>

			<div class="ColumnCards_item-info">
				<p class="ColumnCards_item_text" v-html="card.text"></p>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ColumnCards',

	components: {},

	props: {},

	data() {
		return {
			limit: 6,
			activeIdx: 2,
			cards: [
				{
					id: 1,
					title: 'Some title',
					text: 'Lorem ipsum dolor sit amet.',
				},
				{
					id: 2,
					title: 'Some title',
					text: 'Lorem ipsum dolor sit amet.',
				},
				{
					id: 3,
					title: 'Some title',
					text: 'Lorem ipsum dolor sit amet.',
				},
			]
		};
	},

	computed: {},

	methods: {},
}
</script>

<style lang="scss">
.ColumnCards {
	display: flex;
	flex-direction: column;
	row-gap: 2.4rem;
	transition: row-gap .6s ease-in-out;

	&.active {
		row-gap: 0;
	}

	&_item {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 32rem;
		height: 11rem;
		padding: 1.4rem;
		border-radius: 1rem;
		background: linear-gradient(99.46deg, rgba(207, 249, 228, 0.5) 0%, rgba(112, 231, 184, 0.5) 100%);
		color: $gray-300;
		transition: height .6s ease-in-out, padding .6s ease-in-out, opacity .6s ease;

		&.active {
			height: 37.8rem;
		}

		&.hidden {
			height: 0;
			padding: 0;
			opacity: 0;
		}
	}
}
</style>
