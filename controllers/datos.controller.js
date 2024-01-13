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
      const ingredientsArray = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals[0][`strIngredient${i}`];
        const measure = data.meals[`strMeasure${i}`];

        if (ingredient) {
          const combinedIngredient = measure
            ? `${measure} ${ingredient}`
            : `${ingredient}`;
          ingredientsArray.push(combinedIngredient);
        }
      }

      console.log("data.meals: ", data.meals[0]);

      res.render("recipes/apidetails", {
        ...data.meals[0],
        ingredients: ingredientsArray,
      });
    })
    .catch((err) => console.log(err));
};
