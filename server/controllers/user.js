const user = require("../models/user");
const UserModel = require("../models/user");
const { serverError } = require("../utils/errorHandler");
exports.postCreateUser = (req, res) => {
  console.log("postCreateUser");
  const { firstName, lastName, email, password, phone, location, type } =
    req.body;

  const user = {
    firstName,
    lastName,
    email,
    password,
    phone,
    location,
    type,
  };

  UserModel.create(user)
    .then((data) => {
      data.password = undefined;
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

exports.getUser = (req, res) => {
  const { userId } = req.params;

  UserModel.findByPk(userId)
    .then((user) => {
      if (user) {
        user.password = undefined;
        res.json(user);
      } else {
        console.log("No user found!");
      }
    })
    .catch((error) => {
      console.log(error);
      serverError(res);
    });
};
