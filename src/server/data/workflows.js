const flatten = require('lodash/flatten')

module.exports = flatten([
	require('./workflows/bs_agent_billings_to_zoho-reports'),
	require('./workflows/convoso_agent_calltime_to_zoho_reports'),
	require('./workflows/mailchimp_subscribers_to_dotloop_people'),
	require('./workflows/dotloop_loop_dates_google_calendar'),
	require('./workflows/dotloop_to_google_sheets'),
	require('./workflows/google_sheets_people_to_dotloop'),
])
