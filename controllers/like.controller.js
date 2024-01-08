const mongoose = require("mongoose");
const Like = require("../models/Like.model");
const Recipe = require("../models/Recipe.model");

module.exports.newLike = (req, res, next) => {
  const { id } = req.params;

  Like.findOne({ recipe: id, user: req.session.currentUser._id })
    .then((existingLike) => {
      if (existingLike) {
        return Like.findOneAndDelete(existingLike._id).then(() => {
          console.log("Like eliminado:", existingLike._id);
        });
      } else {
        return Like.create({
          recipe: id,
          user: req.session.currentUser._id,
        }).then((newLike) => {
          console.log("Nuevo like creado:", newLike);
        });
      }
    })
    .then(() => {
      res.redirect(`/recipes/${id}`);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.mostPopular = (req, res, next) => {
  Like.aggregate([
    {
      $group: {
        _id: "$recipe",
        totalLikes: { $sum: 1 },
      },
    },
    { $sort: { totalLikes: -1 } },
    { $limit: 3 },
  ])
    .then((popularLikes) => {
      const popularRecipeIds = popularLikes.map((like) => like._id);
      return Recipe.find({ _id: { $in: popularRecipeIds } });
    })
    .then((popularRecipes) => {
      // Agrega las recetas más populares a res.locals
      res.locals.popularRecipes = popularRecipes;
      next();
    })
    .catch((error) => {
      next(error);
    });
};
