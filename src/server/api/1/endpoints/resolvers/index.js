import flatten from 'lodash/flatten'
import dataSource from 'server/data-source'
import GraphQLJSON from 'graphql-type-json'
import Promise from 'bluebird'
import { cloneDeep } from 'lodash'

export default {
	JSON: GraphQLJSON,
	Query: {
		apps: () => dataSource.fetchApps(),
		app: (_, { name }) => dataSource.fetchApp(name),
		workflows: () => dataSource.fetchWorkflows(),
		workflow: (_, { name }) => dataSource.fetchWorkflow(name),
		connection: (_, { name }) => dataSource.fetchWorkflow(name),
		logs: (_, { triggerId }) => dataSource.fetchLogs(triggerId),
		sublogs: (_, { triggerId, uid }) => dataSource.fetchSubLogs(triggerId, uid),
		connections: (_, { names }) => {
			return [
				{
					_id: 1,
					name: 'cn_qbo',
				},
				{
					_id: 2,
					name: 'cn_bm',
				},
			]
		},
		bMInterfaceStoredValues: () => {
			return {
				values: {
					transactionStatus: 'statusNew',
					incomeExpense: 'expense',
					itemized: 'no',
					commissions_to_track: [],
				},
			}
		},
	},
	Mutation: {
		saveWorkflowConnections: async (_, { workflow, connections }) => {
			const workflows = await dataSource.fetchWorkflows()
			workflow = workflows.find(x => String(x._id) === String(workflow._id))

			const existingConnections = await dataSource.fetchAllConnections()

			const wf = cloneDeep(
				await dataSource.fetchWorkflow('docusign_rooms_dates_google_calendar'),
			)

			wf.config.cn_gcal.connect_id = '222'
			wf.config.cn_docusign.connect_id = '222'

			return wf
		},
		setWorkflowActiveState: async (_, { workflow, active }) => {
			console.log('SET WORKFLOW ACTIVE', active)

			const wf = cloneDeep(
				(await dataSource.fetchWorkflows()).find(x => x._id === workflow._id),
			)

			wf.status = active ? 'active' : 'pause'

			return wf
		},
		setWorkflowWidgetsGroup: async (_, { workflow, widgetsValues }) => {
			console.log('SAVE WORKFLOW VALUES', widgetsValues)

			const wf = cloneDeep(
				(await dataSource.fetchWorkflows()).find(x => x._id === workflow._id),
			)

			// wf.saved_params.cn_gcal.listId = '222'
			// wf.config.cn_gcal.saved_params.listId = '222'
			// wf.config.cn_gcal.connect_id = '222'
			// wf.config.cn_docusign.connect_id = '222'

			return wf
		},
		createDynamicWorkflow: async (_, { from, to }) => {
			console.log('CREATE DYNAMIC WORKFLOW FROM', from)
			console.log('CREATE DYNAMIC WORKFLOW TO', to)

			const wf = await dataSource.fetchWorkflow(
				'docusign_rooms_dates_google_calendar',
			)

			return wf
		},
		saveBIValues: async (_, { values }) => {
			console.log(values)
			return {
				_id: 1,
				values,
			}
		},
	},
	Workflow: {
		apps: workflow => workflow.connections.map(dataSource.fetchApp),
		connectionObjects: async (workflow, _, { userId }) =>
			flatten(
				await Promise.map(workflow.connections, appName =>
					dataSource.fetchConnections(appName, userId),
				),
			),
	},
}
