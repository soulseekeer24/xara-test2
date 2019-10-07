
'use strict';
var mongoose = require('./config');
var Schema = mongoose.Schema;
var uuid = require('uuid/v1');
var schemas = {

	companySchema: new Schema({
		_id: {
			type: String,
			default: function () {
				return uuid();
			}
		},
		name: {
			type: String,
			index: true,
			unique: true
		},
		displayName: String,
		workspaces: [{
			_id: {
				type: String,
				index: true,
				default: function () {
					return uuid();
				}
			},
			name: {
				type: String,
				index: true,
			},
			displayName: String,
			users: [new Schema({
				email: {
					type: String,
					index: true,
				},
				role: String,
			}, { _id: false })]
		}]
	}, { _id: false })
};





module.exports = schemas;