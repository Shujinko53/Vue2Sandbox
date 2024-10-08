<template>
	<div v-inter-class.once="'intersection'" :style="`--GAP: ${gap}px`" class="AnimateListButton">
		<ul class="AnimateListButton_list">
			<li
				v-for="item of list"
				:key="item.id"
				:class="['AnimateListButton_list-item']"
				:content="item.text"
				v-html="item.text"
			></li>
		</ul>
	</div>
</template>

<script>

export default {
	name: 'AnimateListButton',

	components: {},

	props: {
		//
	},

	data() {
		return {
			list: [
				{
					id: 1,
					text: 'Заказать звонок',
				},
				{
					id: 2,
					text: 'Вызвать такси',
				},
				{
					id: 3,
					text: 'Избранное',
				},
				{
					id: 4,
					text: 'Сравнение',
				},
				{
					id: 5,
					text: 'Ипотечный калькулятор',
				},
			],
			gap: 60,
		};
	},

	computed: {
		//
	},

	mounted() {
		this.$nextTick(() => {
			this.animation();
		});
	},

	methods: {
		animation() {
			const list = this.$el.querySelector('.AnimateListButton_list');
			const items = this.$el.querySelectorAll('.AnimateListButton_list-item');
			let sum = 0;
			let prevItemHeight = 0;

			const array = [...items].map((item, idx) => {
				if (idx > 0) {
					sum += prevItemHeight + this.gap;
				}

				if (prevItemHeight > item.offsetHeight) {
					sum -= (prevItemHeight - item.offsetHeight) / 2;
				} else if (idx > 0 && item.offsetHeight > prevItemHeight) {
					sum = sum + (item.offsetHeight - prevItemHeight) / 2;
				}

				prevItemHeight = item.offsetHeight;

				return {
					value: `-50% -${sum}px`,
					duration: 1000,
					delay: 3000
				};
			});

			array.splice(0, 1);

			this.$anime({
				targets: list,
				translate: [
					...array,
					{value: '-50% 0px', duration: 1000, delay: 3000}
				],
				easing: 'easeOutCubic',
				loop: true,
				complete: () => {
				},
			});
		},
	},
}
</script>

<style lang="scss">
.AnimateListButton {
	position: relative;
	overflow: hidden;
	width: 18rem;
	height: 12rem;
	padding: 2rem 1rem;
	box-sizing: border-box;
	border-radius: 2rem;
	background-color: $blue;
	color: $white;
	opacity: 0;
	transform: translateY(-30%);
	transition: opacity 1s ease, transform 1s ease;

	&.intersection {
		opacity: 1;
		transform: translateY(0);
	}

	&_list {
		position: absolute;
		top: 34%;
		left: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: var(--GAP);
		transform-origin: center;
		//opacity: 0;
		translate: -50% 0;

		&-item {
			position: relative;
			width: min-content;
			font-family: 'TT Commons Pro';
			font-size: 1.8rem;
			text-align: center;
			letter-spacing: .02em;
			//text-transform: none;
			color: transparent;

			&:before {
				content: attr(content);
				position: absolute;
				top: 0;
				left: 0;
				overflow: hidden;
				width: 100%;
				//border-right: 2px solid $white;
				color: $white;
				//animation: move 3.6s forwards infinite;
			}
		}
	}

	@keyframes move {
		0% {
			width: 0;
			opacity: 0;
		}
		40% {
			opacity: 1;
		}
		60%,
		100% {
			width: 100%;
		}
	}
}
</style>
