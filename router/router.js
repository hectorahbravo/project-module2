const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

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
module.exports = router;
