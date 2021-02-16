const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const session = require("../middleware/session");

router.get("/", session, UsersController.get_users);
router.get("/:userId", session, UsersController.get_user);

module.exports = router;
