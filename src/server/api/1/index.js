import express from 'express'

const router = express.Router()

router.use(
	'/connectors/apps/:appName/run_method/:methodName',
	require('./endpoints/connector-method').default,
)

router.post(
	'/connectors/workflows/:wfId/switch/',
	require('./endpoints/toggle-wf-active-state').default,
)

router.post(
	'/connectors/workflows/:wfId/start_now/',
	require('./endpoints/start-wf').default,
)

router.post(
	'/connectors/workflows/:wfId/params/',
	require('./endpoints/save-wf-params').default,
)

router.post(
	'/connectors/workflows/brokermint',
	require('./endpoints/brokermint-create-wf').default,
)

router.delete(
	'/connectors/workflows/:wfId/',
	require('./endpoints/delete-wf').default,
)

router.get('/users/auth/keys/', require('./endpoints/keys').default)

router.use('/graphql', require('./endpoints/graphql').default)

export default router
