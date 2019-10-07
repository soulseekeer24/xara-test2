'user strict';

function makeDeleteUser(companyRepository) {
	return function deleteUser(userEmail, companyId, workspaceId, callback) {
		companyRepository.deleteUserFromWorkspace(companyId, workspaceId, userEmail,
			onDeleteCallback(callback));
	};


	function onDeleteCallback(callback) {
		return function (err, result) {
			if (err) {
				//TODO: betters logs 
				console.log(err);
				return callback('something when wrong try again later');
			}
			if (result) {
				console.log(result);
				return callback(null, 'success');
			}
		};

	}
}



module.exports = makeDeleteUser;


