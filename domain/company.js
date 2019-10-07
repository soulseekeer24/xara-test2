'user strict';
function buildCompany(companyData, callback) {
	companyData.displayName = companyData.displayName.trim();
	companyData.name = companyData.name.trim();

	isValid(companyData, function (err) {
		if (err) {
			return callback(err);
		}

		var company = Object.freeze({
			_id: companyData._id,
			displayName: companyData.displayName,
			name: companyData.displayName.toLowerCase(),
			workspaces: companyData.workspaces,
			addWorkspace: function addWorkspace(workspace, callback) {
				if (this.workspaces == undefined || this.workspaces == null) {
					this.workspaces = [];
				}
				for (var i = 0; i < this.workspaces.length; i++) {
					var workspaceTemp = this.workspaces[i];
					if (workspaceTemp.name == workspace.name) {
						return callback('Sorry duplicated workspace name');
					}
				}
				this.workspaces.push(workspace);
				return callback(null, this);
			},
			withName: function (displayName) {
				return Object.freeze({
					_id: this._id,
					name: displayName.toLowerCase(),
					displayName: displayName,
					addWorkspace: this.addWorkspace,
					withName: this.withName,
					workspaces: this.workspaces
				});
			}
		});

		return callback(null, company);
	});
}


/**VALIDATIONS */

function isValid(companyData, callback) {
	if (!companyData.displayName) {
		return callback('displayName must be empty');
	}

	if (companyData.displayName.toLowerCase() !== companyData.name) {
		return callback('displayName must be lower case version of name');
	}

	return callback(null);
}

module.exports = buildCompany;