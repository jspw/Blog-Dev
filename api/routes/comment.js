const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");

router.route("/create").post(commentController.postCreateComment);
router.route("/:id").delete(commentController.deleteComment);
router.route("/:id").post(commentController.editComment);
module.exports = router;
