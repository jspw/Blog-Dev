const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");

router.route("/create").post(blogController.postCreateBlog);
router.route("/all").get(blogController.getAllBlogs);
router.route("/:title").get(blogController.getBlog);
router.route("/:title").delete(blogController.deleteBlog);
router.route("/:title").post(blogController.editPost);
module.exports = router;
