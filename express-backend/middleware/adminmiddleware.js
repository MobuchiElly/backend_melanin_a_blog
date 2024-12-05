const { UnauthenticatedError, BadRequestError } = require("../errors");

const authmiddleware = async(req, res, next) => {
    try{
        if(req.user.role !== 'admin'){
            throw new UnauthenticatedError('Unauthorized for this action');
        }
    } catch(err){
        throw new UnauthenticatedError('Unauthorized for this action');
    }
    next();
}

module.exports = authmiddleware;