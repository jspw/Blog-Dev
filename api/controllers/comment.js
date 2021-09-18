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
