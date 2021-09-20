const express = require("express");
const router = express.Router();
const followerController = require("../controllers/follower");
const { protector } = require("../middleware/protector");

router.route("/create").post(protector, followerController.postCreateFollower);
module.exports = router;
