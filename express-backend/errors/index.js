const CustomError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unathenticated');
const NotFound = require('./not-found');

module.exports = { CustomError, BadRequestError, UnauthenticatedError, NotFound };