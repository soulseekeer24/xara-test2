'user strict';
function buildWorkspace(workspaceData, callback) {

	workspaceData.displayName = workspaceData.displayName.trim();
	workspaceData.name = workspaceData.name.trim();

	isValid(workspaceData, function (err) {
		if (err) {
			return callback(err);
		}

		var workspace = Object.freeze({
			_id: workspaceData._id,
			displayName: workspaceData.displayName,
			name: workspaceData.displayName.toLowerCase(),
			users: []
		});

		return callback(null, workspace);
	});
}

/**VALIDATIONS */

function isValid(workspaceData, callback) {
	if (!workspaceData.displayName) {
		return callback('displayName must be empty');
	}

	if (workspaceData.displayName.toLowerCase() !== workspaceData.name) {
		return callback('displayName must be lower case version of name');
	}

	return callback(null);
}

module.exports = buildWorkspace;