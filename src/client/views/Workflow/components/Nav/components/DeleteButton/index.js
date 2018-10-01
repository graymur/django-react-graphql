import React from 'react'
import Prompt from 'client/components/Prompt'
import { simpleWorkflows } from 'client/urls'
import WebappApiRequestProvider from 'client/utils/webapp-api-request-provider'

const renderButton = ({ openPrompt }) => (
	<span className="workflow__nav__item" onClick={openPrompt}>
		<span>Delete</span>
	</span>
)

const DeleteButton = ({ workflow, apiMethods, apiCallUnderWay }) => {
	const deleteText = `Are you sure you want to delete workflow "${
		workflow.short_description
	}"?`

	const deleteWf = () =>
		apiMethods.deleteWf(workflow._id).then(() => {
			window.location = simpleWorkflows()
		})

	return (
		<Prompt
			title="Delete workflow"
			sideEffectUnderWay={apiCallUnderWay}
			text={deleteText}
			onConfirm={deleteWf}
			render={renderButton}
		/>
	)
}

export default WebappApiRequestProvider(DeleteButton)
