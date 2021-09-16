const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.route("/").get(categoryController.getCategories);
router.route("/create").post(categoryController.postCreateCategory);

module.exports = router;
