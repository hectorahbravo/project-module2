const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const mongoose = require("mongoose");

module.exports.list = (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      console.log(recipes);
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
    .then((recipeCreated) => {
      return User.findByIdAndUpdate(req.session.currentUser._id, {
        $push: { recipes: recipeCreated._id },
      }).then(() => {
        res.render("recipes/details", { recipe: recipeCreated });
        res.redirect(`/recipes/${recipeCreated._id}`);
      });
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
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((recipe) => {
      res.render("recipes/details", { recipe });
    })
    .catch((err) => next(err));
};
