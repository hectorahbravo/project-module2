const User = require("../models/User.model");

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
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
