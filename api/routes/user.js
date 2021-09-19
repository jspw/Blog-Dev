const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.route("/").get(userController.getMe);
router.route("/create").post(userController.PostCreateUser);
router.route("/:username").get(userController.getUser);
module.exports = router;
