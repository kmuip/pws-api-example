const express = require("express");
const router = express.Router();

const OusController = require("../controllers/ous");
const session = require("../middleware/session");

router.get("/", session, OusController.get_ous);

module.exports = router;
