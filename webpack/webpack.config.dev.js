import path from 'path'
import webpack from 'webpack'
import config from '../src/config'
import merge from 'merge-deep'

import baseWebpackConfig from './webpack.config.base'

baseWebpackConfig.entry = [
	'react-hot-loader/patch',
	'webpack-hot-middleware/client',
	'webpack/hot/dev-server',
	baseWebpackConfig.entry.app,
]

const developmentConfig = merge(baseWebpackConfig, {
	devtool: 'eval-source-map',
	output: {
		filename: 'app.js',
		publicPath: '/',
		path: process.cwd(),
	},
	module: {
		rules: [],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.DllReferencePlugin({
			context: config.srcDir,
			manifest: require(path.join(
				config.dllDir,
				`styles-${process.env.NODE_ENV}-manifest.json`,
			)),
		}),
	],
})

// remove 'postcss-loader' from dev config
developmentConfig.module.rules = developmentConfig.module.rules.map(
	rule =>
		rule.use && Array.isArray(rule.use)
			? Object.assign({}, rule, {
					use: rule.use.filter(x => x !== 'postcss-loader'),
			  })
			: rule,
)

export default developmentConfig
