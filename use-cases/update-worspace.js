'user strict';
var buildCompany = require('../domain/company');

function makeUpdateWorkspace(companyRepository) {
    return function updateWorkspace(companyId, workspaceId, newName, callback) {
        return companyRepository.findByWorkspaceAndId(companyId, workspaceId,
            onFindByIdCallback(workspaceId, newName, callback));
    }
    function onFindByIdCallback(workspaceId, newName, callback) {
        return function (errOnFind, company) {
            if (errOnFind) {
                //TODO: betters logs 
                console.log(errOnFind);
                return callback('something when wrong try again later');
            }
            if (company) {
                var lowerCaseName = newName.toLowerCase();
                for (var i = 0; i < company.workspaces.length; i++) {
                    var workspaceTemp = company.workspaces[i];
                    if (workspaceTemp.name == lowerCaseName && workspaceTemp._id != workspaceId) {
                        return callback('Sorry duplicate workspace on this company');
                    }
                    if (workspaceTemp._id == workspaceId) {
                        // if (workspaceTemp.name == lowerCaseName) {
                        //     return callback(null, )
                        // }
                        workspaceTemp.name = lowerCaseName;
                        workspaceTemp.displayName = newName;
                    }
                }
                return companyRepository.update(company, onUpdateCompanyCallback(callback))
            }
            //TODO: better logs
            console.log(`Sorry company with id: '${companyToSave._id}', not found`);
            return callback(`Sorry company with id: '${companyToSave._id}', not found`);
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


module.exports = makeUpdateWorkspace;


