const bcrypt = require("bcrypt");
const db = require("../database/connection");
const UserModel = require("../models/user");
const FollowerModel = require("../models/user");
const { serverError, validationError } = require("../utility/errorHandler");

exports.PostCreateUser = async (req, res, next) => {
  const {
    username,
    password: plainPassword,
    email,
    github,
    firstName,
    lastName,
    bio,
    address,
    birthday,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(plainPassword, salt);

  try {
    const user = await UserModel.create({
      username,
      password,
      email,
      github,
      firstName,
      lastName,
      bio,
      address,
      birthday,
    });

    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    validationError(res, 400, error);
  }
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  UserModel.findOne({
    where: { username },
    include: [
      {
        model: db.followers,
        attributes: ["followerId"],
        include: {
          model: db.users,
          attributes: ["id", "username"],
        },
      },

      {
        model: db.blogs,
        attributes: ["id", "title"],
        include: [
          {
            model: db.comments,
            attributes: ["id", "content"],
          },
          {
            model: db.reacts,
            attributes: ["id"],
          },
        ],
      },
    ],
  })
    .then((user) => {
      // user.password = undefined;
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};
