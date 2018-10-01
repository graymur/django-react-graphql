const urlBase = process.env.SPA_URL_BASE
const assetsPath = process.env.SPA_ASSETS_PATH
const imgPath = process.env.IMG_URL_BASE

export const index = () => urlBase || ''

export const workflows = isProd => (isProd ? '/workflows' : `${index()}/workflows`)

export const workflow = (
	workflowName = ':workflowName',
	workflowId = ':workflowId',
) => `${workflows()}/${workflowName}/${workflowId}`
export const workflowConnections = workflow

export const workflowSettings = (
	workflowName = ':workflowName',
	workflowId = ':workflowId',
) => `${workflow(workflowName, workflowId)}/settings`

export const workflowLogs = (
	workflowName = ':workflowName',
	workflowId = ':workflowId',
) => `${workflow(workflowName, workflowId)}/logs`

export const apps = isProd => (isProd ? '/apps' : `${index()}/apps`)
export const app = (appName = ':appName') => `${apps()}/${appName}`

export const images = () => `${imgPath}`
export const image = path => `${images()}/${path}`

export const connectAppApi = ({
	appName,
	currentUrl = window.location,
	workflowId,
}) =>
	`/apps/${appName}/connect/?redirect_to=${encodeURIComponent(
		currentUrl,
	)}&workflow_id=${workflowId}`

export const simpleWorkflows = () => `${index()}/simple-syncs`
