const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const mongoose = require("mongoose");

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
  const { title, ingredients, preparation, preparationtime, description } =
    req.body;

  if (req.file) {
    req.body.image = req.file.path;
  }
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
            mealType,
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
    .populate("user")
    .populate("likes")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((recipe) => {
      const year = recipe.createdAt.getFullYear();
      const month = recipe.createdAt.getMonth();
      const day = recipe.createdAt.getDate();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      recipe.date = `${months[month]} ${day}, ${year}`;
      res.render("recipes/details", { recipe });
    })
    .catch((err) => next(err));
};

module.exports.getRecipeEditForm = (req, res, next) => {
  Promise.all([Recipe.findById(req.params.id)]).then((response) => {
    const [recipe] = response;
    if (recipe) {
      res.render("recipes/create", { recipe, isEdit: true });
    } else {
      next(createError(404, "No hemos encontrado esta receta"));
    }
  });
};

module.exports.doRecipeEdit = (req, res, next) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Primer parametro id - segundo objeto de updates - tercero el new true si quereis el objeto actualizado
    .then((recipeDB) => {
      res.redirect(`/recipes/${recipeDB._id}`);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Renderizar la vista de nuevo, pero con los errores
        return Recipe.find().then((recipes) => {
          res.render("recipes/create", {
            errors: err.errors,
            recipes: req.body,
            isEdit: true,
          });
        });
      } else {
        next(err);
      }
    });
};

module.exports.deleteRecipe = (req, res, next) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipeDB) => {
      if (recipeDB) {
        res.redirect("/recipes");
      } else {
        next(createError(404));
      }
    })
    .catch((err) => next(err));
};
