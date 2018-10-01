import fs from 'fs'
import path from 'path'

const files = fs.readdirSync(path.join(__dirname, 'connector-methods'))

module.exports = files.reduce(
	(acc, file) => ({
		...acc,
		[file.replace('.js', '')]: require(path.join(
			__dirname,
			'connector-methods',
			file,
		)),
	}),
	{},
)
