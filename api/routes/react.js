const express = require("express");
const router = express.Router();
const reactController = require("../controllers/react");
const { protector } = require("../middleware/protector");

router.route("/create").post(protector, reactController.postCreateReact);
module.exports = router;
