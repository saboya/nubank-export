"use strict";


var filters = {
	'CSV': {
		_delim: ',',
		_tags_delim: ';',
		_quote: '"',
		pre: (separator) => {
			return ["Date","Payee","Category","Tags","Amount"].join(filters['CSV']._delim)+"\n";
		},
		entry: (item,extra) => {
			return [
				item.date,
				item.title,
				extra ? extra.category : '',
				extra ? extra.tags.join(filters['CSV']._tags_delim) : '',
				item.amount
			].map((value) => { return filters['CSV']._quote+value+filters['CSV']._quote}).join(filters['CSV']._delim)+"\n";
		}
	},
	'YNAB4': {
		_delim: ',',
		_quote: '"',
		pre: (separator) => {
			return ["Date","Payee","Category","Memo","Outflow","Inflow"].join(filters['YNAB4']._delim)+"\n";
		},
		entry: (item,extra) => {
			return [
				item.date,
				item.title,
				extra ? extra.category : '',
				'',
				item.amount >= 0 ? item.amount : '',
				item.amount < 0 ? -item.amount : ''
			].map((value) => { return filters['YNAB4']._quote+value+filters['YNAB4']._quote}).join(filters['YNAB4']._delim)+"\n";
		}
	}
}