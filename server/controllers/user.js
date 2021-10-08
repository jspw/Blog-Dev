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
    image,
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
      image,
    });

    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    validationError(res, 400, error);
  }
};

exports.updateUser = (req, res, next) => {
  const { username } = req.params;

  console.log(req.body);
  db.users
    .update(req.body, {
      where: { username },
    })
    .then((user) => {
      console.log(user);
      // user.password = undefined;
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.log("update");
      console.log(error);
      serverError(res);
    });
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
        attributes: ["id", "title", "content"],
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
      user.password = undefined;
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      serverError(res);
    });
};

exports.getMe = (req, res, next) => {
  const { id } = req.user;
  UserModel.findOne({
    where: { id },
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
      user.password = undefined;
      res.json(user);
    })
    .catch((err) => {
      console.log("update", err);
      serverError(res);
    });
};
