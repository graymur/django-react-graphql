import get from 'lodash/get'
import customModifiers from './app-dependent-modifiers'
import partialRight from 'lodash/partialRight'
import flow from 'lodash/flow'

const defaultModifier = x => x

const getAppFields = ({
	appName,
	entityConfigs,
	connectorsFetchedData,
	connectorsFetchedError,
}) => {
	// const fromModifier
	if (Array.isArray(entityConfigs[appName].fields)) {
		return entityConfigs[appName].fields
	}

	const fetchedResult = connectorsFetchedData.find(
		result => result.method === get(entityConfigs, `[${appName}].fields.method`),
	)

	if (fetchedResult && fetchedResult.error) {
		console.error(fetchedResult.error.response)
	}

	return fetchedResult && fetchedResult.result ? fetchedResult.result : []
}

export default ({
	workflow,
	entityConfigs,
	connectorsFetchedData,
	connectorsFetchedError,
}) => {
	// create custom modifiers functions, which will be passed created config, config and apps
	// params and will be able to modify config code if necessary
	const [fromAppName, toAppName] = workflow.connections
	const fromModifierName = `${fromAppName}-${
		entityConfigs[fromAppName].entityName
	}-trigger`
	const toModifierName = `${toAppName}-${entityConfigs[toAppName].entityName}-action`

	const fromModifier = partialRight(
		customModifiers[fromModifierName] || defaultModifier,
		workflow,
		entityConfigs,
	)

	const toModifier = partialRight(
		customModifiers[toModifierName] || defaultModifier,
		workflow,
		entityConfigs,
	)

	const mapperConfig = {
		apps: workflow.connections.map(appName => {
			return {
				entityConfig: entityConfigs[appName],
				info: {
					appName: entityConfigs[appName].appName,
					entityName: entityConfigs[appName].entityName,
					...workflow.apps.find(app => app.name === appName),
				},
				// if app's fields list is defined in "fields" list of widget's config, use it.
				// If "method" field is defined instead, make HTTP request to /runmethod to fetch
				// fields config from lambda:
				/*
				 Extract from workflow's config:

				 config: {
				 cn_docusign: {
				 fields: [... fields config ...]
				 },
				 cn_gcal: {
				 method: 'lambda_name',
				 },
				 },
				 */
				fields: getAppFields({
					appName,
					entityConfigs,
					connectorsFetchedData,
					connectorsFetchedError,
				}),
			}
		}),
	}

	return flow(
		fromModifier,
		toModifier,
	)(mapperConfig)
}
