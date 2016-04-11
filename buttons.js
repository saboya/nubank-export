"use strict";

var _script_data = {
	userToken: '',
	userId: '',
	events: {},
	bills: []
};

function add_buttons() {
	var billSummaries = document.querySelectorAll('div.md-tab-content div.summary');
	for (var i = billSummaries.length-1; i >= 0; i--) {
		for (let name of Object.keys(filters)) {
			var button = document.createElement("button");
			button.setAttribute('data-exportfilter',name);
			button.classList.add('nu-button','stroke');
			button.innerHTML = 'Exportar YNAB4';
			billSummaries[i].appendChild(button);
		}
	}
}

window.addEventListener('click',function(event) {
	if(event.target.hasAttribute('data-exportfilter')) {
		var bill_index = parseInt(event.target.closest('div.md-tab-content').getAttribute('aria-labelledby').split('_')[1],16);
		var bill = _script_data.bills[_script_data.bills.length - bill_index];
		var data = filters[event.target.getAttribute('data-exportfilter')](bill);

		var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
		saveAs(blob,'nubank-'+bill.summary.due_date+'.csv',false);
	}
});

window.addEventListener("message", function(event) {
	// We only accept messages from ourselves
	if (event.source != window) {
		return;
	}

	if (event.data.type) {
		switch(event.data.type) {
			case "EVENTS_FROM_PAGE":
				for (var event of event.data.events) {
					_script_data.events[event.id] = event;
				}
				break;
			case "BILLS_READY":
				_script_data.bills = event.data.bills;
				add_buttons();
				break;
			case "CREDENTIALS_FROM_PAGE":
				_script_data.userToken = obj.data.userToken;
				_script_data.userId = obj.data.userId;
				break;
		}
	}
}, false);