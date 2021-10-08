const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { protector } = require("../middleware/protector");

router.route("/create").post(protector, commentController.postCreateComment);
router.route("/:id").delete(protector, commentController.deleteComment);
router.route("/:id").post(protector, commentController.editComment);
module.exports = router;
