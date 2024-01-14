const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  recipeApi: {
    type: String,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
