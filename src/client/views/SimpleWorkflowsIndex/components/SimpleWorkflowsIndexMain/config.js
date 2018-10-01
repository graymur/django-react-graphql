export default [
	{
		id: 1,
		apps: [
			{
				name: 'cn_dotloop',
				full_name: 'Dotloop',
				entity: 'person',
			},
			{
				name: 'cn_mailchimp',
				full_name: 'MailChimp',
				entity: 'subscriber',
			},
		],
		description:
			'Sync contacts from Dotloop people address book as subscribers to a MailChimp list.',
	},
	{
		id: 2,
		apps: [
			{
				name: 'cn_dotloop',
				full_name: 'Dotloop',
				entity: 'participant',
			},
			{
				name: 'cn_mailchimp',
				full_name: 'MailChimp',
				entity: 'subscriber',
			},
		],
		description:
			'Sync loop participants from Dotloop loops as subscribers to a MailChimp list.',
	},
	{
		id: 3,
		apps: [
			{
				name: 'cn_mailchimp',
				full_name: 'MailChimp',
				entity: 'subscriber',
			},
			{
				name: 'cn_dotloop',
				full_name: 'Dotloop',
				entity: 'person',
			},
		],
		description:
			'Sync subscribers from a MailChimp list to a People address book in Dotloop.',
	},
	{
		id: 4,
		apps: [
			{
				name: 'cn_dotloop',
				full_name: 'Dotloop',
				entity: 'person',
			},
			{
				name: 'cn_google_sheets',
				full_name: 'Google Sheets',
				entity: 'person',
			},
		],
		description: 'Sync contacts from Dotloop people address book to Google Sheets',
	},
	{
		id: 5,
		apps: [
			{
				name: 'cn_dotloop',
				full_name: 'Dotloop',
				entity: 'participant',
			},
			{
				name: 'cn_google_sheets',
				full_name: 'Google Sheets',
				entity: 'person',
			},
		],
		description: 'Sync loop participants from Dotloop loops to Google Sheets',
	},
	{
		id: 6,
		apps: [
			{
				name: 'cn_google_sheets',
				full_name: 'Google Sheets',
				entity: 'person',
			},
			{
				name: 'cn_dotloop',
				full_name: 'Dotloop',
				entity: 'person',
			},
		],
		description: 'Sync contacts from Google Sheet into Dotloop People Address Book',
	},
]
