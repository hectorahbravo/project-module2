const mongoose = require("mongoose");
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
  const {
    title,
    ingredients,
    preparation,
    image,
    preparationtime,
    description,
  } = req.body;
  req.body.user = req.session.currentUser._id;
  Recipe.create(req.body)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("recipes/create", {
          recipes: {
            title,
            ingredients,
            preparation,
            image,
            preparationtime,
            description,
          },
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};
module.exports.details = (req, res, next) => {
  Recipe.findById(req.params.id)
    .populate("likes")
    .then((recipe) => {
      res.render("recipes/details", { recipe });
    })
    .catch((err) => next(err));
};
