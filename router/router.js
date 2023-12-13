const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
router.get("/", (req, res, next) => {
  res.render("home");
});

//auth

router.get("/register", authController.register);
router.post("/register", authController.doRegister);
router.get("/login", authController.login);
router.post("/login", authController.doLogin);
router.get("/logout", authController.logout);

//user
router.get("/profile", userController.profile);
router.get("/profile/edit", userController.edit);
router.post("/profile/edit", userController.doEdit);

module.exports = router;
