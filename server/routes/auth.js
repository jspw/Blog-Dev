const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.route("/login").post(authController.postLogin);

module.exports = router;
