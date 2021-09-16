require("dotenv").config();
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

const UserModel = require("../models/user");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    console.log(authHeader);

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
      if (err) {
        console.log(err);
        // errorHandler.unauthorizedAccess(res);
        errorHandler.serverError(res);
      } else {
        console.log(user.id);
        UserModel.findByPk(user.id)
          .then((usr) => {
            if (usr) {
              req.user = usr;
              next();
            } else {
              console.log("User not found!");
              errorHandler.unauthorizedAccess(res);
            }
          })
          .catch((error) => console.log(error));
      }
    });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};
