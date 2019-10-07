var express = require('express');
var companyController = require('./controller/company-controller');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config/config');



app.use(bodyParser.json());


app.post('/companies', function (req, res) {
	return companyController.handleCreateCompanyRequest(req, res);
});

app.patch('/companies/:id', function (req, res) {
	return companyController.handleUpdateCompany(req, res);
});

app.post('/companies/:id/workspaces', function (req, res) {
	return companyController.handleAddWorkspace(req, res);
});

app.patch('/companies/:companyId/workspaces/:workspaceId', function (req, res) {
	return companyController.handleUpdateWorkspace(req, res);
});

app.post('/companies/:companyId/workspaces/:workspaceId/users', function (req, res) {
	return companyController.handleAddUser(req, res);
});

app.delete('/companies/:companyId/workspaces/:workspaceId/users/:userEmail', function (req, res) {
	return companyController.handleDeleteUser(req, res);
});


app.listen(config.PORT, function () {
	console.log(`server started on port ${config.PORT}`);
});

module.exports = app;