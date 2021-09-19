const { unauthorizedAccess } = require("../utility/errorHandler");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.protector = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
      if (err) {
        console.log(err);
        unauthorizedAccess(res);
      } else {
        console.log(user);
        req.user = user;
        next();
      }
    });
  } else {
    unauthorizedAccess(res);
  }
};
