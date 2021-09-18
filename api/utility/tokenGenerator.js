const jwt = require("jsonwebtoken");
require("dotenv").config();
const tokenGenerator = (id) => {
  return {
    token: jwt.sign(
      {
        id,
      },

      process.env.JWT_SECRET_TOKEN,

      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    ),
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
};

module.exports = tokenGenerator;
