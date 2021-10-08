const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.route("/create").post(categoryController.postCreateCategory);
router.route("/all").get(categoryController.getCategories);
router.route("/:category").get(categoryController.getCategory);
module.exports = router;
