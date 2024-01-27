function addIngredient() {
  var ingredientList = document.getElementById("ingredientList");
  var newIngredientGroup = document.createElement("div");
  newIngredientGroup.classList.add("ingredient-group");

  var newIngredientInput = document.createElement("input");
  newIngredientInput.type = "text";
  newIngredientInput.name = "ingredients[]";
  newIngredientInput.placeholder = "50gr Sugar";
  newIngredientInput.classList.add(
    "form-control",
    "py-2",
    "ps-4",
    "ingredient-input",
    "mt-1"
  );

  var deleteIcon = document.createElement("a");
  deleteIcon.href = "#";
  deleteIcon.classList.add("delete-icon", "text-decoration-none");
  deleteIcon.innerHTML = "🗑️";
  deleteIcon.onclick = function (event) {
    event.preventDefault();
    deleteIngredient(newIngredientGroup);
  };

  newIngredientGroup.appendChild(newIngredientInput);
  newIngredientGroup.appendChild(deleteIcon);
  ingredientList.appendChild(newIngredientGroup);
}

function deleteIngredient(ingredientGroup) {
  var ingredientList = document.getElementById("ingredientList");
  ingredientList.removeChild(ingredientGroup);
}
