const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { protector } = require("../middleware/protector");

router.route("/").get(userController.getMe);
router.route("/create").post(userController.PostCreateUser);
router.route("/:username").get(userController.getUser);
router.route("/:username").put(protector, userController.updateUser);
module.exports = router;
