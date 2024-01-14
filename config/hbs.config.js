const hbs = require("hbs");

hbs.registerHelper("userLikedRecipe", function (options) {
  const { userId, likes } = options.hash;
  if (userId && likes && likes.some((like) => like.user == userId)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("userLikedRecipe", function (options) {
  const { userId, likes } = options.hash;
  if (userId && likes && likes.some((like) => like.user == userId)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("userMatchRecipeUser", function (options) {
  const { userId, recipeUserId } = options.hash;
  if (recipeUserId && userId && recipeUserId.toString() === userId.toString()) {
    return options.fn(this);
  }
});

hbs.registerHelper("userLikedRecipeApi", function (options) {
  const { userId, likeUserId } = options.hash;
  if (userId && likeUserId && userId.toString() === likeUserId.toString()) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
