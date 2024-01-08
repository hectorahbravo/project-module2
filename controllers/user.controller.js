const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

module.exports.profile = (req, res, next) => {
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .populate("recipes")
    .then((userWithRecipes) => {
      const userRecipes = userWithRecipes.recipes;
      res.render("users/profile", { userRecipes });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.edit = (req, res, next) => {
  res.render("users/edit");
};
module.exports.doEdit = (req, res, next) => {
  User.findByIdAndUpdate(req.session.currentUser._id, req.body, {
    new: true,
  })
    .then((dbUser) => {
      req.session.currentUser = dbUser;
      res.redirect("/profile");
      console.log(dbUser);
    })

    .catch((error) => next(error));
};

