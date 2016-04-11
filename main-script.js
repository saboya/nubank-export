"use strict";

var filters = {
	'YNAB4': function(bill) {
		// Date,Payee,Category,Memo,Outflow,Inflow
		var lines = [];
		lines.push("Date,Payee,Category,Memo,Outflow,Inflow");
		for(let entry of bill.more.line_items) {
			if(typeof entry.id != 'undefined') {
				var date = '"'+entry.post_date+'"';
				var payee = '"'+entry.title+'"';
				var category = '';
				var memo = '';
				var outflow = '';
				var inflow = '';
				if(entry.amount >= 0) {
					outflow = entry.amount/100;
				}
				else {
					inflow = -entry.amount/100;
				}
				lines.push([date,payee,category,memo,outflow,inflow].join(','));
			}
		}

		return lines.join("\n");
	}
}
