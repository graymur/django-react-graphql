import config from '../../src/config'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default new HtmlWebpackPlugin({
	inject: true,
	// env will be available in index.ejs as htmlWebpackPlugin.options.env
	env: process.env.NODE_ENV,
	hash: true,
	filename: 'index.template.html',
	template: path.join(config.serverDir, '/views/index.ejs'),
})
