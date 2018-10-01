import config from 'config'
import express from 'express'
import fs from 'fs'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'
import api from './api/1/index'

const app = express()
app.use(compression())
app.use(express.static(config.buildDir))
app.use('/api', bodyParser.json(), api)

const htmlTemplate = fs
	.readFileSync(path.join(config.buildDir, 'index.template.html'))
	.toString()

app.use('*', async (req, res) => {
	res.send(htmlTemplate)
})

app.listen(config.port, () => {
	console.log(`Listening at ${config.host}:${config.port}`)
})
