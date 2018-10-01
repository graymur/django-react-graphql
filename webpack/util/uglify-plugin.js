import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default new UglifyJsPlugin({
	sourceMap: true,
	uglifyOptions: {},
})
