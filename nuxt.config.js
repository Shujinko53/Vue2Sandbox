export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Vue2Sandbox',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: ''},
			{name: 'format-detection', content: 'telephone=no'}
		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: 'favicons/favicon.ico'},
			{
				rel: 'preload',
				as: 'font',
				type: 'font/woff2',
				crossorigin: 'anonymous',
				href: 'assets/fonts/TTCommons-Medium.woff2'
			},
			{
				rel: 'preload',
				as: 'font',
				type: 'font/woff2',
				crossorigin: 'anonymous',
				href: 'assets/fonts/GHEA-Grapalat-Regular.woff2'
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/scss/bundle.scss'],

	styleResources: {
		scss: '~/assets/scss/shared/*.scss',
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'@/plugins/mask',
		'@/plugins/vue-touch',
		'@/plugins/directives'
	],

	render: {
		bundleRenderer: {
			shouldPreload: (file, type) => {
				return ['script', 'style', 'font'].includes(type)
			}
		}
	},

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/style-resources',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/svg-sprite',
	],

	// Stylelint options
	stylelint: {
		files: [
			'assets/**/*.{s?(a|c)ss}',
			'**/components/**/*.{s?(a|c)ss}',
			'**/{components,layouts,services}/**/*.vue',
		],
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
}
