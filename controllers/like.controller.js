const mongoose = require("mongoose");
const Like = require("../models/Like.model");
const Recipe = require("../models/Recipe.model");

module.exports.newLike = (req, res, next) => {
  const { id } = req.params;

  const isLikeApi = req.path.includes("likeapi");

  const likeData = {
    user: req.session.currentUser._id,
    [isLikeApi ? "recipeApi" : "recipe"]: id,
  };

  const searchQuery = {
    [isLikeApi ? "recipeApi" : "recipe"]: id,
    user: req.session.currentUser._id,
  };

  // Buscar si ya existe un like para la receta y usuario actual
  Like.findOne(searchQuery)
    .then((existingLike) => {
      if (existingLike) {
        // Si ya existe un like, eliminarlo
        return Like.findOneAndDelete(existingLike._id).then(() => {
          req.session.likeAction = {
            action: "delete",
            likeId: existingLike._id,
          };
        });
      } else {
        // Si no existe un like, crearlo
        return Like.create(likeData).then((newLike) => {
          req.session.likeAction = { action: "create", likeId: newLike._id };
        });
      }
    })
    .then(() => {
      // Redireccionar después de manejar el like
      if (isLikeApi) {
        res.redirect(`/recipesapi/${id}`);
      } else {
        res.redirect(`/recipes/${id}`);
      }
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
