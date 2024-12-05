const { CustomError } = require("../errors");

const errorHandlerMiddleware = async (err, req, res) => {
    console.log('errorhandlermiddleware says:', err);
    if (err instanceof CustomError){
        return res.status(err.statusCode).json({msg:err})
    }
    if (err.code === 11000){
      return res.status(500).json('The email address already exists')
    }
    if (err.name == 'CastError'){
      return res.status(500).json('Cast error');
    }
    return res.status(500).json({msg: err});
};

module.exports = errorHandlerMiddleware;
