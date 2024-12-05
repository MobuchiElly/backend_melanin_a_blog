require('dotenv').config();
const { UnauthenticatedError, BadRequestError } = require("../errors");
const jwt = require('jsonwebtoken');


const usermiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')){
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
            console.log('');
        }
        next();
    }
    
}

module.exports = usermiddleware;