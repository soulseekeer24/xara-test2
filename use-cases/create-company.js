'user strict';
var buildCompany = require('../domain/company');

function makeCreateCompany(companyRepository) {
	return function createCompany(name, callback) {
		buildCompany({
			name: name.toLowerCase(),
			displayName: name,
		}, onBuildCompanyCallback(callback));
	};

	function onBuildCompanyCallback(callback) {
		return function (err, companyToSave) {
			if (err) {
				return callback(err);
			}
			companyRepository.findByName(companyToSave.name, onFindByNameCallback(callback, companyToSave));
		};
	}

	function onFindByNameCallback(callback, companyToSave) {
		return function (errOnFind, company) {
			if (errOnFind) {
				//TODO: betters logs 
				console.log(errOnFind);
				return callback('something when wrong try again later');
			}
			if (company) {
				//TODO: better logs
				console.log(`duplicated company with name : ${companyToSave.name}, already exist`);
				return callback(`Sorry, a company with name : ${companyToSave.name}, already exist`);
			}
			companyRepository.save(companyToSave, onSaveCompanyCallback(callback));
		};
	}

	function onSaveCompanyCallback(callback) {
		return function (errOnSave, savedCompany) {
			if (errOnSave) {
				//TODO: betters logs 
				console.log('something wrong when saving entity into  database => ', errOnSave);
				return callback('something when wrong try again later');
			}
			return callback(null, savedCompany);
		};
	}
}


module.exports = makeCreateCompany;


