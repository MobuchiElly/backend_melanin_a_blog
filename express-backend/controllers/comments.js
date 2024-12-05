const { BadRequestError } = require("../errors/index.js");
const NotFoundError = require("../errors/not-found");
const Comment = require("../models/Comments");
const Post = require("../models/Posts");


const getComments = async (req, res) => {
  const approved = req.query.approved;
  if(approved){
    if(approved && approved === 'false'){
      const pendingComments = await Comment.find({
        approved:false
      }).sort({createdAt:-1}).populate('blogPostId').exec();
      return res.status(200).json(pendingComments);
    } else if(approved && approved === 'true'){
      const approvedComments = await Comment.find({
        approved:true
      }).sort({updatedAt:-1}).populate("blogPostId").exec();
      return res.status(200).json(approvedComments);
    } else {
      throw new BadRequestError('No comment with such approved status');
    }
  }  
  //would implement filter, sorting based on date and othe features
  res.status(200).json("Get all Comments, sorting, limiting, skipping and all");
};

const approveComment = async (req, res) => {
    const {commentId} = req.params;
    const {approved} = req.body;

    if(!approved){
      throw new BadRequestError("approval status must be provided in the request body");
    }
    if(!commentId){
        throw new BadRequestError("commentId must be provided");
    }
    const comment = await Comment.findByIdAndUpdate(commentId, {...req.body}, {new:true})
    if(!comment){
        throw new NotFoundError(`No id found with id ${commentId}`);
    }
    res.status(201).json(comment);
};

const createComment = async (req, res) => {
  const {userId: createdBy, name:writer} = req.user;
  const {postId:blogPostId} = req.params;
  const { content } = req.body;
  
  if (!content || !blogPostId) {
    throw new NotFoundError("Content and postId must be provided");
  }
  const comment = await Comment.create( {content, createdBy, blogPostId, writer});
  if(!comment){
    throw new BadRequestError('Unable to create post');
  };
  const updatedPost = await Post.findByIdAndUpdate(blogPostId, {$push:{comments:comment._id}}, {new:true, useFindAndModify:false});
  res.status(201).json({comment, updatedPost});
};

const getComment = async (req, res) => {
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId);
    res.status(200).json(comment);
};

const editComment = async (req, res) => {
    const {commentId} = req.params;
    const content = req.body.content;
    
    if(content){
    const comment = await Comment.findOneAndUpdate({_id:commentId, createdBy:req.user.userId});
    return res.status(201).json(comment);
    }
    res.status(201).json('no changes made');
};

const deleteComment = async (req, res) => {
    const {commentId} = req.params;
    const comment = await Comment.findOne({_id:commentId, createdBy:req.user.userId})
    const delComment = [];
    if (req.user.role === "admin"){
      const deletedComment = await Comment.findOneAndDelete({_id:commentId});
      delComment.push(deletedComment);
    } else {
      const deletedComment = await Comment.findOneAndDelete({_id:commentId, createdBy:req.user.userId});
      delComment.push(deletedComment);
    }
    res.status(200).json(delComment);
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
  editComment,
  getComment,
  approveComment,
};
