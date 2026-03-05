const { sendResponse, sendError } = require('./handleResponse');
const { checkModules } = require('./checkModules');
const { createPermission } = require('./createPermission');
// const { sendEmail } = require('./send');
const { generatePassword } = require('./generalHelpers');

module.exports = {
    sendResponse,
    sendError,
    checkModules,
    createPermission,
    // sendEmail,
    generatePassword
}