const express = require("express");
const router = express.Router();
const followerController = require("../controllers/follower");

router.route("/create").post(followerController.postCreateFollower);
module.exports = router;
