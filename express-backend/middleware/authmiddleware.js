require('dotenv').config();
const { UnauthenticatedError, BadRequestError } = require("../errors");
const jwt = require('jsonwebtoken');

const authmiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('invalid token')
    }
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            name: payload.name,
            userId:payload.userId,
            email:payload.email,
            role:payload.role
        }
        
    } catch(err){
        throw new UnauthenticatedError('Invalid authentication');
    }
    next();
}

module.exports = authmiddleware;