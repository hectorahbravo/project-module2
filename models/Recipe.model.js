const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },

    preparation: {
      type: String,
      required: [true, "Preparation is required"],
    },

    image: {
      type: String,
      default: `https://img.freepik.com/premium-vector/cooking-with-book-guide-recipe-concept-doodle-hand-drawn-vector-illustration_66976-327.jpg?w=740`,
    },

    preparationtime: {
      type: String,
      required: [true, "Preparation time is required"],
    },
    description: {
      type: String,
      required: [true, "Descrption is required"],
    },
  },
  {
    virtual: true,
  }
);

RecipeSchema.virtual("likes", {
  ref: "Like",
  justOne: false,
  localField: "_id",
  foreignField: "recipe",
});

RecipeSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "recipe",
  justOne: false,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
