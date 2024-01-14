const Comment = require("../models/Comment.model");

module.exports.doCreate = (req, res, next) => {
  const commentToCreate = req.body;
  commentToCreate.user = req.session.currentUser._id;
  const isCommentApi = req.path.includes("commentsapi");
  const id = req.params.id;

  // Agregar la propiedad 'recipe' o 'recipeApi' a commentToCreate
  commentToCreate[isCommentApi ? "recipeApi" : "recipe"] = id;

  Comment.create(commentToCreate)
    .then((comment) => {
      console.log("comment created ", comment);
      res.redirect(`/recipesapi/${req.params.id}`);
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Comment.findByIdAndDelete(id)
    .then((comment) => {
      res.redirect(`/recipesapi/${comment.recipeApi}`);
    })
    .catch(next);
};
