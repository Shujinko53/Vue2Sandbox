<template>
	<div class="error-page">
		<div class="content">
			<div class="up">
				<div
					v-if="error.statusCode === 404"
					class="code"
					v-html="errorCode"
				>
				</div>

				<div
					v-if="error.statusCode === 500"
					class="code"
					v-html="errorCode"
				>
				</div>
			</div>

			<div class="text" v-html="errorMessage"></div>

			<p v-if="error.statusCode === 404" class="back-text">
				Вернитесь на
				<NuxtLink aria-label="Link to the home page" class="home-link" to="/">
					главную страницу
				</NuxtLink>
			</p>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ErrorPage',

	components: {},

	props: {
		error: {
			type: Object,
			default: () => ({}),
		},
	},

	data() {
		return {};
	},

	computed: {
		errorMessage() {
			if (this.error.statusCode === 404) {
				return `Страница не найдена.`;
			}
			if (this.error.statusCode === 500) {
				return 'кажется наш сервер <span>устал..</span>';
			}
			return 'сайт скоро заработает';
		},
		errorCode() {
			if (this.error.statusCode === 404) {
				return '404, ой!';
			} else if (this.error.statusCode === 500) {
				return '';
			} else {
				return 'обновляемся.';
			}
		},
	},

	mounted() {
	},

	methods: {},
};
</script>

<style lang="scss">
.error-page {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100vh;
	user-select: none;

	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		display: flex;
		flex-direction: column;
		font-size: 2.4rem;
		color: $black-100;
		transform: translate(-50%, -50%);
	}

	.up {
		font-size: 3rem;
		text-transform: uppercase;
	}

	.home-link {
		text-decoration: underline;
		transition: text-decoration-color .2s ease, opacity .2s ease;
		text-underline-offset: .28em;
		text-decoration-color: $black-100;

		&:hover {
			opacity: .7;
			text-decoration-color: transparent;
		}

		&:active {
			opacity: .5;
		}
	}
}
</style>
