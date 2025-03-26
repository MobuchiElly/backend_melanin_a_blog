const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");
const usermiddleware = require("../middleware/usermiddleware");
const {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
  addLike,
  deleteLike,
} = require("../controllers/blogs");
const app = express();
const router = express.Router();
const upload = require("../middleware/multer");

// routes
router.route("/").get(getAllPosts).post(authmiddleware, adminmiddleware, createPost);
router.route("/:postId").get(getPost);
router.route("/:postId").patch(authmiddleware, adminmiddleware, editPost).delete(authmiddleware,adminmiddleware, deletePost);
router.route("/:postId/likes").post(authmiddleware,addLike).delete(authmiddleware, deleteLike);


module.exports = router;