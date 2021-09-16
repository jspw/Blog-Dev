const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.route("/").get(productController.getProducts);
router.route("/create").post(productController.postCreateProduct);

module.exports = router;
