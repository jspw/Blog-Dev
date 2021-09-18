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
      }
    })
    .catch((err) => {
      console.log(err);
      serverError(res);
    });

  FollowerModel.create({
    followerId,
    userId,
  })
    .then((follower) => {
      return res.status(201).json(follower);
    })
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};
