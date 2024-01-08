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

    mealType: {
      type: "String",
      required: [true, "Meal type is required"],
    },

    preparation: {
      type: String,
      required: [true, "Preparation is required"],
    },

    image: {
      type: String,
      default: "https://collection.cloudinary.com/dsapgrujx/d1990eb46425b47174321c841cf0f9dd.jpg",
    },

    preparationtime: {
      type: String,
      required: [true, "Preparation time is required"],
    },

    description: {
      type: String,
      required: [true, "Descrption is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
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
