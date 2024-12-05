const connectDb = require("../db/connection");
require("express-async-errors");
const express = require("express");
require("dotenv").config();
const blogRouter = require("../routes/blogs");
const authRouter = require("../routes/auth");
const commentRouter = require("../routes/comments");
const mailRouter = require("../routes/mail");
const authmiddleware = require("../middleware/authmiddleware");
const cors = require("cors");
const NotFound = require("../middleware/Not-found");
const errorHandlerMiddleware = require("../middleware/errorhandlermiddleware");
const adminMiddleware = require("../middleware/adminmiddleware");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);
app.use(
  "/api/v1/comments",
  authmiddleware,
  commentRouter
);
app.use("/api/v1/mail", mailRouter);
app.use(NotFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const startup = async () => {
  try {
    const conn = await connectDb()
      .then(() => console.log("Connected to Db"))
      .catch((err) => console.log(err));
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
startup();

module.exports = app;