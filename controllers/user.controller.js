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
    })

    .catch((error) => next(error));
};
module.exports.viewOtherProfile = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate("recipes")
    .then((user) => {
      res.render("users/otherprofile", { user });
    })

    .catch((error) => next(error));
};
