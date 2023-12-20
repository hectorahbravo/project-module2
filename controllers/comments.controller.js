const Comment = require('../models/Comment.model');

module.exports.doCreate = (req, res, next) => {
  const commentToCreate = req.body;
  commentToCreate.user = req.session.currentUser._id;
  commentToCreate.recipe = req.params.id;

  Comment.create(commentToCreate)
    .then(recipe => {
      res.redirect(`/recipes/${req.params.id}`);
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Comment.findByIdAndDelete(id)
    .then((comment) => {
      res.redirect(`/recipes/${comment.recipe}`);
    })
    .catch(next)
}