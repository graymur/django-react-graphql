import path from 'path'
import {} from './env'

const basePath = path.dirname(__dirname)

export default {
	srcDir: basePath,
	serverDir: path.resolve(path.join(basePath, 'server')),
	clientDir: path.resolve(path.join(basePath, 'client')),
	buildDir: path.resolve(
		path.join(basePath, process.env.SPA_BUILD_PATH || '../build'),
	),
	assetsPath: process.env.SPA_ASSETS_PATH || '/',
	dllDir: path.resolve(path.join(__dirname, '/../../node_modules/_dll')),
	port: process.env.SPA_PORT || 3111,
	host: 'localhost',
}
