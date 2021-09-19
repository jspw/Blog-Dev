const { request } = require("express");
const BlogModel = require("../models/blog");
const CommentModel = require("../models/comment");
const ReactModel = require("../models/react");
const { serverError } = require("../utility/errorHandler");
const UserModel = require("../models/user.js");
const db = require("../database/connection");

// const db = require('../database/connection')

exports.getAllBlogs = (req, res, next) => {
  BlogModel.findAll({
    include: [
      {
        model: CommentModel,
        attributes: ["id", "content"],
        include: [
          {
            model: UserModel,

            attributes: ["id", "username", "image"],
          },
        ],
      },
      {
        model: db.categories,
        attributes: ["id", "name"],
      },
      {
        model: UserModel,
        attributes: ["id", "username", "image"],
      },

      {
        model: ReactModel,
        attributes: ["id"],
      },
    ],
  })
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCreateBlog = (req, res, next) => {
  const { userId, title, content, categoryId } = req.body;

  const blog = {
    userId,
    categoryId,
    title,
    content,
  };

  BlogModel.create(blog)
    .then((newPost) => res.status(201).json(newPost))
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};

exports.getBlog = (req, res, next) => {
  const { title } = req.params;
  BlogModel.findOne({
    where: {
      title,
    },
    include: [
      {
        model: db.users,
        attributes: [
          "id",
          "username",
          "firstName",
          "lastName",
          "bio",
          "address",
          "createdAt",
          "image",
        ],
        include: [
          {
            model: db.followers,
            attributes: ["id"],

            include: [
              {
                model: db.users,
                attributes: ["id"],
              },
            ],
          },
        ],
      },
      {
        model: db.categories,
        attributes: ["id", "name"],
      },
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
        model: db.reacts,
        attributes: ["id"],
        include: [
          {
            model: db.users,
            attributes: ["id", "username"],
          },
        ],
      },
    ],
    order: [
      [
        {
          model: db.comments,
          as: "comments",
        },
        "createdAt",
        "DESC",
      ],
    ],
  })
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteBlog = (req, res, next) => {
  const { title } = req.params;
  db.blogs
    .destroy({
      where: {
        title,
      },
    })
    .then((response) => {
      return res.status(204).json({
        message: "Deleted",
      });
    })
    .catch((error) => {
      console.log(error);
      serverError(res);
    });
};

exports.editPost = (req, res, next) => {
  const { title } = req.params;
  db.blogs
    .update(req.body, {
      where: {
        title,
      },
    })
    .then((blog) => {
      return res.status(200).json(blog);
    })
    .catch((error) => {
      console.log(error);
      serverError(res);
    });
};
