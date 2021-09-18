const ReactModel = require("../models/react");
const { serverError } = require("../utility/errorHandler");

exports.postCreateReact = (req, res, next) => {
  const { userId, blogId } = req.body;

  ReactModel.findOne({
    where: {
      blogId,
      userId,
    },
  })
    .then((react) => {
      if (react) {
        react.destroy();
        return res.status(201).json({
          message: "UnReacted",
        });
      } else {
        ReactModel.create({
          blogId,
          userId,
        })
          .then((react) => {
            return res.status(201).json({
              message: "Reacted",
            });
          })
          .catch((err) => {
            console.log(err);
            serverError(res);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};
