const express = require("express");
const router = express.Router();

const LogsController = require("../controllers/logs");
const session = require("../middleware/session");

router.get(
  "/lastShown/:userId/:days",
  session,
  LogsController.lastShownPasswords
);

module.exports = router;
