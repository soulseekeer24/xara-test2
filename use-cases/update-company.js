'user strict';
var buildCompany = require('../domain/company');

function makeUpdateCompany(companyRepository) {
    return function updateCompany(companyId, newCompanyName, callback) {
        buildCompany({
            _id: companyId,
            name: newCompanyName.toLowerCase(),
            displayName: newCompanyName,

        }, onBuildCompanyCallback(callback));
    }

    function onBuildCompanyCallback(callback) {
        return function (err, companyToSave) {
            if (err) {
                return callback(err);
            }
            companyRepository.findById(companyToSave._id, onFindByIdCallback(companyToSave, callback));
        };
    }

    function onFindByIdCallback(companyToSave, callback) {
        return function (errOnFind, company) {
            if (errOnFind) {
                //TODO: betters logs 
                console.log(errOnFind);
                return callback('something when wrong try again later');
            }
            if (company) {
                return companyRepository.findByName(companyToSave.name,
                    onFindByNameCallback(company.withName(companyToSave.displayName), callback))
            }
            //TODO: better logs
            console.log(`Sorry company with id: '${companyToSave._id}', not found`);
            return callback(`Sorry company with id: '${companyToSave._id}', not found`);
        };
    }


    function onFindByNameCallback(companyToSave, callback) {
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
            companyRepository.update(companyToSave, onUpdateCompanyCallback(callback));
        };
    }

    function onUpdateCompanyCallback(callback) {
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


module.exports = makeUpdateCompany;


