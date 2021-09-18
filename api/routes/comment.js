const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");

router.route("/create").post(commentController.postCreateComment);
module.exports = router;
