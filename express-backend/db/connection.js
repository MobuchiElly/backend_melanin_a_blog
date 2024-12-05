const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
// if (!uri){
//   throw new Error('Please define the MONGO_URI variable in the env file');
// }
// let cached = global.mongoose;

// if(!cached){

// }

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(uri);
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;