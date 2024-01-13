const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
  recipeApi: { String },
  recipe: { type: mongoose.Types.ObjectId, ref: "Recipe" },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
