const FollowerModel = require("../models/follower");
const { serverError } = require("../utility/errorHandler");

exports.postCreateFollower = (req, res, next) => {
  const { userId, followerId } = req.body;
  if (userId === followerId) {
    return res.status(400).json({
      message: "You can't follow yourself!",
    });
  }

  FollowerModel.findOne({
    where: {
      followerId,
      userId,
    },
  })
    .then((existingFollower) => {
      if (existingFollower) {
        existingFollower.destroy();
        return res.status(201).json({
          message: "Unfollowed",
        });
      } else {
        FollowerModel.create({
          followerId,
          userId,
        })
          .then((follower) => {
            return res.status(201).json({
              message: "Followed",
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
