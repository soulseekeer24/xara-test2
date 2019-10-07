'use strict';
var mongoose = require('../config');
var companySchema = require('../schemas').companySchema;
var buildCompany = require('../../domain/company');

var CompanyModel = mongoose.model('company', companySchema);


function findByName(companyName, callback) {
	CompanyModel.findOne({ name: companyName }, function (err, company) {
		if (err) {
			return callback(err);
		}
		if (company) {
			buildCompany(
				{
					_id: company._id,
					displayName: company.displayName,
					name: company.name,
					workspaces: company.workspaces
				}, function (errOnBuild, result) {
					if (errOnBuild) {
						return callback(errOnBuild);
					}

					return callback(null, result);
				}
			);
		} else {
			return callback(null, null);
		}
	});
}

function findById(id, callback) {
	CompanyModel.findOne({ _id: id }, function (err, company) {
		if (err) {
			return callback(err);
		}
		if (company) {
			buildCompany(
				{
					_id: company._id,
					displayName: company.displayName,
					name: company.name,
					workspaces: company.workspaces
				}, function (errOnBuild, result) {
					if (errOnBuild) {
						return callback(errOnBuild);
					}

					return callback(null, result);
				}
			);
		} else {
			return callback(null, null);
		}
	});
}

function save(company, callback) {
	CompanyModel.create(company, function (err, savedCompany) {
		if (err) {
			return callback(err);
		}
		buildCompany(
			{
				_id: savedCompany._id,
				displayName: savedCompany.displayName,
				name: savedCompany.name,
				workspaces: savedCompany.workspaces
			}, function (errOnBuild, result) {
				if (errOnBuild) {
					return callback(errOnBuild);
				}

				return callback(null, result);
			}
		);
	});
}



function findByWorkspaceAndId(companyId, workspaceId, callback) {

	CompanyModel.findOne({ '_id': companyId, 'workspaces._id': workspaceId }, function (err, company) {
		if (err) {
			return callback(err);
		} if (company) {
			buildCompany(
				{
					_id: company._id,
					displayName: company.displayName,
					name: company.name,
					workspaces: company.workspaces
				}, function (errOnBuild, result) {
					if (errOnBuild) {
						return callback(errOnBuild);
					}

					return callback(null, result);
				}
			);
		} else {
			return callback(null, null);
		}
	});

}

function findByWorkspaceAndIdAndUserEmail(companyId, workspaceId, email, callback) {

	CompanyModel.findOne({ '_id': companyId, 'workspaces._id': workspaceId, 'workspaces.users.email': email }, function (err, company) {
		if (err) {
			return callback(err);
		} if (company) {
			buildCompany(
				{
					_id: company._id,
					displayName: company.displayName,
					name: company.name,
					workspaces: company.workspaces
				}, function (errOnBuild, result) {
					if (errOnBuild) {
						return callback(errOnBuild);
					}

					return callback(null, result);
				}
			);
		} else {
			return callback(null, null);
		}
	});

}


function update(company, callback) {
	CompanyModel.updateOne({ _id: company._id }, company, function (err, savedCompany) {
		if (err) {
			return callback(err);
		}
		buildCompany(
			{
				_id: company._id,
				displayName: company.displayName,
				name: company.name,
				workspaces: company.workspaces
			}, function (errOnBuild, result) {
				if (errOnBuild) {
					return callback(errOnBuild);
				}

				return callback(null, result);
			}
		);
	});
}

//TODO: this method its married to the database i could do the same with the other but i like more
function deleteUserFromWorkspace(companyId, workspaceId, userEmail, callback) {
	CompanyModel.update({ '_id': companyId, 'workspaces._id': workspaceId },
		{
			$pull: { 'workspaces.$.users': { 'email': userEmail } }
		},
		function (err, result) {
			if (err) {
				return callback(err);
			}
			return callback(null, result);
		});
}

module.exports = {
	findById: findById,
	findByName: findByName,
	save: save, update: update,
	findByWorkspaceAndId: findByWorkspaceAndId,
	findByWorkspaceAndIdAndUserEmail: findByWorkspaceAndIdAndUserEmail,
	deleteUserFromWorkspace: deleteUserFromWorkspace,
};