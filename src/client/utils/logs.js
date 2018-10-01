import { DateTime } from 'luxon'

export const joinTopLevelLogs = logs => {
	const logsByRunId = logs.reduce(function(acc, item) {
		const runId = item.workflow_run_id
		if (!acc[runId] || item.status === 'Fail') {
			acc[runId] = item
		}

		return acc
	}, {})

	return Object.values(logsByRunId)
}

export const addMessagesIfEmpty = logs =>
	logs.map(log => {
		const x = { ...log }
		// cn-qbd send some logs without a message, add message
		if (!x.message) {
			switch (x.status) {
				case 'Success':
					x.message = 'Workflow execution complete'
					break
				default:
					x.message = 'Workflow execution has failed'
			}
		}

		return x
	})

export const humanizeDate = logs =>
	logs.map(x => ({
		...x,
		date: DateTime.fromISO(x.date).toLocaleString(DateTime.DATETIME_MED),
	}))

// export default (logs = []) => {
// 	const logsByRunId = logs.reduce(function(acc, item) {
// 		const runId = item.workflow_run_id
// 		if (!acc[runId] || item.status === 'Fail') {
// 			acc[runId] = item
// 		}
//
// 		return acc
// 	}, {})
//
// 	const items = Object.values(logsByRunId)
// 		.map(log => {
// 			const x = { ...log }
// 			// cn-qbd send some logs without a message, add message
// 			if (!x.message) {
// 				switch (x.status) {
// 					case 'Success':
// 						x.message = 'Workflow execution complete'
// 						break
// 					default:
// 						x.message = 'Workflow execution has failed'
// 				}
// 			}
//
// 			x.date = DateTime.fromISO(x.date).toLocaleString(DateTime.DATETIME_MED)
//
// 			return x
// 		})
// 		.sort(function(a, b) {
// 			return a.date > b.date ? -1 : 1
// 		})
//
// 	// TODO: filter processed if this is not first loaded batch
// 	// if (logsPage > 1) {
// 	// 	items = items.filter(function (x) {
// 	// 		return x.status !== 'Processed';
// 	// 	})
// 	// }
//
// 	return items
// }
