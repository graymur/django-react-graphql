import path from 'path'
import webpack from 'webpack'
import config from '../src/config'

import defaultLoaders from './util/default-loaders'

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

export default {
	mode,
	cache: true,
	entry: {
		app: path.join(config.clientDir, 'index.js'),
	},
	output: {
		path: config.buildDir,
		filename: '[name].js',
		publicPath: config.assetsPath,
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: config.srcDir,
			manifest: require(path.join(
				config.dllDir,
				`vendors-${
					process.env.NODE_ENV === 'development' ? 'development' : 'production'
				}-manifest.json`,
			)),
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				SPA_API_BASE_URL: JSON.stringify(process.env.SPA_API_BASE_URL),
				WEBAPP_API_BASE_URL: JSON.stringify(process.env.WEBAPP_API_BASE_URL || ''),
				SPA_URL_BASE: JSON.stringify(process.env.SPA_URL_BASE || ''),
				SPA_ASSETS_PATH: JSON.stringify(process.env.SPA_ASSETS_PATH || ''),
				IMG_URL_BASE: JSON.stringify(process.env.IMG_URL_BASE || ''),
			},
		}),
	],
	module: {
		rules: defaultLoaders,
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx'],
		alias: {
			style: path.join(config.srcDir, 'style'),
			img: path.join(config.srcDir, 'img'),
			fonts: path.join(config.srcDir, 'fonts'),
			fetch: 'whatwg-fetch',
		},
	},
}
