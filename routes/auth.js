const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");
const session = require("../middleware/session");

router.post("/login", AuthController.login);
router.get("/user", session, AuthController.get_current_user);
router.post("/logout", session, AuthController.logout);

module.exports = router;
