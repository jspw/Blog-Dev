const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const {
  unauthorizedAccess,
  validationError,
} = require("../utility/errorHandler");
const tokenGenerator = require("../utility/tokenGenerator");

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  console.log(user);
  if (user) {
    const check = await bcrypt.compare(password, user.password);

    console.log(check);

    if (check) {
      console.log("Loggedin");
      return res.status(200).json(tokenGenerator(user.id));
    } else {
      unauthorizedAccess(res);
    }
  } else {
    validationError(res, 401, "Please create a account first.");
  }
};
