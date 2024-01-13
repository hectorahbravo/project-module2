const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const recipeController = require("../controllers/recipe.controller");
const commentsController = require("../controllers/comments.controller");
const homeController = require("../controllers/home.controller");
const navbarCategories = require("../controllers/home.controller");
const passport = require("passport");
const likeController = require("../controllers/like.controller");
const datosController = require("../controllers/datos.controller");
const upload = require("../config/storage.config");
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
router.use(likeController.mostPopular);
router.get("/", homeController.goHome);

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
router.get("/recipes", recipeController.list);
router.get(
  "/recipes/create",
  authMiddleware.isAuthenticated,
  recipeController.create
);
router.post(
  "/recipes/create",
  authMiddleware.isAuthenticated,
  upload.single("image"),
  recipeController.doCreate
);

router.get(
  "/recipes/:id",
  //authMiddleware.isAuthenticated,
  recipeController.details
);

// comments

router.get(
  "/comments/:id/delete",
  authMiddleware.isAuthenticated,
  commentsController.delete
);
router.post(
  "/comments/:id/create",
  authMiddleware.isAuthenticated,
  upload.single("image"),
  commentsController.doCreate
);

//like
router.post(
  "/like/:id",
  authMiddleware.isAuthenticated,
  likeController.newLike
);

// Google auth
router.get(
  "/auth/google",
  authMiddleware.isNotAuthenticated,
  passport.authenticate("google-auth", { scope: GOOGLE_SCOPES })
);
router.get(
  "/auth/google/callback",
  authMiddleware.isNotAuthenticated,
  authController.doLoginGoogle
);

//data
router.get("/categories", datosController.categories);
router.get("/categories/:category", datosController.category);
router.get("/recipesapi/:id", datosController.recipes);

//edit

router.get(
  "/recipes/:id/edit",
  authMiddleware.isAuthenticated,
  recipeController.getRecipeEditForm
);
router.post(
  "/recipes/:id",
  authMiddleware.isAuthenticated,
  recipeController.doRecipeEdit
);

//delete

router.get(
  "/recipes/:id/delete",
  authMiddleware.isAuthenticated,
  recipeController.deleteRecipe
);

module.exports = router;
