import gql from 'graphql-tag'

export const workflowsQuery = gql`
	query {
		workflows {
			_id
			name
			short_description
		}
	}
`

export const workflowQuery = gql`
	query workflowQuery($id: String!, $name: String!) {
		workflow(id: $id, name: $name) {
			_id
			name
			is_enabled
			status
			short_description
			full_description
			cron_params
			connections
			about
			configuration
			config
			workflow
			saved_params
			apps {
				name
				full_name
			}
			connectionObjects {
				_id
				full_name
				name
				label
			}
		}
	}
`

export const appQuery = gql`
	query appQuery($name: String!) {
		app(name: $name) {
			name
			full_name
		}
	}
`

export const appsQuery = gql`
	query {
		apps {
			name
			full_name
		}
	}
`

export const logsQuery = gql`
	query logsQuery($triggerId: String!) {
		logs(triggerId: $triggerId) {
			items {
				_id
				trigger_id
				date
				message
				status
				workflow_run_id
			}
			last
		}
	}
`

export const subLogsQuery = gql`
	query sublogsQuery($triggerId: String!, $uid: String!) {
		sublogs(triggerId: $triggerId, uid: $uid) {
			items {
				_id
				date
				message
				status
				workflow_run_id
				data
			}
			last
		}
	}
`

export const brokermintInterfaceQuery = gql`
	query {
		connections(names: ["cn_bs", "cn_qbo", "cn_qbd"]) {
			_id
			name
		}
		bMInterfaceStoredValues {
			values
		}
	}
`
