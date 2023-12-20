const Recipe = require("../models/Recipe.model");

module.exports.list = (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render("recipes/list", { recipes });
    })
    .catch((err) => next(err));
};
module.exports.create = (req, res, next) => {
  res.render("recipes/create");
};
module.exports.doCreate = (req, res, next) => {
  Recipe.create(req.body)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch((err) => next(err));
};
module.exports.details = (req, res, next) => {
  Recipe.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
    .then((recipe) => {
      res.render("recipes/details", { recipe });
    })
    .catch((err) => next(err));
};
