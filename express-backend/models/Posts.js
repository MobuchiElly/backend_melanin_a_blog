const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "blog title must be provided"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "blog content must be provided"],
      maxlength: 7500,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    }
    ,
    author: {
      type: String,
      trim: true,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        unique: true,
      },
    ],
    tags: [
      {
        type: String,
        maxLength: 100,         
      },
    ],
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
