const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    blogPostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    writer:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;