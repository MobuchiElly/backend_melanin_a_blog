const express = require('express')
const {
    getComments,
    createComment,
    deleteComment,
    editComment, getComment,
    approveComment
} = require('../controllers/comments');
const adminmiddleware = require('../middleware/adminmiddleware');

const router = express.Router();
//Remember to ensure user cannot access comments that are not approved on the backend. Future update
router.route('/').get(getComments);
router.route('/:postId').post(createComment);
router.route('/:commentId').get(getComment).delete(adminmiddleware, deleteComment).patch(editComment);
router.route('/:commentId/approvecomment').put(adminmiddleware, approveComment);

module.exports = router;