var companyService = require('..//services/company-services');


function handleCreateCompanyRequest(req, res) {
	companyService.createCompany(req.body.displayName,
		function (err, result) {
			if (err) {
				return res.status(400).send({
					error: err,
					status: 400
				});
			}

			return res.send({
				payload: result,
				status: 200
			});
		});
}

function handleAddWorkspace(req, res) {
	var id = req.params['id'];
	companyService.addWorkspace(req.body.displayName, id,
		function (err, result) {
			if (err) {
				return res.status(400).send({
					error: err,
					status: 400
				});
			}
			return res.send({
				payload: result,
				status: 200
			});
		});
}


function handleUpdateCompany(req, res) {
	var id = req.params['id'];
	var newName = req.body.displayName;
	companyService.updateCompany(id, newName,
		function (err, result) {
			if (err) {
				return res.status(400).send({
					error: err,
					status: 400
				});
			}
			return res.send({
				payload: result,
				status: 200
			});
		});
}

function handleUpdateWorkspace(req, res) {
	var companyId = req.params['companyId'];
	var workspaceId = req.params['workspaceId'];
	var newName = req.body.displayName;
	companyService.updateWorkspace(companyId, workspaceId, newName,
		function (err, result) {
			if (err) {
				return res.status(400).send({
					error: err,
					status: 400
				});
			}
			return res.send({
				payload: result,
				status: 200
			});
		});
}

function handleAddUser(req, res) {
	var companyId = req.params['companyId'];
	var workspaceId = req.params['workspaceId'];
	var user = req.body;
	companyService.addUser(user, companyId, workspaceId,
		function (err, result) {
			if (err) {
				return res.status(400).send({
					error: err,
					status: 400
				});
			}
			return res.send({
				payload: result,
				status: 200
			});
		});
}


function handleDeleteUser(req, res) {
	var companyId = req.params['companyId'];
	var workspaceId = req.params['workspaceId'];
	var userEmail = req.params['userEmail'];
	companyService.deleteUser(userEmail, companyId, workspaceId,
		function (err, result) {
			if (err) {
				return res.status(400).send({
					error: err,
					status: 400
				});
			}
			return res.send({
				payload: result,
				status: 200
			});
		});
}

module.exports = {
	handleCreateCompanyRequest: handleCreateCompanyRequest,
	handleAddWorkspace: handleAddWorkspace,
	handleUpdateCompany: handleUpdateCompany,
	handleUpdateWorkspace: handleUpdateWorkspace,
	handleAddUser: handleAddUser,
	handleDeleteUser: handleDeleteUser,
};


