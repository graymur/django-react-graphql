const apiBase = process.env.API_BASE_URL

const workflows = require('./data/workflows')
const apps = require('./data/apps')
const connections = require('./data/connections')
const logs = require('./data/logs')
const sublogs = require('./data/sublogs')
const connectorMethods = require('./data/connector-methods')

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
	fetchWorkflows: async () => Promise.resolve(workflows),
	fetchWorkflow: async workflowName =>
		Promise.resolve(workflows.find(x => x.name === workflowName)),
	fetchApps: async () => Promise.resolve(apps),
	fetchApp: async appName => Promise.resolve(apps.find(x => x.name === appName)),
	fetchConnection: async (appName, userId) =>
		Promise.resolve(
			connections.find(x => x.user_id === userId && x.name === appName),
		),
	fetchConnections: async (appName, userId) =>
		Promise.resolve(
			connections
				.filter(x => x.user_id === userId && x.name === appName)
				.sort((a, b) => (a.label > b.label ? 1 : -1)),
		),
	fetchAllConnections: async (appName, userId) => Promise.resolve(connections),
	fetchLogs: async (appName, userId) =>
		Promise.resolve({
			items: logs.items.slice(0, getRandomInt(1, logs.items.length - 1)),
			last: logs.last,
		}),
	fetchSubLogs: async (appName, userId) =>
		Promise.resolve({
			items: sublogs.items
				.slice(0, getRandomInt(1, sublogs.items.length - 1))
				.map(x => ({
					...x,
					data:
						'{"invoice": {"AllowOnlineACHPayment": false, "domain": "QBO", "CurrencyRef": {"type": "", "name": "United States Dollar", "value": "USD"}, "ShipDate": "", "TrackingNum": "", "PrintStatus": "NotSet", "BillEmail": {"Address": "rahulbtibusiness@gmail.com"}, "DeliveryInfo": {"DeliveryType": "Email", "DeliveryTime": "2018-08-20T05:36:34-07:00"}, "GlobalTaxCalculation": "TaxExcluded", "TotalAmt": 12.0, "Line": [{"LinkedTxn": [], "Description": "Monthly unlimited text messaging subscription to mobile phones in US & Canada.", "DetailType": "SalesItemLineDetail", "SalesItemLineDetail": {"TaxInclusiveAmt": 0, "ItemRef": {"type": "", "name": "Messaging:Unlimited Text - US & Canada", "value": "137"}, "Qty": 1, "TaxCodeRef": {"type": "", "name": "", "value": "NON"}, "ServiceDate": "2018-08-20", "ClassRef": {"type": "", "name": "AllDayText", "value": "5000000000000080781"}, "UnitPrice": 12}, "LineNum": 1, "Amount": 12.0, "CustomField": [], "Id": "4"}, {"LinkedTxn": [], "SubTotalLineDetail": {}, "DetailType": "SubTotalLineDetail", "LineNum": 0, "Amount": 12.0, "CustomField": []}], "DueDate": "2018-08-30", "ApplyTaxAfterDiscount": false, "DocNumber": "1271", "PrivateNote": "Subscription: T00004", "sparse": false, "CustomerMemo": {"value": "Invoice for Hemant Singh, subscription T00004. \\n\\nThe amount due will be charged to your payment method on file on the renewal date. No payment is due at this time. You can contact us at http://www.intouchcall.com or (206) 889-5644"}, "Deposit": 0, "Balance": 12.0, "CustomerRef": {"type": "", "name": "Bianca Breckenridge (Hemant Singh - 52364-484)", "value": "229"}, "TxnTaxDetail": {"TotalTax": 0, "TaxLine": []}, "AllowOnlineCreditCardPayment": false, "SyncToken": "3", "LinkedTxn": [], "ExchangeRate": 1, "entity_code": "Hemant Singh (52364-484), text subscription T00004, 2018-08-30", "TxnDate": "2018-08-20", "EmailStatus": "NeedToSend", "BillAddr": {"PostalCode": "160055", "City": "Mohali", "Country": "", "Line5": "", "Line4": "", "Line3": "", "Line2": "", "Line1": "Sector 82", "Note": "", "Lat": "", "Long": "", "CountrySubDivisionCode": "Punjab", "Id": "140"}, "MetaData": {"CreateTime": "2018-08-20T05:36:32-07:00", "LastUpdatedTime": "2018-08-20T06:06:02-07:00"}, "CustomField": [{"DefinitionId": "1", "StringValue": "", "Type": "StringType", "Name": "Crew #"}], "Id": "382", "AllowOnlinePayment": false, "AllowIPNPayment": true}}',
				})),
		}),
	connectorMethod: async (methodName, options) =>
		Promise.resolve(connectorMethods[methodName](options)),
}
