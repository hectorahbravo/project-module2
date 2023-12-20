const mongoose = require("mongoose");
const Like = require("../models/Like.model");

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
