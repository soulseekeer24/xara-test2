'user strict';
var buildWorkspace = require('../domain/workspace');

//TODO: , idGenerator
function makeAddWorkSpace(companyRepository) {
    return function addWorkspace(workspaceName, companyId, callback) {
        buildWorkspace({
            id: null,
            name: workspaceName.toLowerCase(),
            displayName: workspaceName,
        }, onBuildWorkspaceCallback(callback, companyId));
    }

    function onBuildWorkspaceCallback(callback, companyId) {
        return function (err, workspaceToSave) {
            if (err) {
                return callback(err);
            }
            console.log(workspaceToSave)
            companyRepository.findById(companyId, onFindByIdCallback(companyId, workspaceToSave, callback));
        };
    }

    function onFindByIdCallback(companyId, workspaceToSave, callback) {
        return function (errOnFind, company) {
            if (errOnFind) {
                //TODO: betters logs 
                console.log(errOnFind);
                return callback('something when wrong try again later');
            }
            if (company) {
                return company.addWorkspace(workspaceToSave, onAddWorkSpaceCallback(callback));
            }
            //TODO: better logs
            console.log(`Sorry company with id: '${companyId}', not found`);
            return callback(`Sorry company with id: '${companyId}', not found`);
        };
    }

    function onAddWorkSpaceCallback(callback) {
        return function (errAddingWorkspace, companyUpdated) {
            if (errAddingWorkspace) {
                //TODO: betters logs 
                console.log(errAddingWorkspace);
                return callback(errAddingWorkspace);
            }
            companyRepository.update(companyUpdated, onSaveCompanyCallback(callback));
        };
    }

    function onSaveCompanyCallback(callback) {
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


module.exports = makeAddWorkSpace;


