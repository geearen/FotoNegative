const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content:{
      type: String,
    },
    commentImages:{
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    camera:{
      type: mongoose.Types.ObjectId,
      ref: "Camera"
    }
  },
  {
    timestamps:true,
  }
)

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;