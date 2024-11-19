const fetch = require("node-fetch");
const Like = require("../models/Like.model");
const Comment = require("../models/Comment.model");

exports.categories = (req, res, next) => {
  fetch("https:/www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.render("recipes/categories", { categories: data.categories });
    })
    .catch((err) => console.log(err));
};

exports.category = (req, res, next) => {
  const { category } = req.params;
  fetch(`https:/www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.render("recipes/category", { recipes: data.meals });
    })
    .catch((err) => console.log(err));
};

exports.recipes = (req, res, next) => {
  const { id } = req.params;
  fetch(`https:/www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const ingredientsArray = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals[0][`strIngredient${i}`];
        const measure = data.meals[0][`strMeasure${i}`];

        if (ingredient) {
          const combinedIngredient = measure
            ? `${measure} ${ingredient}`
            : `${ingredient}`;
          ingredientsArray.push(combinedIngredient);
        }
      }

      const commentPromise = Comment.find({
        recipeApi: data.meals[0].idMeal,
      }).populate("user");
      const likePromise = Like.findOne({ recipeApi: data.meals[0].idMeal });

      Promise.all([commentPromise, likePromise])
        .then(([comments, likeEncontrado]) => {
          const renderData = {
            ...data.meals[0],
            ingredients: ingredientsArray,
          };

          if (comments) {
            renderData.comments = comments;
          }

          if (likeEncontrado) {
            renderData.like = likeEncontrado;
          }

          res.render("recipes/apidetails", renderData);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
