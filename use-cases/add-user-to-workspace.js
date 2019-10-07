'user strict';
var buildUser = require('../domain/user');

//TODO: , idGenerator
function makeAddUser(companyRepository) {
    return function addUser(userData, companyId, workspaceId, callback) {
        buildUser({
            email: userData.email,
            role: userData.role,
        }, onBuildUserCallback(callback, companyId, workspaceId));
    }

    function onBuildUserCallback(callback, companyId, workspaceId) {
        return function (err, userToAdd) {
            if (err) {
                return callback(err);
            }
            companyRepository.findByWorkspaceAndIdAndUserEmail(companyId, workspaceId, userToAdd.email,
                onFindCallback(userToAdd, companyId, workspaceId, callback));
        };
    }

    function onFindCallback(userToAdd, companyId, workspaceId, callback) {
        return function (errOnFind, company) {
            if (errOnFind) {
                //TODO: betters logs 
                console.log(errOnFind);
                return callback('something when wrong try again later');
            }
            if (company) {
                return callback(`Sorry that user already exist on this workspace`);
            } else {
                companyRepository.findByWorkspaceAndId(companyId, workspaceId,
                    onFindForUpdate(userToAdd, workspaceId, callback));
            }

        };
    }

    function onFindForUpdate(userToAdd, workspaceId, callback) {
        return function (errOnFind, company) {
            if (errOnFind) {
                //TODO: betters logs 
                console.log(errOnFind);
                return callback('something when wrong try again later');
            }
            if (company) {
                for (var i = 0; i < company.workspaces.length; i++) {
                    var workspaceTemp = company.workspaces[i];
                    if (workspaceTemp._id == workspaceId) {
                        workspaceTemp.users.push(userToAdd);
                        return companyRepository.update(company, onUpdateCompanyCallback(callback))
                    }
                }
            }
            //TODO: better logs
            console.log(`Sorry workspace or company not found`);
            return callback(`Sorry workspace or company not found`);
        };
    }
    function onUpdateCompanyCallback(callback) {
        return function (errOnSave, savedCompany) {
            if (errOnSave) {
                //TODO: betters logs 
                console.log('something wrong when saving entity into  database', errOnSave);
                return callback('something when wrong try again later');
            }
            return callback(null, savedCompany);
        };
    }
}


module.exports = makeAddUser;


