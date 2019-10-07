var makeCreateCompany = require('../use-cases/create-company');
var makeAddWorkSpace = require('../use-cases/add-workspace');
var makeUpdateCompany = require('../use-cases/update-company');
var makeUpdateWorkspace = require('../use-cases/update-worspace');
var makeAddUser = require('../use-cases/add-user-to-workspace');
var makeDeleteUser = require('../use-cases/delete-user');

var companyRepository = require('../database/repositories/company-repository');

var createCompany = makeCreateCompany(companyRepository);
var addWorkspace = makeAddWorkSpace(companyRepository);
var updateCompany = makeUpdateCompany(companyRepository);
var updateWorkspace = makeUpdateWorkspace(companyRepository);
var addUser = makeAddUser(companyRepository);
var deleteUser = makeDeleteUser(companyRepository);
var companyService = Object.freeze(
	{
		createCompany: createCompany,
		addWorkspace: addWorkspace,
		updateCompany: updateCompany,
		updateWorkspace: updateWorkspace,
		addUser: addUser,
		deleteUser: deleteUser,
	}
);


module.exports = companyService;
