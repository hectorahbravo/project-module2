const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const recipeController = require("../controllers/recipe.controller");

router.get("/", (req, res, next) => {
  res.render("home");
});

//auth

router.get(
  "/register",
  authMiddleware.isNotAuthenticated,
  authController.register
);
router.post(
  "/register",
  authMiddleware.isNotAuthenticated,
  authController.doRegister
);
router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post(
  "/login",
  authMiddleware.isNotAuthenticated,
  authController.doLogin
);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);

//user
router.get("/profile", authMiddleware.isAuthenticated, userController.profile);
router.get(
  "/profile/edit",
  authMiddleware.isAuthenticated,
  userController.edit
);
router.post(
  "/profile/edit",
  authMiddleware.isAuthenticated,
  userController.doEdit
);

router.get("/activate/:token", authController.activate);

//recipes
router.get("/recipes", authMiddleware.isAuthenticated, recipeController.list);
router.get(
  "/recipes/create",
  authMiddleware.isAuthenticated,
  recipeController.create
);
router.post(
  "/recipes/create",
  authMiddleware.isAuthenticated,
  recipeController.doCreate
);

router.get(
  "/recipes/:id",
  authMiddleware.isAuthenticated,
  recipeController.details
);

module.exports = router;
