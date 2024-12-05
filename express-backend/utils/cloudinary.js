const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dxxunjcln",
    api_key: "221915534436377",
    api_secret: "TQcxEhCx1p8odtjC_tZuqQuVqm8"
});

module.exports = cloudinary;