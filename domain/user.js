'user strict';
function buildUser(userData, callback) {

	isValid(userData, function (err) {
		if (err) {
			return callback(err);
		}

		var user = Object.freeze({
			email: userData.email,
			role: userData.role,
		});

		return callback(null, user);
	});
}

/**VALIDATIONS */

function isValid(userData, callback) {
	console.log(userData)
	if (!validateEmail(userData.email)) {
		return callback('email must be valid');
	}

	if (userData.role != 'basic' && userData.role != 'admin') {
		return callback('role must be basic or admin');
	}

	return callback(null);
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

module.exports = buildUser;