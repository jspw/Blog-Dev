const CategoryModel = require("../models/category");
const BlogModel = require("../models/blog");
const { serverError } = require("../utility/errorHandler");
exports.postCreateCategory = (req, res) => {
  console.log("postCreateCategory");
  const { name } = req.body;

  const category = {
    name,
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
  CategoryModel.findAll({
    include: {
      model: BlogModel,
    },
  })
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};
