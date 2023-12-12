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

//user
router.get("/profile", userController.profile);

module.exports = router;
