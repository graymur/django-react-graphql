module.exports = {
	parser: 'postcss-scss',
	plugins: {
		'autoprefixer': {
			browsers: ['last 2 versions'],
			remove: false,
		},
		// Pack same CSS media query rules into one using PostCSS
		'css-mqpacker': {}
	}
};
