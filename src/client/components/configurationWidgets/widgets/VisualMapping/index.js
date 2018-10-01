import React from 'react'
import PropTypes from 'prop-types'
import connectorMethodProvider from 'client/utils/connector-method-provider'
import Loader from 'client/components/Loader'
import classnames from 'classnames'
import ErrorMessages from './components/ErrorMessages'
import get from 'lodash/get'
import filter from 'lodash/filter'
import mappingToWfStep from './utils/maping-to-wf-steps'
import validateMapping from './utils/validate-mapping'
import createMappingConfig from './utils/create-mapper-config'
import './style.scss'

const Mapper =
	process.env.NODE_ENV === 'development'
		? require('client/components/Mapper').default
		: require('client/components/Mapper/loadable-component').default

export class VisualMapping extends React.Component {
	static propTypes = {
		connectorDataLoading: PropTypes.bool,
		connectorsFetchedData: PropTypes.array,
		config: PropTypes.object.isRequired,
		onChange: PropTypes.func,
	}

	state = {
		errors: undefined,
		config: undefined,
		connectorsFetchedData: undefined,
	}

	static getDerivedStateFromProps(props, state) {
		const {
			workflow,
			config,
			connectorsFetchedData,
			connectorsFetchedError,
			value,
		} = props

		const newState = {
			connectorsFetchedData: props.connectorsFetchedData,
		}

		// if connectorsFetchedData prop changes, build config for mapper
		if (connectorsFetchedData !== state.connectorsFetchedData) {
			const mapperConfig = createMappingConfig({
				workflow,
				entityConfigs: config,
				connectorsFetchedData,
				connectorsFetchedError,
			})

			// add config to state only of both apps are properly configured
			if (
				get(mapperConfig, 'apps[0].fields.length') &&
				get(mapperConfig, 'apps[1].fields.length')
			) {
				const mapping = get(props, 'value.mapping', [])
				newState.config = mapperConfig
				// show errors for initial mapper's state
				newState.errors = validateMapping(mapping, mapperConfig)

				// if there are validation error, call parent's onChange handler
				// to disable "Save" button
				// props.onChange(
				// 	props.name,
				// 	{
				// 		mapping,
				// 		wfSteps: [mappingToWfStep(mapping, mapperConfig.apps)],
				// 	},
				// 	newState.errors,
				// )
			} else {
				console.log("Mapper's config is not correct", mapperConfig)
			}
		}

		return newState
	}

	onChange = mapping => {
		const { config } = this.state
		const errors = validateMapping(mapping, config)

		if (this.state.errors !== errors) {
			this.setState({ errors })
		}

		console.log(
			'Mapping',
			JSON.stringify(mappingToWfStep(mapping, config.apps), null, 4),
		)

		this.props.onChange(
			this.props.name,
			{
				mapping,
				wfSteps: config ? [mappingToWfStep(mapping, config.apps)] : [],
			},
			errors,
		)
	}

	renderMapper() {
		const { config, errors } = this.state

		if (!config) {
			return null
		}

		return (
			<React.Fragment>
				<Mapper
					workflowId={this.props.workflow._id}
					initialConfig={config}
					storedMapping={get(this.props, 'value.mapping')}
					onChange={this.onChange}
				/>
				{errors && <ErrorMessages errors={errors} config={config} />}
			</React.Fragment>
		)
	}

	render() {
		const { connectorDataLoading } = this.props
		const classNames = classnames('mapper-wr', { loading: connectorDataLoading })

		return (
			<div className={classNames}>
				{connectorDataLoading ? <Loader /> : this.renderMapper()}
			</div>
		)
	}
}

/**
 * Some method requests may need additional params to return list of fields,
 * for example, MailChimp needs listId. In this case, prototype configuration
 * should have this shape:
 cn_mailchimp: {
		entityName: 'subscriber',
		appName: 'cn_gcal',
		fields: {
			params: ['listId'],
			method: 'cn_gcal.get_contact_prototype',
		}
	},
 * it's also expected that workflow config will have another widget that
 * will allow user to select MailChimp's list and listId will be stored
 * in workflow's "saved_params".
 *
 * Until user selects the list, we must check if wf has all the parameters
 * for a connector method call, and if not - not make HTTP call with
 * insufficient params, returning "false" instead of and "params" object
 * @param requestParams
 * @param savedParams
 */
const getParams = (requestParams, savedParams) =>
	requestParams.reduce((acc, param) => {
		const paramValue = savedParams[param]

		if (!paramValue) {
			console.log(`${param} is empty`)
			return false
		}

		return acc ? { ...acc, [param]: paramValue } : acc
	}, {})

export default connectorMethodProvider(VisualMapping, props => {
	return filter(props.config, (config, appName) => config.fields.method)
		.map(x => ({
			method: x.fields.method,
			params: getParams(
				x.fields.params || [],
				props.workflow.saved_params[x.appName] || {},
			),
		}))
		.filter(x => x.params !== false)
})
