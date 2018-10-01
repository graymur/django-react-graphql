import bundleAnalyzerPlugin from './util/bundle-analyzer-plugin' // eslint-disable-line
import path from 'path'
import config from '../src/config'
import merge from 'merge-deep'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import htmlPlugin from './util/html-plugin'
import uglifyPlugin from './util/uglify-plugin'
import baseWebpackConfig from './webpack.config.base'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

const productionConfig = merge(baseWebpackConfig, {
	output: {
		chunkFilename: '[name].js',
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			// these are webpack's defaults: https://webpack.js.org/plugins/split-chunks-plugin/
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: path.join(config.dllDir, `vendors.${process.env.NODE_ENV}.js`),
				to: path.join(config.buildDir, 'vendors.js'),
			},
			{
				from: path.join(config.dllDir, `vendors.${process.env.NODE_ENV}.js.gz`),
				to: path.join(config.buildDir, 'vendors.js.gz'),
			},
		]),
		htmlPlugin,
		uglifyPlugin,
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: '[id].css',
		}),
		// bundleAnalyzerPlugin,
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CompressionPlugin()
	],
})

export default productionConfig
