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

function get_active_tab() {
	return document.querySelector('div.md-tab.active');
}

function get_active_summary() {
	return document.querySelector('div.md-tab-content:not(.ng-hide)');
}

function apply_filter_to_bill(bill) {

}

function get_events() {	
	events.filter(function(event,index) {
		event.time; // 2016-03-27T23:44:47Z
		event.category; // transaction, transaction_reversed, bill_flow_paid
		event.description; // Amazon Web Services Aw
		event.amount; // 408
		event.id; // 56f8706f-cfdf-4d68-a25a-b39d8692a374
		event.title; // serviços
		event.details; // { fx, tags[], subcategory[card_not_present,card_present]}
	});

	var customer_id

	customer_id = angular.element($('html')[0]).scope().customer.id
	customer_id  = sessionStorage.getItem('user')


	var accessToken

	accessToken = angular.element($('html')[0]).scope().mapboxConfig.accessToken
	accessToken = sessionStorage.getItem('userToken');
}

function get_specific_events() {
	var url = 'https://prod-notification.nubank.com.br/api/contacts/'+customer_id+'/feed'
}