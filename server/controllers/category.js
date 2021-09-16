const CategoryModel = require("../models/category");
const { serverError } = require("../utils/errorHandler");
exports.postCreateCategory = (req, res) => {
  console.log("postCreateCategory");
  const { name, image } = req.body;

  const category = {
    name,
    image,
  };

  CategoryModel.create(category)
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

exports.getCategories = (req, res) => {
  CategoryModel.findAll()
    .then((categories) => res.json(categories))
    .catch((err) => serverError(res));
};
