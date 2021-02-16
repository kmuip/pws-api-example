const express = require("express");
const router = express.Router();

const ContainersController = require("../controllers/containers");
const session = require("../middleware/session");

router.post("/", session, ContainersController.create_container);
router.get("/", session, ContainersController.get_containers);
router.get("/filter", session, ContainersController.filter_containers);
router.get("/:containerId", session, ContainersController.get_container);
router.patch("/apiuser", session, ContainersController.remove_api_user_rights);

module.exports = router;
