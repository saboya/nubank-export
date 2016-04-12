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
			button.setAttribute('data-exporttype',name);
			button.classList.add('nu-button','stroke');
			button.innerHTML = 'Exportar '+name;
			billSummaries[i].appendChild(button);
		}
	}
}

window.addEventListener('click',(clickevent) => {
	if(clickevent.target.hasAttribute('data-exporttype')) {
		var bill_index = parseInt(clickevent.target.closest('div.md-tab-content').getAttribute('aria-labelledby').split('_')[1],36);
		var bill = _script_data.bills[_script_data.bills.length - bill_index];
		var events = _script_data.events;
		var exporttype = filters[clickevent.target.getAttribute('data-exporttype')];

		var data = exporttype.pre();

		for(let entry of bill.more.line_items) {
			if(typeof entry.id != 'undefined') {
				var extras;
				var item = {
					date: entry.post_date,
					title: entry.title,
					amount: entry.amount/100
				};
				if(typeof entry.href != 'undefined') {
					var event = events[entry.href.split('/').slice(-1)[0]];
					if(typeof event != 'undefined') {
						extras = {
							category: event.title,
							tags: event.details.tags,
							card_present: event.details.subcategory == "card_present"
						};
					}
				}

				data += exporttype.entry(item,extras);
			}
		}

		var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
		saveAs(blob,'nubank-'+bill.summary.due_date+'-'+clickevent.target.getAttribute('data-exporttype')+'.csv',false);
	}
});

window.addEventListener("message",(event) => {
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