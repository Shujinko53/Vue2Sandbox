<template>
	<div class="AnimateListButton">
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
			],
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

			const array = [...items].map((item, idx) => {
				if (idx > 1) {
					sum += item.offsetHeight;
				}
				return {
					value: `-50% ${-((item.offsetHeight * (idx + 1)) + 40)}px`,
					duration: 1000,
					delay: 3000
				};
			});
			console.log(array);
			this.$anime({
				targets: list,
				translate: [
					{value: '-50% -92px', duration: 1000, delay: 3000},
					{value: '-50% -174px', duration: 1000, delay: 3000},
					{value: '-50% -246px', duration: 1000, delay: 3000},
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
	display: flex;
	align-items: center;
	justify-content: center;
	width: 18rem;
	height: 110px;
	padding: 2rem;
	box-sizing: border-box;
	background-color: $blue;
	color: $white;
	--listGap: 60px;

	&_list {
		position: absolute;
		top: 35%;
		left: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: var(--listGap);
		transform-origin: center;
		translate: -50% 0;

		&-item {
			position: relative;
			width: min-content;
			font-size: 1.6rem;
			text-align: center;
			text-transform: uppercase;
			color: transparent;

			&:before {
				content: attr(content);
				position: absolute;
				top: 0;
				left: 0;
				overflow: hidden;
				width: 0;
				width: 100%;
				border-right: 2px solid $white;
				color: $white;
				//animation: move 4s forwards infinite;
			}
		}
	}

	@keyframes move {
		0% {
			width: 0;
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		60%,
		100% {
			width: 100%;
		}
	}
}
</style>
