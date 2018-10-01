import config from 'config'
import opener from 'opener' // eslint-disable-line
import express from 'express'
import path from 'path'
import fs from 'fs'
import ejs from 'ejs'
import bodyParser from 'body-parser'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import api from './api/1/index'
import webpackConfig from '../../webpack/webpack.config.dev'

const app = express()

app.use('/node_modules', express.static(path.join(__dirname, '/../../node_modules')))
app.use('/img', express.static(path.join(__dirname, '/../../src/img')))
app.use('/api', bodyParser.json(), api)
app.post('/apps/:appName/connect', require('./api/1/endpoints/connect-app').default)

const compiler = webpack(webpackConfig)

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		quiet: true,
		stats: { colors: true },
		serverSideRender: true,
	}),
)

app.use(webpackHotMiddleware(compiler))

const htmlTemplate = fs.readFileSync('./src/server/views/index.ejs').toString()

app.get('/favicon.ico', (req, res) => res.send(''))

app.use(async (req, res) => {
	try {
		console.log(req.originalUrl || req.url)

		let assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
		// depending on webpack's devtool "main" field might be an array of object or
		// an object. If it's the latter, convert it to array
		if (!Array.isArray(assetsByChunkName.main)) {
			assetsByChunkName.main = [assetsByChunkName.main]
		}

		let html = ejs.render(htmlTemplate, {
			htmlWebpackPlugin: {
				options: { env: process.env.NODE_ENV },
			},
			webpackConfig,
			cssFiles: assetsByChunkName.main.filter(path => path.endsWith('.css')),
			jsFiles: assetsByChunkName.main.filter(path => path.endsWith('.js')),
		})

		res.send(html)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.toString())
	}
})

const server = app.listen(config.port, () => {
	console.log(`Listening at ${config.host}:${config.port}`)
	// opener(`http://${config.host}:${config.port}`)
})

const signals = ['SIGINT', 'SIGTERM']

signals.forEach(function(sig) {
	process.on(sig, function() {
		server.close()
		process.exit()
	})
})
