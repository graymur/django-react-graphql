import config from '../../src/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

export default [
	{
		test: /\.jsx?$/,
		loader: 'babel-loader',
		include: [config.srcDir],
		query: {
			cacheDirectory: true,
		},
	},
	{
		test: /\.scss$/,
		use: [
			mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader',
			'postcss-loader',
			'sass-loader',
		],
	},
	{
		test: /\.css$/,
		use: [
			mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader',
		],
	},
	{
		test: /\.(woff|woff2|ttf|eot)(\?\S*)?$/,
		use: 'file-loader?name=fonts/[name].[ext]',
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		use: [
			{
				loader: 'svg-url-loader?limit=4096&name=img/svg/[name].[ext]',
			},
		],
	},
	{
		test: /\.(png|jpg)$/,
		use: ['file-loader?name=img/[name].[ext]', 'img-loader'],
	},
	{
		test: /\.json$/,
		use: 'json-loader',
	},
	{
		test: /\.(graphql|gql)$/,
		exclude: /node_modules/,
		use: 'graphql-tag/loader',
	},
]
