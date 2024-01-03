const Recipe = require("../models/Recipe.model");

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
  ])
    .then(([recipe1, recipe2, recipe3, recipe4, recipe5]) => {
      res.render("home", {
        recipeOne: recipe1.meals[0],
        recipeTwo: recipe2.meals[0],
        recipeThree: recipe3.meals[0],
        recipeFour: recipe4.meals[0],
        recipeFive: recipe5.meals[0],
      });
    })
    .catch((err) => console.log(err));
};
