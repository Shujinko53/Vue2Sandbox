<template>
	<div class="CardsList">
		<div :style="{'--height': 50 + '%'}"
			 class="controls-panel"
		>
			<button :class="['controls-panel_btn', {'disabled': lastCardLeft}]"
					@click="removeCard(cards.length - 1)"
			>
				<span class="hor"></span>
			</button>

			<button :class="['controls-panel_btn', {'disabled': limitReached}]"
					@click="addCard"
			>
				<span class="hor"></span>
				<span class="vert"></span>
			</button>
		</div>

		<div v-for="(card, idx) of cards"
			 :key="idx"
			 class="CardsList_item"
		>
			<h3 class="CardsList_item_title" v-html="card.title"></h3>

			<button :class="['btn-close', {'disabled': lastCardLeft}]"
					@click="removeCard(idx)"
			>
				<svg-icon class="icon-close" name="close" />
			</button>

			<div class="CardsList_item_imageBox">
				<div
					:style="`background-image: url(${card.image});`"
					class="CardsList_item_image"
				></div>
			</div>

			<div class="CardsList_item-info">
				<p class="CardsList_item_text" v-html="card.text"></p>

				<p class="CardsList_item_number" v-html="card.number"></p>

				<p class="CardsList_item_price" v-html="card.price"></p>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'CardsList',

	components: {},

	props: {},

	data() {
		return {
			limit: 6,
			cards: [
				{
					title: 'Some title 1',
					price: 'Some price',
					number: 'Some number',
					text: 'Some text',
					image: '/images/no_image.png',
				},
				{
					title: 'Some title 2',
					price: 'Some price',
					number: 'Some number',
					text: 'Some text',
					image: '/images/no_image.png',
				},
				{
					title: 'Some title 3',
					price: 'Some price',
					number: 'Some number',
					text: 'Some text',
					image: '/images/no_image.png',
				},
			]
		};
	},

	computed: {
		lastCardLeft() {
			return this.cards.length === 1;
		},
		limitReached() {
			return this.cards.length === this.limit;
		},
	},

	methods: {
		removeCard(cardIndex) {
			this.cards.splice(cardIndex, 1);
		},
		addCard() {
			if (this.cards.length !== this.limit) {
				this.cards.push({
					title: `Some title ${this.cards.length + 1}`,
					price: 'Some price',
					number: 'Some number',
					text: 'Some text',
					image: '/images/no_image.png',
				});
			}
		},
	},
}
</script>

<style lang="scss">
.CardsList {
	position: relative;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
	gap: 4rem;
	width: 100%;
	padding-right: 10rem;
	user-select: none;

	.controls-panel {
		position: absolute;
		top: 50%;
		right: 3rem;
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		transform: translateY(-50%);
		transition: opacity .4s ease;

		.controls-panel_btn {
			position: relative;
			width: 4rem;
			height: 4rem;
			border: 1px solid $black-100;
			background-color: $gray-500;
			user-select: none;
			color: $white;
			transition: background-color .3s ease,
			opacity .3s ease,
			scale .1s ease-in-out;
			cursor: pointer;

			&:hover {
				background-color: rgba($gray-500, .5);
			}

			&:active {
				scale: .85;
			}

			&.disabled {
				opacity: .4;
				pointer-events: none;
			}

			span {
				position: absolute;
				top: 50%;
				left: 50%;
				background-color: $black-100;
				transform: translate(-50%, -50%);
			}

			.hor {
				width: 1.6rem;
				height: .1rem;
			}

			.vert {
				width: .1rem;
				height: 1.6rem;
			}
		}
	}

	&_item {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 54rem;
		padding: 2.4rem;
		background-color: $gray-100;
		box-shadow: 0 0 1.4rem .2rem $black-100;
		font-size: 2.4rem;
		font-weight: 700;
		text-transform: none;

		.btn-close {
			position: absolute;
			top: 2.8rem;
			right: 2.8rem;
			transition: opacity .3s ease;

			.icon-close {
				display: block;
				width: 2rem;
				height: 2rem;
				transition: opacity .2s ease-in-out, scale .1s ease-in-out;
				cursor: pointer;
			}

			&:hover {
				.icon-close {
					opacity: .6;
				}
			}

			&:active {
				.icon-close {
					opacity: .4;
					scale: .8;
				}
			}

			&.disabled {
				opacity: .2;
				pointer-events: none;
			}
		}

		&_imageBox {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-grow: 1;
			margin: 1rem 0;
		}

		&_image {
			width: 100%;
			height: 100%;
			margin: 0 4rem;
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
		}

		&-info {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
