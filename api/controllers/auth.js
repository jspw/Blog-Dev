const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const { unauthorizedAccess } = require("../utility/errorHandler");
const tokenGenerator = require("../utility/tokenGenerator");

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const check = await bcrypt.compare(password, user.password);

    if (check) {
      res.json(tokenGenerator(user.id));
    } else {
      unauthorizedAccess(res);
    }
  } else {
    unauthorizedAccess(res);
  }
};
