const db = require("../database/connection");
const CommentModel = require("../models/comment");
const { serverError } = require("../utility/errorHandler");

exports.postCreateComment = (req, res, next) => {
  const { userId, blogId, content } = req.body;

  console.log(req.body);

  CommentModel.create({
    userId,
    blogId,
    content,
  })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};

exports.deleteComment = (req, res, next) => {
  const { id } = req.params;
  db.comments
    .destroy({
      where: {
        id,
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

exports.editComment = (req, res, next) => {
  const { id } = req.params;
  db.comments
    .update(req.body, {
      where: {
        id,
      },
    })
    .then((comment) => {
      return res.status(200).json(comment);
    })
    .catch((error) => {
      console.log(error);
      serverError(res);
    });
};
