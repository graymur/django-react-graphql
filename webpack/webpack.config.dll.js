import path from 'path'
import webpack from 'webpack'
import config from '../src/config'
import uglifyPlugin from './util/uglify-plugin'
import defaultLoaders from './util/default-loaders'
import CompressionPlugin from 'compression-webpack-plugin'

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

const dllConfig = {
	mode,
	entry: {
		vendors: [path.join(config.clientDir, 'vendors')],
		styles: [path.join(config.clientDir, 'styles')],
	},
	output: {
		path: config.dllDir,
		filename: `[name].${mode}.js`,
		library: '[name]',
	},
	module: {
		rules: defaultLoaders,
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(config.dllDir, `[name]-${mode}-manifest.json`),
			name: '[name]',
			context: config.srcDir,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(mode),
			},
		}),
	],
}

if (process.env.NODE_ENV === 'production') {
	dllConfig.optimization = {
		minimizer: [uglifyPlugin],
	}

	dllConfig.plugins.push(new CompressionPlugin())
}

export default dllConfig
