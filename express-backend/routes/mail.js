const express = require("express");
const sendMail = require("../controllers/mail");

const router = express.Router();

router.post("/", sendMail);

module.exports = router;