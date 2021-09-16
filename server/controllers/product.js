const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const { serverError } = require("../utils/errorHandler");
exports.postCreateProduct = (req, res) => {
  console.log("postCreateProduct");
  const {
    categoryId,
    name,
    sellingPrice,
    regularPrice,
    image,
    rating,
    description,
  } = req.body;

  const product = {
    name,
    categoryId,
    sellingPrice,
    regularPrice,
    image,
    rating,
    description,
  };

  ProductModel.create(product)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    });
};

exports.getProducts = (req, res) => {
  ProductModel.findAll({
    include: ["categoryId"],
  })
    .then((products) => res.json(products))
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};
