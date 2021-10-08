const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const { protector } = require("../middleware/protector");

router.route("/create").post(protector, blogController.postCreateBlog);
router.route("/all").get(blogController.getAllBlogs);
router.route("/:title").get(blogController.getBlog);
router.route("/:title").delete(protector, blogController.deleteBlog);
router.route("/:title").post(protector, blogController.editPost);
module.exports = router;
