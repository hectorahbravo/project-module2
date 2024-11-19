const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

module.exports.goHome = (req, res, next) => {
  Promise.all([
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
      (response) => response.json()
    ),
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
      (response) => response.json()
    ),
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
      (response) => response.json()
    ),
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
      (response) => response.json()
    ),
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
      (response) => response.json()
    ),
    Recipe.find(),
    User.find().sort({ "recipes.length": 1 }),
  ])
    .then(([recipe1, recipe2, recipe3, recipe4, recipe5, recipes, users]) => {
      const indexOne = Math.floor(Math.random() * recipes.length);
      const indexTwo = Math.ceil(Math.random() * recipes.length);
      const indexThree = Math.floor(Math.random() * recipes.length);
      const indexFour = Math.floor(Math.random() * recipes.length);
      const indexOneUser = Math.floor(Math.random() * users.length);
      const indexTwoUser = Math.ceil(Math.random() * users.length);
      const indexThreeUser = Math.floor(Math.random() * users.length);
      res.render("home", {
        recipeOne: recipe1.meals[0],
        recipeTwo: recipe2.meals[0],
        recipeThree: recipe3.meals[0],
        recipeFour: recipe4.meals[0],
        recipeFive: recipe5.meals[0],
        ourRecipeOne: recipes[indexOne],
        ourRecipeTwo: recipes[indexTwo],
        ourRecipeThree: recipes[indexThree],
        ourRecipeFour: recipes[indexFour],
        ourUserOne: users[0],
        ourUserTwo: users[1],
        ourUserThree: users[2],
        recipesUserOne: users[0].recipes.length || "",
      });
    })
    .catch((err) => console.log(err));
};
