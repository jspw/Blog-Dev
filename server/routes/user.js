const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authValidator = require("../middelware/authValidator");

router.route("/create").post(userController.postCreateUser);
router.route("/:userId").get(authValidator, userController.getUser);

module.exports = router;
