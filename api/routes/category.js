const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.route("/create").post(categoryController.postCreateCategory);
router.route("/all").get(categoryController.getCategories);
module.exports = router;
