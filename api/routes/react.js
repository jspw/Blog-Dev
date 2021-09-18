const express = require("express");
const router = express.Router();
const reactController = require("../controllers/react");

router.route("/create").post(reactController.postCreateReact);
module.exports = router;
