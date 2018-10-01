import React from 'react'
import PropTypes from 'prop-types'
import LogsItem from '../LogsItem'
import SubLogs from '../SubLogs'

export default class TopLevelLogsItem extends React.Component {
	static propTypes = {
		log: PropTypes.object,
	}

	state = { sublogsActive: false }

	toggleSublogs = () => {
		this.setState({ sublogsActive: !this.state.sublogsActive })
	}

	render() {
		const { trigger_id, workflow_run_id } = this.props.log

		return (
			<React.Fragment>
				<LogsItem {...this.props} onClick={this.toggleSublogs} />
				{this.state.sublogsActive && (
					<SubLogs triggerId={trigger_id} uid={workflow_run_id} />
				)}
			</React.Fragment>
		)
	}
}
