const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.model");
const { recipes } = require("../public/js/recipes.json");
require("../config/db.config");

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("recipes")
    .then(() => {
      console.log("DB cleared");
    })
    .then(() => {
      return Recipe.create(recipes);
    })
    .then((recipesDb) => {
      recipesDb.forEach((recipe) =>
        console.log(`${recipe.title} has been created`)
      );
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.connection
        .close()
        .then(() => {
          console.log("End of seeds");
        })
        .catch((err) => console.error("Error while disconnecting", err))
        .finally(() => process.exit(0));
    });
});
