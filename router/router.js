const router = require("express").Router();
const authController = require("../controllers/auth.controller");


router.get("/", (req, res, next) => {
  res.render("home");
});

//auth

router.get("/register", authController.register);
router.post("/register", authController.doRegister);
router.get("/login", authController.login);
router.post("/login", authController.doLogin);

module.exports = router;
