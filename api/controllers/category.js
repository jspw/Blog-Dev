const CategoryModel = require("../models/category");
const BlogModel = require("../models/blog");
const { serverError } = require("../utility/errorHandler");
const db = require("../database/connection");
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

exports.getCategory = (req, res) => {
  const { category } = req.params;
  CategoryModel.findOne({
    where: {
      name: category,
    },
    include: {
      model: db.blogs,
      include: [
        {
          model: db.comments,
          attributes: ["id", "content"],
          include: [
            {
              model: db.users,

              attributes: ["id", "username", "image"],
            },
          ],
        },
        {
          model: db.categories,
          attributes: ["id", "name"],
        },
        {
          model: db.users,
          attributes: ["id", "username", "image"],
        },

        {
          model: db.reacts,
          attributes: ["id"],
        },
      ],
      order: [["createdAt", "DESC"]],
    },
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};
