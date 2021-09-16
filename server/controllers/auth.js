const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");
const UserModel = require("../models/user");
const { Op } = require("sequelize");
const { unauthorizedAccess } = require("../utils/errorHandler");

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    where: {
      [Op.and]: [{ email }, { password }],
    },
  });

  if (user) {
    res.json(tokenGenerator(user.id));
  } else {
    unauthorizedAccess(res);
  }
};
