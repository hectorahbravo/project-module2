const fetch = require("node-fetch");

exports.categories = (req, res, next) => {
  fetch("https:/www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Parsed response: ", data);

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
      console.log("Parsed response: ", data);
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
      console.log("Parsed response: ", data);
      res.render("recipes/apidetails", { recipes: data.meals });
    })
    .catch((err) => console.log(err));
};
