import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { mergeTypes, fileLoader } from 'merge-graphql-schemas'
import resolvers from './resolvers'

const typesArray = fileLoader(path.join(__dirname, './graphql'))
const typeDefs = `
scalar JSON
${mergeTypes(typesArray)}
`

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

const delay = time => new Promise(resolve => setTimeout(() => resolve(), time))

export default graphqlExpress(async req => {
	const userId = 1

	console.log('GraphQL request')
	await delay(1000)

	return { schema, context: { userId } }
})
